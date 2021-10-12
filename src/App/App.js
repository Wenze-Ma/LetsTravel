import './App.css';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Nav from "../MenuBar/Nav";
import SideNav from "../MenuBar/SideNav";


const {Header, Content} = Layout;


function App() {
    return (
        <Layout style={{height: '100vh'}}>
            <Header className="header">
                <div className="logo"/>
                <Nav/>
            </Header>
            <Router>
                <Layout>
                    <SideNav/>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Switch>
                            <Route exact path='/'>
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
                            </Route>
                        </Switch>
                    </Layout>
                </Layout>
            </Router>
        </Layout>
    );
}

export default App;
