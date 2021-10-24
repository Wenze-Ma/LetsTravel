import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {useLocation} from "react-router-dom";
import {Sight} from "../Model/Sight";
import {List, Space} from "antd";
import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";

const apiKey = 'apikey=5ae2e3f221c38a28845f05b6097eb94fe65fbc1c3616fa86e2f7941d';

function SearchResult() {
    const pathName = useLocation().pathname;
    const combined = pathName.split("/")[2];
    const place = combined.split("&")[0].split("=")[1];
    const radius = combined.split("&")[1].split("=")[1];

    const otmAPI = 'https://api.opentripmap.com/0.1/en/places/';

    const [sights, setSights] = useState([]);

    useEffect(() => {
        fetch(otmAPI + 'geoname?name=' + place + '&' + apiKey)
            .then(response => {
                response.json()
                    .then(r => {
                        fetch(otmAPI + 'radius?radius=' + radius + '&lon=' + r.lon + '&lat=' + r.lat + '&' + apiKey)
                            .then(response2 => {
                                response2.json()
                                    .then(async r2 => {
                                        let temp = [];
                                        for (let i = 0; i < 20; i++) {
                                            await fetch(otmAPI + 'xid/' + r2.features[i].properties.xid + '?' + apiKey)
                                                .then(async response3 => {
                                                    await response3.json()
                                                        .then(r3 => {
                                                            console.log(r3)
                                                            if (r3.preview) {
                                                                temp.push(new Sight(r3.xid, r3.name, r3.address, r3.kinds, r3.preview?.source, r3.wikipedia_extracts?.text));
                                                            }
                                                        })
                                                })
                                        }
                                        setSights(temp);
                                    });
                            })
                    });
            });
    }, []);

    const IconText = ({icon, text}) => (
        <Space>
            {React.createElement(icon)}
            {text}
        </Space>
    );

    return (
        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
        >
            <div
                id="scrollableDiv"
                style={{
                    height: "100%",
                    overflow: 'auto',
                    padding: '0 16px',
                    border: '1px solid rgba(140, 140, 140, 0.35)',
                }}
            >
                {sights.length === 0
                    ? "loading..."
                    : <List
                        itemLayout="vertical"
                        size="large"
                        pagination={{
                            onChange: page => {
                                console.log(page);
                            },
                            pageSize: 2,
                        }}
                        dataSource={sights}
                        renderItem={item => (
                            <List.Item
                                key={item.title}
                                actions={[
                                    // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                                    // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                                    // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                                ]}
                                extra={
                                    <img
                                        width={272}
                                        alt="img"
                                        src={item.img}
                                    />
                                }
                            >
                                <List.Item.Meta
                                    title={<a href={item.href}>{item.name}</a>}
                                    description={item.kinds}
                                />
                                {item.description}
                            </List.Item>
                        )}
                    />
                }
            </div>
        </Content>
    );
}

export default SearchResult;
//
// import React, {useEffect, useState} from "react";
// import {Content} from "antd/es/layout/layout";
// import {useLocation} from "react-router-dom";
// import {Sight} from "../Model/Sight";
// import {Divider, List, Skeleton, Space} from "antd";
// import {LikeOutlined, MessageOutlined, StarOutlined} from "@ant-design/icons";
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Avatar from "antd/es/avatar/avatar";
//
// const apiKey = 'apikey=5ae2e3f221c38a28845f05b6097eb94fe65fbc1c3616fa86e2f7941d';
//
// function SearchResult() {
//     const pathName = useLocation().pathname;
//     const combined = pathName.split("/")[2];
//     const place = combined.split("&")[0].split("=")[1];
//     const radius = combined.split("&")[1].split("=")[1];
//
//     const otmAPI = 'https://api.opentripmap.com/0.1/en/places/';
//
//     const [xids, setXids] = useState([]);
//     const [sights, setSights] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [index, setIndex] = useState(0);
//
//     const loadMoreData = () => {
//         if (loading) {
//             return;
//         }
//         setLoading(true);
//
//         fetch(otmAPI + 'geoname?name=' + place + '&' + apiKey)
//             .then(response => response.json())
//             .then(body => {
//                 fetch(otmAPI + 'radius?radius=' + radius + '&lon=' + body.lon + '&lat=' + body.lat + '&' + apiKey)
//                     .then(response2 => response2.json())
//                     .then(body2 => {
//                         for (let i = 0; i < 8; i++) {
//                             fetch(otmAPI + 'xid/' + body2.features[i].properties.xid + '?' + apiKey)
//                                 .then(response3 => response3.json())
//                                 .then(body3 => {
//                                     if (body3.preview) {
//                                         sights.push(new Sight(body3.xid, body3.name, body3.address, body3.kinds, body3.preview?.source, body3.wikipedia_extracts?.text));
//                                         setSights(sights);
//                                         setLoading(false);
//                                     }
//                                 })
//                                 .catch(() => {
//                                     setLoading(false);
//                                 });
//                         }
//                     })
//             });
//     }
//
//     useEffect(() => {
//         loadMoreData();
//     }, []);
//
//
//     console.log(sights);
//
//     const IconText = ({icon, text}) => (
//         <Space>
//             {React.createElement(icon)}
//             {text}
//         </Space>
//     );
//
//     return (
//         <Content
//             className="site-layout-background"
//             style={{
//                 padding: 24,
//                 margin: 0,
//                 minHeight: 280,
//             }}
//         >
//             <div
//                 id="scrollableDiv"
//                 style={{
//                     height: "100%",
//                     overflow: 'auto',
//                     padding: '0 16px',
//                     border: '1px solid rgba(140, 140, 140, 0.35)',
//                 }}
//             >
//                 {sights.length === 0
//                     ? "loading..."
//                     : <InfiniteScroll
//                         dataLength={sights.length}
//                         next={loadMoreData}
//                         hasMore={setSights.length < 50}
//                         loader={<Skeleton avatar paragraph={{rows: 1}} active/>}
//                         endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
//                         scrollableTarget="scrollableDiv"
//                     >
//                         <List
//                             itemLayout="vertical"
//                             size="large"
//                             dataSource={sights}
//                             renderItem={item => (
//                                 <List.Item
//                                     key={item.title}
//                                     actions={[
//                                         // <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
//                                         // <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
//                                         // <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
//                                     ]}
//                                     extra={
//                                         <img
//                                             width={272}
//                                             alt="img"
//                                             src={item.img}
//                                         />
//                                     }
//                                 >
//                                     <List.Item.Meta
//                                         title={<a href={item.href}>{item.name}</a>}
//                                         description={item.kinds}
//                                     />
//                                     {item.description}
//                                 </List.Item>
//                             )}
//                         />
//                     </InfiniteScroll>
//                 }
//             </div>
//
//         </Content>
//     );
// }
//
// export default SearchResult;
