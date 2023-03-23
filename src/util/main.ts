import router from '@/router'
import { UserObj } from '@/util/interface'

// 检查登录
function checkLogin() {
    const uid = sessionStorage.getItem('uid')!
    const username = sessionStorage.getItem('username')!
    const nickname = sessionStorage.getItem('nickname')!
    const realname = sessionStorage.getItem('realname')!
    const gid = sessionStorage.getItem('gid')!
    const sid = sessionStorage.getItem('sid')!
    const gradename = sessionStorage.getItem('gradename')!
    const sign = sessionStorage.getItem('sign')!
    const face = sessionStorage.getItem('face')!
    const pic = sessionStorage.getItem('pic')!
    const token = sessionStorage.getItem('token')!

    if (uid == null || nickname == null || gid == null || gradename == null || face == null || pic == null || token == null) {
        console.log({ uid, nickname, gid, gradename, face, pic, token })
        return false
    }

    // if(!checkStr(uid) || !checkStr(nickname) || !checkStr(gid) || !checkStr(grade) || !checkStr(face) || !checkStr(pic) || !checkStr(token)){
    //     return false
    // }

    return { uid, username, nickname, realname, gid, sid, gradename, sign, face, pic, token }
}

function getUser(): UserObj {
    const uid = sessionStorage.getItem('uid')!
    const username = sessionStorage.getItem('username')!
    const nickname = sessionStorage.getItem('nickname')!
    const realname = sessionStorage.getItem('realname')!
    const gid = sessionStorage.getItem('gid')!
    const sid = sessionStorage.getItem('sid')!
    const gradename = sessionStorage.getItem('gradename')!
    const sign = sessionStorage.getItem('sign')!
    const face = sessionStorage.getItem('face')!
    const pic = sessionStorage.getItem('pic')!
    const token = sessionStorage.getItem('token')!

    return { uid, username, nickname, realname, gid, sid, gradename, sign, face, pic, token }
}

// 存储登录信息
function setLogin(data: UserObj) {
    sessionStorage.setItem('uid', data.uid)
    sessionStorage.setItem('username', data.username)
    sessionStorage.setItem('nickname', data.nickname)
    sessionStorage.setItem('realname', data.realname)
    sessionStorage.setItem('gid', data.gid)
    sessionStorage.setItem('sid', data.sid)
    sessionStorage.setItem('gradename', data.gradename)
    sessionStorage.setItem('sign', data.sign)
    sessionStorage.setItem('face', data.face)
    sessionStorage.setItem('pic', data.pic)
    sessionStorage.setItem('token', data.token)
}

function setLogout() {
    sessionStorage.removeItem('uid')
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('nickname')
    sessionStorage.removeItem('realname')
    sessionStorage.removeItem('gid')
    sessionStorage.removeItem('sid')
    sessionStorage.removeItem('gradename')
    sessionStorage.removeItem('sign')
    sessionStorage.removeItem('face')
    sessionStorage.removeItem('pic')
    sessionStorage.removeItem('token')
    sessionStorage.clear()
}

// 检查字符是否为空
function checkStr(str: string, type = 'string') {

    if (str == null || str == 'undefined' || str.trim() == '') {
        return false
    }
    return true
}

export { checkLogin, getUser, setLogin, setLogout }