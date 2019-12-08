import React, {useEffect, useState} from 'react'
import {AuthContext} from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState(localStorage.getItem('username') || null);
  const [token, setToken] = useState(null);
  const [gameToken, setGameToken] = useState(null);

  useEffect(() => {
    setToken(`token-${username}`);
    setGameToken(`gametoken-${username}`);

    if (null !== username && '' !== username) {
      localStorage.setItem('username', username);
    }
  }, [username]);

  const authState = {
    username,
    token,
    gameToken,
    setUsername,
  };

  return (
    <AuthContext.Provider value={authState}>
      {children}
    </AuthContext.Provider>
  )
};

export default AuthProvider