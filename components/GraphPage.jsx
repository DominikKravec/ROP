import { View, Text } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/globalProvider'

const GraphPage = () => {

  const {sugarFromDrinks} = useGlobalContext()
  //add calories and aalcohol level

  return (
    <SafeAreaView className="justify-center items-center w-[100vw] h-full px-3">
      
      <View className="h-[50%] justify-center items-center">
        <View className="border-pink-100 border-2 rounded-[5000px] w-[70vw] justify-center items-center p-2">
          <Text className="text-2xl text-pink-100">
            Sugar from drinks: {sugarFromDrinks}
          </Text>
        </View>
        <View className="border-green border-2 rounded-[5000px] w-[70vw] justify-center items-center p-2 mt-5">
          <Text className="text-2xl text-green">
            Alcohol level: {sugarFromDrinks /* change this to alcohol level */} {"\n"} 
            Time untill 0: 2h  {/* change this when working with alcohol level */}
          </Text>
          
        </View>
        <View className="border-yellow border-2 rounded-[5000px] w-[70vw] justify-center items-center p-2 mt-5">
          <Text className="text-2xl text-yellow">
            Calories: {sugarFromDrinks /* change this to calories */}
          </Text>
        </View>
      </View>

     
      
      <View className=" border-2 border-blue h-[50%] rounded-3xl justify-center items-center">
        <Text className="text-xl text-blue">!!!Graphs will go here(coming soon)!!!</Text>
      </View>
    </SafeAreaView>
  )
}

export default GraphPage