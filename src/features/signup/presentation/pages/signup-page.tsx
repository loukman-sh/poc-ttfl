import { AppPage } from "@/core/design/components/atoms/app-page";
import { View, StyleSheet } from "react-native";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { useState } from "react";
import { AppTextInput } from "@/core/design/components/molecules/app-text-input";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { router } from "expo-router";
import { useSignup } from "../hooks/use-signup";

export default function SignupPage() {
  const styles = useAppStyles(createStyles);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate: signup, isPending } = useSignup();

  const handleSignup = () => {
    signup({ username, email, password });
  };

  return (
    <AppPage center>
      <View style={styles.container}>
        <AppTextInput
          autoCapitalize="none"
          autoCorrect={false}
          leadingIcon="person-outline"
          placeholder="Nom d'utilisateur"
          value={username}
          onChangeText={setUsername}
        />
        <AppTextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          autoCorrect={false}
          leadingIcon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          inputMode="email"
        />
        <AppTextInput
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          leadingIcon="lock-closed-outline"
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <View style={styles.buttonsContainer}>
          <AppButton onPress={router.back} variant="outline">
            Annuler
          </AppButton>
          <AppButton onPress={handleSignup} isLoading={isPending}>
            Créer mon compte
          </AppButton>
        </View>
      </View>
    </AppPage>
  );
}

const createStyles = (colorScheme: ColorScheme) =>
  StyleSheet.create({
    container: {
      gap: AppSpacing.large,
      width: "75%",
    },
    buttonsContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      gap: AppSpacing.medium,
    },
  });
