import { View, Text, TextInput } from 'react-native'
import React, {useState} from 'react'
import Button from './Button'


const DateModal = ({date, setDate, setModal}) => {

    const [local, setLocal] = useState(date)

    const set = () => {
      if(local <= 31 && local >= 1){
          setDate(local)
          setModal(false)
      }
    }
  
    return (
      <View className="justify-center items-center">
        <Text className="text-xl text-blue-200">Date</Text>
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

export default DateModal