import { View, Text, Image, Dimensions, StatusBar, TouchableOpacity, Platform, Alert } from 'react-native'
import React, { useState } from 'react'
import { BGImage, Logo } from '../../assets'
import colors from 'tailwindcss/colors'
import UserTextInput from '../../components/UserTextInput'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon } from 'react-native-heroicons/outline'
import Screen from '../../utils/Screen'
import Const from '../../utils/Const'
import Button from '../../components/Button'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { firebaseAuth, firestoreDB } from '../../config/firebase.config'
import { useAuth } from '../../context/useAuth'
import { doc, getDoc } from 'firebase/firestore'
import { AuthData } from '../../utils/Types'

const ios = Platform.OS === 'ios'

const LoginScreen = ({ navigation, route }) => {

    const screenWidth = Math.round(Dimensions.get('window').width)
    const { signIn } = useAuth();

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const [passwordSecureEntry, setPasswordSecureEntry] = useState<boolean>(true)

    const [getEmailValidationStatus, setEmailValidationStatus] = useState<boolean>(true)

    const handleLogin = async () => {
        if (getEmailValidationStatus && email === "") {
            Alert.alert("Error", "Please Enter valid Email.")
            return
        }

        if (password.trim().length <= 7) {
            Alert.alert("Error", "Please Enter valid Password.")
            return
        }

        await signInWithEmailAndPassword(firebaseAuth, email, password).then((userData) => {
            const _uuid = userData.user.uid
            getDoc(doc(firestoreDB, 'users', _uuid)).then((docSnap) => {
                if (docSnap.exists()) {
                    // console.log(docSnap.data())
                    signIn({ token: _uuid, data: JSON.stringify(docSnap.data()) } as AuthData).then(() => { })
                } else {
                    Alert.alert("Error", "Something went wrong! try again after some time.")
                }
            })
        }).catch((error) => {
            const errorCode = error.code;
            if (errorCode === 'auth/wrong-password') {
                Alert.alert("Error", 'Wrong Email and Password!')
            } else if (errorCode === 'auth/user-not-found') {
                Alert.alert("Error", 'User Not Found, Please SignUp.')
            } else if (errorCode === 'auth/network-request-failed') {
                Alert.alert("Error", 'Check your Internet Connection.')
            } else {
                console.log("error => ", error)
                console.log("error.code => ", error.code)
                console.log("error.message => ", error.message)
            }
        })
    }

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
                    <Button title='Sign In' onPress={handleLogin} />

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