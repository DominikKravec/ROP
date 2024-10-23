import { View, Text, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Dropdown } from 'react-native-element-dropdown'

const InputUnit = ({options, value, unit, handleChangeText, handleChangeUnit}) => {

  return (
    <View className='flex flex-row justify-center h-10 items-center'>
        <TextInput
            className='border-b-2 border-b-blue text-2xl w-20 text-blue'
            onChangeText={handleChangeText}
            value={value}
            keyboardType='number-pad'
            defaultValue={value}
        />
        <Text className="text-blue text-2xl">{unit}</Text>
        <Dropdown
            data={options}
            style={[styles.dropdown]}
            iconColor='#3CACFD'
            selectedTextStyle={styles.text}
            mode='default'
            labelField='label'
            valueField='value'
            onChange={handleChangeUnit}
            renderItem={item => {return(
                <View className="bg-primary">
                    <Text className="text-blue text-xl">{item.label}</Text>
                </View>
            )}}
        />
    </View>
  )
}



export default InputUnit

const styles = StyleSheet.create({
    
    dropdown: {
      borderColor: '#3CACFD',
      height: 30,
      marginLeft: 5,
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
})