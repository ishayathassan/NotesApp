import { useAuth } from "./context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoutes() {
  const { user } = useAuth();
  if (user == null) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
}
