import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Assignment, AssignmentMetrics } from "@/types/types";

interface assignments {
    assignments: Assignment[],
    assignmentMetrics: AssignmentMetrics | null
}

const initialState: assignments = {
    assignments :[],
    assignmentMetrics: null
}

const assignmentSlice= createSlice({
    name:"assignment",
    initialState,
    reducers:{
        addAssignment(state, action: PayloadAction<Assignment[]>){
            // console.log("dispatch")
            state.assignments = action.payload;
        },
        updateAssignment(state, action: PayloadAction<{index: number; partner: Assignment}>){
            const {index, partner} = action.payload
            state.assignments[index]= partner
        },
        deleteAssignment(state){
            state.assignments = []
        },
        addAssignmentMetrics(state, action: PayloadAction<AssignmentMetrics>){
            state.assignmentMetrics = action.payload;
        },
        deleteAssignmentMetrics(state){
            state.assignmentMetrics = null
        },
    }
});

export const {addAssignment, updateAssignment, deleteAssignment, addAssignmentMetrics, deleteAssignmentMetrics} = assignmentSlice.actions

export default assignmentSlice.reducer