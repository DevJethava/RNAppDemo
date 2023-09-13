import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, FlatList } from 'react-native'
import React, { useLayoutEffect, useRef, useState } from 'react'
import { UserFirestoreData } from '../../utils/Types'
import { useAuth } from '../../context/useAuth'
import { ArrowSmallUpIcon, ChatBubbleBottomCenterTextIcon, ChevronLeftIcon, EllipsisVerticalIcon, PaperAirplaneIcon } from 'react-native-heroicons/solid'
import colors from 'tailwindcss/colors'
import { FaceSmileIcon, MicrophoneIcon, PhoneArrowUpRightIcon, UserGroupIcon, VideoCameraIcon } from 'react-native-heroicons/outline'
import { DocumentData, addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore'
import { firestoreDB } from '../../config/firebase.config'

const ios = Platform.OS === 'ios'

const ChatScreen = ({ navigation, route }) => {

    const { room } = route.params

    const { authData } = useAuth()
    const user = JSON.parse(authData.data) as UserFirestoreData

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [message, setMessage] = useState<string>("")

    const [chats, setChats] = useState<DocumentData[] | null>(null)

    const scrollViewRef = useRef<ScrollView>(null)

    useLayoutEffect(() => {
        const messageQuery = query(
            collection(firestoreDB, "chats", room._id, "messages"),
            orderBy("timeStamp", "asc")
        )

        const unsubscribe = onSnapshot(messageQuery, (querySnap) => {
            const updatedMessage = querySnap.docs.map(doc => doc.data())
            setChats(updatedMessage)
            setIsLoading(false)
        })

        return unsubscribe
    }, [])

    const sendMessage = async () => {
        const timeStamp = serverTimestamp()
        const _id = `${Date.now()}`
        const _doc = {
            _id,
            roomId: room._id,
            timeStamp,
            message,
            user
        }
        setMessage("")

        await addDoc(collection(doc(firestoreDB, "chats", room._id), "messages"), _doc).then(() => {

        }).catch((error) => {
            console.log(error)
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
                    <View className="flex-row items-center justify-center space-x-3">
                        <View
                            className="w-12 h-12 rounded-full border border-white flex items-center justify-center">
                            {/* <Image
                                source={{ uri: user.profilePic }}
                                className="w-full h-full"
                                resizeMode='cover' /> */}
                            <UserGroupIcon size={24} color={"#fbfbfb"} />
                        </View>
                        <View>
                            <Text className="text-gray-50 text-lg font-semibold capitalize">
                                {room.chatName.length > 16 ? `${room.chatName.slice(0, 16)}...` : room.chatName}{" "}
                            </Text>
                            <Text className="text-gray-100 text-sm font-medium capitalize">Online</Text>
                        </View>
                    </View>

                    {/* End Section */}
                    <View className="flex-row items-center justify-center space-x-3">
                        <TouchableOpacity>
                            <VideoCameraIcon size={24} color={"#fbfbfb"} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <PhoneArrowUpRightIcon size={24} color={"#fbfbfb"} />
                        </TouchableOpacity>

                        <TouchableOpacity>
                            <EllipsisVerticalIcon size={24} color={"#fbfbfb"} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

            {/* Chat Section */}
            <View className="w-full bg-white px-4 py-6 rounded-3xl flex-1 rounded-t-[50px] -mt-12">
                <KeyboardAvoidingView className="flex-1" behavior={ios ? 'padding' : 'height'} keyboardVerticalOffset={165}>
                    <>
                        <ScrollView ref={scrollViewRef} onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
                            {
                                isLoading ?
                                    (
                                        <View className="flex-1 items-center justify-center">
                                            <ActivityIndicator size={'large'} color={colors.green[600]} />
                                        </View>
                                    ) : chats?.length == 0 ? (
                                        <>
                                            <View>
                                                <Text className="text-center">No Chats Available!</Text>
                                            </View>
                                        </>
                                    ) :
                                        (
                                            <>
                                                {/* Messages */}
                                                {/* <FlatList
                                                data={chats}
                                                renderItem={({ item }) => (
                                                    <Text>{item.message}</Text>
                                                )}
                                                keyExtractor={(item, index) => index.toString()}
                                            /> */}
                                                {
                                                    chats?.map((item, index) => item.user.providersData.email === user.providersData.email ?
                                                        (
                                                            // Sender Message Right-side
                                                            <View key={index.toString()} className="m-1">
                                                                <View
                                                                    style={{ alignSelf: "flex-end" }}
                                                                    className="px-4 py-2 rounded-tl-2xl rounded-bl-2xl rounded-tr-2xl bg-chatapp-primary w-auto relative">
                                                                    <Text className="text-base font-semibold text-white">
                                                                        {item.message}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ alignSelf: 'flex-end' }}>
                                                                    {item?.timeStamp?.seconds && (
                                                                        <Text
                                                                            className="text-[12px] text-black font-semibold"
                                                                        >{new Date(parseInt(item?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
                                                                            hour: 'numeric',
                                                                            minute: 'numeric',
                                                                            hour12: true,
                                                                        })}</Text>
                                                                    )}
                                                                </View>
                                                            </View>
                                                        ) : (
                                                            // Receiver Message Left-side
                                                            <View key={index.toString()} className="flex items-center justify-start space-x-2">
                                                                <View
                                                                    style={{ alignSelf: "flex-start" }}
                                                                    className="flex-row items-center justify-center space-x-2">
                                                                    {/* Image */}
                                                                    <Image
                                                                        source={{ uri: item.user.profilePic }}
                                                                        resizeMode='cover'
                                                                        className="w-10 h-10 rounded-full" />

                                                                    {/* Text */}
                                                                    <View className="m-1">
                                                                        <View
                                                                            className="px-4 py-2 rounded-tl-2xl rounded-tr-2xl rounded-br-2xl bg-gray-200 w-auto relative">
                                                                            <Text className="text-base font-semibold text-black">
                                                                                {item.message}
                                                                            </Text>
                                                                        </View>
                                                                        <View style={{ alignSelf: 'flex-start' }}>
                                                                            {item?.timeStamp?.seconds && (
                                                                                <Text
                                                                                    className="text-[12px] text-black font-semibold"
                                                                                >{new Date(parseInt(item?.timeStamp?.seconds) * 1000).toLocaleTimeString("en-US", {
                                                                                    hour: 'numeric',
                                                                                    minute: 'numeric',
                                                                                    hour12: true,
                                                                                })}</Text>
                                                                            )}
                                                                        </View>
                                                                    </View>

                                                                </View>

                                                            </View>
                                                        ))
                                                }
                                            </>
                                        )
                            }
                        </ScrollView>

                        {/* Send Message InputText */}
                        <View className="w-full flex-row items-center justify-center px-8">
                            <View className="bg-gray-200 rounded-2xl px-4 space-x-4 py-2 flex-row items-center justify-center">
                                <TouchableOpacity activeOpacity={0.5}>
                                    <FaceSmileIcon size={24} color={"#555"} />
                                </TouchableOpacity>

                                <TextInput
                                    className="flex-1 h-8 text-base text-chatapp-primaryText font-semibold"
                                    placeholder='Type here ....'
                                    placeholderTextColor={"#999"}
                                    value={message}
                                    onChangeText={text => setMessage(text)}
                                />

                                <TouchableOpacity activeOpacity={0.5}>
                                    <MicrophoneIcon size={24} color={"#43C651"} />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity activeOpacity={0.5} className="pl-4" onPress={sendMessage}>
                                <PaperAirplaneIcon size={24} color={"#555"} />
                            </TouchableOpacity>
                        </View>
                    </>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

export default ChatScreen