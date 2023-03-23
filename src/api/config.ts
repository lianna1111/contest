import { http } from "@/plugin/axios";
import qs from 'qs'

/**
 * 配置接口总类
 */

class Config {
    // 获取配置接口
    system() {
        return http.request({
            url: 'config/system'
        })
    }
}

export default new Config()