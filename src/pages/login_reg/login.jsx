import React, { Component } from 'react'
import { Form, Icon, Input, Button, message } from 'antd';
import { Link, Redirect } from 'react-router-dom'
// import { reqLog } from '../../api';
// import storage from '../../utils/storageUtils.js'

import {login} from '../../redux/actions'
import {connect} from 'react-redux'

class Login extends Component {
  //不使用redux
  // state = {
  //   user: ''
  // }
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const { loginname, password } = values;
        // const result = await reqLog(loginname, password)
        // console.log(result)
        // if (result.status === 0) {
        //   storage.saveUser(result.data)
        //   this.setState({
        //     user: result.data.id
        //   })
        
        // }else{
        //   message.error(result.msg)
        // }
        this.props.login(loginname, password)
      }else{
        message.error('请输入正确用户名密码!')
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    // const user = storage.getUser()
    // if (user) {
    //   return <Redirect to="/"></Redirect>
    // }
    const user = this.props.user
    if(user && user.id) {
      return <Redirect to='/home'/>
    }

    return (
      <div className='login'>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <Form.Item>
            {getFieldDecorator('loginname', {
              rules: [
                { required: true, message: 'Please input your username!' },
                { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须由字母数字下划线组成' }
              ],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="loginname"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [
                { min: 4, message: '用户名需要大于4位' },
                { required: true, message: 'Please input your Password!' },
              ],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
              />,
            )}
          </Form.Item>
          <Form.Item>

            <Button type="primary" htmlType="submit" className="login-form-button">
              登陆
            </Button>

            <Button className="login-form-button"><Link to='reg'>注册</Link ></Button>
            <Link to='/resetpwd' className="login-form-forgot" >
              Forgot password
          </Link>
          </Form.Item>
        </Form>
      </div>
    )
  }
}
const WrapLogin = Form.create({ name: 'normal_login' })(Login);
export default connect(
  state => ({user: state.user}),
  {login}
)(WrapLogin)