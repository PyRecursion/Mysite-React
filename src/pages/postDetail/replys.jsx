import React, { Component } from 'react'
import { Comment, Tooltip, Avatar } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn'
import PBreply from './pbreply';

import "./index.less"
import {Link} from 'react-router-dom'


export default class Replys extends Component {
    constructor(props) {
        super(props)
        // 创建用来保存ref标识的标签对象的容器
        this.state = {
            action: null,
            replys:this.props.replys.slice(0,10),
            replyUserid:"",
            replyUserName:"",
            flushprops:0,
        };
        //刷新属性重新渲染回复用户
    }
    
    handlereply=(e)=>{
        const replyUserid=e.target.id;
        const replyUserName=e.target.className
        this.setState({
            replyUserid,
            replyUserName,
            flushprops:this.state.flushprops+1
        })
    }

    getpage=(page,pageNum)=>{
        console.log((page-1)*pageNum, page*pageNum)
        this.setState({
        replys:this.props.replys.slice((page-1)*pageNum, page*pageNum)
        })
    }
    

    render() {
        const replys = this.state.replys
        return (
            <div >
                {replys.map((reply, index) => {
                    return (
                        <Comment
                            key={index}
                            actions={[<span onClick={this.handlereply} id={reply.author_id} className={reply.author} style={{marginRight:'50px'}} >回复</span>]}
                            author={reply.to_id===this.props.to_uid ?<div><Link to='#'>{reply.author}</Link></div>:<div><Link to='#'>{reply.author}</Link>&nbsp;回复&nbsp;<Link to='#'>{reply.to_nickname}</Link></div>}
                            avatar={
                                <Avatar
                                    src={reply.authorHead}
                                    alt={reply.author}
                                />
                            }
                            content={
                                <p style={{ textAlign: "left" }}>
                                   {reply.reply_content}
                                </p>
                            }
                            datetime={
                                <Tooltip title={moment(reply.datatime).format("L")}>
                                    <span>{moment(reply.datatime).fromNow()}</span>
                                </Tooltip>
                                
                            }
                        />
                    )
                }
                )}
            <PBreply
                flushprops={this.state.flushprops}
                replyUserid={this.state.replyUserid}
                replyUserName={this.state.replyUserName}
                c_id={this.props.c_id}
                to_uid={this.props.to_uid}
                replyTotal={this.props.replys.length}
                getpage={this.getpage}
            />
          </div>
            
        )
    }
}
