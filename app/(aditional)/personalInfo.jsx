import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputUnit from '../../components/InputUnit'
import CustomDropdown from '../../components/CustomDropdown.jsx'

const personalInfo = () => {

  const weightUnitOptions = [{label: "kg", value: 0}, {label: "lb", value: 1},]
  const [weightUnit, setWeightUnit] = useState(weightUnitOptions[0].label)
  const [weight, setWeight] = useState(0)

  const genderOptions = [{label: 'male', value: 0}, {label: 'female', value: 1}]
  const [gender, setGender] = useState('male')

  return (
    <SafeAreaView className="bg-primary h-full justify-center px-10">
      <View className="w-[30vw]">
        <Text className="text-3xl text-blue">
          Weight:
        </Text>
        <InputUnit
          options={weightUnitOptions}
          unit={weightUnit}
          value={weight}
          handleChangeText={text => {setWeight(parseInt(text))}}
          handleChangeUnit={option => {setWeightUnit(option.label)}}
        />
      </View>
      <View className="w-[30vw]">
        <Text className="text-3xl text-blue">
          Gender
        </Text>
        <CustomDropdown
          options={genderOptions}
          value={gender}
          handleChangeValue={option => {setGender(option.label)}}
        />
      </View>
    </SafeAreaView>
  )
}

export default personalInfo