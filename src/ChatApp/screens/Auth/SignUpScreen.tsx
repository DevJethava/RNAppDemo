import { View, Text, Image, Dimensions, StatusBar, TouchableOpacity, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { BGImage, Logo } from '../../assets'
import colors from 'tailwindcss/colors'
import UserTextInput from '../../components/UserTextInput'
import { EnvelopeIcon, EyeIcon, EyeSlashIcon, LockClosedIcon, UserIcon } from 'react-native-heroicons/outline'
import { avatars } from '../../utils/Avatar'
import { BlurView } from '@react-native-community/blur'
import * as Animatable from 'react-native-animatable';
import Const from '../../utils/Const'

const ios = Platform.OS === 'ios'

const SignUpScreen = ({ navigation, route }) => {

    const screenWidth = Math.round(Dimensions.get('window').width)
    const screenHeight = Math.round(Dimensions.get('window').height)

    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const [avatar, setAvatar] = useState(avatars[0]?.image.asset.url)

    const [passwordSecureEntry, setPasswordSecureEntry] = useState<boolean>(true)
    const [isAvatarMenu, setIsAvatarMenu] = useState<boolean>(false)

    const [getEmailValidationStatus, setEmailValidationStatus] = useState<boolean>(false)

    const handleAvatar = (item) => {
        setAvatar(item.image.asset.url)
        setIsAvatarMenu(false)
    }

    return (
        <View className="flex-1 items-center justify-start">
            <StatusBar barStyle={ios ? 'light-content' : 'dark-content'} backgroundColor={colors.transparent} />
            <Image
                source={BGImage}
                className="h-96 -m-[2px]"
                resizeMode='cover'
                style={{ width: screenWidth }} />

            {/* List of Avatar Section */}
            {
                isAvatarMenu && (
                    <>
                        <Animatable.View animation={"fadeInDownBig"} className="absolute inset-0 z-10" style={{ width: screenWidth, height: screenHeight }}>
                            <BlurView
                                blurType="light"
                                blurAmount={15}
                                style={{ width: screenWidth, height: screenHeight }}>
                                <ScrollView>
                                    <View className="w-full h-full px-4 py-16 flex-row flex-wrap items-center justify-evenly">
                                        {
                                            avatars.map((item) => (
                                                <TouchableOpacity
                                                    key={item._id}
                                                    activeOpacity={0.5}
                                                    className='h-20 w-20 m-3 p-1 rounded-full border-2 border-chatapp-primary relative'
                                                    onPress={() => handleAvatar(item)}
                                                >
                                                    <Image
                                                        source={{ uri: item.image.asset.url }}
                                                        resizeMode='contain'
                                                        className="w-full h-full" />
                                                </TouchableOpacity>
                                            ))
                                        }
                                    </View>
                                </ScrollView>
                            </BlurView>
                        </Animatable.View>
                    </>
                )
            }

            {/* Main View */}
            <View className="w-full h-full bg-white rounded-tl-[90px] -m-44 flex items-center justify-start py-6 px-6 space-y-6">

                {/* Top Logo */}
                <Image
                    source={Logo}
                    className="w-16 h-16"
                    resizeMode='contain' />

                {/* Welcome Text */}
                <Text className="py-2 text-chatapp-primaryText text-xl font-semibold">Join with US!</Text>

                {/* Avatar Section */}
                <View className="w-full flex items-center justify-center relative -my-4">
                    <TouchableOpacity
                        onPress={() => setIsAvatarMenu(true)}
                        activeOpacity={0.5}
                        className="h-20 w-20 p-1 rounded-full border-2 border-chatapp-primary relative">
                        <Image source={{ uri: avatar }} className="w-full h-full" resizeMode='contain' />
                        {/* <View classname="w-6 h-6 bg-chatapp-primary rounded-full absolute flex items-center justify-center">
                            <PencilSquareIcon size={18} color={colors.green[400]} />
                        </View> */}
                    </TouchableOpacity>
                </View>

                {/* Login Form */}
                <View className="w-full flex items-center justify-center">

                    {/* Alert */}

                    {/* Full Name */}
                    <UserTextInput
                        placeholder="Full Name"
                        secureTextEntry={false}
                        value={name}
                        onChangeText={(text) => setName(text)}
                        LeftIcon={<UserIcon size={24} color={"#6c6d83"} />}
                    />

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
                        <Text className="py-2 text-white text-xl font-semibold">Sign Up</Text>
                    </TouchableOpacity>

                    <View className="flex-row w-full items-center justify-center space-x-2">
                        <Text className="text-base text-chatapp-primaryText">Already have an account?</Text>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                            <Text className="text-base font-semibold text-chatapp-primaryBold">Login Here</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SignUpScreen