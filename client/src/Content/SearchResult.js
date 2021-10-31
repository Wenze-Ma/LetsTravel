import React, {useEffect} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {Alert, Card, List, message, Image, Button} from "antd";
import {PlusOutlined, MoreOutlined, ShareAltOutlined, AimOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import SightService from "../Service/SightService";

function SearchResult({sights, setSights, currentSelectedSight, setSelectedSight, isSelected, setIsSelected}) {
    const pathName = useLocation().pathname;
    const combined = pathName.split("/")[2];
    const place = combined.split("&")[0].split("=")[1];
    const radius = combined.split("&")[1].split("=")[1];

    const history = useHistory();

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
        if (currentSelectedSight == null) {
            const hide = message.loading('Retrieving data', 0);
            // Dismiss manually and asynchronously
            setTimeout(hide, 300);
            return;
        }
        if (!currentSelectedSight.preview || !currentSelectedSight.wikipedia_extracts) {
            const err = message.error("Cannot find the resource");
            setTimeout(err, 800);
            return
        }
        return <Card
            style={{
                width: "80%",
                marginLeft: "auto",
                marginRight: "auto"
            }}
            actions={[
                <Button type="text" icon={<PlusOutlined/>} onClick={()=>{console.log(currentSelectedSight.name)}}>Add</Button>,
                <Button type="text" icon={<ShareAltOutlined/>} onClick={()=>{console.log(currentSelectedSight.name)}}>Share</Button>,
                <Button type="text" icon={<MoreOutlined/>} onClick={()=>{routeChange('sightDetail')}}>Detail</Button>
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
                {sights.length === 0
                    ? "loading..."
                    : <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{

                        }}
                        dataSource={sights}
                        renderItem={item => (
                            <List.Item
                                actions={[<a key="list-loadmore-edit">Add to Agenda</a>,
                                    <a key="list-loadmore-more">More</a>]}
                            >
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
                                <AimOutlined /> {parseInt(item.dist)}m
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
