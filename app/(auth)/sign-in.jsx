import { View, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'

const SignIn = () => {
  return (
    <SafeAreaView className="h-full">
      <View className=" justify-center items-center h-full bg-primary">
        <Input
          placeholder={"email"}
        />
        <Input
          title='password'
          placeholder={'password'}
          otherStyles={'mt-4'}
        />
        <Button
          title="Sign In"
          handle={() => {router.replace('/home')}}
          containerStyles={'mt-4'}
        />
        <View className="flex flex-row mt-3">
          <Text className="text-sm text-blue-200">
            Don't have an acount?
          </Text>
          <Link href="/sign-up" className="text-sm text-blue"> Sign Up</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignIn