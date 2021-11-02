import './App.css';
import {Layout} from 'antd';
import 'antd/dist/antd.css';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import React, {useEffect, useState} from "react";
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
import Profile from "./Profile";
import Cookies from "js-cookie";
import UserService from "../Service/UserService";
import SightDetail from "./SightDetail";


const {Header} = Layout;


function App() {


    const [isLoggedIn, setLoggedIn] = useState(Cookies.get("lets_travel_cookie") != null);
    const [user, setUser] = useState(null);

    const [sights, setSights] = useState([]);
    const [currentSelectedSight, setSelectedSight] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            UserService.restoreUser(setUser);
        }
    }, [isLoggedIn])

    return (
        <Router>
            <Layout style={{height: '100vh'}}>
                <Header className="header">
                    <img src={logo} className="logo" alt='logo'/>
                    <Nav
                        setLoggedIn={setLoggedIn}
                        setUser={setUser}
                        isLoggedIn={isLoggedIn}
                        user={user}
                    />
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
                            <Route exact path='/searchResults/place=:place&radius=:radius'>
                                <SearchResult
                                    sights={sights}
                                    setSights={setSights}
                                    currentSelectedSight={currentSelectedSight}
                                    setSelectedSight={setSelectedSight}
                                />
                            </Route>
                            <Route exact path='/profile'>
                                <Profile
                                    user={user}
                                    isLoggedIn={isLoggedIn}
                                    setUser={setUser}/>
                            </Route>
                            <Route exact path='/sightDetail/xid=:xid'>
                                <SightDetail
                                    sight={currentSelectedSight}
                                    user={user}
                                    setSelectedSight={setSelectedSight}
                                />
                            </Route>
                        </Switch>
                    </Layout>
                </Layout>
            </Layout>
        </Router>
    );
}

export default App;
