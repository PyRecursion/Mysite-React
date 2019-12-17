import React, { Component } from 'react'
import { Avatar, message, Button, Collapse } from 'antd';
import "./index.less"
import { reqPostDetail, upComment } from '../../api';
import { Affix } from 'antd';
import LinkButton from '../../components/link-button';
import RichTextEditor from '../home/Posts/publish/rich-text-editor';
import { Pagination } from 'antd';
// import img3 from '../../assets/images/'
import { connect } from 'react-redux'

import Replys from './replys';
import storageUtils from '../../utils/storageUtils';



import { BackTop } from 'antd';

const { Panel } = Collapse;

class PostDetail extends Component {
    constructor(props) {
        super(props)
        // 创建用来保存ref标识的标签对象的容器
        this.editor = React.createRef()
        this.topic_id = this.props.match.params.id
        this.state = {
            theme: '',
            comments: [],
            to_uid: '',
            replyUser: '',
            flag: 0,
            currentpage: 1,
            pageNum: 20
            // showInput:'PBreply'
        }
        // this.showPBreply=0

    }

    componentDidMount() {
        this.getAuthorPost(this.topic_id)
        // this.setState({
        //     comments:this.state.comments.slice((this.state.page-1)*this.state.pageNum, this.state.page*this.state.pageNum),
        // })
    }

    getAuthorPost = async (id) => {
        const result = await reqPostDetail(id)
        if (result.status === 0) {
            console.log(result)
            this.setState({
                theme: result.theme,
                comments: result.comments
            })
        } else {
            message.error('失败的请求')
        }
    }


    commitComment = async () => {
        const user_id = storageUtils.getUser().id
        const topic_id = this.topic_id
        const comment = this.editor.current.geteditorContent()
        const result = await upComment(user_id, topic_id, comment)
        if (result.status === 0) {
            message.success('提交成功')
            this.getAuthorPost(this.topic_id)
        } else {
            message.error('提交失败')
        }
    }



    gotoComment = () => {
        if (!this.props.user){
            message.info("请先登录")
        }
        document.body.scrollTop = document.documentElement.scrollTop = 100000;
    }

    pageonChange = page => {
        console.log(page);
        //注意此时的this.state.currentpage还未改变,不要用this.state.currentpage
        const currentpage = page
        const pageNum = 20
        this.setState({
            currentpage,
            pageNum
        })

    };


    //给子函数设置函数获取数据 点击回复必出输入框
    // getdata = (to_uid, replyUser) => {

    //     this.setState({
    //         to_uid,
    //         replyUser,
    //         flag: this.state.flag + 1,
    //     })
    // }


    render() {
        const theme = this.state.theme
        const arr = this.state.comments.slice((this.state.currentpage - 1) * this.state.pageNum, this.state.currentpage * this.state.pageNum)
        const user = this.props.user
        return (
            <div className="container" >
                {/* 主题 */}
                <content >
                    <Affix offsetTop='0'>
                        <div className="title">{theme.title}</div>
                    </Affix>
                    <div className="content-total">
                        <div className="content-left">
                            <div className='avatar-nickname'>
                                <Avatar src={theme.head_link} size={64} shape="square" icon="user" />
                                <p>{theme.user}</p>
                            </div>
                        </div>
                        <div className="content-right-spc">
                            <div className="content-detail" dangerouslySetInnerHTML={{ __html: theme.content }}>
                            </div>
                            <p className='content-right-foot-spc'>

                                <span style={{ marginRight: '10px' }}>1楼</span>
                                <span>{theme.pub_date}</span>

                                <span><LinkButton onClick={this.gotoComment}>回复</LinkButton></span>
                            </p>
                        </div>
                    </div>



                    {/* 评论 */}

                    {arr.map((comment, index) => {
                        return (
                            <div key={comment.id} className="content-total">
                                <div className="content-left">
                                    <div className='avatar-nickname'>
                                        <Avatar src={comment.user.head_link} shape="square" size={64} icon="user" />
                                        <p>{comment.user.nickname}</p>
                                    </div>
                                </div>
                                <div className="content-right">
                                    <div className="content-detail" dangerouslySetInnerHTML={{ __html: comment.comment }}>
                                    </div>
                                    <div className='content-right-foot'>

                                        <div className="replyButton">
                                            <div className="info">
                                                <span style={{ marginRight: '10px' }}>{index + (this.state.currentpage - 1) * this.state.pageNum + 2}楼</span>
                                                <span>{comment.date}</span>
                                            </div>
                                            <Collapse
                                                bordered={false}
                                                // defaultActiveKey={['1']} 
                                                expandIconPosition="right"
                                                expandIcon="" >

                                                <Panel header={comment.replys.length !== 0 ? `回复(${comment.replys.length})` : '回复'} key="1">
                                                    <Replys
                                                        getdata={this.getdata}
                                                        replys={comment.replys}
                                                        c_id={comment.id}
                                                        to_uid={comment.user.id} />
                                                    <div className={this.state.showInput} ref="showInput">
                                                    </div>
                                                </Panel>
                                            </Collapse>

                                        </div>
                                    </div>


                                </div>
                            </div>
                        )
                    })}

                    {/* 分页和富文本框 */}

                    <div className="page">
                        <Pagination
                            defaultCurrent={1}
                            total={this.state.comments.length}
                            current={this.state.currentpage}
                            onChange={this.pageonChange}
                            defaultPageSize={20} />
                    </div>
                    {user ?
                        <div className="editor-total">
                            <h3>发表评论</h3>

                            <div className="editor">
                                <RichTextEditor ref={this.editor} />
                            </div>
                            <Button onClick={this.commitComment} type="primary" style={{ marginTop: '20px' }}>提交</Button>
                        </div> 
                        :
                        <div className="editor-total" style={{ display: 'none' }}>
                            <h3>发表评论</h3>

                            <div className="editor">
                                <RichTextEditor ref={this.editor} />
                            </div>
                            <Button onClick={this.commitComment} type="primary" style={{ marginTop: '20px' }}>提交</Button>
                        </div>
                    }

                    {/* 回到顶部 */}
                    <div>
                        <BackTop />
                        Scroll down to see the bottom-right
                        <strong style={{ color: 'rgba(64, 64, 64, 0.6)' }}> gray </strong>
                        button.
                    </div>
                </content>
                <div className="side-total">
                    {/* <img src={img3} width={'100%'} alt="66-1ZF2150059612.png"/> */}
                </div>
            </div >
        )
    }
}
export default connect(
    state => ({ user: state.user }),
)(PostDetail)