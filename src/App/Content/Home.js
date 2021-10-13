import React from "react";
import {Content} from "antd/es/layout/layout";


function Home() {
    return (
        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
        >
            Hello World!
        </Content>
    )
}

export default Home;
