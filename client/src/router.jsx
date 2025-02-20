import { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";

const Todos = lazy(() => import("./pages/Todos.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const RouteGuard = lazy(() => import("./components/RouteGuard.jsx"));
const UserInfo = lazy(() => import("./pages/UserInfo.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

import { Routes, Route, Outlet, Navigate } from "react-router";
import { verifyUserThunk } from "./store/auth/authThunk.js";

function AppRouter() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(verifyUserThunk()); // Check token on app load
  }, [dispatch]);

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="user"
          element={
            <RouteGuard>
              <Outlet />
            </RouteGuard>
          }
        >
          <Route path="profile" element={<UserInfo parent={"user"} />} />
        </Route>
        <Route
          path="app"
          element={
            <RouteGuard>
              <Outlet />
            </RouteGuard>
          }
        >
          <Route path="todos" element={<Todos parent={"app"} />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
