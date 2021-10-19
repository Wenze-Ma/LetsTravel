import {Form, Input, Modal} from "antd";
import Checkbox from "antd/es/checkbox/Checkbox";
import React from "react";

const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
    },
};

const LogIn = ({visible, onCreate, onCancel}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Log In"
            okText="Log in"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validation Failed: ' + info);
                    })
            }}
        >
            <Form
                {...formItemLayout}
                form={form}
                name={"form_in_modal"}
                scrollToFirstError
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{required: true, message: 'Please fill in your email address'}]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                <Form.Item name="remember" valuePropName="checked" wrapperCol={{ offset: 8, span: 16 }}>
                    <Checkbox>Remember me</Checkbox>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default LogIn;
