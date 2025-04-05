import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment } from "@/types/types";

interface assignments {
    assignments: Assignment[]
}

const initialState: assignments = {
    assignments :[]
}

const assignmentSlice= createSlice({
    name:"assignment",
    initialState,
    reducers:{
        addAssignment(state, action: PayloadAction<Assignment[]>){
            console.log("dispatch")
            state.assignments = action.payload;
        },
        updateAssignment(state, action: PayloadAction<{index: number; partner: Assignment}>){
            const {index, partner} = action.payload
            state.assignments[index]= partner
        },
        deleteAssignment(state){
            state.assignments = []
        }
    }
});

export const {addAssignment, updateAssignment, deleteAssignment} = assignmentSlice.actions

export default assignmentSlice.reducer