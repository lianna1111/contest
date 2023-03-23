import { http } from "../plugin/axios";
import qs from 'qs'

class User {
    reg(data: object) {
        return http.request({
            method: 'post',
            url: 'reg',
            data: qs.stringify(data)
        })
    }

    login(data: object) {
        return http.request({
            method: 'post',
            url: 'login',
            data: qs.stringify(data)
        })
    }
    mlogin(data: object) {
        return http.request({
            method: 'post',
            url: 'login',
            data: qs.stringify(data)
        })
    }
    smsSend(data: object) {
        return http.request({
            method: 'post',
            url: 'sms/send',
            data: qs.stringify(data)
        })
    }
    auth(data: object) {
        return http.request({
            method: 'post',
            url: 'user/auth',
            data: qs.stringify(data)
        })
    }

    logout() {
        return http.request({
            url: 'user/logout'
        })
    }

}

export default new User()