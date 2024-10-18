import { View, Text, Modal, Image } from 'react-native'
import React, {useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from "../../components/Button.jsx"
import { TouchableOpacity } from 'react-native'
import icons from "../../constants/icons.js"
import CustomCupModal from "../../components/CustomCupModal.jsx"
import CustomGoalModal from "../../components/CustomGoalModal.jsx"
import ReminderAmountModal from "../../components/ReminderAmountModal.jsx"
import { router } from 'expo-router'
import CustomModal from '../../components/CustomModal.jsx'

const profile = () => {

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)

  return (
    <SafeAreaView className="h-full px-5 bg-primary">
      <View className="flex-col ">
        <Text className="text-2xl text-blue">Logged in as</Text>
        <Text className="text-5xl text-blue mt-1">User {/* change this to the actual user name*/}</Text>
      </View>
      <View className="justify-center w-full mt-8">
        <Button
          title="Edit personal information"
          handle={() => {router.push('personalInfo')}}
          containerStyles={'mt-5'}
        />
        <Button
          title="Set custom water goal"
          handle={() => {setModal(true); setModalContent(<CustomGoalModal closeModal={() => {setModal(false)}}/>)}}
          containerStyles={'mt-5'}
        />
                <Button
          title="Set amount of remiders"
          handle={() => {setModal(true); setModalContent(<ReminderAmountModal closeModal={() => {setModal(false)}}/>)}}
          containerStyles={'mt-5'}
        />
                <Button
          title="Set custom cup size"
          handle={() => { setModal(true); setModalContent(<CustomCupModal closeModal={() => {setModal(false)}}/>)}}
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
          customColor={'exit-100'}
        />
      </View>

      <CustomModal
        modal={modal}
        setModal={setModal}
        modalContent={modalContent}
      />
    </SafeAreaView>
  )
}

export default profile