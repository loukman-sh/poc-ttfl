import { SignupParamsEntity } from "../entities/signup-params-entity";

export abstract class SignupRepository {
  abstract signup: (params: SignupParamsEntity) => Promise<void>;
}
