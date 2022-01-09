import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import Chat from "../screens/Chat";
import Settings from "../screens/Settings";

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconComponent;
            if (route.name === "Chat") {
              iconComponent = focused ? (
                <Ionicons name="ios-chatbox" size={size} color={color} />
              ) : (
                <Ionicons name="ios-chatbox-outline" size={size} color={color} />
              );
            } else if (route.name === "Settings") {
              iconComponent = focused ? (
                <Ionicons name="ios-settings" size={size} color={color} />
              ) : (
                <Ionicons name="ios-settings-outline" size={size} color={color} />
              );
            }
            return iconComponent;
          },
          tabBarActiveTintColor: "#4287f5",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Settings" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
