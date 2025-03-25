import { ColorScheme } from "../@types/color-scheme";
import { darkColorScheme } from "../theme/app-colors";
import { lightColorScheme } from "../theme/app-colors";
import { create } from "zustand";
import { ColorSchemeName } from "react-native";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ColorSchemeState {
  colorScheme: ColorScheme;
  currentColorScheme: ColorSchemeName;
  initialized: boolean;
  setColorScheme: (colorScheme: ColorSchemeName) => void;
  toggleColorScheme: () => void;
}

export const useColorSchemeStore = create<ColorSchemeState>()(
  persist(
    (set) => ({
      colorScheme: lightColorScheme,
      initialized: false,
      currentColorScheme: "light",
      setColorScheme: (colorSchemeName: ColorSchemeName) =>
        set({
          initialized: true,
          colorScheme:
            colorSchemeName === "dark" ? darkColorScheme : lightColorScheme,
          currentColorScheme: colorSchemeName,
        }),
      toggleColorScheme: () =>
        set((state) => ({
          colorScheme:
            state.currentColorScheme === "light"
              ? darkColorScheme
              : lightColorScheme,
          currentColorScheme:
            state.currentColorScheme === "light" ? "dark" : "light",
        })),
    }),
    {
      name: "color-scheme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
