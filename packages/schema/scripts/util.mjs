export async function ensureError(error) {
  if (error) {
    console.error(JSON.stringify(error, undefined, 2));
  }
}
