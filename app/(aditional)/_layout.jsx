import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'


export default function AditionalLayout(){
    return (
    <>
        <Stack>
            <Stack.Screen
                name="personalInfo"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="customDrinks"
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="drinkEdit"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
        
    </>
    )  
}
