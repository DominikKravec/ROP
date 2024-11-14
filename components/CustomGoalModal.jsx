import React, {useState} from 'react';
import { View, Text } from 'react-native';
import InputUnit from './InputUnit';
import Button from './Button';
import { useGlobalContext } from '../context/globalProvider';
import { updateUserSettings } from '../lib/appwrite';

const CustomGoalModal = ({closeModal}) => {

    const options = [
      {label: 'ml', value: 0},
      {label: 'l', value: 1},
      {label: 'oz', value: 2}
    ]

    const [unit, setUnit] = useState(options[0].label)
    const [amount, setAmount] = useState(0)

    const {user, userSettings, setUserSettings, setWaterGoal} = useGlobalContext()

    return (
      <View>
        <Text className="text-xl text-blue">
          How much water do you want to drink daily
        </Text>
        <InputUnit
          value={amount}
          options={options}
          unit={unit}
          handleChangeText={text => {setAmount(parseFloat(text))}}
          handleChangeUnit={option => {setUnit(option.label)}}
        />
        <Button
            title={'Set goal to ' + amount + unit}
            containerStyles={'mt-5'}
            handle={() => {
              setUserSettings({...userSettings, customWaterGoal: amount})
              updateUserSettings(user.$id, userSettings)
              setWaterGoal(userSettings.customWaterGoal)
              closeModal()
            }}  
        />

      </View>
    )
}

export default CustomGoalModal