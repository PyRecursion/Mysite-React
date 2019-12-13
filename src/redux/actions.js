
/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import {
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
  REG_USER,
  TOP_SONGLIST,
  SEARCH_SONGLIST
} from './action-types'
import { reqLog, reqHead, reqMusic, seachMusic, seachMusicDetail } from '../api'
import storageUtils from "../utils/storageUtils";
import { message } from 'antd';
import { handerTime, handersinger } from '../utils/handerSongs';



/*
接收用户的同步action
 */
export const receiveUser = (user) => ({ type: RECEIVE_USER, user })

/*
显示错误信息同步action
 */
export const showErrorMsg = (errorMsg) => ({ type: SHOW_ERROR_MSG, errorMsg })


/*
注册改变props
 */
export const regUser = () => ({ type: REG_USER })

/*
退出登陆的同步action
 */
export const logout = () => {
  // 删除local中的user
  storageUtils.removeUser()
  // 返回action对象
  return { type: RESET_USER }
}

/*
登陆的异步action
 */
export const login = (username, password) => {
  return async dispatch => {
    // 1. 执行异步ajax请求
    const result = await reqLog(username, password)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
    // 2.1. 如果成功, 分发成功的同步action
    if (result.status === 0) {
      const user = result.data
      // 保存local中
      storageUtils.saveUser(user)
      // 分发接收用户的同步action
      dispatch(receiveUser(user))
    } else { // 2.2. 如果失败, 分发失败的同步action
      const msg = result.msg
      message.error(msg)
      dispatch(showErrorMsg(msg))
    }
  }
}

/*
请求头像的action
 */
export const reqHeadphoto = (id) => {
  return async dispatch => {
    // 1. 执行异步ajax请求
    const result = await reqHead(id)  // {status: 0, data: user} {status: 1, msg: 'xxx'}
    // 2.1. 如果成功, 分发成功的同步action
    if (result.status === 0) {
      const user = result.data
      // 保存local中
      storageUtils.saveUser(user)
      // 分发接收用户的同步action
      dispatch(receiveUser(user))
    } else { // 2.2. 如果失败, 分发失败的同步action
      const msg = result.msg
      message.error(msg)
      dispatch(showErrorMsg(msg))
    }
  }
}


//歌曲列表
export const seachSongList = (songList) => ({ type: SEARCH_SONGLIST, songList })
export const topSongList = (songList) => ({ type: TOP_SONGLIST, songList })   //这是一个action


export const reqTopList = (id) => {
  return async dispatch => {
    const result = await reqMusic(id)
    if (result.code === 200) {
      const songList = result.playlist.tracks
      var data = []
      for (let index = 0; index < songList.length; index++) {

        const element = songList[index];
        const info = {
          'key': index,
          'id': index + 1,
          'songName': element,
          'time': handerTime(element.dt),
          'singer': handersinger(element.ar),
          'action': element.id,
          'pic': element.al.picUrl
        }
        data.push(info)

      }
      console.log(222, data)
      dispatch(topSongList(data))
    } else {
      message.error("请求失败")
    }
  }
}

export const reqSeachList = (keywords) => {
  return async dispatch => {
    const result = await seachMusic(keywords)
    if (result.code === 200) {
      const songs = result.result.songs
      if (songs) {
        var _ = []
        for (let index = 0; index < songs.length; index++) {
          const element = songs[index];
          _.push(element.id)
        }
        const querySonglist = await seachMusicDetail(_.join(","))
        console.log(querySonglist)
        if (result.code === 200) {
          var data = []
          for (let index = 0; index < querySonglist.songs.length; index++) {

            const element = querySonglist.songs[index];
            const info = {
              'key': element.id,
              'id': index + 1,
              'songName': element,
              'time': handerTime(element.dt),
              'singer': handersinger(element.ar),
              'action': element.id,
              'pic': element.al.picUrl
            }
            data.push(info)
          }
          console.log(222, data)
          dispatch(seachSongList(data))

        }
      }
    }
  }
}