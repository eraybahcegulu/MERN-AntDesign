import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GET_ORDERS_API_URL = process.env.REACT_APP_API_URL + "/api/orders/get-all";

export const fetchOrdersData = createAsyncThunk('fetchOrdersData', async () => {
    try {
        const response = await axios.get(GET_ORDERS_API_URL);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
});

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        data: [],
        status: 'idle',
    },

    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrdersData.pending, (state) => {
                state.status = 'loading';
            }) // createAsyncThunk => fetchOrdersData asenkron işlemi devam ediyor.

            .addCase(fetchOrdersData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
            }) //createAsyncThunk => fetchOrdersData asenkron işlemi tamamlandı. (fulfilled)
            
            .addCase(fetchOrdersData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });//createAsyncThunk => fetchOrdersData asenkron işlemi hata ile sonuçlandı.
    },
});

export default ordersSlice.reducer;
