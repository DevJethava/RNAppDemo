import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/actionTypes";

const initialState = []

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            let addIndex: number = state.findIndex((item) => item._id === action.payload._id)
            console.log(addIndex)
            if (addIndex == -1) {
                // For First time Item add
                return [...state, { ...action.payload, qty: 1 }]
            } else {
                // Update Existing item
                const updatedCartData = [...state]
                updatedCartData[addIndex] = { ...state[addIndex], qty: state[addIndex].qty + 1 }
                return [...updatedCartData]
            }

        case REMOVE_FROM_CART:
            let removeIndex: number = state.findIndex((item) => item._id === action.payload)
            if (removeIndex == -1) {
                return state
            } else {
                const updatedCartData = [...state]
                if (updatedCartData[removeIndex].qty <= 0) {
                    return state
                } else {
                    updatedCartData[removeIndex] = { ...state[removeIndex], qty: state[removeIndex].qty <= 0 ? 0 : state[removeIndex].qty - 1 }
                    return [...updatedCartData]
                }
            }

        default:
            return state
    }
}