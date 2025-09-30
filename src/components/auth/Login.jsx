
import { initGoogleClient, signInWithGoogle } from "@/utils/googleAuth.js";
import { useEffect } from "react";
import { setUser, clearUser, hydrateFromStorage } from "@/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { auth, token, status, error } = useSelector((state) => state.auth);

  // Hydrate redux state from any persisted storage on mount
  useEffect(() => {
    dispatch(hydrateFromStorage());
  }, [dispatch]);

  // Load Google client if not logged in
  useEffect(() => {
    if (!token) initGoogleClient();
  }, [token]);

  const handleGoogleLogin = async () => {
    const result = await signInWithGoogle();
    if (result) {
      dispatch(setUser(result));
      setToken?.(result.access_token || result.credential);
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  if (auth && token) {
    return (
      <div className="container" style={{ padding: 24 }}>
        <h1>User Dashboard</h1>
        <p style={{ color: '#555' }}>Logged in as <strong>{auth.email || auth.name || 'User'}</strong></p>
        <div className="form-actions" style={{ marginTop: 24 }}>
          <button className="primary-button" onClick={handleLogout}>Logout</button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: 32, maxWidth: 480 }}>
      <h1>Login</h1>
      <p style={{ color: '#666', marginBottom: 24 }}>Choose a method to sign in:</p>
      <div className="form-actions" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <button className="primary-button" onClick={handleGoogleLogin} disabled={status === 'loading'}>
          {status === 'loading' ? 'Authenticating…' : 'Sign in with Google'}
        </button>
      </div>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default Login;
