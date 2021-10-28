import './App.css';
import {Col, Layout} from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React from "react";
import Nav from "../MenuBar/Nav";
import SideNav from "../MenuBar/SideNav";
import logo from '../logo.png';
import Home from "./Home";
import Discover from "./Discover";
import Contact from "./Contact";
import Find from "./Find";
import Friends from "./Friends";
import Groups from "./Groups";
import Agendas from "./Agendas";
import Moments from "./Moments";
import SearchResult from "./SearchResult";


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
                    <Layout>
                        <Switch>
                            <Route exact path='/' component={Home}/>
                            <Route exact path='/discover' component={Discover}/>
                            <Route exact path='/contact' component={Contact}/>
                            <Route exact path='/find' component={Find}/>
                            <Route exact path='/friends' component={Friends}/>
                            <Route exact path='/groups' component={Groups}/>
                            <Route exact path='/agendas' component={Agendas}/>
                            <Route exact path='/moments' component={Moments}/>
                            <Route exact path='/searchResults/place=:place&radius=:radius' component={SearchResult}/>
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
