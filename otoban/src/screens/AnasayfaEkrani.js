import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useColorScheme } from "nativewind";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import { SafeAreaView } from "react-native-safe-area-context";


export default function AnasayfaEkrani() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);

  // Breaking News
  const { isLoading: isBreakingNewsLoading } = useQuery({
    queryKey: ["breakingNews"],
    queryFn: fetchBreakingNews,
    onSuccess: (data) => {
      setBreakingNews(data.articles);
    },
    onError: (error) => {
      console.log("Error fetching breaking news:", error);
    },
  });

    // Breaking News
    const { isLoading: isRecommendedNewsLoading } = useQuery({
      queryKey: ["recommendedNews"],
      queryFn: fetchRecommendedNews,
      onSuccess: (data) => {
        setRecommendedNews(data.articles);
      },
      onError: (error) => {
        console.log("Error fetching recommended news:", error);
      },
  });

  return (
    <SafeAreaView>

    </SafeAreaView>
  );
}