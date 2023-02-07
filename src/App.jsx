import { Routes, Route } from "react-router-dom";
import { isAuthUser } from "./services/auth";
import { protectedRoutes, routes } from "./utils/routes";
import "./App.css";
import { useState } from "react";

function App() {
  const [isAuth] = useState(isAuthUser);
  const getRoutes = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.key}
          path={route.path}
          element={route.component}
        ></Route>
      );
    });
  };
  return (
    <>
      <Routes>
        {!isAuth && getRoutes(routes)}
        {isAuth && getRoutes(protectedRoutes)}
      </Routes>
    </>
  );
}

export default App;
