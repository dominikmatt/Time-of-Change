import React, {useContext, useEffect, useState} from 'react';
import {Form, Input, Button, Row, Col} from 'antd';
import 'antd/dist/antd.css';
import {AuthContext} from "../provider/AuthContext";

export const Login = () => {
  const [username, setUsername] = useState(null);
  const AuthProvider = useContext(AuthContext)

  const onLogin = (event) => {
    event.preventDefault();

    if (null !== username) {
      AuthProvider.setUsername(username)
    }
  };

  return (
    <Form onSubmit={onLogin} className="login-form">
      <Form.Item>
        <Input placeholder="Username" value={username} onChange={event => setUsername(event.target.value)}/>
      </Form.Item>
      <Row>
        <Col span={24} style={{textAlign: 'center'}}>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in as {username}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  )
};
