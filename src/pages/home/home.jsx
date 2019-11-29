import React, { Component } from 'react'
import { Row, Col,Affix } from 'antd';
import Banner from './Banner/banner';
import './home.less'
import Posts from './Posts/posts';
import AddressNav from './addressNav/addressNav';
import Bulletin from './bulletin-board/bulletin';



export default class Home extends Component {
    state = {
        top: 10,

      };
    
    render() {
        return (
            <div className='show'>
                <Row className='row1'>
                    <Col span={16}>
                        <Banner />
                    </Col>
                    <Col span={8}>
                        <div className='row1-top'>
                            <img src="/images/banner/bg.jpg" alt="" />
                        </div>
                        <div className='row1-button'>
                            <img src="/images/banner/bg.jpg" alt="" />
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col span={16} className='row2-left'>
                        <Posts />
                    </Col>
                    <Affix offsetTop={this.state.top}>
                    <Col span={8} className='row2-right' style={{float:'right'}}>
                        <Bulletin />
                        <AddressNav />
                    </Col>
                    </Affix>
                </Row>
            </div>
        )
    }
}
