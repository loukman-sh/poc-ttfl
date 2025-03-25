import LoginParamsEntity from "@/features/auth/domain/entities/login-params-entity";
import LoginResponseEntity from "@/features/auth/domain/entities/login-response-entity";

export abstract class LoginRepository {
  abstract silentLogin: () => Promise<LoginResponseEntity>;
  abstract login: (params: LoginParamsEntity) => Promise<LoginResponseEntity>;
  abstract logout: () => Promise<void>;
}
