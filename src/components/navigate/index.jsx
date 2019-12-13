import React, { Component } from 'react'
import { Menu } from 'antd';
import './index.less'
import { Link,withRouter } from "react-router-dom";

class Navigate extends Component{
  constructor(props) {
    super(props);
    this.state = {
      current: props.location.pathname.match(/[a-z]+/)? props.location.pathname.match(/[a-z]+/)[0] :"",
    };
  }
    
      // static getDerivedStateFromProps(nextProps, prevState){
      //   console.log(222,prevState)

      // }
      handleClick = e => {
        
        this.setState({
          current: e.key,
        });
      };
    render() {
        return (
            <Menu onClick={this.handleClick} 
                // defaultSelectedKeys='home'
                selectedKeys={this.state.current} 
                mode="horizontal"
                >
                <Menu.Item className='menu_item' key='home'  >
                <Link to='/home'>首页</Link>
                </Menu.Item>   
                <Menu.Item className='menu_item' key='music'>
                <Link to='/music/3'>音乐</Link>
                </Menu.Item>
                <Menu.Item className='menu_item' key='story'>
                <Link to='/story'>小说</Link>
                </Menu.Item>
                <Menu.Item className='menu_item' key='photo'>
                <Link to='/photo'>图片</Link>
                </Menu.Item>
                <Menu.Item className='menu_item' key='movie' >
                <Link to='/movie'>电影</Link>
                </Menu.Item>
                <Menu.Item className='menu_item' key='blog'>
                <Link to='/blog'>站长博客</Link>
                </Menu.Item>
            </Menu>
        )
    }
}

export default withRouter(Navigate)