import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice"
import assignmentReducer from "./assignmentSlice"
import orderReduser from './orderSlice'

const appStore = configureStore({
    reducer:{
        partner: partnerReducer,
        assignment: assignmentReducer,
        order: orderReduser
    }
})

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;