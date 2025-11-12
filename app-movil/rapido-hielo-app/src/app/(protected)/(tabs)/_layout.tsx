import { Ionicons } from "@expo/vector-icons";
import { router, Tabs } from "expo-router";
import React from "react";
import { Pressable, Text } from "react-native";

export default function _layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-3xl font-bold">Productos</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="(settings)"
        options={{
          title: "Settings",
          headerTitleAlign: "left",
          headerShadowVisible: false,
          headerTitle: (props) => (
            <Text className="text-3xl font-bold">{props.children}</Text>
          ),
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings-outline" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
