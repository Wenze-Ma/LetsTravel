import React, {useEffect, useState} from "react";
import {Row, Col, List, Button, Empty, Collapse, Avatar, Card} from 'antd';
import {CheckOutlined, CloseOutlined, DeleteOutlined, MessageOutlined} from "@ant-design/icons";
import {Input, Space} from 'antd';
import SearchUser from "../Form/SearchUser";
import UserService from "../Service/UserService";
import Meta from "antd/es/card/Meta";

const {Search} = Input;
const {Panel} = Collapse;


function Friends({user, isLoggedIn}) {
    // const [currentUser, setCurrentUser] = useState(null);
    const [visible, setVisible] = useState(false);
    const [requests, setRequests] = useState([]);
    const [groups, setGroups] = useState([]);
    const [friends, setFriends] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        if (!isLoggedIn) {
            setRequests([]);
            setGroups([]);
            setFriends([]);
            // setCurrentUser(null);
            setSelected(null);
            return;
        }
        if (user) {
            UserService.getRequests(user.email, setRequests);
            UserService.getFriends(user.email, setFriends);
        }
    }, [user, selected]);

    const newFriendsExtra = () => (
        requests.length === 0 ? null :
            <div
                style={{
                    borderRadius: "50%",
                    width: "20px",
                    height: "20px",
                    textAlign: "center",
                    background: "#f23e35",
                    color: "#fff"
                }}
            >
                {requests.length}
            </div>
    )

    const FriendList = () => (
        friends.length === 0 ? null :
            <List
                dataSource={friends}
                renderItem={user => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={user.src}/>}
                            title={
                                <span>
                                    <a onClick={() => setSelected(user)}>{user.first_name} {user.last_name}</a>
                                    {/*<img src="https://img.icons8.com/color/48/000000/male.png"/>*/}
                                </span>
                            }
                            description={user.email}
                        />
                    </List.Item>
                )}
            />
    );

    const GroupList = () => (
        groups.length === 0 ? null :
            <List>

            </List>
    );

    const RequestList = () => (
        requests.length === 0 ? null :
            <List
                dataSource={requests}
                renderItem={user => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={user.src}/>}
                            title={
                                <span>
                                    <a onClick={() => setSelected(user)}>{user.first_name} {user.last_name}</a>
                                    {/*<img src="https://img.icons8.com/color/48/000000/male.png"/>*/}
                                </span>
                            }
                            description={user.email}
                        />
                    </List.Item>
                )}
            />
    );

    const LeftView = () => (
        <div style={{padding: "10px"}}>
            <Search placeholder="Search" key="searchFriend" onSearch={value => console.log(value)} enterButton/>
            <Collapse bordered={false} defaultActiveKey={['3']}>
                <Panel header="New Friends" key="1" extra={newFriendsExtra()}>
                    <RequestList/>
                </Panel>
                <Panel header="Chat" key="2" extra={groups.length === 0 ? null : groups.length}>
                    <GroupList/>
                </Panel>
                <Panel header="Friends" key="3" extra={friends.length === 0 ? null : friends.length}>
                    <FriendList/>
                </Panel>
            </Collapse>
            <Button
                type="primary"
                onClick={() => {
                    setVisible(true);
                }}
                disabled={user == null}
            >
                Add a Friend
            </Button>
        </div>
    );

    const RightView = () => (
        !selected ? null :
            <Card
                style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
                actions={
                    !friends.some(f => f.email === selected.email) ?
                        [
                            <Button type="text" icon={<CheckOutlined/>} onClick={() => {
                                if (user) {
                                    UserService.acceptRequest(user.email, selected.email, setSelected);
                                }
                            }}>Accept</Button>,
                            <Button type="text" icon={<CloseOutlined/>} onClick={() => {
                                if (user) {
                                    UserService.rejectRequest(user?.email, selected.email, setSelected);
                                }
                            }}>Reject</Button>,
                        ] :
                        [
                            <Button type="text" icon={<MessageOutlined />} onClick={() => {
                                if (user) {

                                }
                            }}>Message</Button>,
                            <Button type="text" icon={<DeleteOutlined />} onClick={() => {
                                if (user) {
                                    UserService.deleteFriend(user?.email, selected.email, setSelected);
                                }
                            }}>Delete</Button>,
                        ]
                }
            >
                <Meta
                    avatar={<Avatar src={selected.src}/>}
                    title={selected.first_name + ' ' + selected.last_name}
                    description={selected.email}
                />
            </Card>
    );
    return (
        <>
            <Row style={{height: "100%"}}>
                <Col flex={1} style={{background: "#fafafa"}}>
                    <LeftView/>
                </Col>
                <Col flex={7}>
                    <RightView/>
                </Col>
            </Row>
            <SearchUser
                visible={visible}
                onSearch={(values) => {
                    if (user) {
                        UserService.sendRequest(user.email, values["email"]);
                        setVisible(false);
                    }
                }}
                onCancel={() => setVisible(false)}
            />
        </>
    )
}

export default Friends;
