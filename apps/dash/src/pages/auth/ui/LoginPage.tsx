import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";
import { Suspense } from "react";
import { google } from "../api/actions";

export const metadata: Metadata = {
  title: "Login Aplikasi PKRBT",
  description: "Login Aplikasi PKRBT",
};

export async function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LoginForm google={google} />
    </Suspense>
  );
}
