import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, getFirestore, orderBy, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function ExploreScreen() {
  const db = getFirestore(app);
  const [productList,setProductList]=useState([]);
  const navigation= useNavigation();
  const [loading,setLoading]=useState([]);
  
  //refresh
  useEffect(()=>{
    navigation.addListener('focus',(e)=>{
    getAllProducts();
    })
},[navigation])

  // used to get all data
  const getAllProducts=async()=>{
    setProductList([]);
    setLoading(true);
    const q = query(collection(db,'UserPost'),orderBy('createdAt','desc'));
    const snapShot = await getDocs(q);
    setLoading(false);
    snapShot.forEach((doc)=>{
      setProductList(productList=>[...productList,doc.data()])
      setLoading(false);
    })
  }
  return (
  <ScrollView className="p-3 pt-10 ">
      <Text className="text-[30px] font-bold">Explore More</Text>
      {/* show loading while fetching */}
      {loading ? <Text className="p-5 text-[20px] mt-20 justify-center text-center text-gray-400" > Loading Products </Text>
      :
      <LatestItemList latestItemList={productList} />}
    </ScrollView>
  )
}