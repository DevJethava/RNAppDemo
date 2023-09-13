import { View, Text, SafeAreaView, TouchableOpacity, Image, Alert } from 'react-native'
import React from 'react'
import { useAuth } from '../../context/useAuth'
import { UserFirestoreData } from '../../utils/Types'
import { ChevronLeftIcon, ChevronRightIcon, CloudArrowDownIcon, EllipsisVerticalIcon, ShieldCheckIcon } from 'react-native-heroicons/solid'
import { ChatBubbleBottomCenterTextIcon, EllipsisHorizontalIcon, PhoneIcon, VideoCameraIcon } from 'react-native-heroicons/outline'

const ProfileScreen = ({ navigation, route }) => {

    const { authData, signOut } = useAuth()
    const user = JSON.parse(authData.data) as UserFirestoreData

    const handleLogout = () => {
        Alert.alert('Logout', 'Are you sure you wants to Logout ?', [
            {
                text: 'Cancel',
                style: 'cancel',
            },
            { text: 'Yes', onPress: () => signOut() },
        ]);
    }

    return (
        <SafeAreaView className="flex-1 items-center justify-start bg-white">
            {/* Icons */}
            <View className="w-full flex-row items-center justify-between px-4">
                <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size={32} color={"#555"} onPress={() => navigation.goBack()} />
                </TouchableOpacity>

                <TouchableOpacity activeOpacity={0.5}>
                    <EllipsisVerticalIcon size={24} color={"#555"} />
                </TouchableOpacity>
            </View>

            {/* Profile Section */}
            <View className="items-center justify-center">
                <View className="relative border-2 border-chatapp-primary p-1 rounded-full">
                    <Image
                        source={{ uri: user.profilePic }}
                        className="w-24 h-24"
                        resizeMode='contain' />
                </View>

                <Text className="text-xl font-semibold text-chatapp-primaryBold pt-3">
                    {user.fullName}
                </Text>
                <Text className="text-base font-semibold text-chatapp-primaryText">
                    {user.providersData.email}
                </Text>
            </View>

            {/* Icons Section */}
            <View className="w-full flex-row items-center justify-evenly py-6">
                <View className="items-center justify-center">
                    <TouchableOpacity
                        className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200"
                        activeOpacity={0.5}>
                        <ChatBubbleBottomCenterTextIcon size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-chatapp-primaryText py-1">Message</Text>
                </View>

                <View className="items-center justify-center">
                    <TouchableOpacity
                        className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200"
                        activeOpacity={0.5}>
                        <VideoCameraIcon size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-chatapp-primaryText py-1">Video Call</Text>
                </View>

                <View className="items-center justify-center">
                    <TouchableOpacity
                        className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200"
                        activeOpacity={0.5}>
                        <PhoneIcon size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-chatapp-primaryText py-1">Call</Text>
                </View>

                <View className="items-center justify-center">
                    <TouchableOpacity
                        className="items-center justify-center w-12 h-12 rounded-lg bg-gray-200"
                        activeOpacity={0.5}>
                        <EllipsisHorizontalIcon size={24} color={"#555"} />
                    </TouchableOpacity>
                    <Text className="text-sm text-chatapp-primaryText py-1">More</Text>
                </View>
            </View>

            {/* Media Shared */}
            <View className="w-full px-6 space-y-3">
                <View className="w-full flex-row items-center justify-between">
                    <Text className="text-base font-semibold text-chatapp-primaryText">Media Shared</Text>

                    <TouchableOpacity activeOpacity={0.5}>
                        <Text className="text-base font-semibold uppercase text-chatapp-primaryText">View All</Text>
                    </TouchableOpacity>
                </View>

                <View className="w-full flex-row items-center justify-between">
                    <TouchableOpacity
                        className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden"
                        activeOpacity={0.5}>
                        <Image
                            source={{ uri: "https://cdn.pixabay.com/photo/2023/08/31/10/11/small-fire-butterfly-8224901_1280.jpg" }}
                            className="w-full h-full"
                            resizeMode='cover' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden"
                        activeOpacity={0.5}>
                        <Image
                            source={{ uri: "https://cdn.pixabay.com/photo/2023/09/05/16/40/sunrise-8235464_1280.jpg" }}
                            className="w-full h-full"
                            resizeMode='cover' />
                    </TouchableOpacity>

                    <TouchableOpacity
                        className="w-24 h-24 m-1 rounded-xl bg-gray-300 overflow-hidden"
                        activeOpacity={0.5}>
                        <Image
                            source={{ uri: "https://cdn.pixabay.com/photo/2023/07/27/04/46/border-collie-8152437_1280.jpg" }}
                            className="w-full h-full"
                            resizeMode='cover' />

                        <View className="absolute w-full h-full items-center justify-center bg-[#00000070]">
                            <Text className="text-base text-white font-bold">250+</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Settings Options */}
            <View className="w-full px-6 mt-8 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <ShieldCheckIcon size={24} color={"#555"} />
                    <Text className="text-base font-semibold text-chatapp-primaryText px-3">Privacy</Text>
                </View>
                <ChevronRightIcon size={24} color={"#555"} />
            </View>

            <View className="w-full px-6 py-4 flex-row items-center justify-between">
                <View className="flex-row items-center">
                    <CloudArrowDownIcon size={24} color={"#555"} />
                    <Text className="text-base font-semibold text-chatapp-primaryText px-3">Media's and Downloads</Text>
                </View>
                <ChevronRightIcon size={24} color={"#555"} />
            </View>

            <TouchableOpacity
                className="w-full px-6 py-4 flex-row items-center justify-center"
                onPress={handleLogout}
                activeOpacity={0.5}>
                <Text className="text-lg font-semibold px-3 text-red-700">Logout</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ProfileScreen