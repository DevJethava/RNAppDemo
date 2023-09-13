import { View, Text, TouchableOpacity, Image, TextInput, Alert, ActivityIndicator } from 'react-native'
import React, { useLayoutEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/solid'
import { useAuth } from '../../context/useAuth'
import { UserFirestoreData } from '../../utils/Types'
import { ChatBubbleBottomCenterTextIcon, PaperAirplaneIcon } from 'react-native-heroicons/outline'
import { doc, setDoc } from 'firebase/firestore'
import { firestoreDB } from '../../config/firebase.config'
import Screen from '../../utils/Screen'
import colors from 'tailwindcss/colors'

const AddToChatScreen = ({ navigation, route }) => {

    const { signOut, authData } = useAuth()
    const user = JSON.parse(authData.data) as UserFirestoreData

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [addChat, setAddChat] = useState<string>("")

    const createNewChat = async () => {

        if (addChat.trim().length <= 0 && addChat === "") {
            Alert.alert("Error", "Please enter chat name.")
            return
        }

        setIsLoading(true)
        let _id = `${Date.now()}`

        const _doc = {
            _id,
            user,
            chatName: addChat
        }

        setDoc(doc(firestoreDB, "chats", _id), _doc).then(() => {
            setAddChat("")
            navigation.goBack()
        }).catch((error) => {
            console.log(error);
            Alert.alert("Error", error)
        }).finally(() => {
            setIsLoading(false)
        })
    }

    return (
        <View className="flex-1">

            {/* Top Bar Section */}
            <View className="w-full bg-chatapp-primary py-6 flex-[0.25]">
                <View className="flex-row items-center justify-between w-full px-4 py-12">
                    {/* Back Button Section */}
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size={32} color={"#fbfbfb"} onPress={() => navigation.goBack()} />
                    </TouchableOpacity>

                    {/* Middle Section */}

                    {/* Bottom Section */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Screen.ProfileScreen)}
                        activeOpacity={0.5}
                        className="w-12 h-12 rounded-full border border-white flex items-center justify-center"
                    >
                        <Image
                            source={{ uri: user.profilePic }}
                            className="w-full h-full"
                            resizeMode='cover' />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Find User Section */}
            <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-12">
                <View className="w-full px-4 py-4">
                    <View className="w-full px-4 flex-row items-center justify-between py-3 rounded-xl border border-gray-300 space-x-3">
                        <ChatBubbleBottomCenterTextIcon size={24} color={"#777"} />

                        {/* Text Input */}
                        <TextInput
                            className="flex-1 text-lg text-chatapp-primaryText -mt-2 h-12 w-full"
                            placeholder='Create a Chat'
                            placeholderTextColor={"#999"}
                            value={addChat}
                            onChangeText={(text) => setAddChat(text)}
                        />

                        <TouchableOpacity activeOpacity={0.5} onPress={createNewChat}>
                            <PaperAirplaneIcon size={24} color={"#777"} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Loader */}
                {
                    isLoading && (
                        <View className="flex-1 items-center justify-center">
                            <ActivityIndicator size={'large'} color={colors.green[600]} />
                        </View>
                    )
                }
            </View>
        </View>
    )
}

export default AddToChatScreen