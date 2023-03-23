// axios 数据返回格式
export interface ResponseResult<T>{
    errno: number
    msg: string
    data?: T
}

// 登录用户数据格式
export interface UserObj{
    uid: string
    username: string
    nickname: string
    realname: string
    gid: string
    sid: string
    gradename: string
    sign: string
    face: string
    pic: string
    token: string
}

// 多层级表数据格式
export interface ItemList{
    ID: number
    Title: string
    Pic?: string
    Level: number
    PID: number
    Number: number
    Sort?: number
    Module?: ((...args: any[]) => any) | string | undefined
    Linkurl?: string
    Type?: string
}

// 风格数据格式
export interface StyleList{
    id: number
    title: string
    default: boolean
    asideBgColor?: string | null
    mainBgColor?: string | null
    menuColor?: string | null
    menuActiveColor?: string | null
    menuBgColor?: string | null
    textColor?: string | null
    textActiveColor?: string | null
    textBgColor?: string | null
}

// 表字段格式
export interface FieldList{
    title: string
    field: string
    width?: number
    sort?: boolean
}