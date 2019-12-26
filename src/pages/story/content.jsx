import React, { Component } from 'react'
import { Breadcrumb, message } from 'antd';
import { Link } from "react-router-dom"
import { reqStoryContent, reqStoryNextPage } from '../../api';
import InfiniteScroll from 'react-infinite-scroller';

export default class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            storyId: props.match.params.dir,
            storypath: props.match.params.id,
            data: "",
            contents: []
        };
    }

    componentDidMount() {
        this.getStoryContent()
    }
    getStoryContent = async () => {
        const result = await reqStoryContent(this.state.storyId, this.state.storypath)
        if (result.status === 0) {
            this.setState({
                data: result.data,
                contents:[{"dir":result.data.dir,"text":result.data.text}]
            })

        }
    }


    getStoryNextPage = async () => {
        const result = await reqStoryNextPage(this.state.storyId, this.state.storypath)
        var contents=this.state.contents
        if (result.status === 0) {
            const content={"dir":result.data.dir,"text":result.data.text}
            contents.push(content)
            this.setState({
                storypath:result.data.path,
                data: result.data,
                contents:contents
            })

        }else{
            message.info(result.msg)
        }
    }
    

    render() {
        const { data ,contents} = this.state
        const getStoryNextPage = this.getStoryNextPage
        
        return (
            <div>
                <div className="story-text-body">
                    <Breadcrumb separator=">">
                        <Breadcrumb.Item><Link to="/story">小说页</Link></Breadcrumb.Item>
                        <Breadcrumb.Item ><Link to={"/story?type=" + data.type}>{data.type}</Link></Breadcrumb.Item>
                        <Breadcrumb.Item ><Link to={"/story/" + this.state.storyId}>目录</Link></Breadcrumb.Item>
                        <Breadcrumb.Item >{data.name}</Breadcrumb.Item>
                    </Breadcrumb>
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={getStoryNextPage}
                        hasMore={true}
                        loader={<div className="loader" key={0}>Loading ...</div>}
                    >

                        {contents.map((item,index)=>{
                            return <div className="story-text-body-content" key={index}>
                            <h1>{item.dir}</h1>
                            <div style={{ whiteSpace: 'pre-wrap', fontSize: "20px", padding: 20 }}>
                                {item.text}
                            </div>
                        </div>
                        })}
                        
                    </InfiniteScroll>
                    {/* <div className="story-text-body-content">
                        <h1>{data.dir}</h1>
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: "20px", padding: 20 }}>
                            {data.text}
                        </div>
                    </div> */}
                </div>
                <div className="story-text-foot">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        )
    }
}
