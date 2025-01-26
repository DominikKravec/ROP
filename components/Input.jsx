import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'

import { icons } from '../constants'

const Input = ({ title, value, placeholder, handleChangeText, otherStyles, type = 'default', ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View className="w-[65vw] h-14 px-4 rounded-[5000px] items-center flex-row border-2 border-blue">
        <TextInput
            className="flex-1 text-blue text-xl"
            value={value}
            keyboardType={type}
            defaultValue={(value ? value + "" : 0)}
            placeholder={placeholder}
            placeholderTextColor="#A5D9FF"
            onChangeText={handleChangeText}
            secureTextEntry={title === 'password' && !showPassword}
        />

        {title === 'password' && (
            <TouchableOpacity onPress={() => {setShowPassword(!showPassword)}}>
                <Image 
                    source={!showPassword ? icons.eye : icons.eyeHide}
                    resizeMode='contain'
                    className="w-6 h-6"
                />
            </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Input