import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from '../utils/Screen';
import HomeScreen from '../screens/Home/HomeScreen';
import DetailScreen from '../screens/Home/DetailScreen';

const HomeStack = createNativeStackNavigator();

const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name={Screen.HomeScreen}
                component={HomeScreen}
                options={{ headerShown: true, title: "Home" }}
            />
            <HomeStack.Screen
                name={Screen.DetailScreen}
                component={DetailScreen}
                options={{ headerShown: true, title: "Details" }}
            />
        </HomeStack.Navigator>
    )
}

export default HomeStackScreen