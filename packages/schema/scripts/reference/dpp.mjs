import { readFileSync } from "fs";
import { createDirectus } from "../directus.mjs";
import { ensureError } from "../util.mjs";

const fixtures = {
  organisasi: {
    sort: 1000,
    nama: "Dewan Pastoral Paroki",
    singkatan: "DPP",
  },
  struktur: [
    {
      sort: 1100,
      nama: "Pengurus Harian",
    },
    {
      sort: 1200,
      nama: "Pengurus Inti",
    },
    {
      sort: 1210,
      nama: "Bidang Pewartaan (Kerygma)",
      induk: 1200,
    },
    {
      sort: 1211,
      nama: "Seksi Pewartaan",
      induk: 1210,
    },
    {
      sort: 1212,
      nama: "Seksi Pendidikan",
      induk: 1210,
    },
    {
      sort: 1220,
      nama: "Bidang Perayaan Iman (Liturgia)",
      induk: 1200,
    },
    {
      sort: 1221,
      nama: "Seksi Liturgi",
      induk: 1220,
    },
    {
      sort: 1222,
      nama: "Seksi Lektor, Pemazmur, Prodiakon",
      induk: 1220,
    },
    {
      sort: 1223,
      nama: "Seksi Misdinar",
      induk: 1220,
    },
    {
      sort: 1230,
      nama: "Bidang Persekutuan (Koinonia)",
      induk: 1200,
    },
    {
      sort: 1231,
      nama: "Seksi Kepemudaan",
      induk: 1230,
    },
    {
      sort: 1232,
      nama: "Seksi Kerasulan Keluarga",
      induk: 1230,
    },
    {
      sort: 1233,
      nama: "Seksi Pembangunan dan Kekayaan Gereja",
      induk: 1230,
    },
    {
      sort: 1240,
      nama: "Bidang Pelayanan Cinta Kasih (Diakonia)",
      induk: 1200,
    },
    {
      sort: 1241,
      nama: "Seksi Sosial",
      induk: 1240,
    },
    {
      sort: 1242,
      nama: "Seksi Rukun Kematian dan Pemakaman",
      induk: 1240,
    },
    {
      sort: 1243,
      nama: "Seksi Komunikasi Sosial",
      induk: 1240,
    },
    {
      sort: 1250,
      nama: "Bidang Kesaksian Iman (Martyria)",
      induk: 1200,
    },
    {
      sort: 1251,
      nama: "Seksi Hubungan Antar Agama dan Dialog",
      induk: 1250,
    },
    {
      sort: 1252,
      nama: "Seksi Keadilan, Perdamaian, dan Migran",
      induk: 1250,
    },
    {
      sort: 1253,
      nama: "Seksi Caritas Paroki",
      induk: 1250,
    },
  ],
  periode: {
    nama: "2024-2027",
    dimulaiPada: "2024-07-18",
    berakhirPada: "2027-07-18",
    sort: 1001,
  },
  pengurusHarian: [
    {
      sort: 110001,
      nama: "Ketua",
    },
    {
      sort: 110002,
      nama: "Wakil Ketua I",
    },
    {
      sort: 110003,
      nama: "Wakil Ketua II",
    },
    {
      sort: 110004,
      nama: "Sekretaris I",
    },
    {
      sort: 110005,
      nama: "Sekretaris II",
    },
    {
      sort: 110006,
      nama: "Bendahara I",
    },
    {
      sort: 110007,
      nama: "Bendahara II",
    },
    {
      sort: 110008,
      nama: "Bendahara III",
    },
  ],
};

const directus = await createDirectus();

let dpp;
let periode;
let strukturList = [];

async function importDPP() {
  const org = fixtures.organisasi;

  const { id, error } = await directus.organisasi.findId({
    filter: {
      singkatan: {
        _eq: org.singkatan,
      },
    },
  });
  ensureError(error);

  const payload = {
    ...org,
  };

  if (id) {
    payload.id = id;
    const { item, error } = await directus.organisasi.update(payload);
    dpp = item;
    ensureError(error);
  } else {
    const { item, error } = await directus.organisasi.create(payload);
    ensureError(error);
    dpp = item;
  }
}

