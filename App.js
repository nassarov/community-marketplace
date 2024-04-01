import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './Apps/Screens/LoginScreen';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { NavigationContainer } from '@react-navigation/native';
import TabNaviagtion from './Apps/Navigations/TabNaviagtion';
import AddPost from './Apps/Screens/AddPost';
import HomeScreen from './Apps/Screens/HomeScreen';

export default function App() {
  return (
    <ClerkProvider publishableKey='pk_test_Z3VpZGVkLXNjdWxwaW4tMC5jbGVyay5hY2NvdW50cy5kZXYk'>
    <View className="flex-1 bg-white">
      <StatusBar style="auto" />
      <SignedIn>
        <NavigationContainer>
          <TabNaviagtion/>
        </NavigationContainer>
      </SignedIn>
      <SignedOut>
        <LoginScreen/>
      </SignedOut>
    </View>
    </ClerkProvider>
  );
}

