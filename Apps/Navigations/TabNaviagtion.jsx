import { View, Text, KeyboardAvoidingView, Platform } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import ExploreScreen from '../Screens/ExploreScreen';
import AddPost from '../Screens/AddPost';
import Profile from '../Screens/Profile';
import { FontAwesome,MaterialIcons  } from '@expo/vector-icons';
import HomeScreenStackNav from './HomeScreenStackNav';
import ExploreNavigation from './ExploreNavigation';
import ProfileScreenNav from './ProfileScreenNav';

const Tab = createBottomTabNavigator();

export default function TabNaviagtion() {
  return (
   <View className="flex-1">
    <KeyboardAvoidingView className=" flex-1"  behavior={Platform.OS === 'ios' ? 'padding' : null} 
    keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
    <Tab.Navigator screenOptions={{headerShown:false, headerBackground:'light',}} >
        <Tab.Screen name="home-tab" component={HomeScreenStackNav} 
        options={{tabBarLabel:
            ({color})=>(
            <Text style={{color:color,fontSize:12, marginBottom:5}}>Home</Text>
            ),
            tabBarIcon:({color,size}) =>(
                <FontAwesome name="home" size={24} color={color} />
            )
        }} 
        />
        <Tab.Screen name="Explore" component={ExploreNavigation} 
         options={{tabBarLabel:
            ({color})=>(
            <Text style={{color:color,fontSize:12, marginBottom:5}}>Explore</Text>
            ),
            tabBarIcon:({color,size}) =>(
                <MaterialIcons name="explore" size={24} color={color} />)
        }} 
        />

        <Tab.Screen name="Add Post" component={AddPost} 
            options={{tabBarLabel:
            ({color})=>(
            <Text style={{color:color,fontSize:12, marginBottom:5}}>Add Post</Text>
            ),
            tabBarIcon:({color,size}) =>(
                <MaterialIcons name="add-a-photo" size={24} color={color}/> )
        }} 
        />
        <Tab.Screen name="Profile" component={ProfileScreenNav} 
        options={{tabBarLabel:
            ({color})=>(
            <Text style={{color:color,fontSize:12, marginBottom:5}}>Profile</Text>
            ),
            tabBarIcon:({color,size}) =>(
                <FontAwesome name="user-circle-o" size={24} color={color} />)
        }} 
        />
    </Tab.Navigator>
    </KeyboardAvoidingView>
    </View>
)
}