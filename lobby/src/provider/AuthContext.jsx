import React from 'react';

export const AuthContext = React.createContext({
  token: null,
  gameToken: null,
  username: null,
});
