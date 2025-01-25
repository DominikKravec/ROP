import { View, Text } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { router, Redirect } from 'expo-router'
import { useGlobalContext } from '../context/globalProvider'


const index = () => {

  const {isLoggedIn, isOffline, darkMode} = useGlobalContext()

  if(isLoggedIn) return <Redirect href="/home"/>

  return (
    <View className={`justify-center items-center h-full ${darkMode ? 'bg-secondary' : 'bg-primary'}`}>
      <Text className="text-blue text-2xl">Welcome to Health Reminder</Text>
      {isOffline ? 
        <Text className="text-blue text-lg w-[75vw] text-center">You are offline. You need to connect to a network to log in. After that you can use this app even if you are offline. </Text> 
        : 
        <Button
        title={'Continue'}
        handle={() => {router.push('sign-in')}}
        containerStyles={'mt-8'}
      />}
      
    </View>
  )
}

export default index