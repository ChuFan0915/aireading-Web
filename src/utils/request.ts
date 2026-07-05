import axios from "axios";
import {getToken,removeToken} from './auth'
import { error } from "naive-ui/es/_utils/naive/warn";
const resquest=axios.create({
    baseURL:'http://localhost:3000/api',
    timeout:10000,
    headers:{'Content-Type':'application/json'}
})
// 拦截器
resquest.interceptors.request.use((config)=>{
    const token=getToken()
    if(token){
        config.headers.Authorization=`Bearer ${token}`
    }return config
})

resquest.interceptors.response.use((response)=>{
    return response.data
},(error)=>{
    if(error?.response?.status===401){
        removeToken()
        window.location.href='/login'
    }
    return Promise.reject(error)
})
export default resquest