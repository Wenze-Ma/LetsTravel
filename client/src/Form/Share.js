import Modal from "antd/es/modal/Modal";
import {Select} from "antd";
import Avatar from "antd/es/avatar/avatar";
import {useEffect, useState} from "react";
import UserService from "../Service/UserService";

const {Option} = Select;


const Share = ({visible, onSend, onCancel, user}) => {

    const [value, setValue] = useState([]);
    const [friends, setFriends] = useState([]);

    useEffect(() => {
        if (user) {
            UserService.getFriends(user.email, setFriends);
        }
    }, [user]);

    const items = [];
    let i = 0;
    friends.map(friend => items.push(
        <Option value={friend.email} label={friend.first_name + ' ' + friend.last_name} key={i++}>
            <div>
                <span style={{marginRight: "10px"}}>
                    <Avatar src={friend.src}/>
                </span>
                {friend.first_name + ' ' + friend.last_name + ' (' + friend.email + ')'}
            </div>
        </Option>
    ))

    return (
        <Modal
            visible={visible}
            title="Share this place to your friends"
            okText="Share"
            cancelText="Cancel"
            onCancel={onCancel}
            onOk={() => {
                onSend(value);
            }}
        >
            <Select
                mode="multiple"
                style={{width: '100%'}}
                placeholder="select friends to share"
                onChange={(value) => setValue(value)}
                optionLabelProp="label"
            >
                {items}
            </Select>
        </Modal>
    )
}

export default Share;
