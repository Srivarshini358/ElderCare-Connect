import React, { useEffect, useState } from "react";
import { auth, provider, signInWithPopup } from "./firebaseConfig";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        navigate("/dashboard"); // Redirect to dashboard after login
      }
    });
  }, []);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      navigate("/dashboard"); // Redirect to dashboard
    } catch (error) {
      console.error("Authentication Failed:", error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default Login;
