import React, {useEffect, useState} from "react";
import {Avatar, Col, Divider, Form, Input, List, Row, Space} from "antd";
import UserService from "../Service/UserService";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";

const {TextArea} = Input;

const Editor = ({onChange, onSubmit, value}) => (
    <TextArea rows={5} onChange={onChange} value={value} key="textArea"
              placeholder="Enter your message here. Press 'Enter' to send it."
              style={{background: "#f3f3f3"}}
              onPressEnter={onSubmit}
    />
);

function Chat({user, isLoggedIn, setSelectedChat, selectedChat}) {

    const [friends, setFriends] = useState([]);
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            setFriends([]);
            setSelectedChat(null);
            setMessages([]);
            return;
        }
        if (user) {
            UserService.getFriends(user.email, setFriends);
            if (selectedChat) {
                UserService.fetchMessages(user.email, selectedChat.email, setMessages);
            }
        }

    }, [user, selectedChat]);

    const handleChange = e => {
        setValue(e.target.value);
    };

    const handleSubmit = () => {
        if (value === '') {
            return;
        }
        UserService.sendMessage(user.email, selectedChat.email, value, setValue, setSelectedChat);
    }

    const genderImg = (gender) => {
        if (gender === "male") {
            return "https://img.icons8.com/color/48/000000/male.png";
        }
        if (gender === "female") {
            return "https://img.icons8.com/color/48/000000/female.png";
        }
        return null;
    }


    const LeftView = () => (
        <div style={{overflow: "auto", height: "100%"}}>
            <Search placeholder="Search" key="searchFriend2" onSearch={value => console.log(value)} enterButton
                    style={{margin: "10px 0px"}}/>
            {friends.length === 0 ? null :
                <List
                    dataSource={friends}
                    renderItem={user => (
                        <List.Item
                            style={{
                                background: !!selectedChat && selectedChat.email === user.email ? "#e6f7ff" : "#fafafa",
                                padding: "10px"
                            }}
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={user.src}/>}
                                title={
                                    <span>
                                    <a onClick={() => setSelectedChat(user)}>{user.first_name} {user.last_name}</a>
                                    <img src={genderImg(user.gender)} height="20px" style={{margin: "10px"}}/>
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

    const MyMessage = ({message, time}) => (
        <Space>
            <Space style={{
                maxWidth: "60vh",
                position: "relative",
                padding: "8px 10px",
                display: "block",
                wordWrap: "break-word",
                boxShadow: "0 4px 8px rgba(0, 0, 0, .28)",
                borderRadius: "3px",
                clear: "both",
                zIndex: 999,
                background: "#95ec69"
            }}>
                <Text>
                    {message}
                </Text>
            </Space>
            <div>
                <Avatar src={user.src} alt={user.email}/>
            </div>
        </Space>
    )

    const ReceivedMessage = ({message, time}) => (
        <Space>
            <div>
                <Avatar src={selectedChat.src} alt={selectedChat.email}/>
            </div>
            <Space style={{
                maxWidth: "60vh",
                position: "relative",
                padding: "8px 10px",
                display: "block",
                wordWrap: "break-word",
                boxShadow: "0 4px 8px rgba(0, 0, 0, .28)",
                borderRadius: "3px",
                clear: "both",
                background: "#ffffff",
                zIndex: 999
            }}>
                <Text>
                    {message}
                </Text>
            </Space>
        </Space>
    )


    const ChatView = () => (
        !user || !selectedChat ? null :
        <List
            dataSource={messages}
            renderItem={m => (
                m.isSend ?
                    <List.Item style={{float: "right", clear:"both"}}>
                        <MyMessage
                            // sender={user}
                            message={m.message}
                        />
                    </List.Item> :
                    <List.Item style={{float: "left", clear:"both"}}>
                        <ReceivedMessage
                            // sender={selectedChat}
                            message={m.message}
                        />
                    </List.Item>
            )}
        />
    );

    const RightView = () => (
        !selectedChat ? null :
            <div style={{
                height: "100%", position: "relative", margin: "6px 0 0 0", fontSize: "12px",
                lineHeight: "18px", overflowY: "hidden", width: "100%", float: "right"
            }}>
                <Title level={4}
                       style={{margin: "10px"}}>
                    {selectedChat.first_name + ' ' + selectedChat.last_name}
                </Title>
                <Divider/>
                <div style={{height: "68%", maxHeight: "60vh", background: "#f3f3f3", overflow: "auto"}}>
                    <ChatView/>
                </div>
                <div style={{height: "20%", marginTop: "10px"}}>
                    <Editor
                        onChange={handleChange}
                        value={value}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
    );

    return (
        <div style={{height: "100%"}}>
            <Row style={{height: "100%"}}>
                <Col flex={1} style={{background: "#fafafa"}}>
                    <LeftView/>
                </Col>
                <Col flex={7} style={{padding: "10px"}}>
                    <RightView/>
                </Col>
            </Row>
        </div>
    )
}

export default Chat;
