import React from "react";
import {Content} from "antd/es/layout/layout";
import {Button} from "antd";
import {useHistory, useLocation} from "react-router-dom";


function Home() {
    const history = useHistory();
    const pathName = useLocation().pathname;

    const routeChange = (newPath) => {
        history.push(`/${newPath}`);
    }

    return (
        <Content
            className="site-layout-background"
            // style={{
            //     minHeight: 280,
            //     width: '100%',
            //     overflow: 'hidden',
            //     background: 'url("http://www.totaltravelsolutions.co.in/img/slide-image-4.jpg") no-repeat 50%/cover',
            //     opacity: '0.85'
            // }}
        >
            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center', marginTop:"50px"}}>
            <Button type="primary" onClick={() =>  routeChange('find')} >Start</Button>
            </div>

        </Content>
    )
}

export default Home;
