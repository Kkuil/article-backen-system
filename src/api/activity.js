import request from "@/utils/request"

/**
 * 发布活动
 * @param act_info {Object} 活动发布的相关信息
 * @param privilege {String} 接口权限鉴定请求头
 * @returns {Array|Object} 返回数据部分 
 */
export async function publish(act_info, privilege) {
    const { data } = await request({
        url: "/activity/publish",
        method: "POST",
        data: act_info,
        headers: {
            "Content-Type": "multipart/form-data",
            "x-privilege-token": privilege
        }
    })
    return data
}

/**
 * 查询活动
 * @param query_info {Object} 查询相关信息
 * 例：
 * {
 *  offset: 10,
 *  nums: 10
 * }
 * @returns {Array|Object}
 */
export const getActivities = async (query_info) => {
    const { data } = await request({
        url: "/activity/getActivities",
        method: "GET",
        params: {
            ...query_info
        }
    })
    return data
}

/**
 * 删除活动
 * @param id {String} 需要删除的id
 * @param privilege {String} 权限token
 */
export const delActivity = async (id, privilege) => {
    const { data } = await request({
        url: "/activity/delActivity",
        method: "DELETE",
        headers: {
            "x-privilege-token": privilege
        },
        params: {
            id
        }
    })
    return data
}