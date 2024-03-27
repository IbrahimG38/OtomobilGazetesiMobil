import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import React from 'react'
import { LinearGradient } from "expo-linear-gradient";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { useNavigation } from "@react-navigation/native";

export default function HosgeldinEkrani() {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../../assets/images/welcome/wallpaper.jpg")}
      className="flex-1 justify-center items-center pb-6"
    >
     <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.9)"]}
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "100%",
        }}
        start = {{ x: 1, y: 0}}
        end={{ x: 1, y: 1 }}
      />

      <View className="flex-1 items-center justify-end max-w-[85%] space-y-4">
        <Text
          className="text-4xl shadow-2xl text-white text-center tracking-wider"
          style={{
            fontSize: wp(10),
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Stay Informed from Day One
        </Text>
        <Text
          className="text-white text-center max-w-[85%] leading-12 tracking-wider"
          style={{
            fontSize: wp(4),
            fontFamily: "SpaceGroteskMedium",
          }}
          >
            Discover the latest News with our Seamless Onboarding Experience
          </Text>
      </View>
    
      <TouchableOpacity
        className="bg-green-900 rounded-full p-4 justify-center items-center w-[90%] mt-8"
        onPress={()=> navigation.navigate("AnasayfaTabs")}
      >
        <Text
          className="text-base text-white"
          style={{
            fontSize: wp(4),
            fontFamily: "SpaceGroteskMedium",
          }}
          >
            Getting Started
          </Text>
        </TouchableOpacity>
    </ImageBackground>  
  );
}