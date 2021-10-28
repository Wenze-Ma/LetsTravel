import React from "react";
import {Content} from "antd/es/layout/layout";


function Home() {

    return (
        <Content
            className="site-layout-background"
            style={{
                minHeight: 280,
                width: '100%',
                overflow: 'hidden',
                background: 'url("http://www.totaltravelsolutions.co.in/img/slide-image-4.jpg") no-repeat 50%/cover',
                opacity: '0.85'
            }}
        >

        </Content>
    )
}

export default Home;
