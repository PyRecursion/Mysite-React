import React, { Component } from 'react'
import { Row, Col, Affix, Card, Pagination } from 'antd';
import Banner from './Banner/banner';
import './home.less'
import Posts from './Posts/posts';
import AddressNav from './addressNav/addressNav';
import Bulletin from './bulletin-board/bulletin';
import { reqNews } from '../../api';



class Home extends Component {
    state = {
        top: 10,
        data: [],
        sideimgtop: '',
        sideimgbottom: '',
        hoteventList: [],
        currentpage: 1

    };

    componentDidMount() {
        this.getNews()
        

    }

    getNews=async()=>{
        const result = await reqNews();
        if (result.status === 0) {
            console.log(result.status)
            this.setState({
                data: result.data
            })
            if (result.data.sideimg.length === 2) {
                this.setState({
                    sideimgtop: result.data.sideimg[0],
                    sideimgbottom: result.data.sideimg[1],
                    hoteventList: result.data.hotevent
                })
            }
        }
    }


    pageonChange = page => {
        console.log(page);
        //注意此时的this.state.currentpage还未改变,不要用this.state.currentpage
        const currentpage = page
        this.setState({
            currentpage,
        })

    };

    render() {

        const sideimgtop = this.state.sideimgtop
        const sideimgbottom = this.state.sideimgbottom
        const hoteventList = this.state.hoteventList.slice((this.state.currentpage - 1) * 10, this.state.currentpage * 10)
        console.log(this.state.data.hotevent)
        return (
            <div className='show'>
                <Row className='row1'>
                    <Col span={12}>
                        <Banner bannerData={this.state.data.banner} />
                    </Col>

                    <Col span={6}>

                        <div className='row1-top'>
                            <a href={sideimgtop.sideUrl} target='_black' ><img src={sideimgtop.sideImgUrl} alt={sideimgtop.sidetitle} /></a>
                            <div className='img-title'>{sideimgtop.sidetitle}</div>
                        </div>
                        <div className='row1-botton'>
                            <a href={sideimgbottom.sideUrl} target='_black' ><img src={sideimgbottom.sideImgUrl} alt={sideimgbottom.sidetitle} /></a>
                            <div className='img-title'>{sideimgbottom.sidetitle}</div>
                        </div>

                    </Col>
                    <Col span={6}>
                        <div className='row1-right'>
                            <Card title="今日热点" extra="More" className='row1-right-card'>
                                {hoteventList.map((item, index) => {
                                    return (
                                        <a key={index} href={item.link} target='_black' ><p className="hotevent">{(index + (this.state.currentpage - 1) * 10 + 1) + " . " + item.title}</p></a>
                                    )
                                })}
                                <div className='pagination'>
                                    <Pagination
                                        size="small"
                                        total={50}
                                        defaultCurrent={1}
                                        current={this.state.currentpage}
                                        onChange={this.pageonChange}
                                        defaultPageSize={10}
                                    />
                                </div>
                            </Card>
                        </div>
                    </Col>
                </Row>
                <Row >
                    <Col span={16} className='row2-left'>
                        <Posts />
                    </Col>
                    <Affix offsetTop={this.state.top}>
                        <Col span={8} className='row2-right' style={{ float: 'right' }}>
                            <Bulletin />
                            <AddressNav />
                        </Col>
                    </Affix>
                </Row>
            </div>
        )
    }
}

export default Home