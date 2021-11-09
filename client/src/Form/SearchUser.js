import {Form, Input, Modal, Select} from "antd";
import React, {useState} from "react";

const formItemLayout = {
    labelCol: {
        xs: {span: 24},
        sm: {span: 8}
    },
    wrapperCol: {
        xs: {span: 16},
        sm: {span: 16}
    },
};

const SearchUser = ({visible, onSearch, onCancel}) => {
    const [form] = Form.useForm();
    return (
        <Modal
            visible={visible}
            title="Find a user "
            okText="Send Request"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                form.validateFields()
                    .then((values) => {
                        form.resetFields();
                        onSearch(values);
                    })
                    .catch((info) => {
                        console.log('Validation Failed: ' + info);
                    })
            }}>
            <Form
                {...formItemLayout}
                form={form}
                name={"form_in_modal"}
                scrollToFirstError
            >
                <Form.Item
                    label="Add a friend by email"
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Please fill in your email address'
                        },
                        {
                            type: 'email',
                            message: 'The input is not valid E-mail!',
                        },
                    ]}
                >
                    <Input/>
                </Form.Item>
            </Form>
        </Modal>
    );
}

export default SearchUser;
