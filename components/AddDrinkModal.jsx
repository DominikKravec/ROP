import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import InputUnit from './InputUnit.jsx'
import Button from './Button.jsx'
import CustomDropdown from './CustomDropdown.jsx'
import { volumeUnits } from '../constants/units.js'
import { useGlobalContext } from '../context/globalProvider.js'
import { createLog } from '../lib/appwrite.js'


const AddDrinkModal = ({drinkOptions, setModal}) => {
    drinkOptions = drinkOptions.map(drink => {return {...drink, label: drink.name}})
  
    const options = [
        {label: 'ml', value: 0},
        {label: 'l', value: 1},
        {label: 'oz', value: 2}
    ]

    const {user, userSettings, setWaterDrank, waterDrank, getInfoFromDrinks} = useGlobalContext()
  
    const [unit, setUnit] = useState(options[0].label)
    const [amount, setAmount] = useState(0)
    const [drinkType, setDrinkType] = useState(drinkOptions[0])

    const submit = () => {
      try {
        console.log(volumeUnits[unit])
        createLog(user.$id, drinkType.$id, (parseFloat(amount) * volumeUnits[unit]), new Date())
        getInfoFromDrinks()
        setModal(false)
      } catch (error) {
        console.log("Failed to add drink due too: " + error)
      }
    }

  return (
    <View>
        <CustomDropdown
            options={drinkOptions}
            value={drinkType.name}
            handleChangeValue={option => {setDrinkType(option)}}
        />
        <InputUnit
          value={amount}
          options={options}
          unit={unit}
          handleChangeText={text => {setAmount(parseFloat(text))}}
          handleChangeUnit={option => {setUnit(option.label)}}
        />
        <Button
            title={'Add ' + amount + unit + ' of ' + drinkType.name}
            containerStyles={'mt-5'}
            handle={() => {submit()}}  
        />

      </View>
  )
}

export default AddDrinkModal