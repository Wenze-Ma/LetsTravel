import React, {useEffect, useState} from "react";
import {Link, useLocation} from "react-router-dom";
import {Alert, Card, List, Space, message} from "antd";
import {EditOutlined, EllipsisOutlined, SettingOutlined} from "@ant-design/icons";
import Meta from "antd/es/card/Meta";

const apiKey = 'apikey=5ae2e3f221c38a28845f05b6097eb94fe65fbc1c3616fa86e2f7941d';

function SearchResult() {
    const pathName = useLocation().pathname;
    const combined = pathName.split("/")[2];
    const place = combined.split("&")[0].split("=")[1];
    const radius = combined.split("&")[1].split("=")[1];

    const otmAPI = 'https://api.opentripmap.com/0.1/en/places/';

    const [sights, setSights] = useState([]);
    const [currentSelectedSight, setSelectedSight] = useState(null);
    const [isSelected, setIsSelected] = useState(false);


    function setSelected(xid) {
        setSelectedSight(null);
        if (!isSelected) {
            setIsSelected(true);
        }
        fetch(otmAPI + 'xid/' + xid + '?' + apiKey)
            .then(response => response.json())
            .then(body => {
                setSelectedSight(body);
            });
    }

    useEffect(() => {
        fetch(otmAPI + 'geoname?name=' + place + '&' + apiKey)
            .then(response => response.json())
            .then(body => {
                fetch(otmAPI + 'radius?radius=' + radius + '&lon=' + body.lon + '&lat=' + body.lat + '&' + apiKey)
                    .then(response2 => response2.json())
                    .then(body2 => {
                        let temp = [];
                        body2.features.map(x => {
                            if (x.properties.name !== '') {
                                temp.push(x.properties);
                            }
                        });
                        setSights(temp);
                    });
            });
    }, []);

    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    function displayItem() {
        if (!isSelected) {
            return <Alert message="Select a sight on the left to view details"
                          type="info"
                          showIcon/>;
        }
        if (currentSelectedSight == null) {
            const hide = message.loading('Retrieving data', 0);
            // Dismiss manually and asynchronously
            setTimeout(hide, 500);
            return;
        }
        if (!currentSelectedSight.preview) {
            return
        }
        return <Card
            style={{
                width: "80%",
                height: "100%",
                marginLeft: "auto",
                marginRight: "auto"
            }}
            cover={
                <img alt={currentSelectedSight.name} src={currentSelectedSight.preview?.source}/>
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
                                                setSelected(item.xid)
                                            }}
                                        >
                                            {item.name}
                                        </a>
                                    }
                                    description={item.kinds}
                                />

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
                    marginLeft: "50%"
                }}
            >
                {displayItem()}
            </div>
        </div>
    );
}

export default SearchResult;
