import React, {useContext} from 'react';
import 'antd/dist/antd.css';
import {AuthContext} from "../provider/AuthContext";
import {Login} from "./Login";
import {ServerList} from "./ServerList";
import {Layout, Typography} from 'antd';

export const Lobby = () => {
  const AuthProvider = useContext(AuthContext);

  return (
    <React.Fragment>
      <Layout>
        <Layout.Header style={{padding: '10px 25px 10px 25px'}}>
          <img src={'http://assets.time-of-changes.com/images/logo.png'} alt={'Time of Changes Lobby'}
               style={{height: '100%'}}/>
        </Layout.Header>

        {null !== AuthProvider.username ? (
          <React.Fragment>
            <Layout.Content style={{padding: '1em 1em'}}>
              <Typography.Text type="primary">Logged in as: </Typography.Text>
              <Typography.Text type="warning">{AuthProvider.username}</Typography.Text>
            </Layout.Content>

            <Layout.Content style={{padding: '1em 1em'}}>
              <ServerList/>
            </Layout.Content>
          </React.Fragment>
        ) : (
          <Layout.Content style={{padding: '1em 1em'}}>
            <Login/>
          </Layout.Content>
        )}
      </Layout>
    </React.Fragment>
  )
};
