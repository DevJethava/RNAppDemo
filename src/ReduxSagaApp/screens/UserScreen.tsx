import { View, Text, SafeAreaView, Button, ActivityIndicator } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { GetUsers, getUserFromAPI } from '../redux/actions/apiAction'
import colors from 'tailwindcss/colors'

const UserScreen = () => {

    // For Perform any Action
    const dispatch = useDispatch()

    // Access store data
    const apiReducer = useSelector((state) => state.apiReducer)

    // Get API data access using Promise
    const callGetUserAPI = () => {
        getUserFromAPI(dispatch).then(res => {
            console.log(res)
        }).catch(error => {
            console.log(error)
        })
    }

    // call API using async dispatch and access using state
    const callGetUserAPIUsingState = async () => {
        await dispatch(GetUsers())
    }

    if (apiReducer.loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator size={'large'} color={colors.gray[700]} />
            </View>
        )
    }

    return (
        <SafeAreaView className="flex-1">
            <View className="flex items-center justify-center bg-slate-100">
                {/* For API Calling Demo using Redux */}
                <Button title='Using Promise' onPress={callGetUserAPI} />
                <Button title='Using State' onPress={callGetUserAPIUsingState} />
                <Text>{JSON.stringify(apiReducer.Users)}</Text>
            </View>
        </SafeAreaView>
    )
}

export default UserScreen