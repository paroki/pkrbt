export class UnauthorizedAccessError extends Error {
  constructor() {
    super("Anda tidak memiliki hak akses untuk fitur ini!");
  }
}
