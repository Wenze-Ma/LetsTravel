import React from "react";
import {Content} from "antd/es/layout/layout";
import Search from "../Form/Search";
import {useHistory} from "react-router-dom";

function Find() {
    const history = useHistory();

    const routeChange = (newPath) => {
        history.push(`/${newPath}`);
    }
    const onFinish = (values) => {
        routeChange('searchResults/place=' + values['place'] + '&radius=' + values['radius']);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
            }}
        >
            <Search
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            />
        </Content>
    )
}

export default Find;
