import { http } from "@/plugin/axios"

class Captcha {
    get(token: any) {
        return http.request({
            method: 'post',
            url: 'captcha?token=' + token
        })
    }
}

export default new Captcha()