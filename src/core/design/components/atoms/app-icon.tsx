import { StyleSheet, TouchableOpacity } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { ColorScheme } from "@/core/design/@types/color-scheme";

type Props = {
  name: keyof typeof Ionicons.glyphMap;
  color?: string;
  size?: number;
  onPress?: () => void;
};
export const AppIcon = ({ name, color, size = 24, onPress }: Props) => {
  const styles = useAppStyles(createStyles);

  return (
    <TouchableOpacity onPress={onPress} disabled={!onPress}>
      <Ionicons name={name} size={size} color={color} style={styles.icon} />
    </TouchableOpacity>
  );
};

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    icon: {},
  });
