import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useAuth } from '../../context/useAuth'
import { UserFirestoreData } from '../../utils/Types'

const HomeScreen = () => {

    const { signOut, authData } = useAuth()
    const user = JSON.parse(authData.data) as UserFirestoreData

    useEffect(() => {
        // signOut()
    }, [])

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{user.fullName}</Text>
        </View>
    )
}

export default HomeScreen