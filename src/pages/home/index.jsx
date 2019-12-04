import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './index.less'
import { Layout,Avatar,Popover } from 'antd';
import Navigate from '../../components/navigate';
import Music from '../music';
import Story from '../story';
import Photo from '../photo';
import Movie from '../movie';
import Blog from '../blog';
import Home from './home';
import PostDetail from '../postDetail';
// import storage from '../../utils/storageUtils.js'
import LinkButton from '../../components/link-button';

import { connect } from 'react-redux'
import {logout} from '../../redux/actions'
import Headphoto from '../../components/headphoto';




const { Header, Content, Footer } = Layout;
const content = (
  <div>
    <Headphoto />
  </div>
);


class Index extends Component {
  //没用redux
  //显示登录名还是登陆
  // islogin = () => {
  //   if (!this.props.user) {
  //     return <Link to='/login'>登录</Link>
  //   } else {
  //     const { nickname } = this.state.user
  //     return ('欢迎,' + nickname)
  //   }
  // }
  //显示注册还是退出
  // isreg = () => {
  //   if (!this.props.user) {
  //     return <Link to='/reg'>注册</Link>
  //   } else {
  //     return <LinkButton onClick={this.clearStore}>退出</LinkButton>
  //   }
  // }
  // clearStore = () => {
  //   storage.removeUser()
    
  // this.setState({
  //   user: ''
  // })
  // }


  
  render() {
    const user = this.props.user
    // console.log('现在的',user)
    return (
      <Layout className="layout" style={{ height: '100%' }}>
        <Header>
          <span className='header-left'>Mysite</span>
          <span className='header-right'>
            {user ? <LinkButton onClick={this.props.logout}>退出</LinkButton>: <Link to='/reg'>注册</Link>}
          </span>
          <span className='header-right'>
            {user ? user.nickname:<Link to='/login'>登录</Link>}
          </span>
          <span className='header-right'>
          {user ? <Popover content={content} title="上传头像" trigger="hover">
            <Avatar src='' size="large" icon="user" ></Avatar></Popover> :''}
            
          </span>
        </Header>
        <Navigate />

        <Content style={{ padding: '0', backgroundColor: 'white' }}>
          <Switch>
            <Route path="/music" component={Music} />
            <Route path="/story" component={Story} />
            <Route path="/photo" component={Photo} />
            <Route path="/movie" component={Movie} />
            <Route path="/blog" component={Blog} />
            <Route path="/postdetail/:id" component={PostDetail} />
            <Route path="/" component={Home} />
          </Switch>
        </Content>

        <Footer style={{ textAlign: 'center' }}>Design ©2018 Created by Recursion</Footer>
      </Layout>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  {logout}
)(Index)