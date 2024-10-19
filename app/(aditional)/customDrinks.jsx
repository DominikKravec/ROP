import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/globalProvider'
import Button from '../../components/Button'
import { router } from 'expo-router'
import icons from '../../constants/icons'
import IconButton from '../../components/IconButton'
import CustomDrink from '../../components/CustomDrink'

const customDrinks = () => {

    const {customDrinks, setEditedDrink} = useGlobalContext()

    const save = () => {
        router.replace("/profile")
    }

    return (
        <SafeAreaView className="justify-center items-center h-full p-10">
            <FlatList
                data={customDrinks}
                keyExtractor={(item) => {item.id}}
                ListEmptyComponent={() => (
                    <View>
                        <Text className="text-2xl text-blue-200 justify-center items-center m-5 text-center">
                            No custom drinks added yet. Add the first one by clicking the plus below.
                        </Text>
                    </View>
                )}
                renderItem={({item}) => (
                    <View className="w-full justify-center items-center">
                        <CustomDrink 
                            drink={item}
                        />
                    </View>
                )}
                ListFooterComponent={
                    () => (
                        <View className="mt-5">
                            <IconButton 
                                icon={icons.plus}
                                handle={() => {setEditedDrink(null), router.push("/drinkEdit")}}
                            />
                        </View>
                    )
                }
            />
            
            <Button
                title={"Save"}
                handle={() => save()}
            />
        </SafeAreaView>
    )
}

export default customDrinks