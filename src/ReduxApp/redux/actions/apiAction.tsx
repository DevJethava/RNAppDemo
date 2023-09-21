import axios from "axios";
import { GET_USERS, HIDE_API_LOADING, SHOW_API_LOADING } from "./actionTypes";

/**
 * One Using Promise to get Data (Good option)
 */
export const getUserFromAPI = async (dispatch) => {
    return await new Promise((resolve, reject) => {
        dispatch(showAPILoading())
        axios.get(`https://reqres.in/api/users`)
            .then(res => {
                resolve(res.data)
            }).catch(error => {
                reject(error);
            }).finally(() => dispatch(hideAPILoading()))
    })
}

// Other Method to store data in state then access data
export const GetUsers = () => {
    return async dispatch => {
        dispatch(showAPILoading())
        await axios.get(`https://reqres.in/api/users`)
            .then(res => {
                const persons = res.data.data;
                dispatch(getUserData(persons));
            })
            .catch((error) => console.log(error))
            .finally(() => dispatch(hideAPILoading()))
    };
};

export const getUserData = (persons) => {
    return {
        type: GET_USERS,
        payload: persons
    }
}

export const showAPILoading = () => {
    return {
        type: SHOW_API_LOADING
    }
}

export const hideAPILoading = () => {
    return {
        type: HIDE_API_LOADING
    }
}