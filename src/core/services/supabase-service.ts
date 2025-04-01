import { createClient, SupabaseClient, Session } from "@supabase/supabase-js";
import { inject, injectable } from "inversify";
import LoginParamsModel from "@/features/auth/data/models/login-params-model";
import LoginResponseModel from "@/features/auth/data/models/login-response-model";
import { UnauthorizedError, UnexpectedError } from "../helpers/errors";
import { SecureStorageService } from "./secure-storage-service";
import { SignupParamsModel } from "@/features/signup/data/models/signup-params-model";

export abstract class SupabaseService {
  abstract client: SupabaseClient;

  abstract silentLogin(): Promise<LoginResponseModel>;
  abstract login(params: LoginParamsModel): Promise<LoginResponseModel>;
  abstract logout(): Promise<void>;
}

@injectable()
export default class SupabaseServiceImpl extends SupabaseService {
  client: SupabaseClient;
  private userId?: string;

  constructor(
    @inject(SecureStorageService)
    private secureStorageService: SecureStorageService
  ) {
    super();
    this.client = this.createClient();
  }

  createClient() {
    return createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          storage: {
            getItem: this.secureStorageService.getItem,
            setItem: this.secureStorageService.setItem,
            removeItem: this.secureStorageService.deleteItem,
          },
        },
      }
    );
  }

  async silentLogin(): Promise<LoginResponseModel> {
    const response = await this.client?.auth.getSession();

    if (response?.data.session) {
      return this.getLoginResponseFromSession(response.data.session);
    }

    throw new UnauthorizedError();
  }

  async login(params: LoginParamsModel): Promise<LoginResponseModel> {
    const response = await this.client?.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    return this.getLoginResponseFromSession(response?.data.session);
  }

  async logout(): Promise<void> {
    await this.client?.auth.signOut();
  }

  async signUp(params: SignupParamsModel): Promise<void> {
    const response = await this.client?.auth.signUp({
      email: params.email,
      password: params.password,
      options: {
        data: { username: params.username },
      },
    });

    if (response?.error) {
      throw new UnexpectedError(response.error.message);
    }
  }

  private getLoginResponseFromSession(
    session?: Session | null
  ): LoginResponseModel {
    if (session?.user) {
      if (!session.user.email) {
        throw new UnexpectedError("User email not found");
      }

      if (!session.user.id) {
        throw new UnexpectedError("User id not found");
      }

      this.userId = session.user.id;

      return {
        id: session.user.id,
        email: session.user.email,
      };
    }

    throw new UnauthorizedError();
  }
}
