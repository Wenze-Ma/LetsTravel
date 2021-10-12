import {Menu} from "antd";
import React from "react";

const {SubMenu} = Menu;

function Nav() {
    return (
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['signup']}>
            <SubMenu key="home" title="Home"/>
            <SubMenu key="discover" title="Discover"/>
            <SubMenu key="contact" title="Contact us"/>
            <SubMenu key="login" style={{marginLeft: 'auto'}} title="Log In"/>
            <SubMenu key="signup" style={{float: 'right', background: 'rgba(64, 145, 247, 1)'}}
                     title="Sign Up"/>
        </Menu>
    )
}

export default Nav;
