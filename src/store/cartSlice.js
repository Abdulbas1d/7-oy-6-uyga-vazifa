import { createSlice } from "@reduxjs/toolkit";

const initialState = []

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action) => {
            const exist = state.find(value => value.id == action.payload.id && action.payload.color == value.color)
            if (exist) {
                exist.count += action.payload.count
            } else {
                state.push({...action.payload, count: action.payload.count})
            }
        },
        remove: (state, action) => {
            state.filter(value => value.id != action.payload.id && action.payload.color == value.color)
        },
        clear: (state, action) => {
            state = []
        },
        update: (state, action) => {
            state.map(value => {
                if (value.id == action.payload.id && action.payload.color == value.color) {
                    value.count = action.payload.count
                }
                return value
            })
        }
    }
})

export default cartSlice.reducer;
export const { add, remove, clear, update } = cartSlice.actions;