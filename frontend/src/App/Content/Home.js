import React from "react";
import {Content} from "antd/es/layout/layout";


function Home() {
    // event.preventDefault();

    // const response = await fetch('/', {
    //     method: 'GET'
    // })
    //
    // if (!response.ok) {
    //     const errorMessage = await response.text();
    //     throw new Error(errorMessage);
    // }
    //
    // console.log( response.json() );


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
