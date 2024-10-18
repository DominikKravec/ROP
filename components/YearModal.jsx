import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'
import Button from './Button'

const YearModal = ({year, setYear, setModal}) => {

  const [local, setLocal] = useState(year)

  const set = () => {
    if(local <= new Date().getFullYear() && local >= 1900){
        setYear(local)
        setModal(false)
    }
  }

  return (
    <View className="justify-center items-center">
      <TextInput
            className='border-b-2 border-b-blue text-2xl w-18 text-blue'
            keyboardType='number-pad'
            value={local}
            onChangeText={(text) => {setLocal(text)}}
      />
      <Button
        title={"Set"}
        handle={()=>{set()}}
        containerStyles={"mt-3"}
      />
    </View>
  )
}

export default YearModal