import { ColorSchemeName } from "react-native";
import { StatusBarStyle } from "expo-status-bar";
import { create } from "zustand";
import { createJSONStorage, persist, StorageValue } from "zustand/middleware";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { darkColorScheme } from "@/core/design/theme/app-colors";
import { lightColorScheme } from "@/core/design/theme/app-colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface ColorSchemeState {
  /**
   * The current colors.
   */
  colorScheme: ColorScheme;

  /**
   * The current color scheme name.
   */
  currentColorScheme: ColorSchemeName;

  /**
   * Whether the color scheme has been initialized.
   */
  initialized: boolean;

  /**
   * The current status bar style.
   */
  statusBarStyle: StatusBarStyle;

  /**
   * Set the color scheme.
   * @param colorSchemeName - The color scheme name to set.
   */
  setColorScheme: (colorSchemeName: ColorSchemeName) => void;

  /**
   * Switch to the opposite color scheme.
   */
  toggleColorScheme: () => void;
}

export const useAppColorScheme = create<ColorSchemeState>()(
  persist(
    (set) => ({
      colorScheme: lightColorScheme,
      initialized: false,
      currentColorScheme: "light",
      statusBarStyle: "light",
      setColorScheme: (colorSchemeName: ColorSchemeName) => {
        set({
          initialized: true,
          colorScheme:
            colorSchemeName === "dark" ? darkColorScheme : lightColorScheme,
          statusBarStyle: colorSchemeName === "dark" ? "dark" : "light",
          currentColorScheme: colorSchemeName,
        });
      },
      toggleColorScheme: () => {
        set((state) => ({
          colorScheme:
            state.currentColorScheme === "dark"
              ? lightColorScheme
              : darkColorScheme,
          statusBarStyle:
            state.currentColorScheme === "dark" ? "dark" : "light",
          currentColorScheme:
            state.currentColorScheme === "dark" ? "light" : "dark",
        }));
      },
    }),
    {
      name: "color-scheme",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
