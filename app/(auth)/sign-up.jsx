import { View, Text, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { createUser } from '../../lib/appwrite'

const SignUp = () => {

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const register = async () => {
    if(username.trim() && email.trim() && password.trim()){
      try {
        const result = await createUser(email, password, username)
        router.replace('/personalInfo')
      } catch (error) {
        Alert.alert(error)
      }
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary">
      <View className=" justify-center items-center h-full">
        <Input
          placeholder={"email"}
          value={email}
          handleChangeText={(text) => {setEmail(text)}}
        />
        <Input
          placeholder={"username"}
          otherStyles={'mt-4'}
          value={username}
          handleChangeText={(text) => {setUsername(text)}}
        />
        <Input
          title='password'
          placeholder={'password'}
          otherStyles={'mt-4'}
          value={password}
          handleChangeText={(text) => {setPassword(text)}}
        />
        <Button
          title="Register"
          handle={() => {register()}}
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