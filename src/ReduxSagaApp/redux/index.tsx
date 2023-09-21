import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./reducers/cartReducer";
import { apiReducer } from "./reducers/apiReducer";
import createSagaMiddleware from 'redux-saga'
import SagaData from "./saga/saga";

// Import multiple reducer if you have
// use left name when access state data
const rootReducer = combineReducers({
    cartReducer: cartReducer,
    apiReducer: apiReducer
})

const sagaMiddleware = createSagaMiddleware()

// Added automatically if use @reduxjs/toolkit
const store = configureStore({
    reducer: rootReducer,
    middleware: () => [sagaMiddleware]
})

// Manual setup
// const store = createStore(rootReducer, applyMiddleware(thunk))

sagaMiddleware.run(SagaData)

export default store