import { LingkunganR } from "@pkrbt/directus";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ensureRequestGranted } from "~/pkg/auth/auth.server";
import LingkunganForm from "~/pkg/referensi/components/LingkunganForm";
import {
  readLingkungan,
  updateLingkungan,
} from "~/pkg/referensi/lingkungan.server";

export async function action({ request, params }: ActionFunctionArgs) {
  await ensureRequestGranted(request, "admin");
  invariant(params.id, "Unknown lingkungan to process");

  return await updateLingkungan(request, params.id);
}

export async function loader({ request, params }: LoaderFunctionArgs) {
  await ensureRequestGranted(request, "admin");
  invariant(params.id, "Unknown lingkungan to process");

  return await readLingkungan(request, params.id);
}

export default function Page() {
  const lingkungan = useLoaderData() as LingkunganR;
  return <LingkunganForm lingkungan={lingkungan} />;
}
