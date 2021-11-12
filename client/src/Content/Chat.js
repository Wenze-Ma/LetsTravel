import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {Avatar, Button, Col, Collapse, Comment, Divider, Form, List, Row, Space, Tooltip} from "antd";
import SearchUser from "../Form/SearchUser";
import UserService from "../Service/UserService";
import Search from "antd/es/input/Search";
import Title from "antd/es/typography/Title";
import TextArea from "antd/es/input/TextArea";
import moment from "moment";
import Text from "antd/es/typography/Text";

function ScrollView(props) {
    return null;
}

function Chat({user, isLoggedIn, setSelectedChat, selectedChat}) {

    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (!isLoggedIn) {
            setFriends([]);
            setSelectedChat(null);
            return;
        }
        if (user) {
            UserService.getFriends(user.email, setFriends);
        }
    }, [user]);

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

    const MyMessage = (sender, message, time) => (
        <Space>
            <Comment
                content={
                    <Text style={{overflowWrap:"break-word"}}>
                        We supply a series of design principles, practical patterns and high quality design
                        resources (Sketch and Axure), to help people create their product prototypes beautifully
                        and efficiently.
                    </Text>
                }
                // datetime={
                //     <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                //         <span>{moment().fromNow()}</span>
                //     </Tooltip>
                // }
                style={{background:"#123456"}}
            />
            <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
        </Space>
    )

    const Editor = ({onChange, onSubmit, submitting, value}) => (
        <div>
            <Form>
                <Form.Item>
                    <TextArea rows={5} onChange={onChange} value={value} placeholder="Enter your message here. Press 'Enter' to send it."/>
                </Form.Item>
                {/*<Form.Item*/}
                {/*    wrapperCol={{*/}
                {/*        offset: 22,*/}
                {/*        span: 14,*/}
                {/*    }}*/}
                {/*    style={{ marginTop: "0px" }}*/}
                {/*>*/}
                {/*    <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">*/}
                {/*        Send*/}
                {/*    </Button>*/}
                {/*</Form.Item>*/}
            </Form>
        </div>
    );

    const ChatView = () => (
        <List>
            <List.Item style={{maxWidth: "60vh"}}>
                <MyMessage/>
            </List.Item>
        </List>
    );

    const RightView = () => (
        !selectedChat ? null :
            <div style={{height: "100%", position: "relative"}}>
                <Title level={4}
                       style={{margin: "10px"}}>{selectedChat.first_name + ' ' + selectedChat.last_name}</Title>
                <Divider/>
                <div style={{height:"68%", maxHeight: "60vh", background: "#dddddd", overflow: "auto"}}>
                    <ChatView />
                </div>
                <div style={{height: "20%", marginTop: "10px"}}>
                    <Editor />
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
