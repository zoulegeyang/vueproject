import axios from "axios"

export function request(config){
    const instance = axios.create({
        
        baseURL:'http://123.207.32.32:8000/api/m3',
        timeout:5000
    })
    instance.interceptors.request.use(config=>{
        //  将token 放在session里 每次发请求都发过去
        if (sessionStorage.getItem("token")) {
            config.headers.token = sessionStorage.getItem("token");
            return config;
          }
          else return config
    },err=>{}
    )
    instance.interceptors.response.use(res=>{
        return res.data
    },err=>{

    })
    return instance(config)
}