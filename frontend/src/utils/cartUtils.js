export const DecimalHelper = (num) => {
    return Math.round(num * 100 / 100).toFixed(2);
}

export const updateCart =(state) => {
    state.TotalItemsPrice = DecimalHelper(state.cartItems.reduce((accumulator, item) => accumulator + item.price * item.quantity, 0));

            state.ShippingPrice = DecimalHelper(state.TotalItemsPrice > 50 ? 0 : 5);

            state.TaxToPay = DecimalHelper(Number((0.20 * state.TotalItemsPrice).toFixed(2)));

            state.OverallPrice = (
                Number(state.itemsPrice) + Number(state.ShippingPrice) + Number(state.TaxToPay)).toFixed(2);

            localStorage.setItem('cart', JSON.stringify(state));
}