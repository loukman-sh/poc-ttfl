import { inject } from "inversify";
import { SupabaseService } from "@/core/services/supabase-service";
import { SignupParamsModel } from "@/features/signup/data/models/signup-params-model";

export abstract class SignupDatasource {
  abstract signup: (params: SignupParamsModel) => Promise<void>;
}

export class SignupDatasourceImpl implements SignupDatasource {
  constructor(
    @inject(SupabaseService)
    private readonly supabaseService: SupabaseService
  ) {}

  async signup(params: SignupParamsModel): Promise<void> {
    await this.supabaseService.signUp(params);
  }
}
