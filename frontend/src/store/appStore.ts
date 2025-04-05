import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice"

const appStore = configureStore({
    reducer:{
        partner: partnerReducer
    }
})

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;