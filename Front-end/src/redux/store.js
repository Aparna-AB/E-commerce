import { configureStore } from "@reduxjs/toolkit";
import reduxTodoReducer from "./reduxTodoReducer/reduxTodoReducer";


const store =configureStore({
    reducer:{
        todo:reduxTodoReducer
    },
})

export default store;