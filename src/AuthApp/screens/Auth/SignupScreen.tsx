import { View, Text, TextInput, Keyboard, TouchableOpacity, Alert } from 'react-native'
import React, { useState } from 'react'
import CommonStyles from '../../utils/CommonStyles'
import { useAuth } from '../../context/useAuth'
import { AuthData } from '../../context/AuthProvider'

const SignupScreen = ({ navigation, route }) => {

    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [confirmPassword, setConfirmPassword] = useState<string>("")

    const onSignUpPress = () => {
        if (email.trim().length <= 0) {
            Alert.alert("Please Enter valid Email!!")
            return
        }

        if (password.trim().length < 8) {
            Alert.alert("Please Enter valid Password!!")
            return
        }

        if (password.trim() !== confirmPassword.trim()) {
            Alert.alert("Please Enter valid Confirm Password!!")
            return
        }

        signIn({ email: email, token: password } as AuthData)
    }

    const goToSignInScreen = () => {
        navigation.goBack()
    }

    return (
        <View style={CommonStyles.containerCenter}>
            <Text className="text-violet-500 font-bold text-3xl">Sign Up</Text>

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

            <View style={{ width: "100%" }} className="px-8 mt-8">
                <Text>Confirm Password</Text>
                <TextInput
                    style={{ width: "100%" }}
                    className="mt-2 border-[1.5px] p-2 rounded-lg"
                    onChangeText={text => setConfirmPassword(text)}
                    placeholder="Re-Enter Password"
                    placeholderTextColor="#8b9cb5"
                    value={confirmPassword}
                    keyboardType="default"
                    onSubmitEditing={Keyboard.dismiss}
                    blurOnSubmit={false}
                    secureTextEntry={true}
                    returnKeyType="next"
                />
            </View>

            <Text className="text-sm mt-4">
                Already Have an Account?
                <Text className="font-semibold text-violet-500" onPress={goToSignInScreen}> Log In</Text>
            </Text>

            <TouchableOpacity className="px-8 py-2 bg-violet-500 rounded-lg mt-8" activeOpacity={0.5} onPress={onSignUpPress}>
                <Text className="text-white font-bold text-sm">Sign Up</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SignupScreen