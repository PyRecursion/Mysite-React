// import jsonp from 'jsonp'

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