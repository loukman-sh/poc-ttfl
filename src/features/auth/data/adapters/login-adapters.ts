import LoginResponseModel from "@/features/auth/data/models/login-response-model";
import LoginResponseEntity from "@/features/auth/domain/entities/login-response-entity";
import LoginParamsEntity from "@/features/auth/domain/entities/login-params-entity";
import LoginParamsModel from "@/features/auth/data/models/login-params-model";

export const loginResponseModelToEntity = (
  model: LoginResponseModel
): LoginResponseEntity => {
  return {
    id: model.id,
    email: model.email,
  };
};

export const loginParamsModelFromEntity = (
  entity: LoginParamsEntity
): LoginParamsModel => {
  return {
    email: entity.email,
    password: entity.password,
  };
};
