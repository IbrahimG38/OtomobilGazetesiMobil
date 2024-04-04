import { View, Text, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useColorScheme } from "nativewind";
import { useQuery } from "@tanstack/react-query";
import { fetchBreakingNews, fetchRecommendedNews } from "../../utils/NewsApi";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from 'expo-status-bar';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MiniHeader from '../components/MiniHeader';
import BreakingNews from '../components/BreakingNews';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NewsSection from '../components/NewsSection';


export default function AnasayfaEkrani() {
  const {colorScheme, toggleColorScheme} = useColorScheme();
  const [breakingNews, setBreakingNews] = useState([]);
  const [recommendedNews, setRecommendedNews] = useState([]);

  //console.log("breaking-news", breakingNews);

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
      <StatusBar style={colorScheme == "dark" ? "light" : "dark"} />
      <Header />

      {
        isBreakingNewsLoading ? (
          <Loading />
        ) : (
          <View>
            <MiniHeader label="Breaking News" />
            <BreakingNews label={"Breaking News"} data={breakingNews} />
          </View>
        )
      }
      
      <View>
        <MiniHeader label="Recommended News" />
      
        <ScrollView
          contentContainerStyle={{
            paddingBottom: hp(80),
          }}
        >
          {isRecommendedNewsLoading ? (
            <Loading />
          ):(
            <NewsSection label="Recommendation" newsProps={recommendedNews} />
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}