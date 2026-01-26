import { test, describe, expect } from "bun:test";
import { prismaMock } from "../../test/setup";
import { Pendapatan } from "@/model";
import { PendapatanRepository } from "./pendapatan";

const pendapatan = {
  id: "some-id",
  tanggal: new Date(),
  sumber: "kolekte1",
  keterangan: "Hari Minggu Biasa XXI",
  catatan: null,
  jumlah: 2500000,
} satisfies Pendapatan;

const repo = new PendapatanRepository();

describe("PendapatanRepository", () => {
  test("search pendapatan successfully", async () => {
    prismaMock.pendapatan.findMany.mockResolvedValue([pendapatan]);

    const { data } = await repo.search({ page: 1, size: 10 });

    expect(data).toEqual([pendapatan]);
  });
});
