import { View, TextInput } from 'react-native'
import React, { } from 'react'

type UserTextInputProps = {
    placeholder: string,
    secureTextEntry?: boolean | undefined
    value: string | undefined,
    onChangeText?: ((text: string) => void) | undefined
    LeftIcon: JSX.Element,
    RightIcon?: JSX.Element,
    errorShow?: boolean
}

const UserTextInput = (props: UserTextInputProps) => {
    return (
        <View className={`border rounded-2xl px-4 py-5 flex-row items-center justify-between space-x-4 my-2 ${props.errorShow ? 'border-red-500' : 'border-gray-200'}`}>
            {props.LeftIcon}
            <TextInput
                className={`flex-1 text-base ${props.errorShow ? 'text-red-500' : 'text-chatapp-primaryText'} font-semibold -m-1 justify-center`}
                placeholder={props.placeholder}
                value={props.value}
                onChangeText={props.onChangeText}
                secureTextEntry={props.secureTextEntry}
                style={{ fontSize: 20 }}
                autoCapitalize='none' />
            {props.RightIcon}
        </View>
    )
}

export default UserTextInput