import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import PostItem from './PostItem'

export default function LatestItemList({latestItemList, heading}) {
  return (
    <View className="mt-3 mb-8">
      <Text className="font-bold text-[20px]">{heading}</Text>
        <FlatList 
            scrollEnabled={false}
            data={latestItemList}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem={({item,index})=>(
              <PostItem item={item}/>
            )}  
        />    
</View>
  )
}