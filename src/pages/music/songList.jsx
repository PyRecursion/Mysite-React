import React, { Component } from 'react'
import { Table, Tag, Icon } from 'antd';
import AudioPlay from './audioPlay';
import { handerTime, handersinger } from '../../utils/handerSongs';
import { connect } from 'react-redux'
import { reqTopList } from '../../redux/actions'



class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.mid,
      musicList: [
      ]
    }
  }
  componentDidMount() {
    this.props.reqTopList(this.state.id)
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
    var newmusicList = this.state.musicList
    //去重
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
    this.setState({
      musicList: newmusicList
    })
  }

  // 删除指定音乐
  onDeleteMusic = id => {
    const { musicList } = this.state;
    const newMusicList = [];
    musicList.forEach(item => {
      if (item.id !== id) {
        newMusicList.push(item);
      }
    });
    this.setState({ musicList: newMusicList });
  };
  // 删除全部音乐
  onDeleteAllMusic = () => {
    this.setState({ musicList: [] });
  };

  render() {
    const data = this.props.songList
    const columns = [
      {
        width: '50px',
        title: '',
        dataIndex: 'id',
        key: 'id',
        render: id => <Tag color="red">{id}</Tag>,
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
    const { musicList } = this.state
    return (
      <div style={{ width: "1000px" }}>

        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />
        <div>
          <AudioPlay
            musicList={musicList}
            onDeleteMusic={this.onDeleteMusic}
            onDeleteAllMusic={this.onDeleteAllMusic}
          />
        </div>
      </div>
    )
  }
}
export default connect(
  state => ({ songList: state.songList }),
  { reqTopList }
)(SongList)