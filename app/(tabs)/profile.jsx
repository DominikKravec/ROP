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
import { useGlobalContext } from '../../context/globalProvider.js'
import { signOut } from '../../lib/appwrite.js'
import { sendNotification } from '../../lib/notifications.js'

const profile = () => {

  const [modal, setModal] = useState(false)
  const [modalContent, setModalContent] = useState(null)
  const {user, setUser, setIsLoggedIn} = useGlobalContext()

  return (
    <SafeAreaView className="h-full px-5 bg-primary">
      <View className="flex-col ">
        <Text className="text-2xl text-blue">Logged in as</Text>
        <Text className="text-5xl text-blue mt-1">{user.username}</Text>
      </View>
      <View className="justify-center w-full mt-8">
        <Button
          title="Edit personal information"
          handle={() => {router.push('personalInfo')}}
          containerStyles={'mt-5'}
        />
        <Button
          title="Set custom water goal"
          handle={() => { setModal(true); setModalContent(<CustomGoalModal closeModal={() => {setModal(false)}}/>)}}
          containerStyles={'mt-5'}
        />
                <Button
          title="Set amount of remiders"
          handle={() => { setModal(true); setModalContent(<ReminderAmountModal closeModal={() => {setModal(false)}}/>)}}
          containerStyles={'mt-5'}
        />
                <Button
          title="Set custom cup size"
          handle={() => { setModal(true); setModalContent(<CustomCupModal closeModal={() => {setModal(false)}}/>)}}
          containerStyles={'mt-5'}
        />
        <Button
          title="Edit custom drinks"
          handle={() => {router.push("/customDrinks")}}
          containerStyles={'mt-5'}
        />
        <Button
          title="Log out"
          handle={() => { 
            signOut()
            setUser(null)
            setIsLoggedIn(false)
            router.replace('/sign-in') 
          }}
          containerStyles={'mt-5'}
          customColor={'pink-100'}
        />

        {(user.username == 'Tester') && (
          <Button
            title={"Tester options"}
            containerStyles={'mt-5'}
            handle={() => {
              setModal(true);
              setModalContent(
                <View>
                  <Button
                    title="Send notification"
                    handle={() => {sendNotification()}}
                  />
                </View>
              )
            }}
          />
        )}
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