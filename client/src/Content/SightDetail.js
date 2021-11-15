import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import {Breadcrumb, Card, Descriptions, Divider, Image, message, Rate, Skeleton, Space, Tooltip} from "antd";
import {
    ShareAltOutlined,
    HeartTwoTone,
    ArrowLeftOutlined,
    LikeFilled, LikeOutlined, DislikeFilled, DislikeOutlined
} from "@ant-design/icons";
import {Comment, Avatar, Form, Button, List, Input} from 'antd';
import moment from 'moment';
import React, {createElement, useEffect, useState} from "react";
import Text from "antd/es/typography/Text";
import {useHistory, useLocation} from "react-router-dom";
import SightService from "../Service/SightService";
import UserService from "../Service/UserService";
import Share from "../Form/Share";

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

function SightDetail({sight, user, setSelectedSight, setUser}) {

    const [submitting, setSubmitting] = useState(false);
    const [value, setValue] = useState('');
    const history = useHistory();
    const [stars, setStars] = useState(0);
    const [comments, setComments] = useState([]);
    const [shareVisible, setShareVisible] = useState(false);


    const pathName = useLocation().pathname;

    useEffect(() => {
        if (!sight) {
            // history.goBack();
            SightService.setSelectedSight(pathName.split('=')[1], setSelectedSight)
            // return null;
        } else {
            if (user) {
                SightService.getStars(user.email, sight.xid, setStars);
            }
            SightService.getComments(sight.xid, setComments);
        }
    }, [submitting, sight, user]);


    const handleSubmit = () => {
        if (!value || value.trim().length === 0) {
            message.error("The body cannot by empty");
            return;
        }

        setSubmitting(true);

        const temp = [
            ...sight.comments,
            {
                user: user.email,
                text: value,
                time: new Date(),
            }
        ];
        SightService.updateComment(sight.xid, temp, setSelectedSight, setSubmitting, setValue);
    };

    const handleChange = e => {
        setValue(e.target.value);
    };

    const submitRate = value => {
        SightService.updateRate(sight.xid, value, setSelectedSight, setStars);
    }

    const like = (comment) => {
        if (!user) {
            message.error("You must log in first");
            return;
        }
        SightService.handleLikes(sight.xid, user.email, comment._id, setSelectedSight, true);
    };

    const dislike = (comment) => {
        if (!user) {
            message.error("You must log in first");
            return;
        }
        SightService.handleLikes(sight.xid, user.email, comment._id, setSelectedSight, false);
    };

    const CommentList = ({comments}) => (
        <List
            dataSource={comments}
            header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
            itemLayout="horizontal"
            renderItem={comment => <Comment actions={[
                <Tooltip title="Like">
                  <span onClick={() => like(comment.comment)}>
                    {createElement(comment.comment.likes.some(e => e === user?.email) ? LikeFilled : LikeOutlined)}
                      <span className="comment-action">{comment.comment.likes.length}</span>
                  </span>
                </Tooltip>,
                <Tooltip title="Dislike">
                  <span onClick={() =>  dislike(comment.comment)}>
                    {React.createElement(comment.comment.dislikes.some(e => e === user?.email) ? DislikeFilled : DislikeOutlined)}
                      <span className="comment-action">{comment.comment.dislikes.length}</span>
                  </span>
                </Tooltip>,
            ]}
                                          author={comment.user.first_name}
                                          avatar={comment.user.src}
                                          content={comment.comment.text}
                                          datetime={
                                              <Tooltip title={moment().format('YYYY-MM-DD HH:mm:ss')}>
                                                  <span>{moment(comment.comment.time).fromNow()}</span>
                                              </Tooltip>
                                          }/>}
        />
    );
    let avgRate = 0;
    if (sight) {
        avgRate = Number((sight.rates.reduce((acc, item) => {
            return acc + item.rate
        }, 0) / sight.rates.length).toFixed(1));
    }

    return (!sight ?
            <Card
                style={{
                    width: "80%",
                    marginLeft: "auto",
                    marginRight: "auto"
                }}
            >
                <Skeleton loading={true} active/>
            </Card> :
            <div
                style={{padding: '25px', overflow: 'auto', background: 'white'}}
            >
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <Button type="text" icon={<ArrowLeftOutlined/>} onClick={() => history.goBack()}>Go
                            Back</Button>
                    </Breadcrumb.Item>
                </Breadcrumb>

                <Title level={2}>{sight.name}</Title>
                <Title level={3}>{sight.rates.length === 0 ? "No rates yet" : avgRate + " / 5"}</Title>
                <Space size='large'>
                    {!!user ?
                        <>
                            <HeartTwoTone
                                twoToneColor={user.favorites.some(f => f.xid === sight.xid) ? "#eb2f96" : ""}
                                onClick={() => UserService.addFavorites(user.email, sight, setUser)}
                            />
                            <ShareAltOutlined
                                onClick={() => setShareVisible(true)}
                            />
                            <Rate allowHalf value={stars} onChange={submitRate} allowClear={false}/>
                            <Text
                                style={{textAlign: 'center'}}>{stars === 0 ? "Click to rate" : "Click to change your rate"}</Text>
                        </> :
                        null
                    }
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
                {comments.length > 0 && <CommentList comments={comments}/>}
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
                <Share
                    visible={shareVisible}
                    onSend={values => {
                        if (values.length === 0) {
                            message.error("Invalid input!")
                        } else {
                            UserService.share(user.email, values, sight, setShareVisible);
                        }
                    }}
                    onCancel={() => setShareVisible(false)}
                    user={user}
                />
            </div>
    );
}

export default SightDetail;
