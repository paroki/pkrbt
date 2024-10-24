export class GraphqlError extends Error {
  query: string;

  constructor(query: string, cause: unknown) {
    super("Failed to execute query", { cause });
    this.query = query;
  }
}
