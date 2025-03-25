import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginParamsEntity from "../../domain/entities/login-params-entity";
import { LoginUseCase } from "../../domain/usecases/login-usecase";
import { container } from "@/core/di/injection-container";
import { LogoutUseCase } from "../../domain/usecases/logout-usecase";
import { Alert } from "react-native";

export enum SessionStatus {
  LOADING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export type SessionState = {
  status: SessionStatus;
  user: UserEntity | null;
  login: (params: LoginParamsEntity) => Promise<void>;
  logout: () => void;
};

export const useSession = create<SessionState>()(
  persist(
    (set) => ({
      status: SessionStatus.UNAUTHENTICATED,
      user: null,
      login: async (params: LoginParamsEntity) => {
        const result = await container.get(LoginUseCase).execute(params);

        result.handle({
          success: (data) => {
            set({
              status: SessionStatus.AUTHENTICATED,
              user: data,
            });
          },
          failure: (error) => {
            Alert.alert("Erreur", error.message);
          },
        });
      },
      logout: async () => {
        const result = await container.get(LogoutUseCase).execute();

        result.handle({
          success: () => {
            set({ status: SessionStatus.UNAUTHENTICATED, user: null });
          },
          failure: (error) => {
            Alert.alert("Erreur", error.message);
          },
        });
      },
    }),
    {
      name: "session",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
