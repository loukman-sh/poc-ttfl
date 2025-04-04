import { SupabaseService } from "@/core/services/supabase-service";
import LoginParamsModel from "../models/login-params-model";
import LoginResponseModel from "../models/login-response-model";
import { inject, injectable } from "inversify";

export abstract class LoginRemoteDatasource {
  abstract silentLogin(): Promise<LoginResponseModel>;
  abstract login(params: LoginParamsModel): Promise<LoginResponseModel>;
  abstract logout(): Promise<void>;
}

@injectable()
export class LoginRemoteDatasourceImpl implements LoginRemoteDatasource {
  constructor(
    @inject(SupabaseService) private supabaseService: SupabaseService
  ) {}

  async silentLogin(): Promise<LoginResponseModel> {
    return await this.supabaseService.silentLogin();
  }

  async login(params: LoginParamsModel): Promise<LoginResponseModel> {
    return await this.supabaseService.login(params);
  }

  async logout(): Promise<void> {
    await this.supabaseService.logout();
  }
}
