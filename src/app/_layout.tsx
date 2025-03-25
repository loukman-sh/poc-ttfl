import "@/core/global";
import React, { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Slot } from "expo-router";
import { useAppColorScheme } from "@/core/design/hooks/use-app-color-scheme";
import { useAppFonts } from "@/core/design/hooks/use-app-fonts";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import { useSession } from "@/features/auth/presentation/hooks/use-session";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const deviceColorScheme = useColorScheme();
  const {
    setColorScheme,
    initialized: colorSchemeInitialized,
    statusBarStyle,
  } = useAppColorScheme();
  const { silentLogin, initialized: sessionInitialized } = useSession();

  const [fontsLoaded] = useAppFonts();

  useEffect(() => {
    if (!sessionInitialized) {
      silentLogin();
    }

    if (!colorSchemeInitialized) {
      setColorScheme(deviceColorScheme);
    }

    if (fontsLoaded && sessionInitialized) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 500);
    }
  }, [fontsLoaded, sessionInitialized]);

  return (
    <>
      <StatusBar style={statusBarStyle} />
      <Slot />
    </>
  );
}
