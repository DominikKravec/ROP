import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '../context/globalProvider'
import IconButton from './IconButton'
import icons from '../constants/icons'
import AddDrinkModal from './AddDrinkModal'
import CustomModal from './CustomModal'
import CircularProgress from 'react-native-circular-progress-indicator'
import { createLog, getUserDrinks, getUserLogs } from '../lib/appwrite'
import { waterId } from '../constants/other'
import { SafeAreaView } from 'react-native-safe-area-context'
import { getStoredLogs, getStoredUserDrinks, storeLog } from '../lib/asyncStorage'

const WaterInfoPage = () => {

    const {userSettings, waterDrank, waterGoal, user, setWaterDrank, getCurrentTemperature, getInfoFromDrinks, isOffline} = useGlobalContext()

    const [unit, setUnit] = useState('ml')

    const [drinkOptions, setDrinkOptions] = useState([])

    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)  

    useEffect(() => {
        const getDrinks = async () => {
          try{
            console.log()
            if(isOffline){
                console.log("Getting drinks from storage")
                const drinks = await getStoredUserDrinks()
                setDrinkOptions(drinks)
            }else{
                const drinks = await getUserDrinks(user.$id)
                setDrinkOptions(drinks)
            }
          }catch(error){
            console.log(error)
          }
        }

        const checkTemperature = async () => {
            if(!isOffline){
                try {
                    const temp = await getCurrentTemperature()

                    if(temp > 33){
                        setModal(true)
                        setModalContent(
                            <View className="justify-center items-center">
                                <Text className=" text-blue text-2xl">It is very hot outside your water intake has been increased by one liter</Text>
                            </View>
                        )
                    }else if(temp > 25){
                        setModal(true)
                        setModalContent(
                            <View className="justify-center items-center">
                                <Text className=" text-blue text-2xl">It is hot outside your water intake has been increased by hlaf a liter</Text>
                            </View>
                        )
                    }
                } catch (error) {
                    console.log("Error checking temp: ", error)
                }
            }
        }
        
        getDrinks()
        checkTemperature()
        
    }, [isOffline])

    useEffect(() => {
        if(userSettings.volumeUnit){
            setUnit(userSettings.volumeUnit)
        }
    }, [userSettings])

    const quickCup = async () => {
        try {
            if(isOffline){
                await storeLog(waterId, userSettings.cupSize, new Date())
                setWaterDrank(waterDrank + userSettings.cupSize)
            }else{
                await createLog(user.$id, waterId, userSettings.cupSize, new Date())
                getInfoFromDrinks()
            }
        } catch (error) {
            console.log("Failed to add cup due too: " + error)
        }
    }
    
    const halfCup = async () => {
        try {
            if(isOffline){
                await storeLog(waterId, userSettings.cupSize / 2, new Date())
                setWaterDrank(waterDrank + userSettings.cupSize / 2)                
            }else{
                await createLog(user.$id, waterId, userSettings.cupSize / 2, new Date())
                getInfoFromDrinks()
            }
        } catch (error) {
            console.log("Failed to add half cup due too: " + error)
        }
    }

    const previousDrink = async () => {
        try {

            if(isOffline){
                const logs = await getStoredLogs()
                const lastLog = logs[(logs.length - 1)]
                
                await storeLog(lastLog.drink, lastLog.volume, new Date())
                setWaterDrank(waterDrank + lastLog.volume)
            }else{
                const logs = await getUserLogs(user.$id)
                
                const lastLog = logs[(logs.length - 1)]
    
                await createLog(user.$id, lastLog.drink.$id, parseFloat(lastLog.volume), new Date())
                getInfoFromDrinks()
            }

        } catch (error) {
            console.log("Failed to add previous drink due too: " + error)
        }
    }

    const progress = waterDrank / waterGoal * 100

    return (
        <SafeAreaView className="w-[100vw] h-full justify-center items-center"> 
            <View className="justify-center items-center h-[50%]">
                <View pointerEvents='none'>
                    <CircularProgress
                        value={progress > 100 ? 100 : progress}
                        inActiveStrokeColor={'#A5D9FF'}
                        inActiveStrokeOpacity={0.2}
                        activeStrokeColor={'#3CACFD'}
                        progressValueColor={'#3CACFD'}
                        valueSuffix={'%'}
                    />
                </View>

                <Text className="text-2xl text-blue mt-5">
                    {/* change the height of the parent when you add more parts */}        
                    {Math.round(waterDrank)}/{Math.round(waterGoal)}{unit}

                </Text>
            </View>

            <View className="mt-5 justify-center items-center">
                <View className="flex flex-row justify-between">
                    <View className="w-[48%]">
                        <IconButton
                            icon={icons.cupIcon}
                            title="quick cup"
                            handle={() => {quickCup()}}
                        />
                    </View>

                    <View className="w-[48%]">
                        <IconButton
                            icon={icons.halfCupIcon}
                            title="Half cup"
                            handle={() => {halfCup()}}
                        />
                    </View>
                </View>

                <View className="flex flex-row justify-between mt-20">
                    <View className="w-[48%]">
                        <IconButton
                        icon={icons.previous}
                        title="Previous drink"
                        handle={() => {previousDrink()}}
                        />
                    </View>
                    

                    <View className="w-[48%]">
                        <IconButton
                            icon={icons.plus}
                            title="Add drink"
                            handle={() => {
                                if(drinkOptions){
                                    setModal(true);
                                    setModalContent(
                                        <AddDrinkModal drinkOptions={drinkOptions} setModal={setModal}/>
                                    )
                                }else{
                                    alert("No drink options available");
                                }
                            }}
                        />
                    </View>
                </View>
            </View>

            <CustomModal
                modalContent={modalContent}
                modal={modal}
                setModal={setModal}
            />
            
        </SafeAreaView>
    )
}

export default WaterInfoPage