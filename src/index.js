import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css';
import {Layout, Menu} from 'antd';
import './index.css'
import {SearchOutlined, BookOutlined, UserOutlined, CompassOutlined, TeamOutlined} from '@ant-design/icons';

const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

ReactDOM.render(
    <Layout style={{height: '100vh'}}>
        <Header className="header">
            <div className="logo"/>
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['signup']} >
                <SubMenu key="home" title="Home"/>
                <SubMenu key="discover" title="Discover"/>
                <SubMenu key="contact" title="Contact us"/>
                <SubMenu key="login" style={{marginLeft: 'auto'}} title="Log In"/>
                <SubMenu key="signup" style={{float: 'right', background: 'rgba(64, 145, 247, 1)'}} title="Sign Up"/>
            </Menu>
        </Header>
        <Layout>
            <Sider width={200} className="site-layout-background">
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    defaultOpenKeys={['sub1']}
                    style={{height: '100%', borderRight: 0}}
                >
                    <Menu.Item key="1" icon={<SearchOutlined />}>Find a Sight</Menu.Item>
                    <Menu.Item key="2" icon={<UserOutlined />}>Friends</Menu.Item>
                    <Menu.Item key="3" icon={<TeamOutlined />}>Groups</Menu.Item>
                    <Menu.Item key="4" icon={<BookOutlined />}>Agendas</Menu.Item>
                    <Menu.Item key="5" icon={<CompassOutlined />}>Moments</Menu.Item>
                </Menu>
            </Sider>
            <Layout style={{padding: '0 24px 24px'}}>
                <Content
                    className="site-layout-background"
                    style={{
                        padding: 24,
                        margin: 0,
                        minHeight: 280,
                    }}
                >
                    Hello World!
                </Content>
            </Layout>
        </Layout>
    </Layout>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
