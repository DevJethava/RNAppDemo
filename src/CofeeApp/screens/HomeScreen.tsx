import { View, Text, StatusBar, Image, SafeAreaView, TextInput, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native'
import React, { useRef, useState } from 'react'
import Images from '../utils/Images'
import { MapPinIcon } from 'react-native-heroicons/solid'
import { themeColors } from '../theme'
import { BellIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import colors from "tailwindcss/colors";
import { categories, coffeeItems } from '../constants'
import Carousel from 'react-native-snap-carousel';
import CoffeeCard, { CoffeeCardType } from '../components/CoffeeCard'

const { width, height } = Dimensions.get('window');
const ios = Platform.OS == 'ios';

const HomeScreen = ({ navigation, route }) => {

    const [activeCategory, setActiveCategory] = useState<number | undefined>(1)
    const flatListRef = useRef<FlatList>()

    return (
        <View className="flex-1 relative bg-white ">
            <StatusBar barStyle={"dark-content"} />

            {/* Header Image */}
            <Image
                source={Images.beansBackground1}
                className="w-full absolute -top-5 opacity-10" style={{ height: ios ? 220 : 185 }} />

            {/* Container */}
            <SafeAreaView>

                {/* Top Toolbar */}
                <View className="px-4 flex-row justify-between items-center">
                    <Image
                        source={Images.avatar}
                        className="h-9 w-9 rounded-full" />

                    <View className="flex-row items-center space-x-2">
                        <MapPinIcon size={25} color={themeColors.bgLight} />
                        <Text className="text-base font-semibold">New York, NYC</Text>
                    </View>

                    <BellIcon size={27} color={colors.black} />
                </View>

                {/* Search bar */}
                <View className="mt-14 mx-5">
                    <View className="flex-row justify-center items-center rounded-full p-1 bg-[#e6e6e6]">
                        <TextInput
                            placeholder='Search'
                            className={`${ios ? "p-4" : "p-2"} flex-1 font-semibold text-gray-700`} />
                        <TouchableOpacity
                            activeOpacity={0.5}
                            className="rounded-full p-2"
                            style={{ backgroundColor: themeColors.bgLight }}>
                            <MagnifyingGlassIcon size={25} strokeWidth={2} color={colors.white} />
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Category */}
                <View className="mt-6 px-5 mb-4">
                    <FlatList
                        ref={flatListRef}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        data={categories}
                        keyExtractor={(item, index) => `id${index}`}
                        className="overflow-visible"
                        renderItem={({ item, index }) => {
                            let isActive = item.id === activeCategory
                            let activeCategoryClass = isActive ? 'text-white' : 'text-gray-700'
                            return (
                                <TouchableOpacity
                                    onPress={() => {
                                        flatListRef.current?.scrollToIndex({ animated: true, index: index })
                                        setActiveCategory(item.id)
                                    }}
                                    activeOpacity={0.5}
                                    style={{ backgroundColor: isActive ? themeColors.bgLight : 'rgba(0, 0, 0, 0.07)' }}
                                    className="p-4 px-5 rounded-full mr-2">
                                    <Text className={"font-semibold shadow " + activeCategoryClass}>{item.title}</Text>
                                </TouchableOpacity>
                            )
                        }} />
                </View>

                {/* Coffee Card */}
                <View className={`py-2 ${ios ? "mt-16" : "mt-2"}`}>
                    <Carousel containerCustomStyle={{ overflow: 'visible' }}
                        data={coffeeItems}
                        renderItem={({ item }) => <CoffeeCard item={item as CoffeeCardType} />}
                        firstItem={1}
                        loop={true}
                        inactiveSlideScale={0.75}
                        inactiveSlideOpacity={0.75}
                        sliderWidth={width}
                        itemWidth={width * 0.63}
                        slideStyle={{ display: 'flex', alignItems: 'center' }} />
                </View>

            </SafeAreaView>
        </View>
    )
}

export default HomeScreen