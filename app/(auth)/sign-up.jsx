import { View, Text, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { createUser, getUserSettings } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'
import CustomModal from '../../components/CustomModal'

const SignUp = () => {

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  const [modal, setModal] = useState(false)
  const [modalText, setModalText] = useState('')

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const {setUser, setIsLoggedIn} = useGlobalContext()

  const register = async () => {
    if(username.trim() && email.trim() && password.trim() && password.length >= 8 && isValidEmail(email.trim())){
      try {
        const result = await createUser(email, password, username)
        setUser(result)
        setIsLoggedIn(true)
        router.replace('/personalInfo')
      } catch (error) {
        if(error + '' == 'Error: AppwriteException: A user with the same id, email, or phone already exists in this project.'){
          setModal(true)
          setModalText('User with the same email already exists')
        }else{
          console.log("Couldn't register due to: " + error)
          Alert.alert(error)
        }
      }
    }else{
      if(!username.trim() || !email.trim() || !password.trim()){
        setModal(true)
        setModalText('Please fill in all the fields')
      }else if(password.length < 8){
        setModal(true)
        setModalText('Password must be at least 8 characters long')
      }else if(!isValidEmail(email.trim())){
        setModal(true)
        setModalText('Please enter a valid email format')
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
      <CustomModal
        modalContent={(
          <View>
            <Text className="text-xl text-red-100">{modalText}</Text>
          </View>
        )}
        modal={modal}
        setModal={setModal}
      />
    </SafeAreaView>
  )
}

export default SignUp