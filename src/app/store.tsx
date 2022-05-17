import { configureStore } from "@reduxjs/toolkit";
import combineReducer from "../features/parking/combineReducer";

export default configureStore({
    reducer:{
        parking:combineReducer

    }
})

