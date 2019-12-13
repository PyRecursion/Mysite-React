
// import jsonp from "jsonp"
import ajax from './ajax'


// const BASE = 'http://127.0.0.1:5000'
// const BASE = '/api'

const BASE = ''
//开发环境网易云接口
const Baseurl="http://192.168.100.100:3000"

//注册请求
export const reqRes= (loginname, email,password,nickname) =>ajax(BASE + '/reg', {loginname,email,password,nickname},'POST')

//登陆请求
export const reqLog= (loginname,password) =>ajax(BASE + '/login', {loginname,password},'POST')

//上传帖子内容
export const reqUploadTopic= (user_id,title,content) =>ajax(BASE + '/uploadtopic', {user_id,title,content},'POST')


//获取帖子内容
export const reqTopic= (page,pageNum) =>ajax(BASE + '/reqtopic',{page,pageNum})


//获取帖子详情
export const reqPostDetail= (id) =>ajax(BASE + '/reqpostdetail',{id})

//获取头像
export const reqHead= (id) =>ajax(BASE + '/reqhead',{id})

//写评论
export const upComment =(user_id,topic_id,comment) =>ajax(BASE + '/upComment',{user_id,topic_id,comment},'POST')

//发表回复
export const pbReply =(from_uid,to_uid,comment_id,reply_content) =>
                        ajax(BASE + '/pbReply',{from_uid,to_uid,comment_id,reply_content},'POST')

//获取新闻
export const reqNews =() =>ajax(BASE + '/reqNews')

//获取音乐飙升榜
export const reqMusic=(id)=>ajax(Baseurl+`/top/list?idx=${id}`)

//搜索自动补全音乐
export const seachSuggestMusic=(keywords)=>ajax(Baseurl+`/search/suggest?keywords=${keywords}`)

//搜索音乐
export const seachMusic=(keywords)=>ajax(Baseurl+`/search?keywords=${keywords}`)

export const seachMusicDetail=(keywords)=>ajax(Baseurl+`/song/detail?ids=${keywords}`)

// export const test111 = () => {

//     return new Promise((resolve, reject) => {
//       const url = "https://music.163.com/song/media/outer/url?id=1407551413"
//       // 发送jsonp请求
//       jsonp(url, {}, (err, data) => {
//         // 如果成功了
//         if (!err && data.status==='success') {
//           // 取出需要的数据
//         //   console.log('jsonp()', err, data)
//         } else {
//           // 如果失败了
//           alert('失败!')
//         }
  
//       })
//     })
//   }