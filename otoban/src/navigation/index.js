import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'nativewind';
import AnasayfaEkrani from '../screens/AnasayfaEkrani';
import KesfetEkrani from '../screens/KesfetEkrani';
import KaydedilenlerEkrani from '../screens/KaydedilenlerEkrani';
import AramaEkrani from '../screens/AramaEkrani';
import AcilisEkranlari from '../screens/AcilisEkranlari';
import HosgeldinEkrani from '../screens/HosgeldinEkrani';
import IceriklerDetayEkrani from '../screens/IceriklerDetayEkrani';
import { Ionicons } from '@expo/vector-icons';

const Tab= createBottomTabNavigator();
const Stack=createNativeStackNavigator();

export default function AppNavigation() {
    const { colorScheme, toggleColorScheme } = useColorScheme();
    const TabNavigator = () => {
        return (
            <Tab.Navigator screenOptions={({ route }) => ({ 
                headerShown: false,
                tabBarIcon: ({focused}) => {
                    let iconName;

                    if (route.name === "Anasayfa"){
                        iconName="home";
                    }else if (route.name === "Kesfet"){
                        iconName="compass-outline";
                    }else if (route.name === "Kaydedilenler"){
                        iconName="bookmark-outline";
                    }else if (route.name === "Arama"){
                        iconName="search-outline";
                    }

                    const customizeSize=25;

                    return(
                        <Ionicons
                        name={iconName}
                        size={customizeSize}
                        color={focused ? "green" : "gray"}
                        />
                    );
                },
                tabBarActiveTintColor: "green",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: {
                    fontSize:12,
                    fontFamily: "SpaceGroteskMedium",
                },
                tabBarStyle: {
                    backgroundColor: colorScheme === "dark" ? "black" : "white",
                },
            })}
            >
                <Tab.Screen name= "Anasayfa" component={AnasayfaEkrani} />
                <Tab.Screen name= "Kesfet" component={KesfetEkrani} />
                <Tab.Screen name= "Kaydedilenler" component={KaydedilenlerEkrani}/>
                <Tab.Screen name= "Arama" component={AramaEkrani}/>

            </Tab.Navigator>
        );
    }

  return (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName='AnasayfaTabs'
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="Acilislar" component={AcilisEkranlari} />
            <Stack.Screen name="Welcome" component={HosgeldinEkrani} />
            <Stack.Screen name="Arama" component={AramaEkrani} />
            <Stack.Screen name="IceriklerDetaylari" component={IceriklerDetayEkrani} 
            options={{animation: 'slide_from_bottom'}}
            />
            <Stack.Screen name="AnasayfaTabs" component={TabNavigator} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}