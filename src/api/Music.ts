import { http } from "../plugin/axios";
import qs from 'qs'

class Music {
    get() {
        return http.request({
            method: 'get',
            url: 'music/sign',
        })
    }


}

export default new Music()