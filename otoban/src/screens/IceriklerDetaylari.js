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

//BURADAN DEVAM EDECEĞİM 


// HABERLERE TIKLAYINCA ASIL KAYNAĞI GÖRÜNTÜLEYECEK ŞEKİLDE İÇERİKLERİNİ HAZIRLAMAYA BAŞLADIM.


//COMMIT 8.GONDERİM UNUTMA



//24.05.2024