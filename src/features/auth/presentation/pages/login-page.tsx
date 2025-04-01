import { useSession } from "../hooks/use-session";
import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppTextInput } from "@/core/design/components/molecules/app-text-input";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { AppSpacing } from "@/core/design/theme/app-spacing";
import { ColorScheme } from "@/core/design/@types/color-scheme";
import { useAppStyles } from "@/core/design/hooks/use-app-styles";
import { router } from "expo-router";
export default function LoginPage() {
  const { login } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const styles = useAppStyles(createStyles);

  const handleLogin = () => {
    login({ email, password });
  };

  const redirectToSignup = () => {
    router.push("/signup");
  };

  return (
    <AppPage center>
      <View style={styles.container}>
        <AppTextInput
          leadingIcon="mail-outline"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          inputMode="email"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AppTextInput
          leadingIcon="lock-closed-outline"
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          inputMode="text"
          autoCapitalize="none"
          autoCorrect={false}
          onSubmitEditing={handleLogin}
        />
        <View style={styles.buttonsContainer}>
          <AppButton onPress={redirectToSignup} variant="transparent">
            Créer un compte
          </AppButton>
          <AppButton onPress={handleLogin}>Se connecter</AppButton>
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
      alignItems: "center",
    },
  });
