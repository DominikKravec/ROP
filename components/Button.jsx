import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const Button = ({title, handle, containerStyles}) => {
    return (
        <View className={`${containerStyles}`}>
            <TouchableOpacity 
                className="w-[65vw] justify-center items-center border-blue border-2 rounded-xl"
                onPress={handle}
                >

                <Text className="text-xl text-blue">
                    {title}
                </Text>

            </TouchableOpacity>
        </View>
)
}

export default Button