import { configureStore } from "@reduxjs/toolkit";
import partnerReducer from "./partnerSlice"
import assignmentReducer from "./assignmentSlice"

const appStore = configureStore({
    reducer:{
        partner: partnerReducer,
        assignment: assignmentReducer
    }
})

export type RootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
export default appStore;