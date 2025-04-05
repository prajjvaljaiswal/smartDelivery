import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Partner } from "@/types/types";

interface partners{
    partners: Partner[]
}

const initialState: partners={
    partners:[]
}

const partnerSlice= createSlice({
    name:"partner",
    initialState,
    reducers:{
        addPartner(state, action: PayloadAction<Partner[]>){
            console.log("dispatch")
            state.partners = action.payload;
        },
        updatePartner(state, action: PayloadAction<{index: number; partner: Partner}>){
            const {index, partner} = action.payload
            state.partners[index]= partner
        }
    }
});

export const {addPartner, updatePartner}= partnerSlice.actions
export default partnerSlice.reducer
