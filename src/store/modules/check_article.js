import { createSlice } from "@reduxjs/toolkit"

const check_article = createSlice({
    name: "check_article",
    initialState: {
        search: {
            articles: [],
            searchValue: "",
            limit: 10,
            offset: 0,
            total: 0
        },
        checking_article: {
            article: {
                article_id: "666",
                title: "xxx",
                username: "Kkuil",
                content: "xxx",
                upload_time: "1970年1月1日 08:00:00"
            },
            isChecking: false
        }
    },
    reducers: {
        modify_search(state, actions) {
            state.search = {
                ...state.search,
                ...actions.payload
            }
        },
        modify_checking(state, actions) {
            console.log(actions)
            state.checking_article = {
                ...state.checking_article,
                ...actions
            }
        }
    }
})

export default check_article.reducer
export const { modify_search, modify_checking } = check_article.actions