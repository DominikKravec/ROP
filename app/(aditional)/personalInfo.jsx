import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import InputUnit from '../../components/InputUnit'
import CustomDropdown from '../../components/CustomDropdown.jsx'
import Button from '../../components/Button.jsx'
import { router } from 'expo-router'
import DatePicker from '../../components/DatePicker.jsx'
import { getUserInfo, saveUserInfo } from '../../lib/appwrite.js'
import { useGlobalContext } from '../../context/globalProvider.js'
import { weightUnits } from '../../constants/units.js'
import { schedulePushNotification } from '../../lib/notifications.js'
import CustomModal from '../../components/CustomModal.jsx'

const personalInfo = () => {

  const {user, calculateWater, userSettings, darkMode} = useGlobalContext()

  const [documentId, setDocumentId] = useState('')
  const [weight, setWeight] = useState(0)
  const [gender, setGender] = useState('male')
  const [dateOfBirth, setDateOfBirth] = useState({
    date: 1,
    month: 1,
    year: 1980,
  })

  const extractDate = (dateTime) => {

    const dateObject = dateTime.split('T')[0].split('-');

    return {
      date: dateObject[2],
      month: dateObject[1],
      year: dateObject[0]
    }
  }

  
  useEffect(() => {
    const getInfo = async () => {
      try {
        if(user){
          const userInfo = await getUserInfo(user.$id)  
          setWeight(userInfo.weight)
          setGender(userInfo.gender)
          setDateOfBirth(extractDate(userInfo.dateOfBirth))
          setDocumentId(userInfo.$id)
        }
      } catch (error) {
        console.log(error)
      }
    }

    getInfo()
  }, [user])

  const weightUnitOptions = [{label: "kg", value: 0}, {label: "lb", value: 1},]
  const [weightUnit, setWeightUnit] = useState(weightUnitOptions[0].label)

  const genderOptions = [{label: 'male', value: 0}, {label: 'female', value: 1}]

  const daysInMonths = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [modal, setModal] = useState(false)

  const [isLoading, setIsLoading] = useState(false)

  const save =  async () => {
    setIsLoading(true)
    if(dateOfBirth.date <= daysInMonths[dateOfBirth.month - 1] && weight > 0){
      try {
        await saveUserInfo(documentId, weight, gender, dateOfBirth)
        if(!userSettings.customWaterGoal){
          calculateWater()
        }
        router.replace('/profile')  
      } catch (error) {
        console.log(error)
      }     
    }else{
      setModal(true)
    }
    setIsLoading(false)
  }

  return (
    <SafeAreaView className={`${darkMode ? 'bg-secondary' : 'bg-primary'} h-full justify-center px-10 items-center`}>
      
      <View className="w-[30vw]">
        <Text className="text-3xl text-blue">
          Weight:
        </Text>
        <InputUnit
          options={weightUnitOptions}
          unit={weightUnit}
          value={weight}
          handleChangeText={text => {setWeight(parseInt(text) * weightUnits[weightUnit])}}
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
        isLoading={isLoading}
      />

      <CustomModal
        modal={modal}
        setModal={setModal}
        modalContent={(
          <View>
            <Text className="text-2xl text-red-100">Please enter valid information</Text>
          </View>
        )}
      />

    </SafeAreaView>
  )
}

export default personalInfo