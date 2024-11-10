import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'

const CustomDropdown = ({options, value, handleChangeValue}) => {
    return (
        <View className="flex-row justify-center items-center">
            <Text className="text-blue text-2xl absolute z-10 ">{value}</Text>
            <Dropdown
                data={options}
                style={[styles.dropdown]}
                iconColor='#3CACFD'
                selectedTextStyle={styles.text}
                mode='default'
                labelField='label'
                valueField='value'
                value={value}
                placeholderStyle={styles.placeholder}
                placeholder="Select drink"
                onChange={handleChangeValue}
                renderItem={item => {return(
                    <View className="bg-primary w-fit">
                        <Text className="text-blue text-xl">{item.label}</Text>
                    </View>
                )}}
            />
        </View>
    )
}

export default CustomDropdown

const styles = StyleSheet.create({

    placeholder: {
      fontSize: 24,
      color: '#fefeff',
      marginLeft: 8,
    },
    
    dropdown: {
      borderColor: '#3CACFD',
      height: 40,
      width: 230,
      marginLeft: 5,
      borderWidth: 2,
      borderRadius: 8,
      paddingHorizontal: 0,
      paddingVertical: 0,
    },
    text: {
      fontSize: 24,
      color: '#fefeff',
      marginLeft: 8,
    },
})