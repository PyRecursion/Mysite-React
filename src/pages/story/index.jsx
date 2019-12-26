import React, { Component } from 'react'
import { Menu, Layout, Affix } from 'antd';
import "./index.less"
import { reqStorys,reqStoryTypeList } from '../../api';
import { Link } from 'react-router-dom'
// import Booklist from './booklist';




const { SubMenu } = Menu;
const { Sider, Content } = Layout;


export default class Story extends Component {
    constructor(props) {
        super(props);
        console.log(props)
        this.state = {
            data: [],
            storyTypeList:[]    
        }
      }
    

    handleClick = e => {
        this.getStorys(e.item.props.children)
    };
    

    componentDidMount = () => {
        this.getStorys("")
        this.getStoryTypeList()
    }
    getStorys = async (storyType) => {
        const result = await reqStorys(storyType)
        if (result.status === 0) {
            this.setState({
                data: result.data
            })
        }
    }
    
    getStoryTypeList=async () => {
        const result = await reqStoryTypeList()
        if (result.status === 0) {
            console.log(result.data)
            this.setState({
                
                storyTypeList: result.data
            })
        }
    }

    render() {
        const {data,storyTypeList} = this.state
        return (
            
            <Layout >
                <Affix>
                    <Sider  style={{  minHeight: document.body.clientHeight-100  + 'px',height:"100%" }}>
                        <Menu
                            style={{ height:"100%" }}
                            onClick={this.handleClick}
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1',"sub2"]}
                            mode="inline"
                            theme="dark"

                        >
                            <SubMenu
                                key="sub1"
                                title={
                                    <span>
                                        <span>热门小说</span>
                                    </span>
                                }
                            >
                            <Menu.Item key="1">全部小说</Menu.Item>
                            {storyTypeList.map(item=><Menu.Item key={item}>{item}</Menu.Item>)}
                            </SubMenu>
                            <SubMenu
                                key="sub2"
                                title={
                                    <span>
                                        <span>文学名著</span>
                                    </span>
                                }
                            >
                                <Menu.Item key="7">全部</Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Sider>
                </Affix>
                <Content style={{ backgroundColor: "white" }}>
                    <div className="books" >
                        {data.map((book, index) => {
                            return (
                                <div key={book.id} className="book-info">
                                    <Link to={"/story/" + book.id} target="_blank" >
                                        <div className="book-info-image">
                                            <img src={book.images} alt={book.images} />
                                        </div>
                                    </Link>

                                    <div className="book-info-text">
                                        <Link to={"/story/" + book.id} target="_blank" style={{ color: "#1a1a1a" }}>
                                            <div className="book-info-title">
                                                <div className="book-info-titlehead">{book.name}</div><span className="book-info-author">类型:{book.type} | 作者:{book.author}</span>
                                            </div>
                                        </Link>
                                        <div >
                                            <p>
                                                {book.introduction}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                    </div>
                </Content>
            </Layout>
            

        )
    }
}
