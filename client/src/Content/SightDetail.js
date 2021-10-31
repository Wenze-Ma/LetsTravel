import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import {Breadcrumb, Descriptions, Divider, Image, Rate, Space, Tooltip} from "antd";
import {
    ShareAltOutlined,
    HeartTwoTone,
    ArrowLeftOutlined,
    LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined
} from "@ant-design/icons";
import {Comment, Avatar, Form, Button, List, Input} from 'antd';
import moment from 'moment';
import React, {createElement, useState} from "react";
import Text from "antd/es/typography/Text";
import {useHistory} from "react-router-dom";
import SightService from "../Service/SightService";

const {TextArea} = Input;


const Editor = ({onChange, onSubmit, submitting, value}) => (
    <>
        <Form.Item>
            <TextArea rows={4} onChange={onChange} value={value}/>
        </Form.Item>
        <Form.Item>
            <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
                Add Comment
            </Button>
        </Form.Item>
    </>
);

function SightDetail({sight, user, setSelectedSight}) {

    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const history = useHistory();
    const [likes, setLikes] = useState(0);
    const [dislikes, setDislikes] = useState(0);
    const [action, setAction] = useState(null);

    if (!sight) {
        history.goBack();
        return null;
    }

    const handleSubmit = () => {
        if (!value) {
            return;
        }

        setSubmitting(true);

        const comments = [
            ...sight.comments,
            {
                user: user.first_name,
                text: value,
                time: new Date(),
                likes: 0,
                dislikes: 0,
                avatar: user.src,
            }
        ];
        SightService.update(sight.xid, sight.rate, comments, setSelectedSight, setSubmitting, setValue);
    };

    const handleChange = e => {
        setValue(e.target.value);
    };

    const submitRate = value => {
        SightService.update(sight.xid, value, sight.comments, setSelectedSight);
    }

    const like = () => {
        setLikes(1);
        setDislikes(0);
        setAction('liked');
    };

    const dislike = () => {
        setLikes(0);
        setDislikes(1);
        setAction('disliked');
    };

    const actions = [
        <Tooltip key="comment-basic-like" title="Like">
          <span onClick={like}>
            {createElement(action === 'liked' ? LikeFilled : LikeOutlined)}
              <span className="comment-action">{likes}</span>
          </span>
        </Tooltip>,
        <Tooltip key="comment-basic-dislike" title="Dislike">
          <span onClick={dislike}>
            {React.createElement(action === 'disliked' ? DislikeFilled : DislikeOutlined)}
              <span className="comment-action">{dislikes}</span>
          </span>
        </Tooltip>,
        <span key="comment-basic-reply-to">Reply to</span>,
    ];

    const CommentList = ({comments}) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={props => <Comment actions={actions}
                                          author={props.user}
                                          avatar={props.avatar}
                                          content={props.text}
                                          datetime={
                                              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                  <span>{moment(props.time).fromNow()}</span>
                                              </Tooltip>
                                          }/>}
        />
    );

    return (
        <div
            style={{padding: '25px', overflow: 'auto', background: 'white'}}
        >
            <Breadcrumb>
                <Breadcrumb.Item>
                    <Button type="text" icon={<ArrowLeftOutlined/>} onClick={() => history.goBack()}>Go Back</Button>,
                </Breadcrumb.Item>
            </Breadcrumb>

            <Title level={2}>{sight.name}</Title>
            <Title level={3}>{sight.rate === 0 ? "No rates yet" : sight.rate + " / 5"}</Title>
            <Space size='large'>
                <HeartTwoTone twoToneColor="#eb2f96"/>
                <ShareAltOutlined/>
                <Rate allowHalf defaultValue={0} onChange={submitRate}/>
                <Text style={{textAlign: 'center'}}>Click to rate</Text>
            </Space>
            <Divider/>
            <Title level={4}>Address</Title>
            <Descriptions>
                <Descriptions.Item label="City">{sight.address?.city}</Descriptions.Item>
                <Descriptions.Item label="Road">{sight.address?.road}</Descriptions.Item>
                <Descriptions.Item label="State">{sight.address?.state}</Descriptions.Item>
                <Descriptions.Item label="County">{sight.address?.county}</Descriptions.Item>
                <Descriptions.Item label="Country">{sight.address?.country}</Descriptions.Item>
                <Descriptions.Item label="Postcode">{sight.address?.postcode}</Descriptions.Item>
            </Descriptions>
            <Divider/>
            <Title level={4}>Description</Title>
            <Paragraph>{sight.wikipedia_extracts?.text}</Paragraph>
            <Divider/>
            <Title level={4}>Picture</Title>
            <Image alt={sight.name} src={sight.preview?.source}/>
            <Divider/>
            <Title level={4}>Comments</Title>
            {sight.comments.length > 0 && <CommentList comments={sight.comments}/>}
            {!user ? <Text>Please log in first to post your comments</Text> :
                <Comment
                    avatar={<Avatar src={user.src} alt={user.first_name}/>}
                    content={
                        <Editor
                            onChange={handleChange}
                            onSubmit={handleSubmit}
                            submitting={submitting}
                            value={value}
                        />
                    }
                />
            }
        </div>
    );
}

export default SightDetail;
