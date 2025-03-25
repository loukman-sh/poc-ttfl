import { AppText, useColorSchemeStore } from "@/core/design";
import { Tabs } from "expo-router";
import Foundation from "@expo/vector-icons/Foundation";
import Octicons from "@expo/vector-icons/Octicons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { AppTextSize } from "@/core/design/theme/app-sizes";
import { StyleSheet } from "react-native";

export default function TabsLayout() {
  const { colorScheme } = useColorSchemeStore();
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colorScheme.tabBarBackground,
          borderTopWidth: 0,
        },
        tabBarLabel: ({ focused }) => {
          const labelColor = focused
            ? colorScheme.textPrimary
            : colorScheme.textSecondary;

          let label = "";

          switch (route.name) {
            case "home":
              label = "Accueil";
              break;
            case "decks":
              label = "Decks";
              break;
            case "standings":
              label = "Classement";
              break;
            case "settings":
              label = "Paramètres";
              break;
          }
          return (
            <AppText
              style={{ color: labelColor, fontSize: AppTextSize.extraSmall }}
            >
              {label}
            </AppText>
          );
        },
        tabBarIcon: ({ focused, size }) => {
          const iconColor = focused
            ? colorScheme.textPrimary
            : colorScheme.textSecondary;
          switch (route.name) {
            case "home":
              return <Foundation name="home" size={size} color={iconColor} />;
            case "decks":
              return <Octicons name="stack" size={size} color={iconColor} />;
            case "standings":
              return (
                <Ionicons
                  name={focused ? "podium" : "podium-outline"}
                  size={size}
                  color={iconColor}
                />
              );
            case "settings":
              return (
                <Ionicons
                  name={focused ? "settings" : "settings-outline"}
                  size={size}
                  color={iconColor}
                />
              );
          }
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="decks" />
      <Tabs.Screen name="standings" />
      <Tabs.Screen name="settings" />
    </Tabs>
  );
}
