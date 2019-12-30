import React, { Component } from 'react'
import { Card } from 'antd';


export default class Bulletin extends Component {
    render() {

        
        return (
            <Card title="本站公告" extra='More' style={{ width: '100%'}}>
                <h4 style={{marginLeft:"20px"}}>禁止发表不良言论，信息，图片</h4>
                <img src="/static/images/wechat_dongke.png" alt="pic2" width={'100%'}/>
                <img src="/static/images/home_right.gif" alt="pic1" width={'100%'}/>
                
            </Card>
        )
    }
}
