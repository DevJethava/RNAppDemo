import { View, Text, SafeAreaView, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useAuth } from '../../context/useAuth'
import { UserFirestoreData } from '../../utils/Types'
import { Logo } from '../../assets'
import { ChatBubbleLeftRightIcon } from 'react-native-heroicons/solid'
import colors from 'tailwindcss/colors'
import { UserIcon } from 'react-native-heroicons/outline'
import Screen from '../../utils/Screen'
import { DocumentData, collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { firestoreDB } from '../../config/firebase.config'

const HomeScreen = ({ navigation }) => {

    const { authData } = useAuth()
    const user = JSON.parse(authData.data) as UserFirestoreData

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [chats, setChats] = useState<DocumentData[] | null>(null)

    useLayoutEffect(() => {
        const chatQuery = query(collection(firestoreDB, "chats"), orderBy("_id", "desc"))

        const unsubscribe = onSnapshot(chatQuery, (querySnapShot) => {
            const chatRooms = querySnapShot.docs.map(doc => doc.data())
            setChats(chatRooms)
            setIsLoading(false)
        })

        // Return unsubscribe function to stop listening to the Updates
        return unsubscribe
    }, [])

    useEffect(() => {
        // signOut()
    }, [])

    return (
        <View className="flex-1">
            <SafeAreaView>

                {/* Top Bar */}
                <View className="w-full flex-row items-center justify-between px-4 py-2">
                    <Image
                        source={Logo}
                        className="w-12 h-12"
                        resizeMode='contain' />

                    {/* Profile Picture */}
                    <TouchableOpacity
                        onPress={() => navigation.navigate(Screen.ProfileScreen)}
                        activeOpacity={0.5}
                        className="w-12 h-12 rounded-full border border-chatapp-primary flex items-center justify-center"
                    >
                        <Image
                            source={{ uri: user.profilePic }}
                            className="w-full h-full"
                            resizeMode='cover' />
                    </TouchableOpacity>
                </View>

                <View className="w-full flex-row items-center justify-between px-4 py-2">
                    <Text className="text-chatapp-primaryText text-base font-extrabold pb-2">Messages</Text>

                    {/* Chat Icon */}
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate(Screen.AddToChatScreen)}>
                        <ChatBubbleLeftRightIcon size={28} color={"#555"} />
                    </TouchableOpacity>
                </View>

                <ScrollView className="w-full px-4">
                    <View className="w-full">
                        {
                            isLoading ?
                                <>
                                    {/* Chat Loader */}
                                    <View className="w-full flex-1 items-center justify-center">
                                        <ActivityIndicator size={'large'} color={"#43C651"} />
                                    </View>
                                </>
                                :
                                <>
                                    {/* Message Card */}
                                    {
                                        chats && chats.length > 0 ?
                                            (<>
                                                {chats.map(room => (
                                                    <MessageCard key={room._id} room={room} onPress={() => navigation.navigate(Screen.ChatScreen, { room: room })} />
                                                ))}
                                            </>) :
                                            (<>
                                                <View className="w-full flex-1 items-center justify-center">
                                                    <Text>No Data Available!</Text>
                                                    <Text className="text-chatapp-primaryText text-lg">Create a new Chat</Text>
                                                </View>
                                            </>)
                                    }
                                </>
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    )
}

const MessageCard = ({ room, onPress }) => {
    return (
        <View className="flex flex-col">
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={0.5}
                className="w-full flex-row items-center justify-start py-2">
                {/* Profile Image */}
                <View className="w-16 h-16 rounded-full flex items-center border-2 border-chatapp-primary p-1 justify-center">
                    <UserIcon size={24} color={"#555"} />
                </View>

                {/* Name & Chat */}
                <View className="flex-1 flex items-start justify-center ml-4">
                    <Text className="text-[#333] text-base font-semibold capitalize">{room.chatName}</Text>
                    <Text
                        className="text-chatapp-primaryText text-sm"
                        numberOfLines={2}>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel, deleniti!
                    </Text>
                </View>

                {/* Time */}
                <Text className="text-chatapp-primary pl-2 text-base font-semibold">27 min</Text>
            </TouchableOpacity>
            <View className="border mx-4 border-gray-300 rounded-full"></View>
        </View>
    )
}

export default HomeScreen