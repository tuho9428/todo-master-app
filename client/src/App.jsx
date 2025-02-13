import { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { amber, deepOrange } from "@mui/material/colors";
const primary = deepOrange[300];
const secondary = amber[400];
import AppRouter from "./router.jsx";

const theme = createTheme({
  palette: {
    primary: {
      main: primary,
    },
    secondary: {
      main: secondary,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Toaster position="top-center" />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
