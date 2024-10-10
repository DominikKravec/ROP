import { View, Text, Modal, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useGlobalContext } from '../../context/globalProvider'
import IconButton from '../../components/IconButton'
import icons from '../../constants/icons'
import AddDrinkModal from '../../components/AddDrinkModal'


const home = () => {

  const {waterDrank, waterGoal, waterUnit, cupVolume, setWaterDrank} = useGlobalContext()

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  return (
    <SafeAreaView
      className="bg-primary h-full"
    >
      <View className="w-full h-full justify-center items-center"> 
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
      </View>
      <Modal
        animationType='slide'
        onRequestClose={()=>{setModal(false)}}
        visible={modal}
        transparent={true}
      >
        <View className='h-full justify-center items-center'>
          <View className='bg-primary border-blue border-4 rounded-xl p-5'>
            <View className=''>
              <TouchableOpacity
                onPress={() => {setModal(false)}}
              >
                <Image 
                  source={icons.close}
                  resizeMode='contain'
                  className='h-5 w-5'
                />
              </TouchableOpacity>
            </View>
            {modalContent}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  )
}

export default home