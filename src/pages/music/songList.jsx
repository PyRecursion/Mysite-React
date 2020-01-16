import React, { Component } from 'react'
import { Table, Tag, Icon,Spin } from 'antd';
import { handerTime, handersinger } from '../../utils/handerSongs';
import { connect } from 'react-redux'
import { reqTopList,updateMusic } from '../../redux/actions'

class SongList extends Component {

  UNSAFE_componentWillReceiveProps(props){
    this.props.songList.spinning=true
  }
  componentDidMount() {
    this.props.reqTopList(this.props.match.params.mid)
  }
  //点击播放按钮
  clickPlayMusic = (e) => {
    var song = {}
    song.id = e.target.getAttribute("sid")
    song.title = e.target.getAttribute('title')
    song.info = e.target.getAttribute('info')
    song.resource = 'https://music.163.com/song/media/outer/url?id=' + song.id
    song.time = e.target.getAttribute('time')
    song.img = e.target.getAttribute('img')
    var newmusicList =this.props.musicList
    //用户点击同一首歌去重
    var flag = 0
    for (let index = 0; index < newmusicList.length; index++) {
      const element = newmusicList[index];
      if (element.id === song.id) {
        flag = 1
        break
      }
    }
    if (flag === 0) {
      newmusicList.push(song)
    }
    this.props.updateMusic(newmusicList)
    this.props.flashstate()  
  }

  render() {
    const {data,spinning} = this.props.songList
    const columns = [
      {
        width: '50px',
        title: '',
        dataIndex: 'id',
        key: 'id',
      render: id => id>=4?<Tag>{id}</Tag>:<Tag color="red">{id}</Tag>,
      },
      {
        width: '250px',
        title: '歌名',
        dataIndex: 'songName',
        key: 'songName',
        render: songinfo => <span
          sid={songinfo.id}
          title={songinfo.name}
          info={handersinger(songinfo.ar)}
          time={handerTime(songinfo.dt)}
          img={songinfo.al.picUrl}
          onClick={this.clickPlayMusic}
          style={{ cursor: "pointer" }}
        >
          < Icon style={{ 'pointerEvents': 'none' }} type="play-circle" />
          &nbsp;&nbsp;{songinfo.name}</span>
      },
      {
        width: '100px',
        title: '时长',
        dataIndex: 'time',
        key: 'time',
      },
      {
        width: '300px',
        title: '歌手',
        dataIndex: 'singer',
        key: 'singer',
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
        render: id => <a href={`https://music.163.com/song/media/outer/url?id=${id}`} target='_blank' rel="noopener noreferrer">下载地址</a>
      },
    ]

    return (
      <div style={{ width: "1000px" }} >
        <Spin spinning={spinning} tip="拼命加载中">
          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          />
        </ Spin>
      </div>
    )
  }
}
export default connect(
  state => ({ songList: state.songList,musicList:state.musicList,flashstate:state.flashstate}),
  { reqTopList,updateMusic}
)(SongList)