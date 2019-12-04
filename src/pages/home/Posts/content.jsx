import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { List, Avatar, Icon,Pagination } from 'antd';
import "./content.less"
import { reqTopic } from '../../../api';



// const listData = [];
// for (let i = 0; i < 100; i++) {
//   listData.push({
//     href: 'http://ant.design',//头像链接
//     title: `ant design part ${i}`, //帖子头
//     avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png', //帖子链接
//     content:
//       'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
//   });
// }

const IconText = ({ type, text }) => (
  <span>
    <Icon type={type} style={{ marginRight: 8 }} />
    {text}
  </span>
);


export default class Content extends Component {
  state={
    listData:[],
    currentpage:1,
    total:0 //总页数
  }
  componentDidMount(){
    this.getTopics(1,10)  
  }
  
  onChange = page => {
    console.log(page);
    this.getTopics(page,10)
    this.setState({
      currentpage: page,
    });
    document.body.scrollTop = document.documentElement.scrollTop = 500; //屏幕滚动
  };

  getTopics = async (page,pageNum) => {
    const result = await reqTopic(page,pageNum)
    if (result.status===0) {
      console.log(result.data)
      this.setState({
        listData:result.data,
        total:result.total
      })
      
    }
  }
  
  //迭代图片
  getImages=(imgList)=>{
    return imgList.map((item,index)=>{
      return <img key={index} alt="logo" src={item} />
    }
      )
  }

  render() {
    const listData=this.state.listData
    return (
      <div>
      <List
        itemLayout="vertical"
        size="large"
        // pagination={{
        //   onChange: page => {
        //     console.log(page);
        //     this.getTopics(page,10)
        //     document.body.scrollTop = document.documentElement.scrollTop = 500; //屏幕滚动
        //   },
        //   pageSize: 20, //最多显示
        // }}
        dataSource={listData}
        footer={
          <div>
          </div>
        }
        renderItem={item => (
          <List.Item
            key={item.id}
            actions={[
              <IconText type="eye" text={item.read_num} key="list-vertical-star-o" />,
              <IconText type="like-o" text="156" key="list-vertical-like-o" />,
              <IconText type="message" text="2" key="list-vertical-message" />,
              <IconText type="user" text={item.user} key="list-vertical-message"  />,
              <span>{item.pub_date}</span>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />} //头像链接
              title={<Link to={'/postdetail/'+item.id}>{item.title}</Link>} //帖子链接
              //description={<a href={item.id}>{item.title}</a>}
            />

              {item.content}
              <div className='image-box'>  
                {this.getImages(item.images)}
              </div>
          </List.Item>
        )}
      />
       <Pagination current={this.state.currentpage} onChange={this.onChange} total={this.state.total}  />
      </div>
    )
  }
}
