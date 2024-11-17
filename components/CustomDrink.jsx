import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import IconButton from './IconButton'
import icons from '../constants/icons'
import { router } from 'expo-router'
import { useGlobalContext } from '../context/globalProvider'
import { removeDrink } from '../lib/appwrite'

const CustomDrink = ({drink}) => {

    const {setEditedDrink, customDrinks, setCustomDrinks} = useGlobalContext()
    
    const edit = () => {
        setEditedDrink(drink)
        router.push("/drinkEdit")
    }

    const remove = () => {
        try {
            let drinksCopy = [...customDrinks]
            drinksCopy.splice(drinksCopy.indexOf(drink))
            setCustomDrinks(drinksCopy)
            removeDrink(drink.$id)
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <View className="flex flex-row w-[80vw] justify-center items-center mb-5">
            <View className="border-2 border-blue rounded-[5000px] p-2 px-5 w-[53vw] justify-center items-center">
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