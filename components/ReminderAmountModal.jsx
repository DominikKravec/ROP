import React, {useState} from 'react';
import { View, Text } from 'react-native';
import InputUnit from './InputUnit';
import Button from './Button';
import { useGlobalContext } from '../context/globalProvider';
import { updateUserSettings } from '../lib/appwrite';
import Input from './Input';

const ReminderAmountModal = ({closeModal}) => {

  const {user, userSettings, setUserSettings} = useGlobalContext()
  const [amount, setAmount] = useState(userSettings.reminderAmount)

    return (
      <View className="justify-center items-center">
        <Text className="text-xl text-blue mb-5">
          How many remiders to drink water should you get per day?
        </Text>
        <Input
          placeholder={"Amount"}
          value={amount}
          handleChangeText={(text) => {setAmount(parseInt(text))}}
        />
        <Button
            title={'Set reminder amount to ' + amount}
            containerStyles={'mt-5'}
            handle={() => {
              setUserSettings({...userSettings, reminderAmount: amount})
              updateUserSettings(user.$id, userSettings)
              closeModal()
            }}  
        />

      </View>
    )
}

export default ReminderAmountModal