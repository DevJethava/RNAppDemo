import { TouchableOpacity, Text, GestureResponderEvent } from 'react-native'
import React, { } from 'react'

type ButtonProps = {
    title: string,
    onPress?: ((event: GestureResponderEvent) => void) | undefined,
    buttonClassName?: string,
    textClassName?: string
}

const Button = (props: ButtonProps) => {
    return (
        <TouchableOpacity
            onPress={props.onPress}
            activeOpacity={0.5}
            className={`w-full px-4 py-2 rounded-xl bg-chatapp-primary my-3 flex items-center justify-center ${props.buttonClassName}`}>
            <Text className={`py-2 text-white text-xl font-semibold ${props.textClassName}`}>{props.title}</Text>
        </TouchableOpacity>

    )
}

export default Button