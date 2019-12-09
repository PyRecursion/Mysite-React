import React, { Component } from 'react'
import { Card } from 'antd';
import Content from './content';
import Publish from './publish/publish';


const tabList = [
  {
    key: 'tab1',
    tab: '全部',
  },
  {
    key: 'tab2',
    tab: '发表',
  },
];




export default class Posts extends Component {
  
  state = {
    key: 'tab1',
    noTitleKey: 'app',
  };

  backtab1=()=>{
    this.setState({
      key:"tab1"
    })
  }

  

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    const contentList = {
      tab1: <Content />,
      tab2: <Publish backtab1={this.backtab1} />,
    };
    return (
      <div>
      <Card
        style={{ width: '100%' }}
        title="帖子"
        extra='More'
        tabList={tabList}
        activeTabKey={this.state.key}
        onTabChange={key => {
          this.onTabChange(key, 'key');
        }}
      >
        {contentList[this.state.key]}
      </Card>
      </div>
    )
  }
}
