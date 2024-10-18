import { View, Text, FlatList } from 'react-native'
import React from 'react'

const PageIndicator = ({activePage, numberOfPages}) => {

  const dots = []  

  for(let i = 0; i < numberOfPages; i++){
    dots.push({pageNum: i})
  }

  console.log(dots)
  
  return (
    <View className="w-[100vw] justify-center items-center h-10 ">
      <FlatList
        data={dots}
        keyExtractor={(item) => item.pageNum}
        horizontal={true}
        renderItem={({item}) => {
            return(
                <View>
                    <Dot pageNum={item.pageNum} activePage={activePage}/>
                </View>
            )
        }}
      />
    </View>
  )
}

const Dot = ({pageNum, activePage}) => {
    return(
        <View className={`m-1 w-2 h-2 rounded-xl ${pageNum == activePage ? 'bg-blue' : 'bg-blue-100'}`}></View>
    )
}




export default PageIndicator