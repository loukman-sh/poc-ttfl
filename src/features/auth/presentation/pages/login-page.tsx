import {
  AppButton,
  AppPage,
  AppSpacing,
  AppText,
  AppTextInput,
} from "@/core/design";
import { useSession } from "../hooks/use-session";
import { View } from "react-native";
import { useState } from "react";

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
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          inputMode="email"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <AppTextInput
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
