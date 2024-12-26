import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useGlobalContext } from '../../context/globalProvider'
import { SafeAreaView } from 'react-native-safe-area-context'
import Input from '../../components/Input.jsx'
import Button from '../../components/Button.jsx'
import { router } from 'expo-router'
import InputUnit from '../../components/InputUnit.jsx'
import { addCustomDrink, getCustomDrinks, updateDrink } from '../../lib/appwrite.js'

const DrinkEdit = () => {
  const sugarUnitOptions = [{label: "g", value: 0}, {label: "oz", value: 1},]

  const {editedDrink, user, setCustomDrinks, customDrinks} = useGlobalContext()

  const [name, setName] = useState(editedDrink ? editedDrink.name : "")
  const [sugar, setSugar] = useState(editedDrink ? editedDrink.sugar : 0)
  const [apv, setApv] = useState(editedDrink ? editedDrink.alcohol : 0)
  const [calories, setCalories] = useState(editedDrink ? editedDrink.calories : 0)
  const [sugarUnit, setSugarUnit] = useState(sugarUnitOptions[0])

  const submit = async () => {

    if(apv > 100) setApv(100)

    if(!editedDrink){
      try {
        const newDrink = addCustomDrink(user.$id, name, parseFloat(calories), parseInt(apv), parseFloat(sugar))
        setCustomDrinks([...customDrinks, newDrink])
        router.replace('/customDrinks')    
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
    <SafeAreaView className="h-full justify-center items-center">
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
                onChangeText={(text) => {setCalories(text)}}
          />
        </View> 
      </View>

      <Button
        title={editedDrink ? 'Save' : 'Add'}
        handle={() => {submit()}}
        containerStyles={'mt-5'}
      />
    </SafeAreaView>
  )
}

export default DrinkEdit