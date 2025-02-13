import { createSlice } from "@reduxjs/toolkit";
import {
  addTodoThunk,
  deleteTodoThunk,
  fetchTodosThunk,
  updateTodoThunk,
} from "./todosThunk";

const todosInitialState = {
  items: [],
  loading: false,
  error: null,
  rollbackState: null,
};

const todosSlice = createSlice({
  name: "todos",
  initialState: todosInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //fetchTodosThunk
      .addCase(fetchTodosThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodosThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTodosThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      // addTodoThunk
      .addCase(addTodoThunk.pending, (state, action) => {
        const tempId = Date.now().toString();
        state.items.push({
          _id: tempId,
          title: `${action.meta.arg} adding...`,
          isCompleted: false,
          isTemp: true,
        });
      })
      .addCase(addTodoThunk.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.isTemp ? action.payload : item
        );
      })
      .addCase(addTodoThunk.rejected, (state, action) => {
        state.items = state.items.filter((item) => !item.isTemp);
        state.error = action.error.message;
      })
      // deleteTodoThunk
      .addCase(deleteTodoThunk.pending, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.meta.arg
        );
        if (index !== -1) {
          state.rollbackState = {
            item: state.items[index],
            index: index,
          };
          state.items = state.items.filter(
            (item) => item._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteTodoThunk.fulfilled, (state) => {
        state.rollbackState = null;
      })
      .addCase(deleteTodoThunk.rejected, (state, action) => {
        if (state.rollbackState) {
          const { item, index } = state.rollbackState;
          state.items.splice(index, 0, item);
          state.rollbackState = null;
        }
        state.error = action.error.message;
      })
      // updateTodoThunk
      .addCase(updateTodoThunk.pending, (state, action) => {
        const { id, title, isCompleted } = action.meta.arg;
        const index = state.items.findIndex((item) => item._id === id);

        if (index !== -1) {
          state.rollbackState = {
            item: { ...state.items[index] },
            index: index,
          };
          state.items[index] = { ...state.items[index], title, isCompleted };
        }
      })
      .addCase(updateTodoThunk.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item._id === action.payload._id
        );

        if (index !== -1) {
          state.items[index] = action.payload;
          state.rollbackState = null;
        }
      })
      .addCase(updateTodoThunk.rejected, (state, action) => {
        if (state.rollbackState) {
          const { item, index } = state.rollbackState;
          state.items[index] = item;
          state.rollbackState = null;
        }
        state.error = action.error.message;
      });
  },
});

export default todosSlice.reducer;
