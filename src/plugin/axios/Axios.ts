import axios, { AxiosRequestConfig } from 'axios'

interface ReponseResult<T> {
    errno: number,
    msg: T
}

export default class Axios {
    private instance;

    constructor(config: AxiosRequestConfig) {
        this.instance = axios.create(config)
        this.interceptors()
    }

    public request<T>(config: AxiosRequestConfig) {
        console.log('axios request')
        return this.instance.request<ReponseResult<T>>(config)
    }

    private interceptors() {
        this.interceptorsRequest()
        this.interceptorsResponse()
    }

    private interceptorsRequest() {
        this.instance.interceptors.request.use(
            config => { return config },
            error => { return Promise.reject(error) }
        )
    }

    private interceptorsResponse() {
        this.instance.interceptors.response.use(
            response => { return response },
            error => { return Promise.reject(error) }
        )
    }
}