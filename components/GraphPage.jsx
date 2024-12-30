import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/globalProvider'
import { BarChart } from 'react-native-gifted-charts'
import { getMonthLogs, getWeekLogs } from '../lib/appwrite'

const GraphPage = () => {

  const {sugarFromDrinks, user, caloriesFromDrinks, getInfoFromDrinks, alcoholLevel, timeTillAlcZero, waterGoal, isOffline} = useGlobalContext()

  const [weeklyWater, setWeeklyWater] = useState([])
  const [weeklySugar, setWeeklySugar] = useState([])
  const [monthlyWater, setMonthlyWater] = useState([])

  const [graphWindowHeight, setGraphWindowHeight] = useState(0)

  const [activePage, setActivePage] = useState(0)

  const handleScroll = (event) => {
    const contentOffsety = event.nativeEvent.contentOffset.y;
    const currentPage = Math.round(contentOffsety / (graphWindowHeight / 2)); // Calculate current page
    setActivePage(currentPage); // Update active page state
  };

  useEffect(() => {
    const getLogs = async () => {
      if (isOffline) return
      try {

        const monthLogs = await getMonthLogs(user.$id)
        const logs = await getWeekLogs(user.$id)

        let dailyInfoWater = []
        let dailyInfoSugar = []

        //create an array of objects with date labels
        for(let i = 1; i <= 7; i++) {
          let date = new Date()
          date.setDate(date.getDate() - i)
          let label = "" + date.getDate() + "." + (date.getMonth() + 1)
          dailyInfoWater.push({label: label, value: 0}) 
          dailyInfoSugar.push({label: label, value: 0}) 
        }
     
        //fill the array with data about water from logs
        logs.forEach(log => {
          let date = new Date(log.timeOfDrink)
          let label = "" + date.getDate() + "." + (date.getMonth() + 1)

          for(idx in dailyInfoWater){

            if(dailyInfoWater[idx].label == label){
              dailyInfoWater[idx].value += log.volume
            }
          }
        })
        setWeeklyWater(dailyInfoWater.reverse())
        
        //fill the array with data about sugar from logs
        logs.forEach(log => {
          let date = new Date(log.timeOfDrink)
          let label = "" + date.getDate() + "." + (date.getMonth() + 1)

          let sugar = (parseFloat(log.drink.sugar) / 100) * parseFloat(log.volume)

          for(idx in dailyInfoSugar){
            if(dailyInfoSugar[idx].label == label){
              dailyInfoSugar[idx].value += sugar
            }
          }
        })

        setWeeklySugar(dailyInfoSugar.reverse())
        
        dailyInfoWater = []

        //repeat for monthly logs
        for(let i = 1; i <= 31; i++) {
          let date = new Date()
          date.setDate(date.getDate() - i)
          let label = "" + date.getDate()
          dailyInfoWater.push({label: label, value: 0})  
        }

        monthLogs.forEach(log => {
          let date = new Date(log.timeOfDrink)
          let label = "" + date.getDate()

          for(idx in dailyInfoWater){
            if(dailyInfoWater[idx].label == label){
              dailyInfoWater[idx].value += log.volume
            }
          }
        })

        setMonthlyWater(dailyInfoWater.reverse())
        
      } catch (error) {
        console.log("Couldn't get graph info due to: " + error)
      }
      
    }

    getLogs()
    getInfoFromDrinks()

  }, [])

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout; // Get layout dimensions
    setGraphWindowHeight(height); // Set the height
  };

  return (
    <SafeAreaView className="justify-center items-center w-[100vw] h-full px-8">
      
      <View className="h-[50%] justify-center items-center">

        <View className="border-2 border-blue p-5 rounded-2xl">
          <View className=" w-[70vw] justify-center items-center p-2">
            <Text className="text-2xl text-blue">
              Sugar from drinks: {Math.round(sugarFromDrinks)}g
            </Text>
          </View>
          <View className=" w-[70vw] justify-center items-center p-2 mt-5">
            <Text className="text-2xl text-blue">
              Alcohol level: {alcoholLevel > 0 ? Math.round(alcoholLevel * 100) / 100 : 0}%
              {alcoholLevel > 0 ? `\nTime untill 0: ${Math.ceil(timeTillAlcZero * 100) / 10}h` : ''} {/* change this when working with alcohol level */}
            </Text>
            
          </View>
          <View className=" w-[70vw] justify-center items-center p-2 mt-5">
            <Text className="text-2xl text-blue">
              Calories: {caloriesFromDrinks}
            </Text>
          </View>
        </View>
      </View>

     
      
      <View className=" border-2 border-blue h-[50%] w-full rounded-3xl justify-center items-center" onLayout={handleLayout} >
        {isOffline ? 
          <View className='h-full justify-center items-center'>
            <Text className="text-2xl text-blue-200 text-center">Graphs can only be viewed while online</Text>
          </View> :
          <>

            <ScrollView
              horizontal={false}
              pagingEnabled={true} 
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              onScroll={handleScroll}
              scrollEventThrottle={16}
              className="flex-1"
            > 
              <View 
                className="justify-center items-center"
                style={{height: graphWindowHeight, width: '100%'}} 
              >
                <Text className="text-blue-200 text-lg">Weekly water intake </Text>
                <BarChart
                  frontColor={'#3CACFD'}
                  barWidth={18}
                  data={weeklyWater}
                  barBorderRadius={5}
                  noOfSections={3}
                  xAxisColor={'#7DC9FF'}
                  yAxisColor={'#7DC9FF'}
                  yAxisTextStyle={{color: "#7DC9FF"}}
                  xAxisLabelTextStyle={{color: "#7DC9FF", fontSize: 11}}
                  rulesColor={'#A5D9FF'}
                  width={300}
                />
              </View>

              <View 
                className="justify-center items-center"
                style={{height: graphWindowHeight, width: '100%'}}
              >
                <Text className="text-blue-200 text-lg"> Monthly water intake </Text>
                <BarChart
                  frontColor={'#3CACFD'}
                  barWidth={5}
                  spacing={4}
                  data={monthlyWater}
                  barBorderRadius={5}
                  noOfSections={3}
                  xAxisColor={'#7DC9FF'}
                  yAxisColor={'#7DC9FF'}
                  yAxisTextStyle={{color: "#7DC9FF"}}
                  xAxisLabelTextStyle={{display: 'none'}}
                  rulesColor={'#A5D9FF'}
                  width={300}
                />
              </View>

              <View 
                className="justify-center items-center"
                style={{height: graphWindowHeight, width: '100%'}}
              >
                <Text className="text-blue-200 text-lg"> Weekly sugar intake from drinks </Text>
                <BarChart
                  frontColor={'#3CACFD'}
                  barWidth={18}
                  data={weeklySugar}
                  barBorderRadius={5}
                  noOfSections={3}
                  xAxisColor={'#7DC9FF'}
                  yAxisColor={'#7DC9FF'}
                  yAxisTextStyle={{color: "#7DC9FF"}}
                  xAxisLabelTextStyle={{color: "#7DC9FF", fontSize: 11}}
                  rulesColor={'#A5D9FF'}
                  width={300}
                />
              </View>



            </ScrollView>
          </>
        }
      </View>
    </SafeAreaView>
  )
}

export default GraphPage