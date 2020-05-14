import axios from "axios"

export function getCode(config) {
  const instance = axios.create({
        
    baseURL:'http://localhost:4000/admin/huoqu',
    timeout:5000
})

instance.interceptors.request.use(config=>{
    return config
},err=>{}
)
instance.interceptors.response.use(res=>{
    return res.data
},err=>{

})
return instance(config)
}

export function submit(config) {
 const instance= axios.create({
    baseURL: "http://localhost:4000/admin/login",
    method: "post",
    
  })
  instance.interceptors.request.use(config=>{
    return config
},err=>{}
)
instance.interceptors.response.use(res=>{
    return res.data
},err=>{

})
return instance(config)
}
