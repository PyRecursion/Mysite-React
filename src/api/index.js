
// import jsonp from "jsonp"
import ajax from './ajax'
import { BASE, Baseurl } from '../config/config'




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

//搜音乐详情
export const seachMusicDetail=(keywords)=>ajax(Baseurl+`/song/detail?ids=${keywords}`)

//获取小说页小说
export const reqStorys=(stype)=>ajax(BASE+`/story?stype=${stype}`,)

//获取小说类型
export const reqStoryTypeList=()=>ajax(BASE+"/storyTypeList")


//获取小说目录
export const reqStoryDirs=(storyid)=>ajax(BASE+`/storydirs?storyid=${storyid}`)

//获取小说内容
export const reqStoryContent=(storyid,path)=>ajax(BASE+"/storyContent",{storyid,path})

//获取下一页
export const reqStoryNextPage=(storyid,path)=>ajax(BASE+"/storyNextPage",{storyid,path})


//获取图片类型列表
export const reqImagesTypes=()=>ajax(BASE+"/imagesTypes")

//获取图片
export const reqimages=(typeId,curPage)=>ajax(BASE+"/imagesInfo",{typeId,curPage})


//获取电影列表
export const reqMovies=()=>ajax(BASE+"/reqMovies")
// export const reqmovieInfo=()=>ajax('https://movie.douban.com/j/subject_abstract?subject_id=27087724')

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


// export const reqWeather = (city) => {

//     // 执行器函数: 内部去执行异步任务, 
//     // 成功了调用resolve(), 失败了不调用reject(), 直接提示错误
//     return new Promise((resolve, reject) => { 
//       const url = `http://api.map.baidu.com/telematics/v3/weather?location=北京&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
//       jsonp(url, {}, (error, data) => {
//         if (!error && data.error===0) { // 成功的
//           const {dayPictureUrl, weather} = data.results[0].weather_data[0]
//           resolve({dayPictureUrl, weather})
//         } 
  
//       })
//     })
    
//   }