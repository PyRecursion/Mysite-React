import { Comment, Form, Button, List, Input, message, Pagination } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn'
import React, { Component } from 'react'
import { pbReply } from '../../api';
import { connect } from 'react-redux'


const { TextArea } = Input;
const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <div>
    <Form.Item>
      {/* <Input placeholder="Basic usage" value={value} allowClear	='true' rows={2} onChange={onChange} defaultValue="回复" /> */}
      <TextArea rows={2} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <div className='Add-Comment'>
        <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
          提交
      </Button>
      </div>
    </Form.Item>
  </div>
);

class PBreply extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comments: [],
      submitting: false,
      value: '',
      replyUserName: '',
      replyUserid: '',
      current: 1,
      headinfo: ''
    };
  }

  pbToserver = async (from_uid, to_uid, comment_id, reply_type, reply_content, reply_id) => {
    const result = await pbReply(from_uid, to_uid, comment_id, reply_type, reply_content, reply_id)
    if (result.status === 0) {
      this.setState({
        submitting: true,
      });

      setTimeout(() => {
        this.setState({
          submitting: false,
          value: '',
          headinfo: "",
          replyUserName: '',
          replyUserid: '',
          comments: [
            ...this.state.comments,
            {
              // author: [this.state.replyUserName?<div><Link to='#'>{this.props.user}</Link>&nbsp;回复&nbsp;<Link to='#'>{this.state.replyUserName}</Link></div> :<Link to='#'>{this.props.user}</Link>],
              author: this.props.user.nickname + " " + this.state.headinfo,
              avatar: this.props.user.head_link,
              content: <p style={{ textAlign: "left" }}>{this.state.value}</p>,
              datetime: moment().fromNow(),
            },
          ],
        });
      }, 1000);

    } else {
      message("回复失败")
    }
  }


  handleSubmit = () => {
    if (!this.state.value) {
      message.error("请输入内容")
      return;
    }
    if (!this.props.user.id) {
      message.error("请先登录")
      return;
    }


    if (this.state.replyUserName) {
      // console.log("回复用户",this.state.replyUserName,this.state.replyUserid)
      this.pbToserver(this.props.user.id, this.state.replyUserid, this.props.c_id, this.state.value)
    } else {
      // console.log("回复层主",this.state.replyUserName,this.state.replyUserid)
      this.pbToserver(this.props.user.id, this.props.to_uid, this.props.c_id, this.state.value)
    }

  };



  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  UNSAFE_componentWillReceiveProps(props) {   //注意这里用props 当时这个问题搞了我好久
    this.refs.PBreply.className = "showPBreply1"

    console.log(props.replyUserName, props.replyUserid)
    if (props.replyUserName) {
      this.setState({
        headinfo: "回复 " + props.replyUserName + " : ",
        replyUserName: props.replyUserName,
        replyUserid: props.replyUserid,
      })
    }

  }

  clearValue = () => {
    this.refs.PBreply.className = "showPBreply1"
    this.setState({
      headinfo: "",
      replyUserName: '',
      replyUserid: '',
    })
  }
  pageonChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
    //注意此时的this.state.currentpage还未改变,不要用this.state.currentpage
    const currentpage = page
    const pageNum = 10
    this.props.getpage(currentpage, pageNum)

  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <div >
        {comments.length > 0 && <CommentList comments={comments} />}
        <div style={{ textAlign: "center" }}>
          <Pagination
            size="small"
            total={this.props.replyTotal}
            style={{ margin: "10px" }}
            current={this.state.current}
            onChange={this.pageonChange}
            defaultPageSize={10}
            hideOnSinglePage={true}
          />
        </div>

        {this.props.replyTotal === 0 ?
          <div className='showPBreply1' ref="PBreply">
            <Comment
              author={<p>{this.state.headinfo}</p>}
              content={
                <Editor
                  onChange={this.handleChange}
                  onSubmit={this.handleSubmit}
                  submitting={submitting}
                  value={value}
                />
              }
            />
          </div>
          :
          <div>
            <Button onClick={this.clearValue} className="PBreply-Button">回复层主</Button>
            <div className='showPBreply0' ref="PBreply">
              <Comment
                author={<p>{this.state.headinfo}</p>}
                content={
                  <Editor
                    onChange={this.handleChange}
                    onSubmit={this.handleSubmit}
                    submitting={submitting}
                    value={value}
                  />
                }
              />
            </div>
          </div>
        }
      </div>
    );
  }
}



export default connect(
  state => ({ user: state.user }),
)(PBreply)
