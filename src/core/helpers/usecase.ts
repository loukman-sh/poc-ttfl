import { Result } from "./result";

export abstract class Usecase<Params, Response> {
  abstract execute(params: Params): Promise<Result<Response>>;
}

export abstract class UsecaseWithoutParams {
  abstract execute(): Promise<Result<void>>;
}
