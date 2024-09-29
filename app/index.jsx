import { View, Text } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { router, Redirect } from 'expo-router'
import { useGlobalContext } from '../context/globalProvider'


const index = () => {

  const {lastResetDate, setLastResetDate, setWaterDrank} = useGlobalContext()
  const todayDate = new Date().toISOString().split('T')[0];

  if( lastResetDate !== todayDate){
    setWaterDrank(0)
    setLastResetDate(todayDate)
  }

  //if(true)return <Redirect href="/personalInfo"/>
  
  return (
    <View className="justify-center items-center h-full bg-primary">
      <Text className="text-blue text-2xl">This is the health remider app.</Text>
      <Button
        title={'Continue'}
        handle={() => {router.push('sign-in')}}
        containerStyles={'mt-8'}
      />
    </View>
  )
}

export default index