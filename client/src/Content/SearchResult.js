import React, {useEffect, useState} from "react";
import {Content} from "antd/es/layout/layout";
import {useLocation} from "react-router-dom";
import {Sight} from "../Model/Sight";
import SightCard from "../Model/SightCard";

const apiKey = 'apikey=5ae2e3f221c38a28845f05b6097eb94fe65fbc1c3616fa86e2f7941d';

function SearchResult() {
    const pathName = useLocation().pathname;
    const combined = pathName.split("/")[2];
    const place = combined.split("&")[0].split("=")[1];
    const radius = combined.split("&")[1].split("=")[1];

    const otmAPI = 'https://api.opentripmap.com/0.1/en/places/';

    const [sights, setSights] = useState([]);
    const cards = [];

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
                                        for (let i = 0; i < 5; i++) {
                                            await fetch(otmAPI + 'xid/' + r2.features[i].properties.xid + '?' + apiKey)
                                                .then(async response3 => {
                                                    await response3.json()
                                                        .then(r3 => {
                                                            console.log(r3)
                                                            temp.push(new Sight(r3.xid, r3.name, r3.address, r3.kinds, r3.preview?.source, r3.wikipedia_extracts?.text));
                                                        })
                                                })
                                        }
                                        setSights(temp);
                                    });
                            })
                    });
            });
    }, []);

    if (sights.length > 0) {
        console.log(sights);
        for (const sight of sights) {
            cards.push(
                <li>
                    <SightCard
                        name={sight.name}
                        img={sight.img}
                        description={sight.description}
                    />
                </li>
            );
        }
    }

    return (
        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
        >

            <ul>
                {cards}
            </ul>

        </Content>
    );
}

export default SearchResult;
