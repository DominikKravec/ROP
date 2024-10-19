import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import IconButton from './IconButton'
import icons from '../constants/icons'
import { router } from 'expo-router'
import { useGlobalContext } from '../context/globalProvider'

const CustomDrink = ({drink}) => {

    const {setEditedDrink} = useGlobalContext()
    
    
    
    const edit = () => {
        setEditedDrink(drink)
        router.push("/drinkEdit")
    }

    const remove = () => {
        //remove the drink here when the database is ready
    }

    
    return (
        <View className="flex flex-row w-[80vw] justify-center items-center">
            <View className="border-2 border-blue rounded-[5000px] p-2 px-10">
                <Text className="text-xl text-blue">
                    {drink.name}
                </Text>
            </View>
            
            <View className="mx-3">
                <IconButton
                    icon={icons.edit}
                    handle={() => {edit()}}
                />
            </View>
            <IconButton
                icon={icons.trash}
                handle={() => {remove()}}
            />
        
        </View>
    )
}

export default CustomDrink