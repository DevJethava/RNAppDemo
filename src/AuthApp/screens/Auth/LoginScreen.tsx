import { View, Text, SafeAreaView, TextInput, Keyboard, Button, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../../utils/CommonStyles'
import Screen from '../../utils/Screen'
import { useAuth } from '../../context/useAuth'
import { AuthData } from '../../context/AuthProvider'

const LoginScreen = ({ navigation, route }) => {

    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const onSignInPress = () => {
        if (email.trim().length <= 0) {
            Alert.alert("Please Enter valid Email!!")
            return
        }

        if (password.trim().length < 8) {
            Alert.alert("Please Enter valid Password!!")
            return
        }

        signIn({ email: email, token: password } as AuthData)
    }

    const goToSignUpScreen = () => {
        navigation.navigate(Screen.SignupScreen)
    }

    return (
        <View style={CommonStyles.containerCenter}>
            <Text className="text-violet-500 font-bold text-3xl">Sign In</Text>

            <View style={{ width: "100%" }} className="px-8 mt-8">
                <Text>Email</Text>
                <TextInput
                    style={{ width: "100%" }}
                    className="mt-2 border-[1.5px] p-2 rounded-lg"
                    onChangeText={text => setEmail(text)}
                    placeholder="Enter Email"
                    placeholderTextColor="#8b9cb5"
                    value={email}
                    keyboardType="default"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    returnKeyType="next"
                />
            </View>

            <View style={{ width: "100%" }} className="px-8 mt-8">
                <Text>Password</Text>
                <TextInput
                    style={{ width: "100%" }}
                    className="mt-2 border-[1.5px] p-2 rounded-lg"
                    onChangeText={text => setPassword(text)}
                    placeholder="Enter Password"
                    placeholderTextColor="#8b9cb5"
                    value={password}
                    keyboardType="default"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    returnKeyType="next"
                />
            </View>

            <Text className="text-sm mt-4">
                Don't Have an Account?
                <Text className="font-semibold text-violet-500" onPress={goToSignUpScreen}> Sign Up</Text>
            </Text>

            <TouchableOpacity className="px-8 py-2 bg-violet-500 rounded-lg mt-8" activeOpacity={0.5} onPress={onSignInPress}>
                <Text className="text-white font-bold text-sm">Log In</Text>
            </TouchableOpacity>
        </View>
    )
}

export default LoginScreen