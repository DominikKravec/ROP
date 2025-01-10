import { View, Text, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../context/globalProvider'
import { BarChart } from 'react-native-gifted-charts'
import { getLogsFromDate, getMonthLogs, getWeekLogs } from '../lib/appwrite'
import CustomModal from '../components/CustomModal'

const GraphPage = () => {

  const {sugarFromDrinks, user, caloriesFromDrinks, getInfoFromDrinks, alcoholLevel, timeTillAlcZero, waterGoal, isOffline} = useGlobalContext()

  const [weeklyWater, setWeeklyWater] = useState([])
  const [weeklySugar, setWeeklySugar] = useState([])
  const [monthlyWater, setMonthlyWater] = useState([])
  const [modal, setModal] = useState(false)
  //const [modalDate, setModalDate] = useState('')
  const [dateWater, setDateWater] = useState([])

  const [graphWindowHeight, setGraphWindowHeight] = useState(0)

  const [activePage, setActivePage] = useState(0)

  const handleScroll = (event) => {
    const contentOffsety = event.nativeEvent.contentOffset.y;
    const currentPage = Math.round(contentOffsety / (graphWindowHeight / 2)); // Calculate current page
    setActivePage(currentPage); // Update active page state
  };

  const getDateWater = async (date) => {
    try {
      const logsFromDate = await getLogsFromDate(user.$id, date)
      
      let hourlyInfo = []
      
      for(let i = 0; i < 24; i += 2){

        let time = new Date(date)
        time.setHours(i, 0, 0, 0)
        console.log(time)

        hourlyInfo.push({value: 0, label: i, time: time})
      }
      
      logsFromDate.forEach((log) => {
        for(info of hourlyInfo){
          let logTime = new Date(log.timeOfDrink)
          //console.log(logTime)
          if(logTime.getHours() >= info.time.getHours() && logTime.getHours() < info.time.getHours() + 2){
            info.value += log.volume
          }
        }
      })
      
      console.log(hourlyInfo)
      setDateWater(hourlyInfo)

    } catch (error) {
      console.log("Error getting date water: ", error)
    }
  }

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
          dailyInfoWater.push({label: label, value: 0, date: date}) 
          dailyInfoSugar.push({label: label, value: 0, date: date}) 
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

          let sugar
          try{
            sugar  = (parseFloat(log.drink.sugar) / 100) * parseFloat(log.volume)
          }catch(error){
            sugar = 0
          }

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
          dailyInfoWater.push({label: label, value: 0, date: date})  
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
      {!isOffline ? (
       <>
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
                  onPress={(item, index) => {
                    getDateWater(item.date)
                    setModal(true)
                  }}
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
                  onPress={(item, index) => {
                    getDateWater(item.date)
                    setModal(true)
                  }}
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
          
        </View>
       </> 
      ) : 
        <View>
          <Text className="text-blue text-2xl text-center">You can only view this page when online</Text>
        </View>
      }
      <CustomModal
        modal={modal}
        setModal={setModal}
        modalContent={(
          <View className="overflow-hidden">
            <BarChart
             frontColor={'#3CACFD'}
            barWidth={12}
            spacing={8}
            data={dateWater}
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
        )}
      />
    </SafeAreaView>
  )
}

export default GraphPage