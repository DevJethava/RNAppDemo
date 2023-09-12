import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from '../utils/Screen';
import HomeScreen from '../screens/Home/HomeScreen';
import ProfileScreen from '../screens/Home/ProfileScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator screenOptions={{ headerShown: false }}>
            <HomeStack.Screen
                name={Screen.HomeScreen}
                component={HomeScreen}
            />
            <HomeStack.Screen
                name={Screen.ProfileScreen}
                component={ProfileScreen}
            />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen