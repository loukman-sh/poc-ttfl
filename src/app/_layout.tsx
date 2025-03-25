import "@/core/global";

import { useEffect } from "react";
import { useColorScheme } from "react-native";
import { Slot } from "expo-router";
import { useColorSchemeStore } from "@/core/design";

export default function RootLayout() {
  const deviceColorScheme = useColorScheme();
  const { setColorScheme, initialized } = useColorSchemeStore();

  useEffect(() => {
    if (!initialized) {
      setColorScheme(deviceColorScheme);
    }
  }, []);

  return <Slot />;
}
