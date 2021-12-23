export class CustomError extends Error {
  public statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }

    this.name = 'CustomError';
    this.statusCode = statusCode;
  }
}

export class PrestError extends CustomError {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PrestError);
    }

    this.name = 'PrestError';
  }
}

export class NetworkError extends CustomError {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, NetworkError);
    }

    this.name = 'NetworkError';
  }
}
