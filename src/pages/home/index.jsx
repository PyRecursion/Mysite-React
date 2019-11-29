import React, { Component } from 'react'
import {Switch,Route,Link} from 'react-router-dom'
import './index.less'
import { Layout } from 'antd';
import Navigate from '../../components/navigate';
import Music from '../music';
import Story from '../story';
import Photo from '../photo';
import Movie from '../movie';
import Publish from '../publish';
import Blog from '../blog';
import Home from './home';



const { Header, Content, Footer } = Layout;



export default class Index extends Component {
  islogin=()=>{
    if (1) {
      return <Link to='/login'>登录</Link>
    }else{
      return '欢迎,admin'
    }
  }
  

  render() {
    return (
      <Layout className="layout" style={{ height: '100%' }}>
        <Header>
          <span className='header-left'>Mysite</span>
          <span className='header-right'>注册</span>
          <span className='header-right'>{this.islogin()}</span>    
        </Header>
        <Navigate />

        <Content style={{ padding: '0',backgroundColor:'white'}}>
            <Switch>
                <Route path="/music" component={Music} />
                <Route path="/story" component={Story} />
                <Route path="/photo" component={Photo} />
                <Route path="/movie" component={Movie} />
                <Route path="/article" component={Publish} />
                <Route path="/blog" component={Blog} />
                <Route path="/" component={Home} />
            </Switch> 
        </Content>

        <Footer style={{ textAlign: 'center' }}>Design ©2018 Created by Recursion</Footer>
      </Layout>
    )
  }
}
