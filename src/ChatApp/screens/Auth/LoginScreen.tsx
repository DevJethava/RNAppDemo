import { View, Text, Image, Dimensions, StatusBar, TouchableOpacity, Platform } from 'react-native'
import React, { useState } from 'react'
import { BGImage, Logo } from '../../assets'
import colors from 'tailwindcss/colors'
import UserTextInput from '../../components/UserTextInput'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from 'react-native-heroicons/outline'
import Screen from '../../utils/Screen'
import Const from '../../utils/Const'

const ios = Platform.OS === 'ios'

const LoginScreen = ({ navigation, route }) => {

    const screenWidth = Math.round(Dimensions.get('window').width)

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [passwordSecureEntry, setPasswordSecureEntry] = useState<boolean>(true)

    const [getEmailValidationStatus, setEmailValidationStatus] = useState<boolean>(true)

    return (
        <View className="flex-1 items-center justify-start">
            <StatusBar barStyle={ios ? 'light-content' : 'dark-content'} backgroundColor={colors.transparent} />
            <Image
                source={BGImage}
                className="h-96 -m-[2px]"
                resizeMode='cover'
                style={{ width: screenWidth }} />

            {/* Main View */}

            <View className="w-full h-full bg-white rounded-tl-[90px] -m-44 flex items-center justify-start py-6 px-6 space-y-6">

                {/* Top Logo */}
                <Image
                    source={Logo}
                    className="w-16 h-16"
                    resizeMode='contain' />

                {/* Welcome Text */}
                <Text className="py-2 text-chatapp-primaryText text-xl font-semibold">Welcome Back!</Text>

                {/* Login Form */}
                <View className="w-full flex items-center justify-center">

                    {/* Alert */}

                    {/* Email */}
                    <UserTextInput
                        placeholder="Email"
                        secureTextEntry={false}
                        value={email}
                        onChangeText={(text) => {
                            setEmail(text)
                            setEmailValidationStatus(Const.emailReg.test(text))
                        }}
                        LeftIcon={<EnvelopeIcon size={24} color={"#6c6d83"} />}
                        errorShow={!getEmailValidationStatus}
                    />

                    {/* Password */}
                    <UserTextInput
                        placeholder="Password"
                        secureTextEntry={passwordSecureEntry}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        LeftIcon={<LockClosedIcon size={24} color={"#6c6d83"} />}
                        RightIcon={
                            passwordSecureEntry ?
                                <EyeSlashIcon size={24} color={"#6c6d83"} onPress={() => setPasswordSecureEntry(!passwordSecureEntry)} />
                                :
                                <EyeIcon size={24} color={"#6c6d83"} onPress={() => setPasswordSecureEntry(!passwordSecureEntry)} />
                        }
                    />

                    {/* Login Button */}
                    <TouchableOpacity
                        activeOpacity={0.5}
                        className="w-full px-4 py-2 rounded-xl bg-chatapp-primary my-3 flex items-center justify-center">
                        <Text className="py-2 text-white text-xl font-semibold">Sign In</Text>
                    </TouchableOpacity>

                    <View className="flex-row w-full items-center justify-center space-x-2">
                        <Text className="text-base text-chatapp-primaryText">Don't have an account?</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(Screen.SignUpScreen)}>
                            <Text className="text-base font-semibold text-chatapp-primaryBold">Create Account</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default LoginScreen