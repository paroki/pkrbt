import { deleteItems, readItems } from "@directus/sdk";
import { createDirectus } from "../directus.mjs";
import { fakerID_ID as faker } from "@faker-js/faker";
import { getPeriode } from "../reference/dpp.mjs";

const directus = await createDirectus();

async function cleanupAnggota() {
  const items = await directus.rest.request(
    readItems("organisasi_anggota", {
      fields: ["id"],
      limit: 1000,
    }),
  );
  for (let i = 0; i < items.length; i++) {
    const { id } = items[i];
    await directus.organisasi.anggota.remove(id);
  }
}

export async function createKetua() {
  const items = await directus.rest.request(
    readItems("organisasi_jabatan", {
      filter: {
        penjabat: {
          _null: true,
        },
      },
    }),
  );

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const { id: jabatanId } = item;

    const sex = faker.person.sex();
    const name =
      faker.person.firstName({ sex }) + " " + faker.person.lastName({ sex });
    const { item: anggota } = await directus.organisasi.anggota.create({
      nama: name,
    });

    await directus.organisasi.jabatan.update({
      id: jabatanId,
      penjabat: anggota.id,
    });
  }
}

async function cleanupJabatanAnggota(sort) {
  await directus.rest.request(
    deleteItems("organisasi_jabatan", {
      filter: {
        sort: {
          _eq: sort,
        },
      },
    }),
  );
}

export async function createAnggota() {
  const items = await directus.rest.request(
    readItems("organisasi_struktur", {
      fields: ["id", "sort", "nama"],
      search: "seksi",
    }),
  );

  for (let i = 0; i < items.length; i++) {
    const { id, sort: strukturSort } = items[i];
    const sort = Number(`${strukturSort}10`);
    await cleanupJabatanAnggota(sort);
    const maxJ = faker.number.int({ min: 4, max: 8 });
    for (let j = 0; j < maxJ; j++) {
      const sex = faker.person.sex();
      const { item: anggota } = await directus.organisasi.anggota.create({
        nama: `${faker.person.firstName({ sex })} ${faker.person.lastName({ sex })}`,
      });
      const payload = {
        nama: "Anggota",
        penjabat: anggota.id,
        struktur: id,
        sort,
        periode: getPeriode().id,
      };
      await directus.organisasi.jabatan.create(payload);
    }
  }
  //console.log(items);
}

export async function createPenjabat() {
  await cleanupAnggota();
  await createKetua();
  await createAnggota();
  console.warn("created dpp penjabat");
}
