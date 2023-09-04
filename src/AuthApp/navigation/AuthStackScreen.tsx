import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Screen from '../utils/Screen';
import LoginScreen from '../screens/Auth/LoginScreen';
import SignupScreen from '../screens/Auth/SignupScreen';

const AuthStack = createNativeStackNavigator();

const AuthStackScreen = () => {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name={Screen.LoginScreen}
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name={Screen.SignupScreen}
                component={SignupScreen}
                options={{ headerShown: false }}
            />
        </AuthStack.Navigator>
    )
}


export default AuthStackScreen