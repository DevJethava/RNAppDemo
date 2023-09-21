import { applyMiddleware, combineReducers, configureStore, legacy_createStore as createStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import thunk from 'redux-thunk'
import { apiReducer } from "./reducers/apiReducer";

// Import multiple reducer if you have
// use left name when access state data
const rootReducer = combineReducers({
    cartReducer: cartReducer,
    apiReducer: apiReducer
})

// Added automatically if use @reduxjs/toolkit
// const store = configureStore({
//     reducer: rootReducer,
// })

// Manual setup
const store = createStore(rootReducer, applyMiddleware(thunk))

export default store