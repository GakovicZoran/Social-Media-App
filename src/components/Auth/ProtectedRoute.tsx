import { useContext } from "react";
import { Navigate } from "react-router-dom";
// import { AuthContext } from "../../App";

export const ProtectedRoute = ({ children }: any) => {
  // const { user } = useContext(AuthContext);
  // if (!user) {
  //   return <Navigate to="/" />;
  // }
  return <div>{children}</div>;
};
