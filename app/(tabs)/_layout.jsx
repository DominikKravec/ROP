import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs, useLocalSearchParams } from 'expo-router'
import {icons} from '../../constants'

const TabIcon = ({icon, iconInactive, color, title, focused}) => {
  return(
    <View className="items-center justify-center gap-2">
      <Image 
        source={focused ? icon : iconInactive}
        resizeMode='contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`text-xl`} style={{color: color}}>
        {title}
      </Text>
    </View>
  )
}

const TabsLayout = () => {

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#3CACFD',
          tabBarInactiveTintColor: '#A5D9FF',
          tabBarStyle: {
            borderTopWidth: 3,
            borderTopColor: '#3CACFD',
            height: 84,
          }
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({color, focused}) => {
              return(
                <TabIcon
                  icon={icons.waterDrop}
                  iconInactive={icons.waterDropInactive}
                  color={color}
                  title={"Home"}
                  focused={focused}
                />
              )
            }

          }}
        />

        <Tabs.Screen
          name="profile"
          options={{
            headerShown: false,
            title: 'Profile',
            tabBarIcon: ({color, focused}) => {
              return(
                <TabIcon
                  icon={icons.profile}
                  iconInactive={icons.profileInactive}
                  color={color}
                  title={"Profile"}
                  focused={focused}
                />
              )
            }

          }}
        />
        
        
      </Tabs>
    </>
  )
}

export default TabsLayout