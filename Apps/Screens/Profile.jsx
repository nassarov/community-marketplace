import { View, Text, Image, FlatList, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { useAuth, useUser } from '@clerk/clerk-expo';
import purchase from '../../assets/images/purchase.png'
import explore from '../../assets/images/explore.png'
import logout from '../../assets/images/logout.png'
import link from '../../assets/images/link.png'
import { useNavigation } from '@react-navigation/native';

export default function Profile() {
  const {user} =useUser();
  const {isLoaded,signOut}=useAuth();
  const menuList=[
  {
    id:1,
    name:'My Products',
    icon:purchase,
    path:'my-product'
  },
  {
    id:2,
    name:'Explore',
    icon:explore,
    path:'explore-tab'
  },
  {
    id:3,
    name:'Profile',
    icon:link,
    URL:'https://www.youtube.com/watch?v=VOFJ1wBJcUo&t=13261s'
  },
  {
    id:4,
    name:'Logout',
    icon:logout
  },
  ]
  const navigation = useNavigation();

  const MenuPress = (item) => {
    if (item?.URL) {
      Linking.canOpenURL(item.URL)
        .then((supported) => {
          if (supported) {
            Linking.openURL(item.URL);
          } else {
            console.log("Don't know how to open URI: " + item.URL);
          }
        })
        .catch((err) => console.error('An error occurred', err));
    } else if (item.name === "Logout") {
      signOut();
    } else if (item?.path) {
      navigation.navigate(item.path);
    }
    if (item.path === 'explore-tab') {
      navigation.navigate('Explore'); // Make sure 'Explore' matches your tab route name
    }
  };

  return (
    <View className="p-5 bg-white flex-1" >
      <View className="flex-col items-center mt-10">
         <Image source={{uri:user?.imageUrl}}
            className="rounded-full w-24 h-24 "
          />
          <Text className="font-bold text-[25px]">{user?.fullName}</Text>
          <Text className="text-gray-500 mt-2 text-[18px]">{user?.primaryEmailAddress?.emailAddress}</Text>
      </View>
      <FlatList
      data={menuList}
      scrollEnabled={false}
      style={{marginTop:20}}
      numColumns={3}
      renderItem={({item,index})=>(
        <TouchableOpacity className='flex-1 p-2 border-[1px] items-center mx-2 mt-4 rounded-lg border-blue-400 bg-blue-50'
        onPress={()=>MenuPress(item)}
        >
          {item.icon&& <Image source={item?.icon} className="w-[50px] h-[50px] "/>}
          <Text className="text-center text-[12px] font-bold mt-2">{item.name}</Text>
        </TouchableOpacity>
        
      )}
      />

     
    </View>
  )
}