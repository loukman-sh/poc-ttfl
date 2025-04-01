import { useMemo } from "react";
import { ColorScheme } from "../@types/color-scheme";
import { useAppColorScheme } from "./use-app-color-scheme";
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context";

export type StyleCreator<T> = (
  colorScheme: ColorScheme,
  insets: EdgeInsets
) => T;

/**
 * Use styles hook
 * Returns a memoized styles object based on the color scheme
 * @param styleCreator - A function that creates styles based on the color scheme
 * @returns The styles object
 */
export function useAppStyles<T>(styleCreator: StyleCreator<T>) {
  const { colorScheme } = useAppColorScheme();
  const insets = useSafeAreaInsets();
  return useMemo(
    () => styleCreator(colorScheme, insets),
    [colorScheme, insets, styleCreator]
  );
}
