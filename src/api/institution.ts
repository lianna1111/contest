import { http } from "../plugin/axios";
import qs from 'qs'

class institution {
    show(data: object) {
        return http.request({
            method: 'post',
            url: 'campus',
            data: qs.stringify(data)
        })
    }
    add(data: object) {
        return http.request({
            method: 'post',
            url: 'campus/create',
            data: qs.stringify(data)
        })
    }



}

export default new institution()