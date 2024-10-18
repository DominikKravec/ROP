import { ScrollView, Dimensions, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import WaterInfoPage from '../../components/WaterInfoPage'
import GraphPage from '../../components/GraphPage'
import PageIndicator from '../../components/PageIndicator'


const home = () => {
  const screenWidth = Dimensions.get('window').width;

  const [activePage, setActivePage] = useState(0)

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentPage = Math.round(contentOffsetX / screenWidth); // Calculate current page
    setActivePage(currentPage); // Update active page state
  };
  
  return (
    <SafeAreaView
      className="bg-primary h-full"
    >
      <ScrollView
        horizontal={true}
        pagingEnabled={true} 
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="flex-1"
      > 
        <WaterInfoPage/>
        <GraphPage/>
      </ScrollView>
      <PageIndicator numberOfPages={2} activePage={activePage}/>
    </SafeAreaView>
  )
}

export default home