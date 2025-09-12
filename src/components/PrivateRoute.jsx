
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem('access_token'));

  return user ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
