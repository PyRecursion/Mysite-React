import React, { Component } from 'react'
import { Form, Input, Button,message } from 'antd';
import {Link,Redirect} from 'react-router-dom'
import { reqRes} from '../../api';
import storage from '../../utils/storageUtils.js'

import { connect } from 'react-redux'
import {regUser} from '../../redux/actions'

class Reg extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        user:""
    };

    handleSubmit = e => {
        e.preventDefault();//阻止系统默认行为
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                console.log(values)
                const {loginname,email,password,nickname}=values
                const result=await reqRes(loginname,email,password,nickname)
                console.log(result)
                if (result.status===0) {
                    message.success("注册成功")
                    console.log(result.data)
                    storage.saveUser(result.data)
                    this.props.regUser()
                    this.setState({
                        user:result.data.nickname
                    })
                }else{
                    message.error(result.msg)
                }
            }
        });
    };
    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入密码不一致');
        } else {
            callback();
        }
    };
    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };


    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8},
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        if (this.state.user) {
           return <Redirect to='/' />
        }

        return (   
            <div className='login'>
                <Form {...formItemLayout} onSubmit={this.handleSubmit} style={{'width':'400px'}} >
                    <Form.Item label="用户名" >
                        {getFieldDecorator('loginname', {
                            rules: [
                                { required: true, message: '请输入你的用户名' },
                                { min:6, message: '用户名需要大于6位' },
                                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由字母数字下划线组成' }
                            ],
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="邮箱地址">
                        {getFieldDecorator('email', {
                            rules: [
                                {
                                    type: 'email',
                                    message: 'The input is not valid E-mail!',
                                },
                                {
                                    required: true,
                                    message: 'Please input your E-mail!',
                                },
                            ],
                        })(<Input />)}
                    </Form.Item>
                    <Form.Item label="登陆密码" hasFeedback>
                        {getFieldDecorator('password', {
                            rules: [
                                {
                                    required: true,
                                    message: '请输入密码!',
                                },
                                { min:6, message: '密码需要大于6位' },
                                {
                                    validator: this.validateToNextPassword,
                                },
                            ],
                        })(<Input.Password />)}
                    </Form.Item>
                    <Form.Item label="确认密码" hasFeedback>
                        {getFieldDecorator('confirm', {
                            rules: [
                                {
                                    required: true,
                                    message: '不能为空!',
                                },
                                {
                                    validator: this.compareToFirstPassword,
                                },
                            ],
                        })(<Input.Password onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    <Form.Item label='昵称'>
                        {getFieldDecorator('nickname', {
                            rules: [{ required: true, message: '昵称不能为空', whitespace: true }],
                        })(<Input />)}
                    </Form.Item>


                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            注册账号
                        </Button>
                        <Link to='login' style={{'marginLeft':'30px'}}> 返回登录</Link >
                    </Form.Item>
                </Form>
            </div>
        )
    }
}

export default connect(
    state => ({ user: state.user }),
  {regUser}
)(Form.create({ name: 'register' })(Reg))
