import { createClient, SupabaseClient, Session } from "@supabase/supabase-js";
import { injectable } from "inversify";
import LoginParamsModel from "@/features/auth/data/models/login-params-model";
import LoginResponseModel from "@/features/auth/data/models/login-response-model";
import { UnauthorizedError, UnexpectedError } from "../helpers/errors";

export abstract class SupabaseService {
  abstract init(): void;
  abstract login(params: LoginParamsModel): Promise<LoginResponseModel>;
  abstract logout(): Promise<void>;
}

@injectable()
export default class SupabaseServiceImpl extends SupabaseService {
  private client?: SupabaseClient;
  private session?: Session | null;

  init() {
    this.client = createClient(
      process.env.EXPO_PUBLIC_SUPABASE_URL!,
      process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!
    );
  }

  async login(params: LoginParamsModel): Promise<LoginResponseModel> {
    const response = await this.client?.auth.signInWithPassword({
      email: params.email,
      password: params.password,
    });

    if (response?.data.session && response.data.user) {
      this.session = response.data.session;

      // Make sure necessary fields are present
      if (!response.data.user.email) {
        throw new UnexpectedError("User email not found");
      }

      if (!response.data.user.id) {
        throw new UnexpectedError("User id not found");
      }

      return Promise.resolve({
        id: response.data.user.id,
        email: response.data.user.email,
      });
    }

    throw new UnauthorizedError();
  }

  async logout(): Promise<void> {
    await this.client?.auth.signOut();
  }
}
