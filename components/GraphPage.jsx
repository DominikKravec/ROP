import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/globalProvider'
import { BarChart } from 'react-native-gifted-charts'
import { getWeekLogs } from '../lib/appwrite'

const GraphPage = () => {

  const {sugarFromDrinks, user, caloriesFromDrinks, getInfoFromDrinks} = useGlobalContext()
  //add calories and alcohol level

  const [weeklyWater, setWeeklyWater] = useState([])

  useEffect(() => {
    const getLogs = async () => {

      try {
        const logs = await getWeekLogs(user.$id)
        let dailyInfo = []

        for(let i = 1; i <= 7; i++) {

          let date = new Date()
          date.setDate(date.getDate() - i)
          let label = "" + date.getDate() + "." + (date.getMonth() + 1)

          dailyInfo.push({label: label, value: 0}) 
        }
        
        logs.forEach(log => {
          let date = new Date(log.timeOfDrink)
          let label = "" + date.getDate() + "." + (date.getMonth() + 1)

          for(idx in dailyInfo){

            if(dailyInfo[idx].label == label){
              dailyInfo[idx].value += log.volume
            }
          }
        })
        setWeeklyWater(dailyInfo.reverse())
        
      } catch (error) {
        console.log("Couldn't get graph info due to: " + error)
      }
      
    }

    getLogs()
    getInfoFromDrinks()

  }, [])

  return (
    <SafeAreaView className="justify-center items-center w-[100vw] h-full px-8">
      
      <View className="h-[50%] justify-center items-center">

        <View className="border-2 border-blue p-5 rounded-2xl">
          <View className=" w-[70vw] justify-center items-center p-2">
            <Text className="text-2xl text-blue">
              Sugar from drinks: {sugarFromDrinks}g
            </Text>
          </View>
          <View className=" w-[70vw] justify-center items-center p-2 mt-5">
            <Text className="text-2xl text-blue">
              Alcohol level: {sugarFromDrinks /* change this to alcohol level */} {"\n"} 
              Time untill 0: 2h  {/* change this when working with alcohol level */}
            </Text>
            
          </View>
          <View className=" w-[70vw] justify-center items-center p-2 mt-5">
            <Text className="text-2xl text-blue">
              Calories: {caloriesFromDrinks}
            </Text>
          </View>
        </View>
      </View>

     
      
      <View className=" border-2 border-blue h-[50%] w-full rounded-3xl justify-center items-center">
        <BarChart
          frontColor={'#3CACFD'}
          barWidth={18}
          data={weeklyWater}
          barBorderRadius={5}
          noOfSections={3}
          xAxisColor={'#7DC9FF'}
          yAxisColor={'#7DC9FF'}
          yAxisTextStyle={{color: "#7DC9FF"}}
          xAxisLabelTextStyle={{color: "#7DC9FF"}}
          rulesColor={'#A5D9FF'}
          width={280}
          />
      </View>
    </SafeAreaView>
  )
}

export default GraphPage