
import { initGoogleClient, signInWithGoogle } from "@/utils/googleAuth.js";
import { useEffect } from "react";
import { clearUser, hydrateFromStorage, login } from "@/features/auth/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

// Login component: performs Google OAuth client-side, then sends the obtained
// Google access token to the backend (/auth/google) so the backend can
// verify, create (or upsert) the user, and issue our own application JWT.
// Flow:
// 1. User clicks "Sign in with Google".
// 2. Frontend gets Google access_token + basic profile via gapi.
// 3. Dispatch login thunk with { provider: 'google', access_token, profile }.
// 4. Backend responds { token, user }. We persist in auth slice.
// 5. On success navigate to dashboard.
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
    if (status === 'loading') return; // prevent duplicate clicks
    try {
      const result = await signInWithGoogle();
      if (!result?.access_token) {
        console.warn('Google sign-in did not return an access token');
        return;
      }
      // Send token + (optional) profile to backend
      dispatch(
        login({
          provider: 'google',
          access_token: result.access_token,
          profile: result.userData
        })
      );
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error('Google login failed', e);
    }
  };

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  // Navigate after a successful backend-authenticated login (not just Google)
  useEffect(() => {
    if (status === 'succeeded' && auth && token) {
      setToken?.(token);
      navigate('/dashboard');
    }
  }, [status, auth, token, navigate, setToken]);

  if (auth && token && status === 'succeeded') {
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
          {status === 'loading' ? 'Signing in…' : 'Sign in with Google'}
        </button>
      </div>
      {error && <div style={{ color: 'red', marginTop: 16 }}>{error}</div>}
    </div>
  );
};

export default Login;
