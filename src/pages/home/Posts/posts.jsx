import React, { Component } from 'react'
import { Card } from 'antd';
import Content from './content';

const tabList = [
  {
    key: 'tab1',
    tab: '全部',
  },
  {
    key: 'tab2',
    tab: '热门',
  },
];

const contentList = {
  tab1: <Content></Content>,
  tab2:<div></div>,
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
        title="Card title"
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
