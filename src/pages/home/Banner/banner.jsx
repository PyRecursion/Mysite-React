import React, { Component } from 'react'
import { Carousel } from 'antd';
import './banner.less'
// import {Link} from "react-router-dom"


export default class Banner extends Component {
    render() {
        const bannerlist = this.props.bannerData || []
        return (
            <Carousel className='banners' autoplay>
                {bannerlist.map((banner, index) => {
                    return (
                        
                            <div key={index} className='banner'>
                                    <a href={banner.newsUrl} target='_black'><img src={banner.imgUrl} alt={banner.title} /></a>
                                    <div className='banner-title'>{banner.title}</div>    
                            </div >
                        
                    )
                })}
                
            </Carousel>

        )
    }
}
