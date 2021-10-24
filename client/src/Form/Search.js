import {Button, Form, Input} from "antd";


const Search = ({ onFinish, onFinishFailed }) => {
    return (
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
                label="Enter a City"
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
    );
}

export default Search;
