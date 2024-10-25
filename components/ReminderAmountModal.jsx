import React, {useState} from 'react';
import { View, Text } from 'react-native';
import InputUnit from './InputUnit';
import Button from './Button';
import { useGlobalContext } from '../context/globalProvider';
import { updateUserSettings } from '../lib/appwrite';
import Input from './Input';

const ReminderAmountModal = ({closeModal}) => {

    
    const [amount, setAmount] = useState(0)

    const {user, userSettings, setUserSettings} = useGlobalContext()

    return (
      <View className="justify-center items-center">
        <Text className="text-xl text-blue">
          How many remiders to drink water should you get?
        </Text>
        <Input
          value={amount}
          handleChangeText={text => {setAmount(parseInt(text))}}
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