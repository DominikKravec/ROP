import { View, Text } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { router, Redirect } from 'expo-router'


const index = () => {

  if(true)return <Redirect href="/profile"/>
  
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