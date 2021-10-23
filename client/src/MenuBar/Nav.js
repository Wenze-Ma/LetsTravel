import {Menu} from "antd";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import SignUp from "../Form/SignUp";
import LogIn from "../Form/LogIn";
import axios from "axios";
import Cookies from "js-cookie";

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
            axios.get("/auth/getUser/" + Cookies.get("lets_travel_cookie"))
                .then(response => {
                    console.log(response);
                    console.log(response.data);
                    setUser(response.data);
                });
        }
    }, [isLoggedIn])

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
                                       onLogOut();
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
                    onSignUp(values);
                    setSignUpVisible(false);
                }}
                onCancel={() => setSignUpVisible(false)}
            />
            <LogIn
                visible={logInVisible}
                onCreate={(values) => {
                    onLogIn(values, setLoggedIn, setUser);
                    setLogInVisible(false);
                }}
                onCancel={() => setLogInVisible(false)}
            />
        </div>
    )
}

const onSignUp = (values) => {
    const user = {
        email: values['email'],
        first_name: values['firstName'],
        last_name: values['lastName'],
        password: values['password']
    };
    axios.post('/users', user)
        .then(response => {
            if (response.data.existed) {
                alert("This email is already registered!");
            } else {
                alert("Registration Succeeded!")
            }
        });
    return true;
}

const onLogIn = (values, setLoggedIn) => {
    const credentials = {
        email: values['email'],
        password: values['password']
    }
    axios.post('/users/login', credentials).then(response => {
        if (response.data.success) {
            alert("Log in succeeded!")
            setLoggedIn(true);
        } else {
            alert(response.data.data);
        }
    })
}

const onLogOut = () => {
    axios.get('/users/logout')
        .then(() => {
            alert("logged out")
        });
}

export default Nav;
