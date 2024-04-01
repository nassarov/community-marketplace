import { View, Text, ScrollView, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../Components/HomeScreen/Header'
import Slider from '../Components/HomeScreen/Slider'
import { collection, getDocs, getFirestore, orderBy } from 'firebase/firestore'
import { app } from '../../firebaseConfig'
import Categories from '../Components/HomeScreen/Categories'
import LatestItemList from '../Components/HomeScreen/LatestItemList'
import { useNavigation } from '@react-navigation/native'

export default function HomeScreen() {

  const db =getFirestore(app);
  const [sliderList,setSliderList]=useState([]);
  const [categoryList,setCategoryList]=useState([]);
  const [latestItemList,setLatestItemList]=useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getSlider();
    getCategoryList();
    //refresh
    navigation.addListener('focus',(e)=>{
      getLatestItems();
    })  
  },[navigation])

  // Used to get Sliders for homescreen
  const getSlider=async()=>{
    setSliderList([]); //to do not repeat data everytime without duplicating 
    const querySnapshot = await getDocs(collection(db, "Sliders"));
  querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log("Document data: ", doc.id, " => ", doc.data());
  // store this info
  setSliderList(sliderList=>[...sliderList,doc.data()]);
});
  };
  // used to get Category List
  const getCategoryList = async () => {
    setCategoryList([]);
    const querySnapshot = await getDocs(collection(db, "Category"));
    querySnapshot.forEach((doc) => {
      console.log("Docs:", doc.data());
      setCategoryList((categoryList) => [...categoryList, doc.data()]);
    });
  };

  //refresh on navigation
  // useEffect(()=>{
  //   navigation.addListener('focus',(e)=>{
  //     getLatestItems();
  //   })
  // },[navigation])

  // used to get items
  const getLatestItems = async()=>{
    setLatestItemList([]);
    const querySnapshot = await getDocs(collection(db,"UserPost"), orderBy('createdAt','asc'));
    querySnapshot.forEach((doc)=>{
      setLatestItemList((latestItemList)=>[...latestItemList,doc.data()]);
    });
  }

  return (
    <ScrollView nestedScrollEnabled={true} className="py-8 px-6 bg-white ">
      <Header/>
      <Slider sliderList={sliderList}/>
      <Categories categoryList={categoryList}/>
      <SafeAreaView style={{flex: 1}}>
      <LatestItemList latestItemList={latestItemList} heading={'Latest Items'} />
      </SafeAreaView>
    </ScrollView>
  )
}