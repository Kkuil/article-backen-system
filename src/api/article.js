import request from "@/utils/request"

// 获取全部文章
export const GetArticles = async ({ searchValue="", limit=10, offset=0, privilege }) => {
    const { data } = await request({
        url: "/article/pri_find",
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

// 上推荐
export const Recommend = async ({ article_id, privilege }) => {
    const { data } = await request({
        url: "/article/recommend",
        method: "POST",
        data: {
            article_id
        },
        headers: {
            "x-privilege-token": privilege
        }
    })
    return data
}