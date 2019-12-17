import React, { Component } from 'react'
import { Card } from 'antd';
import pic1 from "../../../assets/images/111.gif"
import pic2 from "../../../assets/images/222.png"

export default class Bulletin extends Component {
    render() {

        
        return (
            <Card title="本站公告" extra='More' style={{ width: '100%'}}>
                <h4 style={{marginLeft:"20px"}}>禁止发表不良言论，信息，图片</h4>
                <img src={pic2} alt="pic2" width={'100%'}/>
                <img src={pic1} alt="pic1" width={'100%'}/>
                
            </Card>
        )
    }
}
