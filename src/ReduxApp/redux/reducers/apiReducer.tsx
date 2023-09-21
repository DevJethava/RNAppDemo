import { GET_USERS, HIDE_API_LOADING, SHOW_API_LOADING } from "../actions/actionTypes"

const initialState = {
    loading: false,
    Users: []
}

export const apiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_API_LOADING:
            return { ...state, loading: true }
        case HIDE_API_LOADING:
            return { ...state, loading: false }
        case GET_USERS:
            return { ...state, Users: action.payload }
        default:
            return state
    }
}