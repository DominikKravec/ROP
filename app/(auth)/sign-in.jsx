import { View, Text, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { signIn, getCurrentUser, getUserSettings } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'


const SignIn = () => {

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setUser, setIsLoggedIn, scheduleNotifications} = useGlobalContext()

  const submit = async () => {
    if(email.trim() && password.trim() && isValidEmail(email.trim())){
      try {
        await signIn(email, password)
        const result = await getCurrentUser();
        setUser(result)
        setIsLoggedIn(true)
        const userSettings = await getUserSettings(result.$id)
        scheduleNotifications(userSettings.reminderAmount)
        router.replace('/home')
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <SafeAreaView className="h-full">
      <View className=" justify-center items-center h-full bg-primary">
        <Input
          placeholder={"email"}
          value={email}
          handleChangeText={(text) => {setEmail(text)}}
        />
        <Input
          title='password'
          placeholder={'password'}
          otherStyles={'mt-4'}
          value={password}
          handleChangeText={(text) => {setPassword(text)}}
        />
        <Button
          title="Sign In"
          handle={() => {submit()}}
          containerStyles={'mt-4'}
        />
        <View className="flex flex-row mt-3">
          <Text className="text-sm text-blue-200">
            Don't have an acount?
          </Text>
          <Link href="/sign-up" className="text-sm text-blue"> Sign Up </Link>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default SignIn