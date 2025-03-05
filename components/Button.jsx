import { View, Text } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { useGlobalContext } from '../context/globalProvider'

const Button = ({title, handle, containerStyles, customColor, isLoading}) => {

    const {alternateButtons} = useGlobalContext()

    return (
        <View className={`${containerStyles} justify-center items-center`}>
            {console.log("Is loading in button: " + isLoading)}
            <TouchableOpacity 
                disabled={isLoading}
                className={`w-[65vw] justify-center ${alternateButtons ? 'bg-blue' : ''} items-center ${customColor? 'border-' + customColor : "border-blue"} ${isLoading ? 'opacity-20' : ''} border-2 rounded-[5000px] py-2`}
                onPress={handle}
                
                >

                <Text className={`text-xl ${customColor? 'text-' + customColor : "text-blue"} ${alternateButtons ? 'text-primary' : ''} `}>
                    {title}
                </Text>

            </TouchableOpacity>
        </View>
)
}

export default Button