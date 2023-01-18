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
            isObservation: false
        }
    },
    reducers: {
        modify_search(state, actions) {
            console.log(actions.payload)
            state.search = {
                ...state.search,
                ...actions.payload
            }
        },
        modify_observing(state, actions) {
            state.checking_article = {
                ...state.checking_article,
                ...actions
            }
        }
    }
})

export default articles.reducer
export const { modify_search, modify_observing } = articles.actions