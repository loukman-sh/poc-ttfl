// Define the base Result class
export abstract class Result<T> {
  abstract handle(callbacks: {
    success: (data: T) => void;
    failure: (error: Failure) => void;
  }): void;

  static success<T>(data?: T): Success<T | undefined> {
    return new Success(data);
  }

  static failure(message: string): Failure {
    return new Failure(message);
  }
}

// Define the Failure class extending Result
class Failure extends Result<never> {
  constructor(public readonly message: string) {
    super();
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
  constructor(public readonly data: T) {
    super();
  }

  handle(callbacks: {
    success: (data: T) => void;
    failure: (error: Failure) => void;
  }): void {
    callbacks.success(this.data);
  }
}
