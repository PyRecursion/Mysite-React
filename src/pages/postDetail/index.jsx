import React, { Component } from 'react'
import { Layout, Avatar, message, Button } from 'antd';
import "./index.less"
import { reqPostDetail } from '../../api';
import { Affix } from 'antd';
import LinkButton from '../../components/link-button';
import RichTextEditor from '../home/Posts/publish/rich-text-editor';
import { Pagination } from 'antd';
// import PBreply from './pbreply';
import Replys from './replys';





const { Content, Sider } = Layout;


export default class PostDetail extends Component {
    state = {
        data: '',
    }

    componentDidMount() {
        this.getDetail(this.props.match.params.id)

    }

    getDetail = async (id) => {
        const result = await reqPostDetail(id)
        if (result.status === 0) {
            console.log(result.data)
            this.setState({
                data: result.data
            })
        } else {
            message.error('失败的请求')
        }
    }
    gotoComment = () => {
        document.body.scrollTop = document.documentElement.scrollTop = 100000;

    }
    render() {
        const data = this.state.data
        console.log('data:', data)
        return (
            <div className="container" >
                <div className="container-left">
                    <Layout className="container-postDetail">
                        <Sider width={200} style={{ background: '#fbfbfd' }}>
                            <div className='avatar'>
                                <Avatar size={64} icon="user" />
                            </div>
                            <div className='nickname'>
                                <span>{data.user}</span>
                            </div>
                        </Sider>
                        <Content className='container-postDetail-right' >
                            <Affix offsetTop='0'>
                                <div className="title">{data.title}</div>
                            </Affix>
                            <div className="usercontent" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                            <p className='foot'><span style={{ marginRight: '10px' }}>1楼</span><span>{data.pub_date}</span><span><LinkButton onClick={this.gotoComment}>回复</LinkButton></span></p>
                        </Content>
                    </Layout>

                    <Layout className="container-postDetail">
                        <Sider width={200} style={{ background: '#fbfbfd' }}>
                            <div className='avatar'>
                                <Avatar size={64} icon="user" />
                            </div>
                            <div className='nickname'>
                                <span>{data.user}</span>
                            </div>
                        </Sider>
                        <Content className='container-postDetail-right' >
                            <div className="usercontent" dangerouslySetInnerHTML={{ __html: data.content }}></div>
                            <div className='foot'><span style={{ marginRight: '10px' }}>1楼</span><span>{data.pub_date}</span>
                                <span>
                                   <LinkButton>回复(数量)</LinkButton>
                                </span>
                            </div>
                            <Replys />
                            {/* <div style={{'display':"block"}}>
                                <PBreply />
                            </div> */}
                        </Content>
                    </Layout>

                    <Layout className="container-postDetail">
                        <Sider width={200} style={{ background: '#fbfbfd' }}>
                            <div className='avatar'>
                                <Avatar size={64} icon="user" />
                            </div>
                            <div className='nickname'>
                                <span>用户名</span>
                            </div>
                        </Sider>
                        <Content style={{ padding: '0 ', minHeight: 200, background: '#fff' }}>
                        </Content>
                    </Layout>

                    <Layout className="TextEditor">
                        <Sider width={200} style={{ background: '#fbfbfd' }}>
                        </Sider>
                        <Content style={{ padding: '0 ', minHeight: 200, background: '#fff' }}>
                            <div className="pagination">
                                <Pagination defaultCurrent={1} total={50} />
                            </div>
                            <div className="texteditor">
                                <h3>发表评论</h3>
                                <RichTextEditor />
                                <Button type="primary">提交</Button>
                            </div>
                        </Content>
                    </Layout>
                </div>

            </div>
        )
    }
}
