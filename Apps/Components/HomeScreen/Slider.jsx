import { View, Text, FlatList, Image, Touchable } from 'react-native'
import React from 'react'

export default function Slider({sliderList}) {
  return (
    <View>
      <FlatList 
      data={sliderList}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      renderItem={({item,index})=>(
        <View className="mt-5">
            <Image source={{uri:item?.image}}
                className="h-[160px] w-[290px] mr-3 rounded-lg object-contain"
            />
        </View>
      )}
      keyExtractor={(item, index) => index.toString()} 
      />
      
    </View>
  )
}