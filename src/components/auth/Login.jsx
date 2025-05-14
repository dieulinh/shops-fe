
import {initGoogleClient, signInWithGoogle } from "@/utils/googleAuth.js";
import {useEffect, useState} from "react";

import {setUser} from "@/features/auth/authSlice.js";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const dispatch = useDispatch();
  const user = localStorage.getItem('access_token');
  const {auth} = useSelector((state) => state.auth);
  const [userData,setUserData] = useState();
  const [currentToken, setCurrentToken] = useState();
  const navigate = useNavigate();
  useEffect(() => {

    if(user) {
      return;
    }

    initGoogleClient()

  }, []);
  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    dispatch(setUser(userData));
    if(userData) {
      setUserData(userData);
      setCurrentToken(userData.credential);
      setToken(userData.credential);
      navigate('/dashboard')
    }
  };

  if(user){
    return <div className={"container"}>
      <h1>User Dashboard</h1>

      <button onClick={() => {
        localStorage.removeItem('access_token');
        dispatch(setUser(null));
        navigate('/login')
      }}>Logout</button>
    </div>
  }
if(!auth)
  {
    return <button onClick={handleLogin}>Sign in with Google</button>;
  }

};

export default Login;
