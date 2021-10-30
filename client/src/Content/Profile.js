import {Form, Input, Select, Button, message} from 'antd';
import {Content} from "antd/es/layout/layout";
import UserService from "../Service/UserService";
import {useHistory} from "react-router-dom";
import Avatar from "antd/es/avatar/avatar";
import UploadAvatar from "../Form/UploadAvatar";
import React from "react";
import axios from "axios";

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

    const handleOk = file => {
        setConfirmLoading(true);
        if (!file) {
            message.error("Please upload an image");
            setConfirmLoading(false);
            return;
        }
        const thumburl = file.thumbUrl;
        const base64 = thumburl?.split(",")[1];
        if (!base64) {
            message.error("Something goes wrong");
            setConfirmLoading(false);
            return;
        }
        let formData = new FormData();
        formData.append("image", base64);
        axios.post("https://api.imgbb.com/1/upload?key=e0312ea72d31543bc00977353fd93816", formData)
            .then(res => {
                const values = {src: res.data.data.display_url, email: user.email};
                UserService.updateAvatar(values, setUser);
                message.success("Successfully uploaded your avatar");
                setConfirmLoading(false);
                setVisible(false);
            })
            .catch(err => {
                message.error(err);
            });
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
                handleOk={file => handleOk(file)}
                handleCancel={() => handleCancel()}
            />
        </Content>
    )
}

export default Profile;
