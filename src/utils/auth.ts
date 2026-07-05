const TOKEN_KEY='novel_reader_token'
// 解析本地存储的角色token
export function getToken():string|null {
    return  localStorage.getItem(TOKEN_KEY)
}
export function setToken(token:string){
    localStorage.setItem(TOKEN_KEY,token)
}
export function removeToken():void{
    return localStorage.removeItem(TOKEN_KEY   )
}
// 从jwt中解析角色
export function getUserRole():string|null{
    const token=getToken()
    if(!token){
        return null
    }try{
        const payload=JSON.parse(atob(token.split('.')[1]))
        return payload.role
    }catch{
        return null
    }
}
export function isLogin():boolean{
    const token=getToken()
    if(!token) return false
    const role=getUserRole()
    return role==='USER'||role==='ADMIN'
}