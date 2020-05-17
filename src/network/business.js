import axios from "axios"


  const instance = axios.create({
    baseURL:"http://localhost:5000",
    withCredentials:true
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
    return res
  },err=>{
  
  })
export default instance


