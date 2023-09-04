import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import CommonStyles from '../../utils/CommonStyles'
import { useAuth } from '../../context/useAuth';
import Screen from '../../utils/Screen';
import { getUserToken } from '../../utils/storageUtils';
import { AuthData } from '../../context/AuthProvider';

const HomeScreen = ({ navigation, route }) => {
    const { signOut } = useAuth();

    const [userData, setUserData] = useState<AuthData | null>(null)

    useEffect(() => {
        getUserData()
    }, [])

    const getUserData = async () => {
        await getUserToken().then((result) => {
            if (result !== null) {
                let data = JSON.parse(result) as AuthData
                setUserData(data)
            }
        })
    }

    const goToDetailsScreen = () => {
        navigation.navigate(Screen.DetailScreen, userData)
    }

    return (
        <View style={CommonStyles.containerCenter}>
            <Text>Email: <Text className="font-semibold text-lg text-violet-500">{userData?.email}</Text></Text>
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity
                    style={{ flex: 2, alignItems: 'center' }}
                    className="px-8 py-2 rounded-lg mt-8 bg-violet-500 mx-4"
                    activeOpacity={0.5}
                    onPress={goToDetailsScreen}>
                    <Text className="text-white font-bold text-sm">Go To Details</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{ flex: 1, alignItems: 'center' }}
                    className="px-8 py-2 rounded-lg mt-8 bg-red-700 mx-4"
                    activeOpacity={0.5}
                    onPress={signOut}>
                    <Text className="text-white font-bold text-sm">Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default HomeScreen