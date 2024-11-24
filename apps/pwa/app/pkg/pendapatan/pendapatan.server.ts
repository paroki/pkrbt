import {
  aggregate,
  Query,
  rest,
  createDirectus as sdkCreateDirectus,
  staticToken,
} from "@directus/sdk";
import { Misa, Pendapatan, PendapatanR, Schema } from "@pkrbt/directus";
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

type MisaQuery = Query<Schema, Misa>;
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

export async function listByMisa(request: Request) {
  const directus = await createDirectus(request);
  const { searchParams } = new URL(request.url);
  let filter: MisaQuery["filter"] = {};
  const month = searchParams.has("month")
    ? Number(searchParams.get("month"))
    : 0;
  const limit = searchParams.has("limit")
    ? Number(searchParams.get("limit"))
    : 6;
  const page = searchParams.has("page") ? Number(searchParams.get("page")) : 1;

  if (month > 0) {
    filter = {
      // @ts-expect-error 2353
      "month(tanggal)": {
        _eq: Number(month),
      },
    };
  }
  const fields = misaDefaultFields as Query<Schema, Misa>;
  const { items, error } = await directus.misa.search({
    ...fields,
    limit,
    filter,
    page,
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

  const fields = misaDefaultFields as Query<Schema, Misa>;
  const { items, error } = await directus.misa.search({
    ...fields,
    filter: {
      id: {
        _eq: id,
      },
    },
    limit: 1,
  });

  if (error) {
    throw error;
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

  const {
    id,
    sumber,
    jumlah,
    catatan,
    misa: misaId,
    intent,
    tanggal,
    uraian,
  } = data;

  const directus = await createDirectus(request);
  const realValue = Number(jumlah.replace(/\./g, ""));

  if ("update" === intent) {
    const { item, error } = await directus.pendapatan.update(id, {
      tanggal,
      uraian,
      sumber,
      jumlah: realValue,
      catatan,
    });
    if (error) {
      throw new DirectusError(error.message, { cause: error });
    }

    return json({ pendapatan: item as PendapatanR });
  } else if ("create" === intent) {
    let misa = undefined;
    if (misaId) {
      misa = { id: misaId };
    }
    const sort = Number(moment("YYYYMMDDhhmmss"));
    const payload = {
      tanggal,
      uraian,
      sumber,
      jumlah: realValue,
      catatan,
      misa,
      sort,
    };

    const { item, error } = await directus.pendapatan.create(payload);
    if (error) {
      throw error;
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
        groupBy: ["month(tanggal)", "sumber"],
        query: {
          // @ts-expect-error ts-2322
          sort: ["month(tanggal)"],
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

type PendapatanQuery = Query<Schema, Pendapatan>;

export async function fetchHarianList(request: Request) {
  const { searchParams } = new URL(request.url);
  const directus = await createDirectus(request);
  const limit = searchParams.has("limit")
    ? Number(searchParams.get("limit"))
    : 6;
  const sort = searchParams.has("sort")
    ? [searchParams.get("sort") as "tanggal" | "-tanggal"]
    : ["-tanggal", "sumber.sort"];
  const { items, error } = await directus.pendapatan.search({
    fields: [
      "id",
      "tanggal",
      "uraian",
      "jumlah",
      { misa: ["id", "perayaan"] },
      { sumber: ["id", "sort", "sumber"] },
      { updatedBy: ["id", "first_name", "nama", "avatar"] },
      "updatedAt",
      { createdBy: ["id", "last_name", "nama", "avatar"] },
      "createdAt",
    ],
    limit,
    sort: sort as PendapatanQuery["sort"],
    filter: {
      _and: [
        {
          misa: {
            _null: true,
          },
        },
      ],
    },
  });

  if (error) {
    throw error;
  }

  return items?.length ? items : [];
}

export async function fetchPendapatan(request: Request, id: string) {
  const directus = await createDirectus(request);
  const { items, error } = await directus.pendapatan.search({
    fields: [
      "id",
      "tanggal",
      "uraian",
      "jumlah",
      "catatan",
      "createdAt",
      { createdBy: ["id", "nama", "avatar"] },
      "updatedAt",
      { updatedBy: ["id", "nama", "avatar"] },
      { misa: ["id", "perayaan", "tanggal"] },
      { sumber: ["id", "sumber"] },
    ],
    filter: {
      id: {
        _eq: id,
      },
    },
  });

  if (error) {
    throw error;
  }

  if (!items || items.length === 0) {
    throw new Response("Pendapatan tidak ditemukan", {
      status: 404,
      statusText: "Not Found",
    });
  }
  return items[0];
}

export async function resolveForm(request: Request) {
  const resolver = zodResolver(PendapatanFormSchema);
  const {
    errors,
    data,
    receivedValues: defaultValues,
  } = await getValidatedFormData<z.infer<typeof PendapatanFormSchema>>(
    request,
    resolver,
  );

  if (errors) return json({ errors, defaultValues });

  const { id, sumber, jumlah, catatan, misa: misaId, tanggal, uraian } = data;
  const realValue = Number(jumlah.replace(/\./g, ""));
  let misa = undefined;
  if (misaId) {
    misa = { id: misaId };
  }

  return {
    pendapatanId: id,
    errors,
    defaultValues,
    payload: {
      sumber,
      jumlah: realValue,
      catatan,
      tanggal,
      uraian,
      misa,
    },
  };
}
export async function createPendapatan(request: Request) {
  const data = await resolveForm(request);

  if (data instanceof Response) {
    return data;
  }

  const { payload } = data;

  const directus = await createDirectus(request);
  const { item, error } = await directus.pendapatan.create(payload);

  if (error) {
    throw error;
  }

  return json({ pendapatan: item as PendapatanR });
}

export async function removePendapatan(request: Request, id: string) {
  const directus = await createDirectus(request);
  const { error } = await directus.pendapatan.remove(id);

  if (error) {
    throw error;
  }
}
