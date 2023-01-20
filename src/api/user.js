import request from "@/utils/request"

export const GetUsers = async ({ searchValue="", limit=10, offset=0, privilege }) => {
    const { data } = await request({
        url: "/user/users",
        method: "GET",
        params: {
            searchValue,
            limit,
            offset
        },
        headers: {
            "x-privilege-token": privilege
        }
    })
    return data
}