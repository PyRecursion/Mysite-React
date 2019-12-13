import React, { Component } from 'react'
import { Table, Tag, Icon } from 'antd';
// import { reqMusic } from '../../api';
// import LinkButton from '../../components/link-button';
import AudioPlay from './audioPlay';
import { handerTime, handersinger } from '../../utils/handerSongs';
import { connect } from 'react-redux'
import { reqTopList } from '../../redux/actions'



class SongList extends Component {
  constructor(props) {
    super(props);
    this.state = {

      // data: [],
      // loading: true,
      id: props.match.params.id,
      columns: [
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
      ],
      musicList: [

      ]
    }
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
      console.log(this.state.musicList, typeof (song))
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


    //切换路由 
    // UNSAFE_componentWillReceiveProps(nextprops) {
    //   this.setState({
    //     id: nextprops.match.params.id
    //   })
    //   this.props.reqTopList(this.state.id)
    // }

   
    componentDidMount() {
      this.props.reqTopList(this.state.id)
      // this.getMusic(this.state.id) 
    }

    // 获取数据
    // getMusic = async (id) => {
    //   const result = await reqMusic(id)
    //   if (result.code === 200) {
    //     const dataList = result.playlist.tracks
    //     var data = []
    //     for (let index = 0; index < dataList.length; index++) {

    //       const element = dataList[index];
    //       const info = {
    //         'key': index,
    //         'id': index + 1,
    //         'songName': element,
    //         'time': handerTime(element.dt),
    //         'singer': handersinger(element.ar),
    //         'action': element.id,
    //         'pic': element.al.picUrl
    //       }

    //       data.push(info)
    //     }
    //     // console.log(111, dataList)
    //     this.setState({
    //       data: data,
    //       // loading: false
    //     })
    //     console.log(222222222222, data)
    //   }
    // }

    render() {
      const data=this.props.songList
      
      const { musicList, columns } = this.state
      return (
        <div style={{ width: "1000px" }}>

          <Table
            columns={columns}
            dataSource={data}
            pagination={false}
          // loading={loading}
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
) (SongList)