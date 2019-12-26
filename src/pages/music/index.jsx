import React, { Component } from 'react'

import { Menu, Layout, Affix } from 'antd';

import SongList from './songList';
import { Switch, Route, Link } from 'react-router-dom'
import SeachTool from './seachTool';
import { connect } from 'react-redux'
import { reqTopList } from '../../redux/actions'


const { Sider, Content } = Layout;
const { SubMenu } = Menu;

class Music extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: this.props.match.params.id,
      openKeys: "sub1",
    };
  }
  // 删除指定音乐
  onDeleteMusic = id => {
    const { musicList } = this.state;
    const newMusicList = [];
    musicList.forEach(item => {
      if (item.id !== id) {
        newMusicList.push(item);
      }
    });
    this.setState({ musicList: newMusicList });
  };
  // 删除全部音乐
  onDeleteAllMusic = () => {
    this.setState({ musicList: [] });
  };

  handleClick = e => {
    console.log('click ', e);
    this.props.reqTopList(e.key)
    this.setState({
      currentPage: e.key
    })
  };

  UNSAFE_componentWillMount() {
    this.openKey(this.state.currentPage)
  }
  //自动打开折叠栏 
  openKey = (key) => {
    // const sub1=[3,0,2,1]
    const sub2 = ['24', '25', '6', '8', '2', '6']
    const sub3 = ['10']
    for (let index = 0; index < sub2.length; index++) {
      const element = sub2[index];
      if (key === element) {
        this.setState({
          openKeys: "sub2"
        })
      }
    }

    for (let index = 0; index < sub3.length; index++) {
      const element = sub3[index];
      if (key === element) {
        this.setState({
          openKeys: "sub3"
        })
      }
    }
  }

  render() {
    const openKeys = this.state.openKeys
    return (

      <div className="music-box" >
        <Layout>
          <Affix>
            <Sider width={256}>
              <Menu
                onSelect={this.onSelect}
                onClick={this.handleClick}
                style={{ minHeight: document.body.clientHeight + 'px' }}
                selectedKeys={[this.state.currentPage]}
                // defaultSelectedKeys={['1']}
                defaultOpenKeys={[openKeys]}
                mode="inline"
                theme="dark"
              >
                <SubMenu
                  key="sub1"
                  title={
                    <span>特色榜</span>
                  }
                >
                  <Menu.Item key="3"><Link to="/music/3">飙升榜</Link></Menu.Item>
                  <Menu.Item key="0"><Link to="/music/0">新歌榜</Link></Menu.Item>
                  <Menu.Item key="2"><Link to="/music/2">原创歌曲榜</Link></Menu.Item>
                  <Menu.Item key="1"><Link to="/music/1">热歌榜</Link></Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  title={
                    <span>全球媒体榜</span>
                  }
                >
                  <Menu.Item key="24"><Link to="/music/24">古典音乐榜</Link></Menu.Item>
                  <Menu.Item key="25"><Link to="/music/25">电音榜</Link></Menu.Item>
                  <Menu.Item key="6"><Link to="/music/6">美国Billboard周榜</Link></Menu.Item>
                  <Menu.Item key="8"><Link to="/music/8">iTunes榜</Link></Menu.Item>
                  <Menu.Item key="26"><Link to="/music/26">抖音排行榜</Link></Menu.Item>

                </SubMenu>
                <SubMenu
                  key="sub3"
                  title={<span>个人歌单</span>}
                >
                  <Menu.Item key="10"><Link to="/music/10">站长歌单</Link></Menu.Item>
                </SubMenu>

              </Menu>
            </Sider>
          </Affix>
          <Content style={{ backgroundColor: "white" }}>
            <div style={{ padding: "10px" }}><h1>歌曲列表<div style={{ float: "right" }}><SeachTool /></div></h1></div>
            <Switch>
              <Route path="/music/:id" component={SongList} />
            </Switch>
          </Content>

        </Layout>



      </div >
    );
  }
}
export default connect(
  state => ({ songList: state.songList }),
  { reqTopList }
)(Music)
