//管理状态数据


//登录用户的reducer函数

/*
用来根据老的state和指定的action生成并返回新的state的函数
 */
import {combineReducers} from 'redux'


import storageUtils from "../utils/storageUtils"
import {
  RECEIVE_USER,
  SHOW_ERROR_MSG,
  RESET_USER,
  REG_USER,
  TOP_SONGLIST,
  SEARCH_SONGLIST
} from './action-types'


/*
用来管理当前登陆用户的reducer函数
 */
const initUser = storageUtils.getUser()

function user(state = initUser, action) {
  switch (action.type) {
    case REG_USER:
      return storageUtils.getUser()
    case RECEIVE_USER:
      return action.user
    case SHOW_ERROR_MSG:
      const errorMsg = action.errorMsg
      // state.errorMsg = errorMsg  // 不要直接修改原本状态数据
      return {...state, errorMsg}
    case RESET_USER:
      return ''
    default:
      return state
  }
}

/*
用来管理当前显示的歌曲列表
 */
const initsonglist=[]
function songList(state = initsonglist, action) {
  switch (action.type) {
    case TOP_SONGLIST:
      return action.songList
    case SEARCH_SONGLIST:
      return action.songList
    default:
      return state
  }
}

/*
向外默认暴露的是合并产生的总的reducer函数
管理的总的state的结构:
  {
    headTitle: '首页',
    user: {}
  }
 */
export default combineReducers({
  user,songList
})