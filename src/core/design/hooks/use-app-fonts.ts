import { useFonts } from "expo-font";

/**
 * Register app fonts.
 * @returns The fonts object
 */
export const useAppFonts = () => {
  return useFonts({
    ClarityCityLight: require("../../../../assets/fonts/ClarityCity-Light.ttf"),
    ClarityCity: require("../../../../assets/fonts/ClarityCity-Regular.ttf"),
    ClarityCityMedium: require("../../../../assets/fonts/ClarityCity-Medium.ttf"),
    ClarityCitySemiBold: require("../../../../assets/fonts/ClarityCity-SemiBold.ttf"),
    ClarityCityBold: require("../../../../assets/fonts/ClarityCity-Bold.ttf"),
  });
};
