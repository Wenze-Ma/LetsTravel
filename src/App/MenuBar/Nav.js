import {Menu, Modal} from "antd";
import React, {useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import SignUp from "../Form/SignUp";
import LogIn from "../Form/LogIn";

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
        <>
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
            <Modal
                title="Sign Up"
                visible={signUpVisible}
                onOk={() => {setSignUpVisible(false)}}
                onCancel={() => {setSignUpVisible(false)}}
            >
                <SignUp />
            </Modal>
            <Modal
                title="LogIn"
                visible={logInVisible}
                nOk={() => {setLogInVisible(false)}}
                onCancel={() => {setLogInVisible(false)}}
            >
                <LogIn />
            </Modal>
        </>
    )
}

export default Nav;
