import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { WebView } from "react-native-webview";
import { ChevronLeftIcon, ShareIcon } from "react-native-heroicons/outline";
import { BookmarkSquareIcon } from "react-native-heroicons/solid";
import AsyncStorage from "@react-native-async-storage/async-storage";



const { height, width } = Dimensions.get("window");



export default function IceriklerDetaylari() {
  const { params: item } = useRoute();
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();
  const [isBookmarked, toggleBookmark] = useState(false);

  
  
  // console.log("item URL", item.url);

 
 
  const toggleBookmarkAndSave = async () => {
    try {
      // Haber Makalesinin zaten Depolamada olup olmadığını kontrolü
      const savedArticles = await AsyncStorage.getItem("savedArticles");
      let savedArticlesArray = savedArticles ? JSON.parse(savedArticles) : [];
      // console.log("Makalenin zaten yer imlerine eklenip eklenmediğini kontrol et");

      
      
      // Makalenin zaten yer imlerine eklenmiş listede olup olmadığını kontrol et
      const isArticleBookmarked = savedArticlesArray.some(
        (savedArticle) => savedArticle.url === item.url
      );

      
      
      // console.log("Makalenin zaten yer imlerine eklenmiş listede olup olmadığını kontrol et");

      if (!isArticleBookmarked) {
        // Makale yer imlerine eklenmemişse, onu yer imlerine eklenenler listesine ekle
        savedArticlesArray.push(item);
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(savedArticlesArray)
        );
        toggleBookmark(true);
        // console.log("Makale yer imlerine eklendi");
      } else {
        // Makale zaten yer imlerine eklenmişse onu listeden kaldır
        const updatedSavedArticlesArray = savedArticlesArray.filter(
          (savedArticle) => savedArticle.url !== item.url
        );
        await AsyncStorage.setItem(
          "savedArticles",
          JSON.stringify(updatedSavedArticlesArray)
        );
        toggleBookmark(false);
        // console.log("Makale yer işaretlerinden kaldırıldı");
      }
    } catch (error) {
      console.log("Error Saving Article", error);
    }
  };

  useEffect(() => {
    // Load saved articles from AsyncStorage when the component mounts
    const loadSavedArticles = async () => {
      try {
        const savedArticles = await AsyncStorage.getItem("savedArticles");
        const savedArticlesArray = savedArticles
          ? JSON.parse(savedArticles)
          : [];

        // Check if the article is already in the bookmarked list
        const isArticleBookmarked = savedArticlesArray.some(
          (savedArticle) => savedArticle.url === item.url
        );

        toggleBookmark(isArticleBookmarked);
        // console.log("Check if the current article is in bookmarks");
      } catch (error) {
        console.log("Error Loading Saved Articles", error);
      }
    };

    loadSavedArticles();
  }, [item.url]);

  return (
    <>
      <View className="w-full flex-row justify-between items-center px-4 pt-10 pb-4 bg-white">
        <View className="bg-gray-100 p-2 rounded-full items-center justify-center">
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <ChevronLeftIcon size={25} strokeWidth={3} color="gray" />
          </TouchableOpacity>
        </View>

        <View className="space-x-3 rounded-full items-center justify-center flex-row">
          <TouchableOpacity className="bg-gray-100 p-2 rounded-full">
            <ShareIcon size={25} color="gray" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-100 p-2 rounded-full"
            onPress={toggleBookmarkAndSave}
          >
            <BookmarkSquareIcon
              size={25}
              color={isBookmarked ? "green" : "gray"}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* WebView */}
      <WebView
        source={{ uri: item.url }}
        onLoadStart={() => setVisible(true)}
        onLoadEnd={() => setVisible(false)}
      />

      {visible && (
        <ActivityIndicator
          size={"large"}
          color={"green"}
          style={{
            position: "absolute",
            top: height / 2,
            left: width / 2,
          }}
        />
      )}
    </>
  );
}