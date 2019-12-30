import Player from 'griffith'
import React, { Component } from 'react'
import { Card, Popover, Tag } from 'antd';

import "./index.less"
import { reqMovies } from '../../api';
// import MovieInfo from "./movieInfo"




export default class index extends Component {

    state = {
        movieList: [],
        curPlay_url:"",
        curMovieInfo:{}

    }
    componentDidMount() {
        this.getMovies()
    }

    getMovies = async () => {
        const result = await reqMovies()
        var curMovieInfo={}
        curMovieInfo.title=result.data[0].subject.title
        curMovieInfo.actors=result.data[0].subject.actors.reduce((pre,cur)=>pre+" "+cur)
        curMovieInfo.introduce=result.data[0].introduce
        curMovieInfo.comment=result.data[0].subject.short_comment.content
        if (result.status === 0) {
            this.setState({
                movieList: result.data,
                curPlay_url:'/static/videos/'+result.data[0].subject.id+".mp4",
                curMovieInfo:curMovieInfo
            })
        }
    }
    onPlay = (e) => {
    var curMovieInfo={}
    const title=e.target.getAttribute("title")  
    const actors=e.target.getAttribute("actors")  
    const introduce=e.target.getAttribute("introduce")
    const curPlay_url=e.target.getAttribute("flag")
    const comment=e.target.getAttribute("comment")
    curMovieInfo.title=title
    curMovieInfo.actors=actors
    curMovieInfo.introduce=introduce
    curMovieInfo.comment=comment
   
    this.setState({
        curPlay_url:'/static/videos/'+curPlay_url+".mp4",
        curMovieInfo:curMovieInfo
    })
    window.scrollTo(0,0)
    
    }

  

    render() {
        const sources = {
            hd: {
                play_url:this.state.curPlay_url,
            },
            sd: {
                play_url:this.state.curPlay_url,
            },
            
        }
        console.log(2222,this.state.curPlay_url)
        const gridStyle = {
            width: '12.5%',
            textAlign: 'center',
            height: '200px',
            padding: 10,
            overflow: 'hidden'
        };
        const title=title=><h2 style={{ width: 250 }}>{title}</h2>
        const content = (info, introduce) => {
            return (
                <div style={{ width: 250 }}>
                    <div>
                        评分：{info.rate}
                    </div>
                    <div>
                        {info.actors.slice(0,3).map((item,index)=>{
                            return <Tag key={index} color="red" style={{marginTop:10}}>{item}</Tag>
                        })}
                        <Tag color="red" style={{marginTop:10}}>{info.duration}</Tag>
                        <Tag color="red" style={{marginTop:10}}>{info.region}</Tag>
                    </div>
                    <div>
                        简介：{introduce}
                    </div>
                </div>)

        }
        const { movieList, curMovieInfo} = this.state
        return (
            <div className="movie-box">
                <div className="movie-box-part1" >
                    <div className='movie-box-left'>
                        <Player key={this.state.curPlay_url} id={this.state.curPlay_url}  locale="zh-Hans" sources={sources}  />
                    </div>
                    <div className='movie-box-right' >
                        <Card title={curMovieInfo.title} className='movie-box-card'>
        
                                <p>演员：{curMovieInfo.actors}</p>
                                <br/>
                                <p>简介：{curMovieInfo.introduce}</p>
                                <br/>
                                <p>评论：{curMovieInfo.comment}</p>
                        </Card>
                    </div>
                </div>

                <Card className='movie-box-part2' title="点击播放(需要的请在首页发帖或联系站主)">
                    {movieList.map((item) => {
                        return (
                            <Popover key={item.subject.id} placement="top" title={title(item.subject.title)} content={content(item.subject, item.introduce)} trigger="hover"  >
                                <Card.Grid style={gridStyle} >
                                    {/* <div flag={item.subject.id} onClick={this.onPlay}> */}
                                    <img className="movie-img" 
                                        src={"/static/images/movieImg/" + item.subject.id + ".jpg"} 
                                        alt={item.subject.id} 
                                        flag={item.subject.id}
                                        title={item.subject.title}
                                        actors={item.subject.actors.slice(0,10).map(item=>item)}
                                        introduce={item.introduce}
                                        comment={item.subject.short_comment.content}
                                        onClick={this.onPlay}/>
                                    <p className="movie-namerate" >{item.name}<span style={{ color: "green",marginLeft:10}}>{item.subject.rate}</span></p>
                                    {/* </div> */}
                                </Card.Grid>
                            </Popover>
                        )
                    })}
                </Card>
            </div>
        )
    }
}

