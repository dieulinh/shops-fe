
import {initGoogleClient, signInWithGoogle } from "@/utils/googleAuth.js";
import {useEffect, useState} from "react";

import {setUser} from "@/features/auth/authSlice.js";
import {useDispatch, useSelector} from "react-redux";

const Login = ({ setToken }) => {
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => state.auth);
  const [userData,setUserData] = useState();
  const [currentToken, setCurrentToken] = useState();
  useEffect(() => {

    initGoogleClient()

  }, []);
  const handleLogin = async () => {
    const userData = await signInWithGoogle();
    dispatch(setUser(userData));

  };
  if(!auth)
  {return <button onClick={handleLogin}>Sign in with Google</button>;}
   return <div>Welcome {auth.userData?.name}</div>
};

export default Login;
