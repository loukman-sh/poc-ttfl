import { create } from "zustand";
import { persist, StorageValue } from "zustand/middleware";
import SecureStore from "expo-secure-store";
import LoginParamsEntity from "../../domain/entities/login-params-entity";
import { LoginUseCase } from "../../domain/usecases/login-usecase";
import { container } from "@/core/di/injection-container";
import { LogoutUseCase } from "../../domain/usecases/logout-usecase";
import { Alert } from "react-native";
import { UserEntity } from "@/core/common/domain/entities/user-entity";
import { SilentLoginUseCase } from "../../domain/usecases/silent-login-usecase";

export enum SessionStatus {
  LOADING,
  AUTHENTICATED,
  UNAUTHENTICATED,
}

export type SessionState = {
  status: SessionStatus;
  user: UserEntity | null;
  login: (params: LoginParamsEntity) => Promise<void>;
  logout: (callback?: () => void) => Promise<void>;
  silentLogin: () => Promise<void>;
  initialized: boolean;
};

export const useSession = create<SessionState>((set) => {
  return {
    status: SessionStatus.UNAUTHENTICATED,
    user: null,
    initialized: false,
    login: async (params: LoginParamsEntity) => {
      set({ status: SessionStatus.LOADING });

      const result = await container.get(LoginUseCase).execute(params);

      result.handle({
        success: (data) => {
          if (data) {
            set({
              status: SessionStatus.AUTHENTICATED,
              user: data,
            });
          }
        },
        failure: (error) => {
          Alert.alert("Erreur", error.message);
        },
      });
    },
    logout: async (callback?: () => void) => {
      set({ status: SessionStatus.LOADING });

      const result = await container.get(LogoutUseCase).execute();

      result.handle({
        success: () => {
          set({ status: SessionStatus.UNAUTHENTICATED, user: null });
          callback?.();
        },
        failure: (error) => {
          Alert.alert("Erreur", error.message);
        },
      });
    },
    silentLogin: async () => {
      set({ status: SessionStatus.LOADING });

      const result = await container.get(SilentLoginUseCase).execute();

      result.handle({
        success: (data) => {
          set({
            status: SessionStatus.AUTHENTICATED,
            user: data,
            initialized: true,
          });
        },
        failure: () => {
          set({
            status: SessionStatus.UNAUTHENTICATED,
            user: null,
            initialized: true,
          });
        },
      });
    },
  };
});
