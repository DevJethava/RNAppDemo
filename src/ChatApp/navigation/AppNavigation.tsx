import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeStackScreen from './HomeStackScreen'
import AuthStackScreen from './AuthStackScreen'

const AppNavigation = () => {
    return (
        <NavigationContainer>
            {/* <HomeStackScreen /> */}
            <AuthStackScreen />
        </NavigationContainer>
    )
}

export default AppNavigation