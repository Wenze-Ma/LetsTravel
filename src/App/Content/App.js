import './App.css';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Nav from "../MenuBar/Nav";
import SideNav from "../MenuBar/SideNav";
import logo from '../../logo.png';
import Home from "./Home";
import Discover from "./Discover";
import Contact from "./Contact";


const {Header} = Layout;


function App() {

    return (
        <Router>
            <Layout style={{height: '100vh'}}>
                <Header className="header">
                    <img src={logo} className="logo" alt='logo'/>
                    <Nav/>
                </Header>
                <Layout>
                    <SideNav/>
                    <Layout style={{padding: '0 24px 24px'}}>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/discover' component={Discover}/>
                            <Route exact path='/Contact' component={Contact}/>
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
