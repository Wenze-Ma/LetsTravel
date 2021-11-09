import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {Avatar, Button, Col, Collapse, Divider, List, Row} from "antd";
import SearchUser from "../Form/SearchUser";
import UserService from "../Service/UserService";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";

function Chat({user, isLoggedIn, setSelectedChat, selectedChat}) {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (user) {
            UserService.getFriends(user.email, setFriends);
        }
    }, [user]);

    const LeftView = () => (
        <div style={{overflow:"auto", height:"100%"}}>
            <Search placeholder="Search" key="searchFriend2" onSearch={value => console.log(value)} enterButton style={{margin:"10px"}}/>
            {friends.length === 0 ? null :
                <List
                    dataSource={friends}
                    renderItem={user => (
                        <List.Item
                            style={{background: !!selectedChat && selectedChat.email === user.email ? "#e6f7ff" : "#fafafa", padding: "10px"}}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={user.src}/>}
                                title={
                                    <span>
                                    <a onClick={() => setSelectedChat(user)}>{user.first_name} {user.last_name}</a>
                                        {/*<img src="https://img.icons8.com/color/48/000000/male.png"/>*/}
                                </span>
                                }
                                description={user.email}
                            />
                        </List.Item>
                    )}
                />
            }
        </div>
    );

    const RightView = () => (
        !selectedChat ? null :
        <div style={{padding: "10px", overflow:"auto", height:"100%"}}>
            <Title level={4}>{selectedChat.first_name + ' ' + selectedChat.last_name}</Title>
            <Divider/>
        </div>
    );

    return (
        <div style={{overflow:"auto", height:"100%"}}>
            <Row style={{height: "100%"}}>
                <Col flex={1} style={{background: "#fafafa"}}>
                    <LeftView/>
                </Col>
                <Col flex={7}>
                    <RightView/>
                </Col>
            </Row>
        </div>
    )
}

export default Chat;
