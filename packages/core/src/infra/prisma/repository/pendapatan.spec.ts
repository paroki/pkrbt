// biome-ignore assist/source/organizeImports: mocks need to be at the top of code
import prismaMock from "../../../../test/prisma";
import { Prisma } from "@pkrbt/prisma";
import { EnumSumberPendapatan } from "@pkrbt/prisma";
import { uuid } from "@pkrbt/util";
import { describe, expect, it } from "vitest";
import { PendapatanRepository } from "./pendapatan";
import { PrismaError } from "../error";
import { ErrNotFound } from "../../../error";

const repository = new PendapatanRepository();

const testData = {
  tanggal: new Date(),
  sumber: EnumSumberPendapatan.Donasi,
  uraian: "Test",
  catatan: null,
  deletedAt: null,
  jumlah: 1000000,
};
const resolved: Prisma.PendapatanModel = {
  ...testData,
  id: uuid(),
  jumlah: 1000000 as any,
};

describe("search()", () => {
  it("should search resources", async () => {
    prismaMock.$transaction.mockResolvedValue([1, [resolved]]);

    const [data, error] = await repository.search({
      sumber: "Donasi",
      keyword: "test",
      page: 1,
      size: 10,
    });
    const where: Prisma.PendapatanFindManyArgs["where"] = {
      OR: [
        {
          uraian: {
            contains: "test",
            mode: "insensitive",
          },
        },
        {
          catatan: {
            contains: "test",
            mode: "insensitive",
          },
        },
      ],
      sumber: "Donasi",
    };

    expect(prismaMock.pendapatan.findMany).toHaveBeenCalledWith({
      where,
      skip: 0,
      take: 10,
    });
    expect(prismaMock.pendapatan.count).toHaveBeenCalledWith({ where });
    expect(error).toBeNull();
    expect(data).toStrictEqual({ items: [resolved], total: 1 });
  });

  it("should returns error during prisma throw", async () => {
    prismaMock.$transaction.mockRejectedValue(new Error("unknown"));
    const [data, error] = await repository.search({
      page: 1,
      size: 10,
    });

    expect(error).toBeInstanceOf(PrismaError);
    expect(data).toBeNull();
  });

  it("should returns ErrNotFound if resources not found", async () => {
    prismaMock.$transaction.mockResolvedValue([0, []]);

    const [data, error] = await repository.search({ page: 1, size: 10 });
    expect(data).toBeNull();
    expect(error).toBe(ErrNotFound);
  });
});

describe("find()", () => {
  it("should find resource with id", async () => {
    prismaMock.pendapatan.findUniqueOrThrow.mockResolvedValue(resolved);

    const [data, error] = await repository.find("id");

    expect(prismaMock.pendapatan.findUniqueOrThrow).toHaveBeenCalledWith({
      where: { id: "id" },
    });
    expect(error).toBeNull();
    expect(data).toStrictEqual(resolved);
  });

  it("should returns ErrNotFound if resource not found", async () => {
    const err = new Prisma.PrismaClientKnownRequestError("test", {
      code: "P2025",
      clientVersion: "Test"
    });
    prismaMock.pendapatan.findUniqueOrThrow.mockRejectedValue(err);

    const [data, error] = await repository.find("id")
    expect(data).toBeNull()
    expect(error).toStrictEqual(ErrNotFound)
  });

  it("should returns error if prisma throws an error", async () => {
    prismaMock.pendapatan.findUniqueOrThrow.mockRejectedValue(
      new Error("unknown"),
    );

    const [data, error] = await repository.find("id");
    expect(data).toBeNull();
    expect(error).toBeInstanceOf(PrismaError);
  });
});

describe("create()", () => {
  const request = testData;
  it("should create new resource", async () => {
    prismaMock.pendapatan.create.mockResolvedValue(resolved);
    const [data, error] = await repository.create(request);

    expect(prismaMock.pendapatan.create).toHaveBeenCalledWith({
      data: request,
    });
    expect(error).toBeNull();
    expect(data).toHaveProperty("tanggal", request.tanggal);
  });

  it("should convert error into PrismaError", async () => {
    prismaMock.pendapatan.create.mockRejectedValue(new Error("unknown"));

    const [data, error] = await repository.create(request);

    expect(data).toBeNull();
    expect(error).toBeInstanceOf(PrismaError);
  });
});

describe("update()", () => {
  it("should update resource", async() => {
    prismaMock.pendapatan.update.mockResolvedValue(resolved)

    const [data, error] = await repository.update("id", testData)

    expect(prismaMock.pendapatan.update).toHaveBeenCalledWith({
      data: testData,
      where: {id: "id"}
    })
    expect(error).toBeNull()
    expect(data).toStrictEqual(resolved)
  })

  it("should returns error when prisma throws an error", async() => {
    prismaMock.pendapatan.update.mockRejectedValue(new Error("unknown"))

    const [data, error] = await repository.update("id", testData)

    expect(data).toBeNull()
    expect(error).toBeInstanceOf(PrismaError)
  })
})

describe("delete", () => {
  it("should soft delete data if force equal to false", async() => {
    prismaMock.pendapatan.update.mockResolvedValue(resolved)

    const [data, error] = await repository.delete("id", false)
    expect(prismaMock.pendapatan.update).toHaveBeenCalled()

    expect(error).toBeNull()
    expect(data).toStrictEqual(resolved)
  })

  it("should delete data if force equal to true", async() => {
    prismaMock.pendapatan.delete.mockResolvedValue(resolved)

    const [data, error] = await repository.delete("id", true)

    expect(prismaMock.pendapatan.delete).toHaveBeenCalledWith({
      where: {id: "id"}
    })
    expect(error).toBeNull()
    expect(data).toStrictEqual(resolved)
  })

  it("should returns error if soft delete throws an error", async() => {
    prismaMock.pendapatan.update.mockRejectedValue(new Error("test"))

    const [data, error] = await repository.delete("id", false)

    expect(data).toBeNull()
    expect(error).toBeInstanceOf(PrismaError)
  })

  it("should returns error if delete throws an error", async() => {
    prismaMock.pendapatan.delete.mockRejectedValue(new Error("test"))

    const [data, error] = await repository.delete("id", true)

    expect(data).toBeNull()
    expect(error).toBeInstanceOf(PrismaError)
  })
})
