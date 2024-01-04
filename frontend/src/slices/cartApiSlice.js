import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {cartItems: []};


const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            const cart_item = action.payload;
            const ItemInCart = state.cartItems.find((x) => x._id === cart_item._id);
            if (ItemInCart) {
                state.cartItems.map((x) => x._id === ItemInCart._id ? cart_item : x);
            } else {
                state.cartItems = [...state.cartItems, cart_item];
            }

            return updateCart(state);
        },
    },
})

export const { AddToCart } = cartSlice.actions;
export default cartSlice.reducer;