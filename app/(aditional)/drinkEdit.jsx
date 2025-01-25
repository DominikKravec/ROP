import { View, Text, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/globalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'
import { router } from 'expo-router'
import InputUnit from '../../components/InputUnit.jsx'
import { addCustomDrink, getCustomDrinks, getUserDrinks, updateDrink } from '../../lib/appwrite.js'
import { storeUserDrinks } from '../../lib/asyncStorage.js'
import CustomModal from '../../components/CustomModal.jsx'

const DrinkEdit = () => {
  const sugarUnitOptions = [{label: "g", value: 0}, {label: "oz", value: 1},]

  const {editedDrink, user, setCustomDrinks, customDrinks} = useGlobalContext()

  const [modal, setModal] = useState(false)

  const [name, setName] = useState("")
  const [sugar, setSugar] = useState(0)
  const [apv, setApv] = useState(0)
  const [calories, setCalories] = useState(0)
  const [sugarUnit, setSugarUnit] = useState(sugarUnitOptions[0])

  useEffect(() => {
    if(editedDrink){
      setName(editedDrink.name)
      setSugar(editedDrink.sugar)
      setApv(editedDrink.apv)
      setCalories(editedDrink.calories)
    }
  }, [])

  const submit = async () => {

    if(apv > 100){
      setModal(true)
      return
    }

    if(!editedDrink){
      try {
        const newDrink = await addCustomDrink(user.$id, name, parseFloat(calories), parseInt(apv), parseFloat(sugar))
        await setCustomDrinks([...customDrinks, newDrink])

        router.replace('/customDrinks')    

        const userDrinks = await getUserDrinks(user.$id)
        await storeUserDrinks(userDrinks)

      } catch (error) {
        console.log("Couldn't add drink due to: " + error)
      }
    }else{
      try {
        console.log(editedDrink)
        const updatedDrink = await updateDrink(editedDrink.$id, name, parseFloat(calories), parseInt(apv), parseFloat(sugar))
        const drinks = await getCustomDrinks(user.$id)
        setCustomDrinks(drinks)
        router.replace('/customDrinks')
      } catch (error) {
        console.log("Couldn't update drink due to: " + error)
      }
    }
  }
  
  return (
    <SafeAreaView className="h-full justify-center items-center bg-primary">
      <Input
        placeholder={"drink name"}
        value={name}
        handleChangeText={(text) => {setName(text)}}
      />

      <View className="justify-center items-center mt-5">
        <Text className="text-2xl text-blue">Alcohol per volume</Text>
        <View className="flex-row">
          <TextInput
                className='border-b-2 border-b-blue text-2xl w-18 text-blue '
                keyboardType='number-pad'
                value={apv}
                defaultValue={(apv ? apv + "" : 0)}
                onChangeText={(text) => {setApv(text)}}
          />
          <Text className="text-2xl text-blue">%</Text>
        </View> 
      </View>

      <View className="justify-center items-center mt-5">
        <Text className="text-2xl text-blue">
          Sugar per 100ml
        </Text>
        <InputUnit
          options={sugarUnitOptions}
          value={sugar}
          handleChangeText={(text) => {setSugar(text)}}
          unit={sugarUnit.label}
          handleChangeUnit={(unit) => setSugarUnit(unit)}
        />
      </View>

      <View className="justify-center items-center mt-5">
        <Text className="text-2xl text-blue">Calories in 100ml</Text>
        <View className="flex-row">
          <TextInput
                className='border-b-2 border-b-blue text-2xl w-18 text-blue '
                keyboardType='number-pad'
                value={calories}
                defaultValue={(calories ? calories + "" : 0)}
                onChangeText={(text) => {setCalories(text)}}
          />
        </View> 
      </View>

      <Button
        title={editedDrink ? 'Save' : 'Add'}
        handle={() => {submit()}}
        containerStyles={'mt-5'}
      />

      <CustomModal
        modal={modal}
        setModal={setModal}
        modalContent={(
          <View>
            <Text className="text-2xl text-blue">Apv must be between 0 and 100</Text>
          </View>
        )}
      />
    </SafeAreaView>
  )
}

export default DrinkEdit