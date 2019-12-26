import React, { Component } from 'react'
import LinkButton from '../../components/link-button'
import { Switch,Route, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logout, reqHeadphoto } from '../../redux/actions'
import Headphoto from '../../components/headphoto'
import { Avatar, Popover } from 'antd';

import Content from './content'
import Dirs from './dirs'

class StoryDetail extends Component {
    render() {
        const user = this.props.user
        // console.log('现在的',this.props)
        const content = (
            <div>
                <Headphoto id={this.props.user.id} />
            </div>
        );
        return (
            <div className="story-detail" style={{ minHeight: document.body.clientHeight + 'px' }} >
                <div className="story-detail-head">
                    <div className="story-detail-head-total">
                        <div className="story-detail-head-left">
                            Mysite
                        </div>
                        <div className="story-detail-head-right">
                            <span >
                                {user ? <Popover content={content} title="上传头像" trigger="hover"  >
                                    <Avatar src={this.props.user.head_link} size="large" icon="user" ></Avatar></Popover> : ''}
                            </span>
                            <span >
                                {user ? user.nickname : <Link to='/login'>登录</Link>}
                            </span>
                            <span >
                                {user ? <LinkButton onClick={this.props.logout}>退出</LinkButton> : <Link to='/reg'>注册</Link>}
                            </span>
                        </div>
                    </div>
                </div>
                <Switch> 
                    <Route path="/story/:dir/:id" component={Content} />
                    <Route path="/story/:dir" component={Dirs} />
                </Switch>    
            </div>
        )
    }
}


export default connect(
    state => ({ user: state.user }),
    { logout, reqHeadphoto }
)(StoryDetail)