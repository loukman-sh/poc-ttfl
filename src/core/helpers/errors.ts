export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
  }
}

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);
  }
}
