import React, {useEffect, useState} from "react";
import {Button, Card, List, Skeleton, Space} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import UserService from "../Service/UserService";


function Favorites({user, setUser, isLoggedIn}) {


    useEffect(() => {
    }, [user]);

    const Loading = () => (
        !isLoggedIn ? <p>You should log in first!</p> :
            <Card
                style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <Skeleton loading={true} active/>
            </Card>
    );


    return (
        <div
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                overflow: "auto",
                height: "100%",
            }}
        >
            {!user ? <Loading /> :
                <List
                    itemLayout="vertical"
                    size="large"
                    pagination={{
                        onChange: page => {
                        },
                        pageSize: 3,
                    }}
                    dataSource={user?.favorites}
                    renderItem={sight => (
                        <List.Item
                            key={sight.xid}
                            actions={[
                                <Button
                                    type="text"
                                    icon={<DeleteOutlined/>}
                                    onClick={() => {
                                        if (user) {
                                            UserService.addFavorites(user.email, sight, setUser)
                                        }
                                    }}
                                >
                                    Remove
                                </Button>,
                            ]}
                            extra={
                                <img
                                    width={272}
                                    alt="image"
                                    src={sight.preview?.source}
                                />
                            }
                        >
                            <List.Item.Meta
                                title={<a href={`sightDetail/xid=${sight.xid}`}>{sight.name}</a>}
                                description={sight.kinds}
                            />
                            {sight.wikipedia_extracts?.text}
                        </List.Item>
                    )}
                />
            }
        </div>
    )
}

export default Favorites;
