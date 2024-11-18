export default function loader() {
  throw new Response("Terjadi kesalahan", { status: 500, statusText: "Error" });
}
