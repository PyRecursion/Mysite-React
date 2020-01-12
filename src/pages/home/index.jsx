import React, { Component } from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import './index.less'
import { Layout, Avatar, Popover } from 'antd';
import Navigate from '../../components/navigate';
import Music from '../music';
import Story from '../story';
import Photo from '../photo';
import Movie from '../movie';
import Blog from '../blog';
import Home from './home';

import LinkButton from '../../components/link-button';

import { connect } from 'react-redux'
import { logout, reqHeadphoto } from '../../redux/actions'
import Headphoto from '../../components/headphoto';
import PostDetail from '../postDetail';
import AudioPlay from '../../components/audioPlay/audioPlay';




const { Header, Content, Footer } = Layout;



class Index extends Component {
  toupdateaudiolist=()=>{
    this.setState({})
  }

  render() {
    const user = this.props.user
    const content = (
      <div>
        <Headphoto id={this.props.user.id}  />
      </div>
    );
    return (
      <Layout className="layout" style={{height:'100%'}}>
        <Header>
          <span className='header-left'>Mysite</span>
          <span className='header-right'>
            {user ? <LinkButton onClick={this.props.logout}>退出</LinkButton> : <Link to='/reg'>注册</Link>}
          </span>
          <span className='header-right'>
            {user ? user.nickname : <Link to='/login'>登录</Link>}
          </span>
          <span className='header-right'>
            {user ? <Popover content={content} title="上传头像" trigger="hover"  >
              <Avatar src={this.props.user.head_link} size="large" icon="user" ></Avatar></Popover> : ''}

          </span>

        </Header>

        <Navigate />
        

        <Content style={{ padding: '0', backgroundColor: 'white' }} >
          <Switch>
            <Route path="/music/:mid" component={Music} />
            <Route path="/story" component={Story} />
            <Route path="/photo/:typeId" component={Photo} />
            <Route path="/movie" component={Movie} />
            <Route path="/blog" component={Blog} />
            <Route path="/postdetail/:id" component={PostDetail} />
            <Route path="/" component={Home} />
          </Switch>
          <div>
          {/* <AudioPlay newMusicList={musicList}/> */}
          <AudioPlay  />
        </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>Design ©2018 Created by Recursion</Footer>
      </Layout>
    )
  }
}
export default connect(
  state => ({ user: state.user }),
  { logout,reqHeadphoto }
)(Index)