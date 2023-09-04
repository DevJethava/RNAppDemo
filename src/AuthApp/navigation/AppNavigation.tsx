import React, { } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import AuthStackScreen from './AuthStackScreen';
import HomeStackScreen from './HomeStackScreen';
import { ActivityIndicator, SafeAreaView, Text, View } from 'react-native';
import { useAuth } from '../context/useAuth';
import CommonStyles from '../utils/CommonStyles';

const AppNavigation = () => {
    const { authData, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size={'large'} />
                <Text className="text-black text-lg">Loading.....</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={CommonStyles.container}>
            <NavigationContainer>
                {
                    authData?.token ? <HomeStackScreen /> : <AuthStackScreen />
                }
            </NavigationContainer>
        </SafeAreaView>
    )
}

export default AppNavigation