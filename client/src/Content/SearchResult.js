import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {Alert, Card, List, message, Image, Button, Empty, Skeleton} from "antd";
import {MoreOutlined, ShareAltOutlined, AimOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import SightService from "../Service/SightService";

function SearchResult({sights, setSights, currentSelectedSight, setSelectedSight}) {
    const pathName = useLocation().pathname;
    const combined = pathName.split("/")[2];
    const place = combined.split("&")[0].split("=")[1];
    const radius = combined.split("&")[1].split("=")[1];

    const history = useHistory();
    const [isSelected, setIsSelected] = useState(false);


    const routeChange = (newPath) => {
        history.push(`/${newPath}`);
    }

    useEffect(() => {
        SightService.fetchSightsByCity(place, radius, setSights);
    }, []);


    function displayItem() {
        if (!isSelected) {
            return <Alert message="Select a sight on the left to view details"
                          type="info"
                          showIcon/>;
        }
        if (currentSelectedSight === null) {
            return <Card
                style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <Skeleton loading={true} active/>
            </Card>;
        }
        if (!currentSelectedSight.preview || !currentSelectedSight.wikipedia_extracts) {
            return <Empty/>;
        }
        return <Card
            style={{
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto"
            }}
            actions={[
                <Button type="text" icon={<ShareAltOutlined/>} onClick={() => {
                    console.log(currentSelectedSight.name)
                }}>Share</Button>,
                <Button type="text" icon={<MoreOutlined/>} onClick={() => {
                    routeChange('sightDetail/xid=' + currentSelectedSight.xid)
                }}>Detail</Button>
            ]}
            cover={
                <Image alt={currentSelectedSight.name} src={currentSelectedSight.preview?.source}/>
            }
        >
            <Meta
                title={currentSelectedSight.name}
                description={currentSelectedSight.wikipedia_extracts?.text}
            />
        </Card>
    }

    return (
        <div
            style={{
                height: "100%"
            }}
        >
            <div
                id="scrollableDiv"
                style={{
                    width: "50%",
                    height: "100%",
                    background: "#ffffff",
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    float: "left"
                }}
            >
                {sights.length === 0 ?
                    <Card
                        style={{
                            width: "80%",
                            marginLeft: "auto",
                            marginRight: "auto"
                        }}
                    >
                        <Skeleton loading={true} active/>
                    </Card> :
                    <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{}}
                        dataSource={sights}
                        renderItem={item => (
                            <List.Item>
                                <List.Item.Meta
                                    title={
                                        <a
                                            onClick={() => {
                                                SightService.setSelectedSight(item.xid, setSelectedSight, isSelected, setIsSelected);
                                            }}
                                        >
                                            {item.name}
                                        </a>
                                    }
                                    description={item.kinds}
                                />
                                <AimOutlined/> {parseInt(item.dist)}m
                            </List.Item>
                        )}
                    />
                }
            </div>
            <div
                style={{
                    width: "50%",
                    height: "100%",
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                    marginLeft: "50%",
                }}
            >
                {displayItem()}
            </div>
        </div>
    );
}

export default SearchResult;
