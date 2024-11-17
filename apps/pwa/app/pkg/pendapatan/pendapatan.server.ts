import {
  aggregate,
  Query,
  rest,
  createDirectus as sdkCreateDirectus,
  staticToken,
} from "@directus/sdk";
import { Misa, PendapatanR, Schema } from "@pkrbt/directus";
import { Params } from "@remix-run/react";
import invariant from "tiny-invariant";
import createDirectus, { DirectusError } from "~/services/directus.server";
import { Intent, PendapatanFormSchema } from "./components/PendapatanForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { getValidatedFormData } from "remix-hook-form";
import { json } from "@remix-pwa/sw";
import { z } from "zod";
import { getAuthenticatedUser } from "~/services/auth.server";
import { DIRECTUS_URL } from "~/services/config.server";
import moment from "moment";
import { generateSumberPendapatanMap } from "./utils";
import { MonthlyReport } from "./types";

const misaDefaultFields = {
  fields: [
    "id",
    "tanggal",
    "perayaan",
    {
      pendapatan: [
        "id",
        "tanggal",
        "uraian",
        "jumlah",
        "catatan",
        { sumber: ["id", "sort", "sumber"] },
      ],
    },
  ],
  sort: ["-tanggal"],
} satisfies Query<Schema, Misa>;

export async function sumberPendapatanList(request: Request) {
  const directus = await createDirectus(request);
  const { items, error } = await directus.sumberPendapatan.search({
    fields: ["id", "sort", "sumber"],
    sort: "sort",
  });

  if (error) {
    throw new DirectusError(error.message, { cause: error });
  }

  if (!items) {
    throw new Error("Sumber Pendapatan not found, or unconfigured!");
  }

  return items;
}

export async function listByMisa(request: Request, params: Params) {
  const directus = await createDirectus(request);
  const limit = params.limit ? Number(params.limit) : 6;
  const { items, error } = await directus.misa.search({
    ...misaDefaultFields,
    limit,
  });

  if (error) {
    throw new DirectusError(error.message, { cause: error });
  }

  return items ? items : [];
}

export async function readMisaById(request: Request, params: Params) {
  const directus = await createDirectus(request);
  const id = params.id;
  invariant(id, "Misa ID should be defined!");

  const { items, error } = await directus.misa.search({
    ...misaDefaultFields,
    filter: {
      id: {
        _eq: id,
      },
    },
    limit: 1,
  });

  if (error) {
    throw new DirectusError(error.message, { cause: error });
  }

  return items ? items[0] : undefined;
}

export async function updatePendapatan(request: Request) {
  const resolver = zodResolver(PendapatanFormSchema);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<
    z.infer<typeof PendapatanFormSchema> & { id: string; intent: Intent }
  >(request, resolver);

  if (errors) return json({ errors, defaultValues });

  const { id, sumber, jumlah, catatan, misa, intent, tanggal } = data;
  const directus = await createDirectus(request);
  const realValue = Number(jumlah.replace(/\./g, ""));

  if ("update" === intent) {
    const { item, error } = await directus.pendapatan.update(id, {
      sumber,
      jumlah: realValue,
      catatan,
    });
    if (error) {
      throw new DirectusError(error.message, { cause: error });
    }

    return json({ pendapatan: item as PendapatanR });
  } else if ("create" === intent) {
    const payload = {
      sumber,
      jumlah: realValue,
      catatan,
      misa: { id: misa },
      tanggal,
    };

    const { item, error } = await directus.pendapatan.create(payload);
    if (error) {
      console.log(JSON.stringify(error, null, 2));
      throw new DirectusError(error.message, { cause: error });
    }

    return json({ pendapatan: item as PendapatanR });
  } else if ("delete" === intent) {
    const { error } = await directus.pendapatan.remove(id);

    if (error) {
      throw new DirectusError(error.message, { cause: error });
    }

    return json({ id, sumber });
  }

  throw new Error("Unknown form action intent!");
}

type SumByMonth = {
  sumber: string;
  tanggal_month: number;
  sum: {
    jumlah: number;
  };
};
export async function sumByMonth(request: Request) {
  const user = await getAuthenticatedUser(request);
  const directus = sdkCreateDirectus<Schema>(DIRECTUS_URL)
    .with(staticToken(user.token))
    .with(rest());

  const sumberList = await sumberPendapatanList(request);
  let sumByMonth: SumByMonth[];
  try {
    const y = moment().format("YYYY");
    const result = await directus.request(
      aggregate("pendapatan", {
        aggregate: { sum: "jumlah" },
        // @ts-expect-error ts-2322
        groupBy: ["sumber", "month(tanggal)"],
        query: {
          // @ts-expect-error ts-2322
          sort: ["-month(tanggal)"],
          filter: {
            // @ts-expect-error ts-2322
            "year(tanggal)": {
              _eq: Number(y),
            },
          },
        },
      }),
    );
    sumByMonth = result as unknown as SumByMonth[];
  } catch (e) {
    console.error(JSON.stringify(e, null, 2));
    throw new Error("Error while creating results", { cause: e });
  }

  if (!sumByMonth) {
    throw new Error("Data pendapatan tidak ditemukan");
  }

  const sumberMap = generateSumberPendapatanMap(sumberList);
  const monthly: MonthlyReport = {};

  sumByMonth.map((item) => {
    const { id, sumber, sort } = sumberMap[item.sumber];
    const { sum, tanggal_month } = item;
    if (!monthly[tanggal_month]) {
      monthly[tanggal_month] = [];
    }
    monthly[tanggal_month].push({
      id,
      sumber,
      sort,
      jumlah: Number(sum.jumlah),
    });
  });

  return { monthly };
}
