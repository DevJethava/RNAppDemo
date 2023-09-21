import { View, Text, ActivityIndicator, StatusBar, Image, Platform } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import HomeStackScreen from './HomeStackScreen'
import AuthStackScreen from './AuthStackScreen'
import { useAuth } from '../context/useAuth'
import { BGImage, Logo } from '../assets'
import colors from 'tailwindcss/colors'
import { BlurView } from '@react-native-community/blur'

const ios = Platform.OS === 'ios'

const AppNavigation = () => {

    const { authData, loading } = useAuth();

    if (loading) {
        return (
            <View className="flex-1 items-center justify-start">
                <StatusBar barStyle={ios ? 'light-content' : 'dark-content'} backgroundColor={colors.transparent} />
                <Image
                    source={BGImage}
                    className="h-96 -m-[2px]"
                    resizeMode='cover'
                    style={{ width: "100%", height: '100%' }} />
                <View className="absolute inset-0 z-10, justify-center items-center" style={{ width: "100%", height: "100%" }}>
                    <BlurView
                        blurType="dark"
                        blurAmount={5}
                        style={{ width: "100%", height: "100%" }}>
                        <View className="space-y-16" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={Logo}
                                className="w-32 h-32"
                                resizeMode='contain' style={{ height: 128, width: 128 }} />
                            <ActivityIndicator size={'large'} color={colors.green[200]} />
                        </View>
                    </BlurView>
                </View>
            </View>
        )
    }

    return (
        <NavigationContainer>
            {
                authData?.token ? <HomeStackScreen /> : <AuthStackScreen />
            }
        </NavigationContainer>
    )
}

export default AppNavigation