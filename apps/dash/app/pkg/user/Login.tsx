import GoogleSignIn from "~/components/auth/GoogleSignIn";

export default function Login() {
  return (
    <div className="flex flex-col bg-slate-100">
      <h1>Login to PKRBT</h1>
      <p>Gunakan akun google anda untuk login ke Aplikasi PKRBT</p>
      <GoogleSignIn />
    </div>
  );
}
