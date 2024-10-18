import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputUnit from '../../components/InputUnit'
import CustomDropdown from '../../components/CustomDropdown.jsx'
import Button from '../../components/Button.jsx'
import { router } from 'expo-router'
import DatePicker from '../../components/DatePicker.jsx'

const personalInfo = () => {

  const weightUnitOptions = [{label: "kg", value: 0}, {label: "lb", value: 1},]
  const [weightUnit, setWeightUnit] = useState(weightUnitOptions[0].label)
  const [weight, setWeight] = useState(0)

  const genderOptions = [{label: 'male', value: 0}, {label: 'female', value: 1}]
  const [gender, setGender] = useState('male')

  const [dateOfBirth, setDateOfBirth] = useState({  //change this so it has the users info
    date: 1,
    month: 1,
    year: 1980,
  })

  const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const save = () => {
    if(dateOfBirth.date <= daysInMonths[dateOfBirth.month - 1] && weight > 0){
      router.replace('/profile')
      //add saving to database here
    }
    
  }

  return (
    <SafeAreaView className="bg-primary h-full justify-center px-10 items-center">
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
      <View className=" mt-5">
        <Text className="text-3xl text-blue mb-3">
          Date of birth
        </Text>
        <DatePicker
          date={dateOfBirth.date}
          month={dateOfBirth.month}
          year={dateOfBirth.year}
          setDate={(date) => {setDateOfBirth({...dateOfBirth, date: date})}}
          setMonth={(month) => {setDateOfBirth({...dateOfBirth, month: month})}}
          setYear={(year) => {setDateOfBirth({...dateOfBirth, year: year})}}
          
        />
      </View>
      <View className="w-[30vw] mt-5">
        <Text className="text-3xl text-blue">
          Gender
        </Text>
        <CustomDropdown
          options={genderOptions}
          value={gender}
          handleChangeValue={option => {setGender(option.label)}}
        />
      </View>
      <Button
        title={"Save"}
        handle={() => {save()}}
        containerStyles={"mt-10"}
      />
    </SafeAreaView>
  )
}

export default personalInfo