import GoogleSignIn from "~/components/auth/GoogleSignIn";

export default function Login() {
  return (
    <div className="flex bg-slate-100">
      <GoogleSignIn />
    </div>
  );
}
