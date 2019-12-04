import React, { Component } from 'react'
import {
    Form,
    Input,
    Button,
    message,
} from 'antd'
import RichTextEditor from './rich-text-editor';

import { connect } from 'react-redux'
import { reqUploadTopic } from '../../../../api';


class Publish extends Component {
    constructor (props) {
        super(props)
        // 创建用来保存ref标识的标签对象的容器
        this.editor = React.createRef()
      }


    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
          if (!err) {
            const user_id=this.props.user.id;
            const title=values.title;
            const content=this.editor.current.geteditorContent();//获取富文本
            const result=await reqUploadTopic(user_id,title,content)
            if (result.status===0) {
                message.success('操作成功')
            }else{
                message.error(result.msg)
            }
          }
        });
      };

    render() {
        // 指定Item布局的配置对象
        const formItemLayout = {
            labelCol: { span: 2 },  // 左侧label的宽度
            wrapperCol: { span: 16 }, // 右侧包裹的宽度
        }
        const { getFieldDecorator } = this.props.form;

        return (
            <Form {...formItemLayout}>
                <Form.Item label="主题">
                    {getFieldDecorator('title', {
                        rules: [
                            {
                                required: true,
                                message: '请输入主题',
                            },
                        ],
                    })(<Input />)}
                </Form.Item>

                {/* <Form.Item label="上传图片">
                    <PicturesWall />
                </Form.Item> */}

                <Form.Item label="详细内容" wrapperCol={{span:24}}  >
                    <RichTextEditor ref={this.editor} />
                </Form.Item>
                
                <Form.Item>
                    <Button type='primary' onClick={this.handleSubmit}>提交</Button>
                </Form.Item>
            </Form>
        )
    }
}
export default connect(
    state => ({ user: state.user })
)(Form.create()(Publish)) 