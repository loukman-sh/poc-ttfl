import { TextInput, TextInputProps, View } from "react-native";
import { AppSpacing } from "../../theme/app-spacing";
import { useColorSchemeStore } from "../../hooks/use-color-scheme";
import { AppRadius } from "../../theme/app-radius";
import { AppTextSize } from "../../theme/app-sizes";

type Props = {} & TextInputProps;

export const AppTextInput = (props: Props) => {
  const { colorScheme } = useColorSchemeStore();

  return (
    <View
      style={{
        backgroundColor: colorScheme.transparent,
        padding: AppSpacing.medium,
        borderRadius: AppRadius.rounded,
        borderWidth: 1,
        borderColor: colorScheme.borderPrimary,
        paddingHorizontal: AppSpacing.medium,
        paddingVertical: AppSpacing.regular,
      }}
    >
      <TextInput
        style={[
          { fontSize: AppTextSize.medium, color: colorScheme.textPrimary },
        ]}
        placeholderTextColor={colorScheme.textSecondary}
        {...props}
      />
    </View>
  );
};
