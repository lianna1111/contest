
import { http } from "../plugin/axios";
import qs from 'qs'

class enterprise {
    add(data: object) {
        return http.request({
            method: 'post',
            url: 'enterprise/add',
            data: qs.stringify(data)
        })
    }
    cate() {
        return http.request({
            method: 'get',
            url: 'enterprise_cate/0',
        })
    }

}

export default new enterprise()