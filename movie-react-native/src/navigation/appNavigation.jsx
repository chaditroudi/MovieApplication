import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import WelcomeScreen from "../screens/WelcomeScreen";
import HomeScreen from "../screens/HomeScreen";
import MovieScreen from "../screens/MovieScreen";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MovieProvider } from "../../MovieContext";
import SearchScreen from "../screens/SearchScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const queryClient = new QueryClient();

export default function appNavigation() {
  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName="Welcome"
      >
        <Stack.Screen name="HomeTabs" component={HomeTabs} />
        <Stack.Screen name="Movie" component={MovieScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
      </Stack.Navigator>
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarIcon: ({ focused }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Search") {
              iconName = "search";
            } else if (route.name === "Saved") {
              iconName = "heart";
            }

            const customizeSize = 30;

            return (
              <Ionicons
                name={iconName}
                size={customizeSize}
                color={focused ? "white" : "gray"}
              />
            );
          },
          tabBarActiveTintColor: "white",
          tabBarStyle: {
            backgroundColor: "#1F1D28",
            borderTopWidth: 0,
            paddingBottom: 10,
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Saved" component={HomeScreen} />
      </Tab.Navigator>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <MovieProvider>
        <NavigationContainer>
          <HomeStack/>
          </NavigationContainer>
          </MovieProvider>
          </QueryClientProvider>
  );
}
