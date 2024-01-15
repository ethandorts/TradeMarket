import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : 
{cartItems: [], ShippingAddress: {}, PaymentMethod: 'Paypal'};
// Can implement Stripe here as well

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        AddToCart: (state, action) => {
            const cart_item = action.payload;
            const itemIndex = state.cartItems.findIndex((x) => x._id === cart_item._id);

            if (itemIndex !== -1) {
                state.cartItems[itemIndex] = cart_item;
            } else {
                state.cartItems.push(cart_item);
            }

            return updateCart(state);
        },
        RemoveItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);

            return updateCart(state);
        },
        saveShippingAddress: (state, action) => {
            state.ShippingAddress = action.payload;
            return updateCart(state);
        },
        savePaymentMethod: (state, action) => {
            state.PaymentMethod = action.payload;
            return updateCart(state);
        },
        clearCartItems: (state, action) => {
            state.cartItems = [];
            return updateCart(state);
        }
    },
});

export const { AddToCart, RemoveItemFromCart, saveShippingAddress, savePaymentMethod, clearCartItems } = cartSlice.actions;
export default cartSlice.reducer;
