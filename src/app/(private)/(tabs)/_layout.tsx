import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { StyleSheet } from "react-native";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { AppFontSize } from "@/core/design/theme/app-fonts";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
import { AppText } from "@/core/design/components/atoms/app-text";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { AppSpacing } from "@/core/design/theme/app-spacing";

export default function TabsLayout() {
  const { colorScheme, toggleColorScheme, currentColorScheme } =
    useAppColorScheme();
  const styles = useAppStyles(createStyles);

  const getItemLabel = (routeName: string) => {
    switch (routeName) {
      case "home":
        return "Accueil";
      case "decks":
        return "Decks";
      case "standings":
        return "Classement";
      case "settings":
        return "Paramètres";
      case "ui":
        return "UI";
      default:
        return "";
    }
  };

  const getItemIcon = ({
    routeName,
    focused,
  }: {
    routeName: string;
    focused: boolean;
  }): keyof typeof Ionicons.glyphMap => {
    switch (routeName) {
      case "home":
        return focused ? "home" : "home-outline";
      case "decks":
        return focused ? "albums" : "albums-outline";
      case "standings":
        return focused ? "podium" : "podium-outline";
      case "settings":
        return focused ? "settings" : "settings-outline";
      case "ui":
        return focused ? "color-palette" : "color-palette-outline";
      default:
        return "close";
    }
  };
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        headerStyle: styles.headerStyle,
        headerTintColor: colorScheme.textPrimary,
        tabBarStyle: styles.tabBarStyle,
        tabBarActiveTintColor: colorScheme.textPrimary,
        tabBarInactiveTintColor: colorScheme.textSecondary,
        tabBarLabel: ({ color }) => {
          return (
            <AppText style={[styles.label, { color }]}>
              {getItemLabel(route.name)}
            </AppText>
          );
        },
        tabBarIcon: ({ focused, size }) => {
          const iconColor = focused
            ? colorScheme.textPrimary
            : colorScheme.textSecondary;

          const iconName = getItemIcon({ routeName: route.name, focused });
          return <Ionicons name={iconName} size={size} color={iconColor} />;
        },
      })}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="decks" />
      <Tabs.Screen name="standings" />
      <Tabs.Screen name="settings" />
      <Tabs.Screen
        name="ui"
        options={{
          headerShown: true,
          title: "Composants",
          headerRight: () => (
            <AppButton variant="transparent" onPress={toggleColorScheme}>
              <Ionicons
                name={
                  currentColorScheme === "light"
                    ? "sunny-outline"
                    : "moon-outline"
                }
                size={20}
                style={styles.icon}
              />
            </AppButton>
          ),
        }}
      />
    </Tabs>
  );
}

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    tabBarStyle: {
      backgroundColor: colorScheme.tabBarBackground,
      borderTopWidth: 0,
    },
    headerStyle: {
      backgroundColor: colorScheme.headerBackground,
    },
    label: {
      fontSize: AppFontSize.extraSmall,
    },
    icon: {
      color: colorScheme.textPrimary,
      marginRight: AppSpacing.medium,
    },
  });
