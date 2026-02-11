export class BaseError extends Error {
  code: string
  constructor(message: string, options?: ErrorOptions){
    super(message, options)
    this.code = message
  }
}

export class NotFoundError extends BaseError {
  constructor(options?: ErrorOptions){
    super("NotFound", options)
    this.code = "NotFound"
    this.name = "NotFound"
  }
}

export const ErrNotFound = new NotFoundError()
