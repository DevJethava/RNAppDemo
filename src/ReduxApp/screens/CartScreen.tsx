import { View, Text, TouchableOpacity, Image, SafeAreaView, FlatList, ActivityIndicator, Button } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid';
import colors from 'tailwindcss/colors';
import { addToCart, removeFromCart } from '../redux/actions/cartAction';
import { avatars } from '../../ChatApp/utils/Avatar';
import { GetUsers, getUserFromAPI, showAPILoading } from '../redux/actions/apiAction';

const CartScreen = ({ navigation, route }) => {

    // For Perform any Action
    const dispatch = useDispatch()

    // Access store data
    const cartData: [] = useSelector((state) => state.cartReducer)
    // console.log(cartData)

    const findItemQTYById = (itemId: string) => {
        let qty = 0
        cartData.find(obj => {
            if (obj._id === itemId) {
                qty = obj.qty
            }
        })
        return qty
    }

    const getCartItemCount = () => {
        let count = 0;
        cartData.forEach(item => {
            if (item.qty > 0) {
                count += 1
            }
        })
        return count
    }

    const Item = ({ item }) => (
        <View className="w-full flex-row justify-between items-center px-4 py-2 bg-white">
            {/* Icon and Name */}
            <View className="flex-row justify-start items-center">
                <TouchableOpacity
                    activeOpacity={1}
                    className="w-12 h-12 rounded-full border border-chatapp-primary flex items-center justify-center"
                >
                    <Image
                        source={{ uri: item.image.asset.url }}
                        className="w-full h-full"
                        resizeMode='cover' />
                </TouchableOpacity>

                <Text className="m-4 text-base font-semibold">{item.title}</Text>
            </View>

            {/* Add/Remove from Cart */}
            <View className="flex-row w-auto rounded-full bg-slate-200 p-1 items-center space-x-1">
                <TouchableOpacity activeOpacity={0.5} onPress={() => dispatch(removeFromCart(item._id))}>
                    <MinusCircleIcon color={colors.red[500]} />
                </TouchableOpacity>
                <Text className="font-semibold text-xl">{findItemQTYById(item._id)}</Text>
                <TouchableOpacity activeOpacity={0.5} onPress={() => dispatch(addToCart(item))}>
                    <PlusCircleIcon color={colors.green[500]} />
                </TouchableOpacity>
            </View>

            {/* Add to Cart */}
            {/* {
                cartData.includes(item) ?
                    (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => dispatch(removeFromCart(item._id))}>
                            <TrashIcon size={32} color={colors.red[500]} />
                        </TouchableOpacity>
                    ) :
                    (
                        <TouchableOpacity activeOpacity={0.5} onPress={() => dispatch(addToCart(item))}>
                            <ShoppingBagIcon size={32} color={colors.green[500]} />
                        </TouchableOpacity>
                    )
            } */}
        </View>
    );

    return (
        <SafeAreaView className="flex-1">
            <View className="flex items-center justify-center bg-slate-100">
                <Text className="text-2xl font-bold m-8 text-green-600 ">
                    Cart Count: <Text className="">{getCartItemCount()}</Text>
                </Text>
                <Button title='Get User' onPress={() => navigation.navigate("User")} />
                <FlatList
                    className="w-full"
                    data={avatars}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={(item, index) => index.toString()}
                />
            </View>
        </SafeAreaView>
    )
}

export default CartScreen