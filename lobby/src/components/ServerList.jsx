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
        gameStatus: server.gameStatus,
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
      render: (isOnline, record) => (
        <span>
          {true === isOnline ? (
            <Tag color={'green'}>
              {record.gameStatus}
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
        <Typography.Text strong={false}>
          1. Download game. <a href={'http://wiki.time-of-changes.com/index.php?title=Hauptseite'} target={'_blank'}>Download page</a> <br/>
          2. Open game.<br/>
          3. Enter your access token: <Typography.Text strong={true}>{gameToken}</Typography.Text>
        </Typography.Text>
      )}
    </React.Fragment>
  )
};
