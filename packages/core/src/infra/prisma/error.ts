import { BaseError } from "../../error";

export class PrismaError extends BaseError {
  constructor(e: unknown){
    super("RepositoryError", {cause: e})
    this.name = "PrismaError"
    this.translateError(e)
  }

  translateError(e: unknown){

  }
}
