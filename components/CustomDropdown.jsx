import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown'

const CustomDropdown = ({options, value, handleChangeValue}) => {
    return (
        <View className="flex-row justify-center items-center">
            <Text className="text-blue text-2xl">{value.label}</Text>
            <Dropdown
                data={options}
                style={[styles.dropdown]}
                iconColor='#3CACFD'
                selectedTextStyle={styles.text}
                mode='default'
                labelField='label'
                valueField='value'
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