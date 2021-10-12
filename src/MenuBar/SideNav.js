import {Menu} from "antd";
import React from "react";
import {BookOutlined, CompassOutlined, SearchOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";

function SideNav() {
    return (
        <Sider width={200} className="site-layout-background">
            <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
            >
                <Menu.Item key="1" icon={<SearchOutlined/>}>Find a Sight</Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined/>}>Friends</Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined/>}>Groups</Menu.Item>
                <Menu.Item key="4" icon={<BookOutlined/>}>Agendas</Menu.Item>
                <Menu.Item key="5" icon={<CompassOutlined/>}>Moments</Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideNav;
