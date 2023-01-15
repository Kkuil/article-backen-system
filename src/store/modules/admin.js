import { createSlice } from "@reduxjs/toolkit"

const admin = createSlice({
    name: "admin",
    initialState: {
        admin: {
            id: "xxx",
            admin_name: "Kkuil",
            privilege: ""
        }
    },
    reducers: {
        modify(state, actions) {
            state.admin = actions.payload.admin
        }
    }
})

export default admin.reducer
export const { modify } = admin.actions