import {Form, Input, Select, Button, message} from 'antd';
import {Content} from "antd/es/layout/layout";
import UserService from "../Service/UserService";
import {useHistory} from "react-router-dom";
import Avatar from "antd/es/avatar/avatar";
import UploadAvatar from "../Form/UploadAvatar";
import React from "react";

const {Option} = Select;
const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 6,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 14,
        },
    },
};

function Profile({isLoggedIn, user, setUser}) {
    const history = useHistory();
    const [visible, setVisible] = React.useState(false);
    const [confirmLoading, setConfirmLoading] = React.useState(false);

    if (!isLoggedIn) {
        setUser(null);
        history.push(`/`);
    }
    if (!user) {
        return null;
    }

    const handleOk = () => {
        setConfirmLoading(true);
        setTimeout(() => {
            setVisible(false);
            setConfirmLoading(false);
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        setVisible(false);
    };

    const onFinish = (values) => {
        const inputF = values['first_name'];
        const inputL = values['last_name'];
        const gender = values['gender'];
        if (inputF === user.first_name && inputL === user.last_name && user.gender === gender) {
            setTimeout(message.warn("You haven't changed anything!"), 800);
        } else {
            UserService.update(values, setUser);
            setTimeout(message.success("Update success"), 800);
        }
    };

    return (
        <Content
            className="site-layout-background"
            style={{
                padding: 24,
                margin: 0,
                minHeight: 280,
                overflow: 'auto'
            }}
        >
            <Form
                {...formItemLayout}
                onFinish={onFinish}
                initialValues={{
                    email: user.email,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    gender: user.gender
                }}
            >
                <Form.Item
                    wrapperCol={{
                        offset: 6,
                        span: 14,
                    }}
                >
                    <Avatar
                        size={{
                            xs: 40,
                            sm: 64,
                            md: 80,
                            lg: 100,
                            xl: 120,
                            xxl: 144,
                        }}
                        src={user.src}
                        onClick={() => setVisible(true)}
                    />
                    <p>Click on Avatar to upload</p>
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                >
                    <Input id="email" disabled/>
                </Form.Item>
                <Form.Item
                    label="First Name"
                    name="first_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your first name!',
                        }
                    ]}
                >
                    <Input id="first"/>
                </Form.Item>

                <Form.Item
                    label="Last Name"
                    name="last_name"
                    rules={[
                        {
                            required: true,
                            message: 'Please input your last name!',
                        }
                    ]}
                >
                    <Input id="last"/>
                </Form.Item>

                <Form.Item label="Gender" name="gender" rules={[
                    {
                        required: true,
                        message: 'Please select a gender!',
                    }
                ]}>
                    <Select allowClear>
                        <Option value="male">Male</Option>
                        <Option value="female">Female</Option>
                        <Option value="other">Other</Option>
                    </Select>
                </Form.Item>
                <Form.Item
                    wrapperCol={{
                        offset: 18,
                        span: 14,
                    }}
                >
                    <Button type="primary" htmlType="submit">
                        Save
                    </Button>
                </Form.Item>
            </Form>
            <UploadAvatar
                visible={visible}
                // setVisible={setVisible}
                confirmLoading={confirmLoading}
                // setConfirmLoading={setConfirmLoading}
                handleOk={() => handleOk()}
                handleCancel={() => handleCancel()}
            />
        </Content>
    )
}

export default Profile;
