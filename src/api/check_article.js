import request from "@/utils/request"

export const GetCheckArticles = async ({ searchValue = "", limit = 10, offset = 0, privilege }) => {
    const { data } = await request({
        url: "/check_article/search",
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

export const PassCheck = async (article_id, privilege) => {
    const { data } = await request({
        url: "/check_article/pass",
        method: "delete",
        params: {
            article_id
        },
        headers: {
            "x-privilege-token": privilege
        }
    })
    return data
}