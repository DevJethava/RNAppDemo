import { GET_USERS, HIDE_API_LOADING, SET_USER_LIST, SHOW_API_LOADING } from "../actions/actionTypes"

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
        case SET_USER_LIST:
            return { ...state, Users: action.payload }
        default:
            return state
    }
}