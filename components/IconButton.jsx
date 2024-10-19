import { View, Text, Image } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native'

const IconButton = ({title, icon, handle}) => {
  return (
    <View >
      <TouchableOpacity
        className="justify-center items-center"
        onPress={handle}
      >
        <Image
            source={icon}
            className="w-10 h-10"
        />
        {title && (
          <Text className="text-lg text-blue-200">{title}</Text>
        )}
      </TouchableOpacity>
    </View>
  )
}

export default IconButton