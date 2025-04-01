import { useMutation } from "@tanstack/react-query";
import { SignupParamsEntity } from "../../domain/entities/signup-params-entity";
import { SignupUseCase } from "../../domain/usecases/signup-usecase";
import container from "@/core/di/injection-container";
import { router } from "expo-router";
import { Alert } from "react-native";
import { useSession } from "@/features/auth/presentation/hooks/use-session";

export const useSignup = () => {
  const signupUseCase = container.get(SignupUseCase);

  const { silentLogin } = useSession();

  return useMutation({
    mutationFn: async (params: SignupParamsEntity) =>
      await signupUseCase.execute(params),
    onSuccess: () => {
      Alert.alert(
        "Compte créé avec succès",
        "Vous pouvez maintenant vous connecter",
        [{ text: "OK", onPress: silentLogin }]
      );
    },
    onError: (error) => {
      Alert.alert("Erreur", error.message);
    },
  });
};
