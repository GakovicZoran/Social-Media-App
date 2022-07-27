import { useContext } from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

// Iz nekoga razloga mi ne radi logika zastite ruta, tako da nisam implementovao.
export const ProtectedRoutes = ({ children }: any) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to="/" />;
  } else {
    return children;
  }
};
