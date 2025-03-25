import { PropsWithChildren } from "react";
import { View, ViewProps } from "react-native";
import { useColorSchemeStore } from "../../hooks/use-color-scheme";

type Props = PropsWithChildren<
  ViewProps & {
    center?: boolean;
  }
>;

export const AppPage = ({ children, center, style, ...props }: Props) => {
  const { colorScheme } = useColorSchemeStore();

  return (
    <View
      style={[
        center && { alignItems: "center", justifyContent: "center" },
        { backgroundColor: colorScheme.backgroundPrimary, flex: 1 },
        style,
      ]}
      {...props}
    >
      {children}
    </View>
  );
};
