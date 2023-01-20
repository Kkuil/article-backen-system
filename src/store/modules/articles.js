import { createSlice } from "@reduxjs/toolkit"

const articles = createSlice({
    name: "articles",
    initialState: {
        search: {
            articles: [],
            searchValue: "",
            limit: 10,
            offset: 0,
            total: 0
        },
        observing_article: {
            article: {
                article_id: "666",
                username: "Kkuil",
                title: "xxx",
                content: "xxx",
                publish_time: "1970年1月1日 08:00:00",
                status: "xxx",
                views: 0,
                like: 0,
                comments: 0
            },
            isObserving: false
        }
    },
    reducers: {
        modify_search(state, actions) {
            state.search = {
                ...state.search,
                ...actions.payload
            }
        },
        modify_observing(state, actions) {
            state.observing_article = {
                ...state.observing_article,
                ...actions
            }
        }
    }
})

export default articles.reducer
export const { modify_search, modify_observing } = articles.actions