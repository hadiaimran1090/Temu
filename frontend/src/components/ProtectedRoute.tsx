import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
export function ProtectedRoute() {
  return useAppContext().token ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
    />
  );
}
