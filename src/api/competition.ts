import { http } from "../plugin/axios";
import qs from 'qs'

class competition {
    add(data: object) {
        return http.request({
            method: 'post',
            url: 'competition/add',
            data: qs.stringify(data)
        })
    }
    registration() {
        return http.request({
            method: 'get',
            url: 'registration',
        })
    }

    add_item(data: object) {
        return http.request({
            method: 'post',
            url: 'competition/add_item',
            data: qs.stringify(data)

        })
    }



}

export default new competition()