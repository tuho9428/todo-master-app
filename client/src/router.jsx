import { lazy, Suspense } from "react";

const Todos = lazy(() => import("./pages/Todos.jsx"));
const Register = lazy(() => import("./pages/Register.jsx"));
const RouteGuard = lazy(() => import("./components/RouteGuard.jsx"));
const UserInfo = lazy(() => import("./pages/UserInfo.jsx"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Login = lazy(() => import("./pages/Login.jsx"));

import { Routes, Route, Outlet } from "react-router";

function AppRouter() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <Routes>
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
