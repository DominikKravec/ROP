import { View, Text } from 'react-native'
import React from 'react'
import Button from '../components/Button'
import { router } from 'expo-router'


const index = () => {
  return (
    <View className="justify-center items-center h-full ">
      <Text className="text-blue text-2xl">This is the health remider app.</Text>
      <Button
        title={'Sign in'}
        handle={() => {router.push('sign-in')}}
        containerStyles={'mt-8'}
      />
    </View>
  )
}

export default index