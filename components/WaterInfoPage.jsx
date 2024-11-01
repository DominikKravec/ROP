import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useGlobalContext } from '../context/globalProvider'
import IconButton from './IconButton'
import icons from '../constants/icons'
import AddDrinkModal from './AddDrinkModal'
import CustomModal from './CustomModal'
import CircularProgress from 'react-native-circular-progress-indicator'

const WaterInfoPage = () => {

    const {userSettings, waterDrank, waterGoal} = useGlobalContext()

    const [unit, setUnit] = useState('ml')

    useEffect(() => {
        if(userSettings.volumeUnit){
            setUnit(userSettings.volumeUnit)
        }
    }, userSettings)

    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)

    const progress = waterDrank / waterGoal * 100

    return (
        <>
            <View className="w-[100vw] h-full justify-center items-center"> 

                <View className="justify-center items-center">
                    <CircularProgress
                        value={progress > 100 ? 100 : progress}
                        inActiveStrokeColor={'#A5D9FF'}
                        inActiveStrokeOpacity={0.2}
                        activeStrokeColor={'#3CACFD'}
                        progressValueColor={'#3CACFD'}
                        valueSuffix={'%'}
                    />

                    <Text className="text-2xl text-blue mt-5">
                        {/* change the height of the parent when you add more parts */}        
                        {waterDrank}/{waterGoal}{unit}

                    </Text>
                </View>

                <View className="mt-5">
                    <View className="flex flex-row justify-between">
                        <View className="w-[48%]">
                        <IconButton
                            icon={icons.cupIcon}
                            title="quick cup"
                            handle={() => {setWaterDrank(waterDrank + cupVolume)}}
                        />
                        </View>

                        <View className="w-[48%]">
                        <IconButton
                            icon={icons.plus}
                            title="Add drink"
                            handle={() => {setModal(true); setModalContent(<AddDrinkModal/>)}}
                        />
                        </View>
                    </View>
                    <View>
                        <IconButton
                        icon={icons.previous}
                        title="Previous drink"
                        handle={() => {setWaterDrank(waterDrank + cupVolume)}}
                        />

                    </View>
                </View>
                <CustomModal
                    modalContent={modalContent}
                    modal={modal}
                    setModal={setModal}
                />
            </View>
        </>
    )
}

export default WaterInfoPage