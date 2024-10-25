import React, {useState} from 'react';
import { View, Text } from 'react-native';
import InputUnit from './InputUnit';
import Button from './Button';
import { useGlobalContext } from '../context/globalProvider';
import { updateUserSettings } from '../lib/appwrite';

const CustomCupModal = ({closeModal}) => {

    const options = [
      {label: 'ml', value: 0},
      {label: 'l', value: 1},
      {label: 'oz', value: 2}
    ]

    const [unit, setUnit] = useState(options[0].label)
    const [amount, setAmount] = useState(0)

    const {userSettings, setUserSettings, user} = useGlobalContext()

    return (
      <View>
        <Text className="text-xl text-blue">
          How much water should be in a cup?
        </Text>
        <InputUnit
          value={amount}
          options={options}
          unit={unit}
          handleChangeText={text => {setAmount(text)}}
          handleChangeUnit={option => {setUnit(option.label)}}
        />
        <Button
            title={'Set cup volume to ' + amount + unit}
            containerStyles={'mt-5'}
            handle={() => {
              try{
                setUserSettings({...userSettings, cupSize: parseFloat(amount)})
                updateUserSettings(user.$id, userSettings)
                closeModal()
              }catch (error){
                console.log(error)
              }
            }}  
        />

      </View>
    )
}

export default CustomCupModal