import { useSession } from "../hooks/use-session";
import { View } from "react-native";
import { useEffect, useState } from "react";
import { AppPage } from "@/core/design/components/atoms/app-page";
import { AppTextInput } from "@/core/design/components/molecules/app-text-input";
import { AppButton } from "@/core/design/components/molecules/app-button";
import { AppSpacing } from "@/core/design/theme/app-spacing";

export default function LoginPage() {
  const { login } = useSession();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    login({ email, password });
  };

  return (
    <AppPage center>
      <View style={{ gap: AppSpacing.large, width: "75%" }}>
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
        <View style={{ alignItems: "center" }}>
          <AppButton onPress={handleLogin}>Se connecter</AppButton>
        </View>
      </View>
    </AppPage>
  );
}
