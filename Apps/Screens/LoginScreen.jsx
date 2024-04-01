import { View, Text, Image, Button, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import * as WebBrowser from "expo-web-browser";
import { useOAuth } from "@clerk/clerk-expo";
import { useWarmUpBrowser } from "../hooks/useWarmUpBrowser";
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {

  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <Image source={require('./../../assets/images/login1.jpg')}
      className="w-full h-[400px] object-cover "
      />
      <View className="p-5 mt-[-20px] rounded-t-3xl shadow-2xl bg-slate-300 min-h-screen">
        <Text className="text-[30px] font-bold">Community Marketplace</Text>
        <Text className="text-[18px] mt-6 text-slate-500">Buy Sell Marketplace where you can sell old items and make real money
        </Text>
        <TouchableOpacity className="p-4 bg-blue-500 rounded-full mt-36" onPress={onPress}>
          <Text className="text-white text-center text-[18px]">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}