import React, { Component } from 'react'
import { Carousel } from 'antd';
import './banner.less'

export default class Banner extends Component {
    render() {
        return (
            <Carousel className='banner' autoplay>
                <div className='banner1'>
                    <img src="/images/banner/bg.jpg" alt=""/>
                </div >
                <div className='banner2'>
                    <img src="/images/banner/bg2.jpg" alt=""/>
                </div>
                <div className='banner3'>
                    <img src="/images/banner/th.jpg" alt=""/>
                </div>
                <div className='banner4'>
                 <img src="/images/banner/timg2.jpg" alt=""/>
                </div>
            </Carousel>

        )
    }
}
