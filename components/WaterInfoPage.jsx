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

const WaterInfoPage = () => {

    const {userSettings, waterDrank, waterGoal, user, setWaterDrank, getCurrentTemperature, getInfoFromDrinks} = useGlobalContext()

    const [unit, setUnit] = useState('ml')

    const [drinkOptions, setDrinkOptions] = useState([])

    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)  

    useEffect(() => {
        const getDrinks = async () => {
          try{
            const drinks = await getUserDrinks(user.$id)
            setDrinkOptions(drinks)
          }catch(error){
            console.log(error)
          }
        }
        
        getDrinks()
        getCurrentTemperature()
      }, [])

    useEffect(() => {
        if(userSettings.volumeUnit){
            setUnit(userSettings.volumeUnit)
        }
    }, userSettings)

    const quickCup = async () => {
        try {
            await createLog(user.$id, waterId, userSettings.cupSize, new Date())
            getInfoFromDrinks()
        } catch (error) {
            console.log("Failed to add cup due too: " + error)
        }
    }

    const previousDrink = async () => {
        try {
            const logs = await getUserLogs(user.$id)
            const lastLog = logs[logs.length - 1]

            console.log(lastLog)

            await createLog(user.$id, lastLog.drink.$id, parseFloat(lastLog.volume), new Date())
            getInfoFromDrinks()

        } catch (error) {
            console.log("Failed to add previous drink due too: " + error)
        }
    }

    const progress = waterDrank / waterGoal * 100

    return (
        <SafeAreaView className="w-[100vw] h-full justify-center items-center"> 
            <View className="justify-center items-center">
                
            
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
                    {Math.round(waterDrank)}/{waterGoal}{unit}

                </Text>
            </View>

            <View className="mt-5">
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
                        icon={icons.plus}
                        title="Add drink"
                        handle={() => {setModal(true); setModalContent(<AddDrinkModal drinkOptions={drinkOptions} setModal={setModal}/>)}}
                    />
                    </View>
                </View>
                <View>
                    <IconButton
                    icon={icons.previous}
                    title="Previous drink"
                    handle={() => {previousDrink()}}
                    />

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