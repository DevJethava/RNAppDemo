import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from '../utils/Screen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator screenOptions={{ headerShown: false }}>
            <AuthStack.Screen
                name={Screen.LoginScreen}
                component={LoginScreen}
            />
            <AuthStack.Screen
                name={Screen.SignUpScreen}
                component={SignUpScreen}
            />
        </AuthStack.Navigator>
    )
}


export default AuthStackScreen