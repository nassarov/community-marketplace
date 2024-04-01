import { View, Text, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '../../firebaseConfig';
import { useUser } from '@clerk/clerk-expo';
import LatestItemList from '../Components/HomeScreen/LatestItemList';
import { useNavigation } from '@react-navigation/native';

export default function MyProducts() {
    const db =  getFirestore(app);
    const {user}=useUser();
    const [produtcList,setproductList]=useState([]);
    const [loading,setLoading]=useState([]);
    //set event listener when navigating 
    const navigation = useNavigation();
    useEffect(()=>{
        user;
    },[user]) // only when user available execute this in effect

    //set event listener when navigating 
    useEffect(()=>{
        navigation.addListener('focus',(e)=>{
        getUserPost();  
         })
    },[navigation])
    
    // used to get user posts only
    const getUserPost=async()=>{
        setproductList([]);
        setLoading(true);
       const q = query(collection(db,'UserPost'),where('userEmail','==',user?.primaryEmailAddress?.emailAddress));
       const snapShot = await getDocs(q);
       setLoading(false);
       snapShot.forEach(doc=>{
        setproductList(produtcList=>[...produtcList,doc.data()]);
        setLoading(false);
       })
    }
  return (
    <View className="p-2">
         {loading?
      <ActivityIndicator size={'large'} color={'blue'} className="mt-20"/>
      :
      produtcList.length>0?
    <LatestItemList latestItemList={produtcList} />
      
      ://else
      <Text className="p-5 text-[20px] mt-20 justify-center text-center text-gray-400">No Products Posted Yet</Text>
      }
 
    </View>
  )
}