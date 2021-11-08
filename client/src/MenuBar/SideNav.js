import {Menu} from "antd";
import React, {useState} from "react";
import {HeartOutlined, CompassOutlined, SearchOutlined, TeamOutlined, UserOutlined} from "@ant-design/icons";
import Sider from "antd/es/layout/Sider";
import {useHistory, useLocation} from "react-router-dom";

function SideNav() {
    const [collapse, setCollapse] = useState(false);
    const history = useHistory();
    const routeChange = (newPath) => {
        history.push(newPath);
    }
    const pathName = useLocation().pathname;

    return (
        <Sider collapsible
               collapsed={collapse}
               onCollapse={() => setCollapse(!collapse)}
               width={200}
               className="site-layout-background" >
            <Menu
                mode="inline"
                defaultOpenKeys={['sub1']}
                style={{height: '100%', borderRight: 0}}
                theme='dark'
                selectedKeys={[pathName.replace('/', '')]}
            >
                <Menu.Item key="find" icon={<SearchOutlined/>} onClick={() => {routeChange('/find')}}>Find Sight</Menu.Item>
                <Menu.Item key="friends" icon={<UserOutlined/>} onClick={() => {routeChange('/friends')}}>Friends</Menu.Item>
                <Menu.Item key="groups" icon={<TeamOutlined/>} onClick={() => {routeChange('/groups')}}>Groups</Menu.Item>
                <Menu.Item key="favorites" icon={<HeartOutlined/>} onClick={() => {routeChange('/favorites')}}>Favorites</Menu.Item>
                <Menu.Item key="moments" icon={<CompassOutlined/>} onClick={() => {routeChange('/moments')}}>Moments</Menu.Item>
            </Menu>
        </Sider>
    )
}

export default SideNav;
