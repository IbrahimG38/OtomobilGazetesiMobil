import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Carousel from "react-native-snap-carousel";
import BreakingNewsCard from './BreakingNewsCard';

const { width } = Dimensions.get("window");

export default function BreakingNews({data,label}) {
    const navigation = useNavigation();

    const handleClick = (item) => {
        navigation.navigate("IceriklerDetaylari", item);
    }
  
  return (
    <View>
      <Carousel
        data={data}
        renderItem={({ item }) => (
            <BreakingNewsCard item={item} handleClick={handleClick} />
        )}
        firstItem={1}
        inactiveSlideScale={0.86}
        sliderWidth={width}
        itemWidth={width * 0.8}
        slideStyle={{
            display: "flex",
            alignItems: "center",
        }}
    />
    </View>
  )
}