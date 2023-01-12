import axios from "axios"

const request = axios.create({
    baseURL: "http://127.0.0.1:9827",
    timeout: 5000,
    headers: {
        "x-Kkuil-info": "I hope.",
        "x-World-peace": "Yes",
        "x-login-token": "wwqaiwyy1314"
    }
})

request.interceptors.request.use(config => {
    if(config.url == "/admin/auth" && config.method == "post") {
        const ADMIN_TOKEN = localStorage.getItem("ADMIN_TOKEN")
        if(ADMIN_TOKEN) {
            config.headers["x-admin-token"] = ADMIN_TOKEN
        }
    }
    return config
}, err => {
    Promise.reject(err)
})

request.interceptors.response.use(res => {
    if(res.config.url == "/admin/find" && res.config.method == "post") {
        console.log(res.headers)
        if(res.headers["x-admin-token"]) {
            localStorage.setItem("ADMIN_TOKEN", res.headers["x-admin-token"])
        }
    }
    return res
}, err => {
    Promise.reject(err)
})

export default request