import { ColorScheme } from "@/core/design/@types/color-scheme";
import { AppDivider } from "@/core/design/components/atoms/app-divider";
import { AppText } from "@/core/design/components/atoms/app-text";
import { AppTextInput } from "@/core/design/components/molecules/app-text-input";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { Alert, ScrollView, StyleSheet, View } from "react-native";

export default function UiPage() {
  const styles = useAppStyles(createStyles);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.column}>
        <AppText variant="title">Composants</AppText>
        <AppDivider />
        <AppText variant="title">Title</AppText>
        <AppText variant="subtitle">Subtitle</AppText>
        <AppText variant="body">Body</AppText>
        <AppDivider />
        <View style={styles.column}>
          <AppButton>Button filled</AppButton>
          <AppButton variant="outline">Button outline</AppButton>
          <AppButton variant="transparent">Button transparent</AppButton>
          <AppButton variant="link">Button text</AppButton>
        </View>
        <AppDivider />
        <View style={styles.column}>
          <AppTextInput placeholder="Simple text input" />
          <AppTextInput placeholder="Secure text input" secureTextEntry />
          <AppTextInput
            placeholder="Text input with leading icon"
            leadingIcon="person-outline"
          />
          <AppTextInput
            placeholder="Text input with pressable trailing icon"
            trailingIcon="alert-circle-outline"
            onTrailingIconPress={() => {
              Alert.alert("Trailing icon pressed");
            }}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colorScheme.backgroundPrimary,
      padding: AppSpacing.medium,
    },
    column: {
      gap: AppSpacing.medium,
    },
  });
