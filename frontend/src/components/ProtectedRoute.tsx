import { Navigate, Outlet } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
export function ProtectedRoute() { return useAppContext().token ? <Outlet /> : <Navigate to="/login" replace state={{ message: 'Please sign in to continue to checkout.' }} /> }
