import React, {useContext, useEffect, useState} from 'react';
import 'antd/dist/antd.css';
import {Table, Button, Typography, Tag} from 'antd'
import {ServerListContext} from "../provider/ServerListContext";
import {AuthContext} from "../provider/AuthContext";

export const ServerList = () => {
  const {serverList, gameServer, connectToServer} = useContext(ServerListContext);
  const {username, token, gameToken} = useContext(AuthContext);
  const [list, setList] = useState([]);


  useEffect(() => {
    const dataSource = [];

    serverList.forEach((server, index) => {
      dataSource.push({
        key: index,
        serverName: server.serverName || server.ip,
        ping: server.ping,
        players: `${server.players} / ${server.maxPlayers}`,
        status: server.isOnline,
      })
    });

    setList(dataSource)
  }, serverList);

  const columns = [
    {
      title: 'Server Name',
      dataIndex: 'serverName',
      key: 'serverName',
    },
    {
      title: 'Ping',
      dataIndex: 'ping',
      key: 'ping',
    },
    {
      title: 'Players',
      dataIndex: 'players',
      key: 'players',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (isOnline) => (
        <span>
          {true === isOnline ? (
            <Tag color={'green'}>
              online
            </Tag>
          ) : (
            <Tag color={'volcano'}>
              offline
            </Tag>
          )}
      </span>
      ),
    },
    {
      title: 'Actions',
      dataIndex: 'actions',
      key: 'actions',
      align: 'right',
      render: (text, record) => (
        <React.Fragment>
          {true === record.status &&
          <Button
            type="primary"
            icon="right-circle"
            loading={false}
            onClick={() => {
              connectToServer(
                serverList[record.key],
                {
                  username,
                  token,
                  gameToken,
                }
              )
            }}
          >
            Connect
          </Button>
          }
        </React.Fragment>
      ),
    },
  ];

  return (
    <React.Fragment>
      {null === gameServer && <Table dataSource={list} columns={columns}/>}
      {null !== gameServer && (
        <Typography.Text strong={true}>Open your game.</Typography.Text>
      )}
    </React.Fragment>
  )
};
