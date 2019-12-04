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

const contentList = {
  tab1: <Content />,
  tab2: <Publish />,
};


export default class Posts extends Component {

  state = {
    key: 'tab1',
    noTitleKey: 'app',
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
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
