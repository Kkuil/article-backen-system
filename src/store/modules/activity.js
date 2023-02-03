import { createSlice } from "@reduxjs/toolkit"

const activity = createSlice({
    name: "activity",
    initialState: {
        activities: []
    },
    reducers: {
        save_activities(state, actions) {
            state.activities = actions.payload.activities
        },
        del_activity(state, actions) {
            state.activities = state.activities.filter(a => a.id !== actions.payload.id)
        }
    }
})

export default activity.reducer
export const { del_activity, save_activities } = activity.actions
