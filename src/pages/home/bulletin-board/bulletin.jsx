import React, { Component } from 'react'
import { Card } from 'antd';
import img1 from "../../../assets/images/wechat_dongke.png"
import img2 from "../../../assets/images/home_right.gif"

export default class Bulletin extends Component {
    render() {

        
        return (
            <Card title="本站公告" extra='More' style={{ width: '100%'}}>
                <h4 style={{marginLeft:"20px"}}>禁止发表不良言论，信息，图片</h4>
                <img src={img1} alt="pic2" width={'100%'}/>
                <img src={img2} alt="pic1" width={'100%'}/>
                
            </Card>
        )
    }
}
