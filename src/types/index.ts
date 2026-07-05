export interface Books{
    id:string;//唯一id
    name:string;//书名
    updateTime:number;//上次阅读时间
    cover:string;//封面图
    author:string;//作者
    progress:number;//阅读进度
    thomeColor:string;//书本主题色   
}
// 定义书本的章节类型
export interface Chapter{
    id:string,
    title:string,//标题
    content:string,//内容
    index:number,//索引
}
// 定义书籍
export interface BookDetail{
    author:string,//作者
    category:string|null
    chapterCoun:number,//章节
    chapters:Chapter[]
}
// 阅读设置
export interface ReadinSettings{
    fontSize:number,//字体宽度
    lineHeight:number,//行高
    theme:string
}
