import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import CommonStyles from '../../utils/CommonStyles'
import { AuthData } from '../../context/AuthProvider';

const DetailScreen = ({ navigation, route }) => {
    const { email }: AuthData = route.params;
    return (
        <View style={CommonStyles.containerCenter}>
            <Text>Email: <Text className="font-semibold text-lg text-violet-500">{email}</Text></Text>
        </View>
    )
}

export default DetailScreen

const styles = StyleSheet.create({})