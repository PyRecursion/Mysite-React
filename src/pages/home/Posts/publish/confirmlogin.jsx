import React, { Component } from 'react'
import { Modal } from 'antd';
import { Redirect } from "react-router-dom"

export default class Confirmlogin extends Component {
    state = {
        visible: true,
        tologin: 0,
    };



    //   showModal = () => {
    //     this.setState({
    //       visible: true,
    //     });
    //   };

    handleOk = e => {
        console.log(e);
        console.log(this.props)
        this.setState({
            visible: false,
            tologin: 1
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                {/* <Button type="primary" onClick={this.showModal}>
            Open Modal
          </Button> */}
                <Modal
                    title="请先登录"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                >
                    <p>是否跳转到登录页</p>

                </Modal>
                {this.state.tologin === 1 ? <Redirect to="/login" /> : ""}
            </div>
        )
    }
}
