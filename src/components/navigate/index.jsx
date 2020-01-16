import React, { Component } from 'react'
import { Menu } from 'antd';
import './index.less'
import { Link, withRouter } from "react-router-dom";
import { reqImagesTypes } from '../../api';


const { SubMenu } = Menu;

class Navigate extends Component {
  constructor(props) {
    super(props);
    console.log(11,props.location.pathname.match(/[a-z|A-Z]+/))
    this.state = {
      current: props.location.pathname.match(/[a-z|A-Z]+/) ? props.location.pathname.match(/[a-z|A-Z]+/)[0] : "",
      ImageList:[]
    };
  }

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };
  componentDidMount(){
    this.getImagesTypes()
  }
  getImagesTypes=async()=>{
    const result=await reqImagesTypes()
    if (result.status===0){
      this.setState({
        ImageList:result.data
      })
    }
  }

  render() {
    const {ImageList}=this.state
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
          <SubMenu className='menu_item'
            title={
              <span className="submenu-title-wrapper">
                图片
              </span>
            }
          >
            {ImageList.map((item)=>{
            return <Menu.Item key={item.id}><Link to={'/photo/'+item.id}>{item.type}</Link></Menu.Item>
            })}
          </SubMenu>
        <Menu.Item className='menu_item' key='movie' >
          <Link to='/movie'>电影</Link>
        </Menu.Item>
        <Menu.Item className='menu_item' key='userInfo'>
          <Link to='/userInfo'>个人主页</Link>
        </Menu.Item>
      </Menu>
    )
  }
}

export default withRouter(Navigate)