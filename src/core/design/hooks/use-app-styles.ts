import { useMemo } from "react";
import { ColorScheme } from "../@types/color-scheme";
import { useAppColorScheme } from "./use-app-color-scheme";

/**
 * Use styles hook
 * Returns a memoized styles object based on the color scheme
 * @param styleCreator - A function that creates styles based on the color scheme
 * @returns The styles object
 */
export function useAppStyles<T>(styleCreator: (colorScheme: ColorScheme) => T) {
  const { colorScheme } = useAppColorScheme();
  return useMemo(() => styleCreator(colorScheme), [colorScheme, styleCreator]);
}
