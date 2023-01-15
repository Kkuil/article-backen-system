import { createSlice } from "@reduxjs/toolkit"

const check_article = createSlice({
    name: "check_article",
    initialState: {
        check_article: {
            articles: [],
            searchValue: "",
            limit: 10,
            offset: 0,
            total: 0
        }
    },
    reducers: {
        modify(state, actions) {
            state.check_article = {
                ...state.check_article,
                ...actions.payload
            }
        },
    }
})

export default check_article.reducer
export const { modify } = check_article.actions