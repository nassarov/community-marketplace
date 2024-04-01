import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/Profile';
import MyProducts from '../Screens/MyProducts';
import ProductDetails from '../Screens/ProductDetails';
import ExploreScreen from '../Screens/ExploreScreen';


const Stack = createStackNavigator();

export default function ProfileScreenNav() {
  return (
    <Stack.Navigator>
        <Stack.Screen name='profile-tab' options={{headerShown:false}} component={Profile}/>
        <Stack.Screen name='my-product' component={MyProducts} 
        options={{headerStyle:{
        backgroundColor:'#3b82f6'}
       , headerTintColor:'white'
      , headerTitle:"My Products"}} />
      <Stack.Screen name="product-details" component={ProductDetails} 
         options={{headerStyle:{
          backgroundColor:'#3b82f6'}
         , headerTintColor:'white'
        , headerTitle:"Details"}}/>
      <Stack.Screen name="explore-tab" component={ExploreScreen}
         options={{headerShown:false
        }}/>
      
     
    </Stack.Navigator>
  )
}