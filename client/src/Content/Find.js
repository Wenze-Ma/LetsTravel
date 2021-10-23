import React from "react";
import {Content} from "antd/es/layout/layout";
import {Form, Input, Button} from 'antd';

const apiKey = '&apikey=5ae2e3f221c38a28845f05b6097eb94fe65fbc1c3616fa86e2f7941d';

function Find() {
    const onFinish = (values) => {
        const otmAPI = 'https://api.opentripmap.com/0.1/en/places/';
        fetch(otmAPI + 'geoname?name=' + values['place'] + apiKey)
            .then(response => {
                response.json()
                    .then(r => {
                        console.log(r)
                        fetch(otmAPI + 'radius?radius=' + values['radius'] + '&lon=' + r.lon + '&lat=' + r.lat + apiKey)
                            .then(response2 => {
                                response2.json()
                                    .then(r2 => r2.features.map(x => console.log(x.properties.name)));
                            })
                    });
            });
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
            <Form
                name="basic"
                labelCol={{
                    span: 8,
                }}
                wrapperCol={{
                    span: 10,
                }}
                initialValues={{
                    place: "Terre Haute",
                    radius: 10000
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                    label="Enter a Place"
                    name="place"
                    rules={[
                        {
                            required: true,
                            message: 'Please enter a place!',
                        },
                    ]}

                >
                    <Input placeholder="Terre Haute"/>
                </Form.Item>

                <Form.Item
                    label="Radius"
                    name="radius"
                    help="Maximum distance from selected place in meters"
                    rules={[
                        {
                            required: true,
                        }
                    ]}
                >
                    <Input
                        type="number"
                    />
                </Form.Item>

                <Form.Item
                    wrapperCol={{
                        offset: 8,
                        span: 16,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
        </Content>
    )
}

export default Find;
