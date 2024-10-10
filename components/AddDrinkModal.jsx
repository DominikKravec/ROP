import { View, Text } from 'react-native'
import React, {useState} from 'react'
import InputUnit from './InputUnit.jsx'
import Button from './Button.jsx'
import CustomDropdown from './CustomDropdown.jsx'

const AddDrinkModal = () => {
  
    const options = [
        {label: 'ml', value: 0},
        {label: 'l', value: 1},
        {label: 'oz', value: 2}
    ]
    const drinkOptions = [
        {label: 'water', value: 0},
        {label: 'cola', value: 1},
        {label: 'beer', value: 2}
    ]
  
    const [unit, setUnit] = useState(options[0].label)
    const [amount, setAmount] = useState(0)
    const [drinkType, setDrinkType] = useState(drinkOptions[0].label)

  return (
    <View>
        <CustomDropdown
            options={drinkOptions}
            value={drinkType}
            handleChangeValue={option => {setDrinkType(option)}}
        />
        <InputUnit
          value={amount}
          options={options}
          unit={unit}
          handleChangeText={text => {setAmount(text)}}
          handleChangeUnit={option => {setUnit(option.label)}}
        />
        <Button
            title={'Add ' + amount + unit + ' of '}
            containerStyles={'mt-5'}
            handle={() => {}}  
        />

      </View>
  )
}

export default AddDrinkModal