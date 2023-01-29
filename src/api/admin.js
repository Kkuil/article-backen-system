import request from "@/utils/request"
import crypto from "crypto-js"

export const findAdmin = async ({ admin_name, password }) => {
    const { data } = await request({
        url: "/admin/find",
        method: "POST",
        data: {
            admin_name,
            password: crypto.AES.encrypt(password, "Kkuil").toString()
        }
    })
    return data
}

export const auth = async () => {
    const { data } = await request({
        url: "/admin/auth",
        method: "POST"
    })
    return data
}

// 获取全部管员
export const getAllAdmins = async () => {
    const { data } = await request({
        url: "/admin/getAllAdmins",
        method: "GET",
    })
    return data
}

// 删除管理员
export const delAdmin = async (id) => {
    const { data } = await request({
        url: "/admin/delAdmin",
        method: "DELETE",
        params: {
            id
        }
    })
    return data
}