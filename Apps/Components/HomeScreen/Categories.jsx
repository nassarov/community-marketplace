import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Categories({categoryList}) {
  const navigation = useNavigation();
  return (
    <View className="mt-5">
      <Text className="font-bold text-[20px]">Categories</Text>
      <FlatList
      scrollEnabled={false}
      data={categoryList}
      numColumns={4}
      renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>navigation.navigate('item-list',{
          category: item.name,
        })}
        className="flex-1 items-center justify-center border-[1px] p-1 border-blue-200 m-1 
          rounded-lg h-[80px] bg-blue-50">
        <Image source={{uri:item?.icon}} 
        className="h-[40px] w-[40px]"/>
        <Text className="text-[12px]">{item.name}</Text>
        </TouchableOpacity>
      )}
      />
    </View>
  )
}