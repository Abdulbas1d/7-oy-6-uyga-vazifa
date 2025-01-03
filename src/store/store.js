import { configureStore } from "@reduxjs/toolkit";
import cartReducer from './cartSlice.js'

export const store = configureStore({
    reducer: {
        "cart": cartReducer
    }
})