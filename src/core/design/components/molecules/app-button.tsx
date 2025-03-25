import { PropsWithChildren } from "react";
import {
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { AppText } from "../atoms/app-text";
import { useColorSchemeStore } from "../../hooks/use-color-scheme";
import { AppSpacing } from "../../theme/app-spacing";
import { AppRadius } from "../../theme/app-radius";

type Props = PropsWithChildren<TouchableOpacityProps> & {
  textStyle?: TextStyle;
};

export const AppButton = ({ children, textStyle, ...props }: Props) => {
  const { colorScheme } = useColorSchemeStore();

  return (
    <TouchableOpacity
      style={{
        backgroundColor: colorScheme.buttonPrimary,
        padding: AppSpacing.medium,
        borderRadius: AppRadius.rounded,
      }}
      {...props}
    >
      {typeof children === "string" ? (
        <AppText style={[textStyle, { color: colorScheme.buttonTextPrimary }]}>
          {children}
        </AppText>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};
