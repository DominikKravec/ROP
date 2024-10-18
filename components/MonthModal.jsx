import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import Button from './Button'

const MonthModal = ({month, setMonth, setModal}) => {
  
    const [local, setLocal] = useState(month)

    const set = () => {
      if(local <= 12 && local >= 1){
          setMonth(local)
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

export default MonthModal