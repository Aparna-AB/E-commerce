import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    eCommerceTodos: [],
};

const reduxTodoSlice = createSlice({
    name: "eCommerceTodos",
    initialState,
    reducers: {
        addTodo: (state, action) => {
            let newUser = {
                // id: state.eCommerceTodos.length + 1,
                name: action.payload,
                email:action.payload,
                status: "pending",
            };
            state.eCommerceTodos=[...state.eCommerceTodos,newUser];
        },
    },
});

export const {addTodo}=reduxTodoSlice.actions;
export default reduxTodoSlice.reducer;