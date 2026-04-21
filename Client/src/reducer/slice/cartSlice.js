import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
    },

    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const existItem = state.cartItems.find(
                (x) =>
                    x.productId === item.productId &&
                    x.variantName === item.variantName
            );

            if (existItem) {
                existItem.quantity += 1;
            } else {
                state.cartItems.push(item);
            }
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (item) => item.productId !== action.payload
            );
        },

        increaseQty: (state, action) => {
            const item = state.cartItems.find(
                (i) => i.productId === action.payload
            );
            if (item) item.quantity += 1;
        },

        decreaseQty: (state, action) => {
            const item = state.cartItems.find(
                (i) => i.productId === action.payload
            );
            if (item && item.quantity > 1) item.quantity -= 1;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
} = cartSlice.actions;

export default cartSlice.reducer;