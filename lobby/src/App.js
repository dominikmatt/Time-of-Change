import React from 'react';
import './App.css';
import {Lobby} from "./components/Lobby";
import AuthProvider from "./provider/AuthProvider";
import ServerListProvider from "./provider/ServerListProvider";

function App() {
  return (
    <AuthProvider>
      <ServerListProvider>
        <Lobby/>
      </ServerListProvider>
    </AuthProvider>
  );
}

export default App;
