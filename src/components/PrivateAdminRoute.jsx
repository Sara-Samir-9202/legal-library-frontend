import { Navigate } from 'react-router-dom';

export default function PrivateAdminRoute({ children }) {
  const isAdmin = !!localStorage.getItem('adminToken');
  return isAdmin ? children : <Navigate to="/login" />;
}