import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card } from 'antd';
const { Meta } = Card;



class UserInfoCard extends Component {
    render() {
        return (
            <div>
                <Card
                    hoverable
                    style={{ width:200}}
                    cover={<img style={{height:200}} alt="example" src={this.props.userinfo.head_link} />}
                >
                    <p>{this.props.userinfo.nickname}</p>
                    <p>哈哈哈</p>
                    <Meta title="不要看我图片还未完成" description={this.props.userinfo.email} />
                </Card>,
                {/* <Popover content={content} title="Title" trigger="hover">
      
    </Popover> */}
            </div>
        )
    }
}


export default connect(
    state => ({ user: state.user }),

)(UserInfoCard) 