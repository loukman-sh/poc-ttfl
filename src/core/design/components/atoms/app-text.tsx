import { Text, TextProps } from "react-native";
import { useColorSchemeStore } from "../../hooks/use-color-scheme";

export const AppText = ({ children, ...props }: TextProps) => {
  const { colorScheme } = useColorSchemeStore();
  return (
    <Text {...props} style={[{ color: colorScheme.textPrimary }, props.style]}>
      {children}
    </Text>
  );
};
