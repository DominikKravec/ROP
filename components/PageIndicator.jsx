import { View, Text } from 'react-native'
import React from 'react'

const PageIndicator = ({activePage, numberOfPages}) => {

  const dots = []  

  for(let i = 0; i < numberOfPages; i++){
    dots.push(i == activePage? (<ActiveDot/>):(<Dot/>))
  }

  console.log(dots)
  
  return (
    <View className="w-[100vw] justify-center items-center h-10 ">
      {dots}
    </View>
  )
}

const Dot = () => {
    return(
        <View className="w-2 h-2 rounded-xl bg-blue-100"></View>
    )
}

const ActiveDot = () => {
    return(
        <View className="w-2 h-2 rounded-xl bg-blue"></View>
    )
}


export default PageIndicator