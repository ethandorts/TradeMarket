import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';

const Store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true,
});

export default Store;