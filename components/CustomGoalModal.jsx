import React, {useState} from 'react';
import { View, Text } from 'react-native';
import InputUnit from './InputUnit';
import Button from './Button';
import { useGlobalContext } from '../context/globalProvider';
import { updateUserSettings } from '../lib/appwrite';
import { volumeUnits } from '../constants/units';

const CustomGoalModal = ({closeModal}) => {

    const options = [
      {label: 'ml', value: 0},
      {label: 'l', value: 1},
      {label: 'oz', value: 2}
    ]

    const {user, userSettings, setUserSettings, setWaterGoal, calculateWater, scheduleNotifications} = useGlobalContext()
    
    const [unit, setUnit] = useState(options[0].label)
    const [amount, setAmount] = useState(userSettings.customWaterGoal)

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
            title={'Set goal to ' + (amount ? amount : '0') + unit}
            containerStyles={'mt-5'}
            handle={() => {
              setUserSettings({...userSettings, customWaterGoal: (parseFloat(amount) * volumeUnits[unit])})
              updateUserSettings(user.$id, {...userSettings, customWaterGoal: (parseFloat(amount) * volumeUnits[unit])})
              setWaterGoal((parseFloat(amount) * volumeUnits[unit]))
              scheduleNotifications(parseFloat(amount) * volumeUnits[unit])
              closeModal()
            }}  
        />

        <Button
          title="Remove custom goal"
          containerStyles={'mt-5'}
          handle={async () => {
            setUserSettings({...userSettings, customWaterGoal: null})
            updateUserSettings(user.$id, {...userSettings, customWaterGoal: null})
            await calculateWater()
            closeModal()
          }}
        />

      </View>
    )
}

export default CustomGoalModal