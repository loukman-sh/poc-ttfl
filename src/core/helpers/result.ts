// Define the base Result class
export abstract class Result<T> {
  public readonly data?: T;
  public readonly message?: string;

  constructor(data?: T, message?: string) {
    this.data = data;
    this.message = message;
  }
  abstract handle(callbacks: {
    success: (data?: T) => void;
    failure: (error: Failure) => void;
  }): void;

  get isSuccess(): boolean {
    return this instanceof Success;
  }

  get isFailure(): boolean {
    return this instanceof Failure;
  }

  static success<T>(data?: T): Success<T | undefined> {
    return new Success(data);
  }

  static failure(message: string): Failure {
    return new Failure(message);
  }
}

// Define the Failure class extending Result
class Failure extends Result<never> {
  constructor(message: string) {
    super(undefined, message);
  }

  handle(callbacks: {
    success: (data: never) => void;
    failure: (error: Failure) => void;
  }): void {
    callbacks.failure(this);
  }
}

// Define the Success class extending Result
class Success<T> extends Result<T> {
  constructor(data: T) {
    super(data);
  }

  handle(callbacks: {
    success: (data: T) => void;
    failure: (error: Failure) => void;
  }): void {
    callbacks.success(this.data as T);
  }
}
