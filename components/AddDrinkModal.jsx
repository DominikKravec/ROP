import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import InputUnit from './InputUnit.jsx'
import Button from './Button.jsx'
import CustomDropdown from './CustomDropdown.jsx'
import { volumeUnits } from '../constants/units.js'


const AddDrinkModal = ({drinkOptions}) => {

    console.log(drinkOptions)

    drinkOptions = drinkOptions.map(drink => {return {...drink, label: drink.name}})
  
    const options = [
        {label: 'ml', value: 0},
        {label: 'l', value: 1},
        {label: 'oz', value: 2}
    ]
  
    const [unit, setUnit] = useState(options[0].label)
    const [amount, setAmount] = useState(0)
    const [drinkType, setDrinkType] = useState(drinkOptions[0].name)

  return (
    <View>
        <CustomDropdown
            options={drinkOptions}
            value={drinkType}
            handleChangeValue={option => {setDrinkType(option.name)}}
        />
        <InputUnit
          value={amount}
          options={options}
          unit={unit}
          handleChangeText={text => {setAmount(text)}}
          handleChangeUnit={option => {setUnit(option.label)}}
        />
        <Button
            title={'Add ' + amount + unit + ' of ' + drinkType}
            containerStyles={'mt-5'}
            handle={() => {}}  
        />

      </View>
  )
}

export default AddDrinkModal