import {Menu} from "antd";
import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import SignUp from "../Form/SignUp";
import LogIn from "../Form/LogIn";
import axios from "axios";

const {SubMenu} = Menu;


function Nav() {
    const history = useHistory();
    const pathName = useLocation().pathname;

    const routeChange = (newPath) => {
        history.push(`/${newPath}`);
    }

    const [signUpVisible, setSignUpVisible] = useState(false);
    const [logInVisible, setLogInVisible] = useState(false);

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
                <SubMenu key="login" style={{marginLeft: 'auto'}} title="Log In" onTitleClick={() => {setLogInVisible(true)}}/>
                <SubMenu key="signup" style={{float: 'right', background: 'rgba(64, 145, 247, 1)'}} title="Sign Up"
                         onTitleClick={() => {setSignUpVisible(true)}}/>
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
                    console.log(values);
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
    axios.get(`/users/${values['email']}`)
        .then(response => {
            if (response.data.data._id) {
                alert("This email is already registered!")
            } else {
                axios.post('/users', user)
                    .then(() => alert("Registration Succeeded!"));
            }
        });
    return true;
}

export default Nav;
