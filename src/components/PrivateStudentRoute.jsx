import { Navigate } from 'react-router-dom';

export default function PrivateStudentRoute({ children }) {
  const token = localStorage.getItem('studentToken');
  return token ? children : <Navigate to="/login" replace />;
}