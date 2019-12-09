

import ajax from './ajax'


const BASE = ''


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


