import React, {useEffect, useState} from 'react'
import {ServerListContext} from "./ServerListContext";
import axios from "axios";

const ServerListProvider = ({ children }) => {
  const [gameServer, setGameServer] = useState(null);
  const [serverList, setServerList] = useState([{
    ip: '127.0.0.1:9991',
    serverName: null,
    ping: null,
    players: null,
    maxPlayers: null,
  }]);

  useEffect(() => {
    const fetchServer = async () => {
      const newServerList = [];
      for(let i = 0; i < serverList.length; i++) {
        const server = serverList[i];
        try {
          const res = await axios.get(`http://${server.ip}/api/info`);

            newServerList.push({
              ip: server.ip,
              serverName: res.data.name,
              ping: 0,
              players: res.data.players.current,
              maxPlayers: res.data.players.max,
              isOnline: true,
            });

        } catch (err) {
          newServerList.push({
            ip: server.ip,
            serverName: null,
            ping: null,
            players: 0,
            maxPlayers: 0,
            isOnline: false,
          });
          console.log(err);
        }
      }

      setServerList(newServerList);
      setTimeout(fetchServer, 1000);
    };

    fetchServer();
  }, []);

  const connectToServer = async (server, user) => {
    const res = await axios.post(`http://${server.ip}/api/add-player`, user);

    if (200 === res.status) {
      setGameServer(server)
    }
  };

  const serverListState = {
    serverList,
    gameServer,
    connectToServer,
  };

  return (
    <ServerListContext.Provider value={serverListState}>
      {children}
    </ServerListContext.Provider>
  )
};

export default ServerListProvider