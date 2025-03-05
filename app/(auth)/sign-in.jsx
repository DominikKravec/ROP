import { View, Text, Alert} from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { TouchableOpacity } from 'react-native'
import { Link, router } from 'expo-router'
import { signIn, getCurrentUser, getUserDrinks } from '../../lib/appwrite'
import { useGlobalContext } from '../../context/globalProvider'
import CustomModal from '../../components/CustomModal'
import { storeUser, storeUserDrinks } from '../../lib/asyncStorage'

const SignIn = () => {

  function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const {setUser, setIsLoggedIn, darkMode} = useGlobalContext()

  const [modal, setModal] = useState(false)
  const [modalText, setModalText] = useState('')

  const [isLoading, setIsLoading] = useState(false)

  const submit = async () => {
    setIsLoading(true)
    if(email.trim() && password.trim() && isValidEmail(email.trim())){
      try {
        await signIn(email, password)
        const result = await getCurrentUser();
        setUser(result)
        storeUser(result)
        setIsLoggedIn(true)
        const userDrinks = await getUserDrinks(result.$id)
        await storeUserDrinks(userDrinks)
        router.replace('/home')
      } catch (error) {
        if(error + "" == 'Error: AppwriteException: Invalid credentials. Please check the email and password.'){
          setModalText("User with theese credentials does not exist")
          setModal(true)
        }
        console.log(error)
      }finally{
        
      }
    }else{
      if(!email.trim() || !password.trim()){
        setModalText("Please fill in all the fields")
        setModal(true)
      }

      if(!isValidEmail(email.trim())){
        setModalText("Please enter a valid email format")
        setModal(true)
      }
    }
    setIsLoading(false)

  }

  return (
    <SafeAreaView className={`h-full ${darkMode ? 'bg-secondary' : 'bg-primary'}`}>
      <View className={`justify-center items-center h-full `}>
        <Input
          placeholder={"email"}
          type='email-address'
          value={email}
          handleChangeText={(text) => {setEmail(text.toLowerCase())}}
        />
        <Input
          title='password'
          placeholder={'password'}
          otherStyles={'mt-4'}
          value={password}
          handleChangeText={(text) => {setPassword(text)}}
        />
        <Button
          isLoading={isLoading}
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

      <CustomModal
        modal={modal}
        setModal={setModal}
        modalContent={(
          <View>
            <Text className="text-2xl text-red-100">{modalText}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default SignIn