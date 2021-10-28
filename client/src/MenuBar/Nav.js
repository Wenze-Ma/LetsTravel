import {Menu, message} from "antd";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import SignUp from "../Form/SignUp";
import LogIn from "../Form/LogIn";
import axios from "axios";
import Cookies from "js-cookie";
import UserService from "../Service/UserService";

const {SubMenu} = Menu;


function Nav() {
    const history = useHistory();
    const pathName = useLocation().pathname;

    const routeChange = (newPath) => {
        history.push(`/${newPath}`);
    }

    const [signUpVisible, setSignUpVisible] = useState(false);
    const [logInVisible, setLogInVisible] = useState(false);
    const [isLoggedIn, setLoggedIn] = useState(Cookies.get("lets_travel_cookie") != null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (isLoggedIn) {
            axios.get("/auth/getUser")
                .then(response => {
                    setUser(response.data);
                });
        }
    }, [isLoggedIn])

    // useEffect(() => {
    // }, [UserService.getCurrentUser()]);
    //
    // console.log(UserService.getCurrentUser())

    return (
        <div>
            <Menu theme="dark" mode="horizontal" selectedKeys={[pathName === '/' ? 'home' : pathName.replace('/', '')]}>
                <SubMenu key="home" title="Home" onTitleClick={() => {
                    routeChange('')
                }}/>
                <SubMenu key="discover" title="Discover" onTitleClick={() => {
                    routeChange('discover')
                }}/>
                <SubMenu key="contact" title="Contact us" onTitleClick={() => {
                    routeChange('contact')
                }}/>
                {!isLoggedIn ?
                    <SubMenu key="login" style={{marginLeft: 'auto'}} title="Log In" onTitleClick={() => {
                        setLogInVisible(true)
                    }}/> :
                    <SubMenu key="userInfo" style={{marginLeft: 'auto'}}
                             title={!user ? "" : "Hi, " + user.data.first_name}
                    >
                        <Menu.Item key="logout"
                                   onClick={() => {
                                       setLoggedIn(false);
                                       UserService.logOut();
                                   }}
                        >
                            Log Out
                        </Menu.Item>
                    </SubMenu>
                }
                {!isLoggedIn ?
                    <SubMenu key="signup" style={{float: 'right', background: 'rgba(64, 145, 247, 1)'}}
                             title="Sign Up"
                             onTitleClick={() => {
                                 setSignUpVisible(true)
                             }}/> : null
                }

            </Menu>
            <SignUp
                visible={signUpVisible}
                onCreate={(values) => {
                    UserService.signUp(values);
                    setSignUpVisible(false);
                }}
                onCancel={() => setSignUpVisible(false)}
            />
            <LogIn
                visible={logInVisible}
                onCreate={(values) => {
                    UserService.logIn(values, setLoggedIn);
                    setLogInVisible(false);
                }}
                onCancel={() => setLogInVisible(false)}
            />
        </div>
    )
}

export default Nav;
