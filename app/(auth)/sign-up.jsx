import { View, Text} from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'

const SignUp = () => {
  return (
    <SafeAreaView className="h-full bg-primary">
      <View className=" justify-center items-center h-full">
        <Input
          placeholder={"email"}
        />
        <Input
          placeholder={"username"}
          otherStyles={'mt-4'}
        />
        <Input
          title='password'
          placeholder={'password'}
          otherStyles={'mt-4'}
        />
        <Button
          title="Register"
          handle={() => {router.replace('/personalInfo')}}
          containerStyles={'mt-4'}
        />
        <View className="flex flex-row mt-3">
          <Text className="text-sm text-blue-200">
            Already have an acount?
          </Text>
          <Link href="/sign-in" className="text-sm text-blue"> Sign In</Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignUp