import { View, Text, Modal, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from "../../components/Button.jsx"
import { TouchableOpacity } from 'react-native'
import icons from "../../constants/icons.js"

const profile = () => {

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  return (
    <SafeAreaView className="h-full px-5 bg-primary">
      <View className="flex-col ">
        <Text className="text-2xl text-blue-200">Logged in as</Text>
        <Text className="text-5xl text-blue mt-1">User {/* change this to the actual user name*/}</Text>
      </View>
      <View className="justify-center w-full mt-8">
        <Button
          title="Edit personal information"
          handle={() => {setModal(true); }}
          containerStyles={'mt-5'}
        />
        <Button
          title="Set custom water goal"
          handle={() => {setModal(true); setModalContent(CustomGoalModal)}}
          containerStyles={'mt-5'}
        />
                <Button
          title="Set amount of remiders"
          handle={() => {setModal(true); setModalContent(ReminderAmountModal)}}
          containerStyles={'mt-5'}
        />
                <Button
          title="Set custom cup size"
          handle={() => { setModal(true); setModalContent(CustomCupModal)}}
          containerStyles={'mt-5'}
        />
                <Button
          title="Edit custom drinks"
          handle={() => {}}
          containerStyles={'mt-5'}
        />
        <Button
          title="Log out"
          handle={() => {}}
          containerStyles={'mt-5'}
          customColor={'red-100'}
        />
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
                  source={icons.plus}
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

const CustomCupModal = () => {
  return (
    <View>
      <Text className="text-xl text-blue">
        How much water should be in a cup?
      </Text>

    </View>
  )
}

const CustomGoalModal = () => {
  return (
    <View>
      <Text className="text-xl text-blue">
        Set custom water goal
      </Text>

    </View>
  )
}

const ReminderAmountModal = () => {
  return (
    <View>
      <Text className="text-xl text-blue">
        How many remiders to drink water should you get?
      </Text>

    </View>
  )
}


export default profile