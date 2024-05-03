import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState }  from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";

export default function KaydedilenlerEkrani() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const [savedArticles, setSavedArticles] = useState([]);
  const [bookmarkStatus, setBookmarkStatus] = useState([]);

  return (
    <SafeAreaView className="p-4 bg-white flex-1 dark:bg-neutral-900">
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
  {/* Baslik  */}
  <View className="flex-row justify-between items-center">
        <Text
          className="font-bold text-xl text-green-800 dark:text-white"
          style={{
            fontFamily: "SpaceGroteskBold",
          }}
        >
          Saved Articles
        </Text>
        <TouchableOpacity
          onPress={clearSavedArticles}
          className="bg-green-800 py-1 px-4 rounded-lg"
        >
          <Text
            className="font-bold text-lg text-white dark:text-white"
            style={{
              fontFamily: "SpaceGroteskBold",
            }}
          >
            Clear
          </Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginVertical: hp(2) }} className="space-y-2 ">
        <FlatList
          data={savedArticles}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.title}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: hp(2),
          }}
        />
      </View>
    </SafeAreaView>
  );
}