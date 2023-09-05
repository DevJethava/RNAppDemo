import { View, Text, StatusBar, Image, SafeAreaView, TouchableOpacity, Dimensions, Platform } from 'react-native'
import React, { useState } from 'react'
import Images from '../utils/Images'
import { ArrowLeftCircleIcon, HeartIcon } from 'react-native-heroicons/outline'
import colors from 'tailwindcss/colors'
import { themeColors } from '../theme'
import { MinusIcon, PlusIcon, StarIcon } from 'react-native-heroicons/solid'
import { ShoppingBag } from 'react-native-feather'

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const ProductScreen = ({ navigation, route }) => {

    const item = route.params
    const [size, setSize] = useState('small');

    return (
        <View className="flex-1">
            <StatusBar barStyle={"light-content"} />

            {/* Header Image */}
            <Image
                source={Images.beansBackground2}
                style={{ height: 300, borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}
                className="w-full absolute" />

            {/* Container */}
            <SafeAreaView className="space-y-4">

                {/* Top Header Button */}
                <View className="mx-4 flex-row justify-between items-center">
                    <TouchableOpacity onPress={() => navigation.goBack()} activeOpacity={0.5}>
                        <ArrowLeftCircleIcon size={50} strokeWidth={1.2} color={colors.white} />
                    </TouchableOpacity>

                    <TouchableOpacity className="rounded-full border-2 border-white p-2">
                        <HeartIcon size={24} strokeWidth={2} color={colors.white} />
                    </TouchableOpacity>

                </View>

                <View className="flex-row justify-center" style={{
                    shadowColor: themeColors.bgDark,
                    shadowRadius: 30,
                    shadowOffset: { width: 0, height: 30 },
                    shadowOpacity: 0.9
                }}>
                    <Image source={item.image} className="h-60 w-60 mt-8" />
                </View>

                {/* Rating Display */}
                <View
                    style={{ backgroundColor: themeColors.bgLight }}
                    className="flex-row justify-center items-center mx-4 rounded-3xl p-1 px-2 space-x-1 opacity-90 w-16">
                    <StarIcon size="15" color="white" />
                    <Text className="text-base font-semibold text-white">{item.stars}</Text>
                </View>

                {/* Name and Price Display */}
                <View className="px-4 flex-row justify-between items-center">
                    <Text style={{ color: themeColors.text }} className="text-3xl font-semibold">
                        {item.name}
                    </Text>
                    <Text style={{ color: themeColors.text }} className="text-lg font-semibold">
                        $ {item.price}
                    </Text>
                </View>

                {/* Size Selection */}
                <View className="px-4 space-y-2">
                    <Text style={{ color: themeColors.text }} className="text-lg font-bold">Coffee size</Text>
                    <View className="flex-row justify-between">
                        <TouchableOpacity
                            onPress={() => setSize('small')}
                            style={{ backgroundColor: size == 'small' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
                            className="p-3 px-8 rounded-full">
                            <Text className={size == 'small' ? "text-white" : "text-gray-700"}>Small</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSize('medium')}
                            style={{ backgroundColor: size == 'medium' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
                            className="p-3 px-8 rounded-full">
                            <Text className={size == 'medium' ? "text-white" : "text-gray-700"}>Medium</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setSize('large')}
                            style={{ backgroundColor: size == 'large' ? themeColors.bgLight : 'rgba(0,0,0,0.07)' }}
                            className="p-3 px-8 rounded-full">
                            <Text className={size == 'large' ? "text-white" : "text-gray-700"}>Large</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* About Section */}
                <View className="px-4 space-y-2">
                    <Text style={{ color: themeColors.text }} className="text-lg font-bold">About</Text>
                    <Text className="text-gray-600">
                        {item.desc}
                    </Text>
                </View>
            </SafeAreaView>

            {/* Quantity */}
            <View className={`space-y-5 py-4 ${ios ? 'mb-6' : 'mb-3'}`}>
                <View className="flex-row justify-between items-center px-4 mb-2">
                    <View className="flex-row items-center space-x-1">
                        <Text className="text-base text-gray-700 font-semibold opacity-60">
                            Volume
                        </Text>
                        <Text className="text-base text-black font-semibold"> {item.volume}</Text>
                    </View>
                    <View
                        className="flex-row items-center space-x-4 border-gray-500 border rounded-full p-1 px-4">
                        <TouchableOpacity activeOpacity={0.5}>
                            <MinusIcon size="20" strokeWidth={3} color={themeColors.text} />
                        </TouchableOpacity>
                        <Text style={{ color: themeColors.text }} className="font-extrabold text-lg">2</Text>
                        <TouchableOpacity activeOpacity={0.5}>
                            <PlusIcon size="20" strokeWidth={3} color={themeColors.text} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* buy now button */}
                <View className="flex-row justify-between px-4">
                    <TouchableOpacity activeOpacity={0.5} className="p-4 rounded-full border border-gray-400" >
                        <ShoppingBag size="30" color="gray" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{ backgroundColor: themeColors.bgLight }}
                        className="p-4 rounded-full flex-1 ml-4">
                        <Text className="text-center text-white text-base font-semibold">Buy now</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default ProductScreen