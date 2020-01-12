import React, { Component } from 'react'
import { Upload, Icon, message } from 'antd';
import { connect } from 'react-redux'
import {reqHeadphoto} from '../../redux/actions'
import { UPLOADHEADSERVER } from '../../config/config';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

class Headphoto extends Component {
    constructor (props) {
        super(props)
        // 创建用来保存ref标识的标签对象的容器
        this.state = {
            loading: false,
        };
      }
    
    
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
                
            );
            this.props.reqHeadphoto(this.props.user.id)
            
        }
    };
    
    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        const data={'id':this.props.id}  
        return (
            <Upload
                name="avatar"
                data={data}
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action={UPLOADHEADSERVER}
                beforeUpload={beforeUpload}
                onChange={this.handleChange}
            >
                {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}     
            </Upload>
        );
    }
}

export default connect(
    state => ({ user: state.user }),
    {reqHeadphoto}
)(Headphoto)