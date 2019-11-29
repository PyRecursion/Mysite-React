import React, { Component } from 'react'
import { Card, Row, Col } from 'antd';


export default class AddressNav extends Component {
    render() {
        return (
            <Card style={{ width: '100%',marginTop:"10px"}}>
                <p>常用网址链接</p>
                <Row type="flex" justify="space-between">
                    <Col span={4}>csdn</Col>
                    <Col span={4}>mdn</Col>
                    <Col span={4}>col-4</Col>
                    <Col span={4}>col-4</Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={4}>col-4</Col>
                    <Col span={4}>col-4</Col>
                    <Col span={4}>col-4</Col>
                    <Col span={4}>col-4</Col>
                </Row>
                <Row type="flex" justify="space-between">
                    <Col span={4}>col-4</Col>
                    <Col span={4}>col-4</Col>
                    <Col span={4}>col-4</Col>
                    <Col span={4}>col-4</Col>
                </Row>
            </Card>
        )
    }
}
