import {Upload, Modal} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import React from "react";

class UploadAvatar extends React.Component {
    state = {
        previewVisible: false,
        previewImage: '',
        previewTitle: '',
        fileList: [],
    };

    handleCancel = () => this.setState({previewVisible: false});

    handlePreview = async file => {
        this.setState({
            previewImage: file.url || file.preview || file.thumbUrl,
            previewVisible: true,
            previewTitle: file.name || file.url.substring(file.url.lastIndexOf('/') + 1),
        });
    };

    handleChange = ({fileList}) => this.setState({fileList});

    render() {
        const {previewVisible, previewImage, fileList, previewTitle} = this.state;
        const uploadButton = (
            <div>
                <PlusOutlined/>
                <div style={{marginTop: 8}}>Upload</div>
            </div>
        );
        return (
            <Modal
                title="Upload Avatar"
                visible={this.props.visible}
                okText="Upload"
                onOk={() => {this.props.handleOk(fileList[0])}}
                confirmLoading={this.props.confirmLoading}
                onCancel={this.props.handleCancel}
            >
                <Upload
                    accept="image/*"
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={this.handlePreview}
                    onChange={this.handleChange}
                    beforeUpload={() => false}
                >
                    {fileList.length >= 1 ? null : uploadButton}
                </Upload>
                <Modal
                    visible={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={this.handleCancel}
                >
                    <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
            </Modal>
        );
    }
}

export default UploadAvatar;
