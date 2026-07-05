import resquest from "./request";
import axios from "axios";
import { getToken } from "./auth";

// 登录接口
export const apiLogin=(data:{username:string;password:string})=>{
    return resquest.post('/auth/login',data)
}
// 注册
export const apiRegister=(data:{
    account:string;
    email:string;
    password:string;
    code:string
    confirmPassword:string
})=>{
    return resquest.post('/auth/register/email',data)
}
// 邮箱注册
export const apiSendCode=(data:{
    email:string
})=>{
    return resquest.post('/auth/sendCode',data)
}

// 专门用于文件上传的 axios 实例，不经过全局响应拦截器
const uploadRequest = axios.create({
    baseURL: 'http://localhost:3000/api',
    timeout: 60000,
})

// 上传请求也携带 token，并自动设置正确的 Content-Type
uploadRequest.interceptors.request.use((config)=>{
    const token=getToken()
    console.log('[upload] token:', token ? token.slice(0,20)+'...' : 'null')
    if(token){
        config.headers.Authorization=`Bearer ${token}`
        console.log('[upload] Authorization set:', config.headers.Authorization)
    } else {
        console.warn('[upload] 未找到 token,请先登录')
    }
    // 上传 FormData 时自动设置正确的 Content-Type
    if(config.data instanceof FormData){
        config.headers['Content-Type']='multipart/form-data'
    }
    console.log('[upload] final headers:', config.headers)
    return config
})

// 上传书本
export const uploadBook=(data:FormData)=>{
    return uploadRequest.post('/upload/book',data)
}
// 获取当前书架的书
export const getBookshelf=()=>{
    return resquest.get('/bookshelf')
}
// 获取书籍具体的内容
export const getBookDetail=(bookId:string)=>{
    return resquest.get(`/books/${bookId}/read`)
}