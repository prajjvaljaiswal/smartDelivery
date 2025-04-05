import { createSlice, PayloadAction  } from "@reduxjs/toolkit";
import { Order } from "@/types/types";

interface orders{
    orders: Order[]
};

const initialState: orders={
    orders: []
}

const orderSlice= createSlice({
    name:"order",
    initialState,
    reducers:{
        addOrders(state,action: PayloadAction<Order[]>){
            state.orders = action.payload
        },
        deleteOrders(start){
            start.orders = []
        }
    }
});

export const {addOrders, deleteOrders} = orderSlice.actions
export default orderSlice.reducer;