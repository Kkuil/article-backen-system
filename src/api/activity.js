import request from "@/utils/request"

export const publish = async (act_info, privilege) => {
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