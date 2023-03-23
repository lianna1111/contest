import { ref, onMounted } from 'vue'
import Axios from "./Axios";

const Authorization: any = sessionStorage.getItem('token')
console.log(Authorization, '123');

const http = new Axios({
    baseURL: import.meta.env.VITE_API_BASEURL as string,
    timeout: 100000,
    headers: {
        Authorization,
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
})

export { http }