export class CoreError extends Error {
  constructor(cause: unknown) {
    let message = "unknown error";
    if (cause instanceof Error) {
      message = cause.message;
    }

    // TODO: decorate this error by prisma, auth, or other 3rd party error

    super(message, {
      cause,
    });
  }
}

export type RepositoryError = CoreError | undefined;
export type ServiceError = CoreError | undefined;
