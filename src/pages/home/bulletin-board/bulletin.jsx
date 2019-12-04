import React, { Component } from 'react'
import { Card } from 'antd';

export default class Bulletin extends Component {
    render() {

        
        return (
            <Card title="本站公告" extra='More' style={{ width: '100%'}}>
                <p>Card content</p>
                <p>Card content</p>
                <p>Card content</p>
            </Card>
        )
    }
}