async function importPeriode() {
  const rest = directus.organisasi.periode;
  const fixture = fixtures.periode;

  const { id, error } = await rest.findId({
    filter: {
      sort: {
        _eq: fixture.sort,
      },
    },
  });
  ensureError(error);

  const payload = {
    ...fixture,
    organisasi: dpp.id,
  };

  let oitem;

  if (id) {
    payload.id = id;
    const { item, error } = await rest.update(payload);
    ensureError(error);
    oitem = item;
  } else {
    const { item, error } = await rest.create(payload);
    ensureError(error);
    oitem = item;
  }

  periode = oitem;
}

export function getPeriode() {
  return periode;
}
async function doImportStruktur(struktur) {
  const { id, error } = await directus.organisasi.struktur.findId({
    filter: {
      nama: {
        _eq: struktur.nama,
      },
    },
  });
  ensureError(error);

  const { nama, sort, induk } = struktur;
  const payload = {
    nama,
    sort,
    organisasi: dpp.id,
  };

  if (induk) {
    payload.induk = strukturList[induk].id;
  }

  let ostruktur;

  if (id) {
    payload.id = id;
    const { item, error } = await directus.organisasi.struktur.update(payload);
    ostruktur = item;
    ensureError(error);
  } else {
    const { item, error } = await directus.organisasi.struktur.create(payload);
    ostruktur = item;
    ensureError(error);
  }

  strukturList[sort] = ostruktur;
}

async function importStruktur() {
  const structures = fixtures["struktur"];

  for (let i = 0; i < structures.length; i++) {
    await doImportStruktur(structures[i]);
  }
}

async function importPengurusHarian() {
  const ostruk = strukturList[1100];
  const fixture = fixtures.pengurusHarian;
  const rest = directus.organisasi.jabatan;

  for (let i = 0; i < fixture.length; i++) {
    const payload = {
      ...fixture[i],
      struktur: ostruk.id,
      periode: periode.id,
    };

    const { id, error } = await rest.findId({
      filter: {
        sort: {
          _eq: payload.sort,
        },
      },
    });

    if (id) {
      payload.id = id;
      const { error } = await rest.update(payload);
      ensureError(error);
    } else {
      const { error } = await rest.create(payload);
      ensureError(error);
    }
  }
}

async function importJabatan(payload) {
  const rest = directus.organisasi.jabatan;

  const { id } = await rest.findId({
    filter: {
      sort: {
        _eq: payload.sort,
      },
    },
  });

  if (id) {
    payload.id = id;
    await rest.update(payload);
  } else {
    await rest.create(payload);
  }
}

async function importPengurusInti() {
  const graphql = directus.graphql;
  const query = readFileSync("./scripts/reference/graphql/jabatan.graphql", {
    encoding: "utf-8",
  });
  const { organisasi_struktur: items } = await graphql.query(query);

  // console.log(JSON.stringify(items, undefined, 2));
  const periodeId = periode.id;

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (null == item.induk) {
      continue;
    }
    const ketuaDiff = item.sort - item.induk.sort;
    const isBidangSection = ketuaDiff >= 10;
    const suffix = isBidangSection ? `00` : `0${ketuaDiff}`;
    const ketuaSort = String(item.sort) + suffix;
    const nama = isBidangSection ? "Koordinator Bidang" : "Ketua Seksi";

    await importJabatan({
      nama,
      periode: periode.id,
      struktur: item.id,
      sort: ketuaSort,
    });
  }
}

/**
 * Ensure DPP organization imported
 */
export async function ensureDPP() {
  await importDPP();
  await importPeriode();
  await importStruktur();
  await importPengurusHarian();
  await importPengurusInti();
  console.warn("imported dpp structures");
}
