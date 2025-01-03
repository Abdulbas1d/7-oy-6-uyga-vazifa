import { createSlice } from "@reduxjs/toolkit";

const initialState = JSON.parse(localStorage.getItem('cart')) || [];

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        add: (state, action) => {
            const exist = state.find(value => value.id == action.payload.id && action.payload.color == value.color)
            if (exist) {
                exist.amount += action.payload.amount
            } else {
                state.push({ ...action.payload, amount: action.payload.amount })
            }
        },
        cart(state, action) {
            return action.payload;
        },
        remove: (state, action) => {
            return state.filter(value => value.id != action.payload.id && action.payload.color == value.color)
        },
        clear: (state, action) => {
            return []
        },
        update: (state, action) => {
            state.map(value => {
                if (value.id == action.payload.id && action.payload.color == value.color) {
                    value.amount = action.payload.amount
                }
                return value
            })
        }
    }
})

export default cartSlice.reducer;
export const { add, remove, clear, update, cart } = cartSlice.actions;