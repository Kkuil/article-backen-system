import { createSlice } from "@reduxjs/toolkit"

const users = createSlice({
    name: "users",
    initialState: {
        search: {
            users: [],
            searchValue: "",
            limit: 10,
            offset: 0,
            total: 0
        },
        observing_user: {
            user: {
                id: "666",
                username: "Kkuil",
                password: "123456",
                avatar: "",
                phone_number: "15579868330"
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
            console.log(actions)
            state.observing_user = {
                ...state.observing_user,
                ...actions
            }
        }
    }
})

export default users.reducer
export const { modify_search, modify_observing } = users.actions