import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { useGlobalContext } from '../context/globalProvider'
import IconButton from './IconButton'
import icons from '../constants/icons'
import AddDrinkModal from './AddDrinkModal'
import CustomModal from './CustomModal'

const WaterInfoPage = () => {

    const {waterDrank, waterGoal, waterUnit, cupVolume, setWaterDrank} = useGlobalContext()

    const [modal, setModal] = useState(false)
    const [modalContent, setModalContent] = useState(null)


    return (
        <>
            <View className="w-[100vw] h-full justify-center items-center"> 
                <Text className="text-2xl text-blue">
                {/* change the height of the parent when you add more parts */}        
                {waterDrank}/{waterGoal}{waterUnit}
                </Text>
                <View>
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