// biome-ignore assist/source/organizeImports: mocks should be on the top
import { pendapatanMock } from "./mocks/prisma";
import { authMock } from "./mocks/auth";
import { uuid } from "@pkrbt/util";
import { describe, expect, it } from "vitest";
import type { Pendapatan } from "@pkrbt/core";
import { app } from "../src";
import type { User, Session } from "@pkrbt/core";


const testPendapatan: Pendapatan = {
  id: uuid(),
  tanggal: new Date(),
  sumber: "Donasi",
  uraian: "Testing",
  catatan: null,
  jumlah: 1000000,
  deletedAt: null,
};

const jsonPendapatan = {
  ...testPendapatan,
  tanggal: testPendapatan.tanggal.toISOString(),
};

const testUser: User = {
  id: uuid(),
  name: "Test User",
  email: "user@test.dev",
  role: "user",
  createdAt: new Date(),
  updatedAt: new Date(),
  emailVerified: true,
  banned: false
}

const testSession: Session = {
  id: uuid(),
  userId: testUser.id,
  createdAt: new Date(),
  updatedAt: new Date(),
  expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
  token: uuid(),
}

authMock.api.getSession.mockResolvedValue({
  user: testUser,
  session: testSession
})

describe("GET /pendapatan", () => {
  it("should returns pendapatan resources", async () => {
    pendapatanMock.search.mockResolvedValue({
      items: [testPendapatan],
      total: 1,
    });

    const res = await app.request("/pendapatan", {
      method: "get",
    });

    expect(res.status).toBe(200);
    expect(pendapatanMock.search).toHaveBeenCalled();

    const data = await res.json();
    expect(data).toHaveProperty("items", [jsonPendapatan]);
    expect(data).toHaveProperty("total", 1);
  });

  it("should secure against unauthorized user", async() => {
    authMock.api.userHasPermission.mockResolvedValue({error: null, success: false})

    const res = await app.request("/pendapatan", {
      method: "get"
    })
    expect(authMock.api.userHasPermission).toHaveBeenCalled()
    expect(res.status).toBe(401)
  })
});

describe("POST /pendapatan", () => {
  it("should creates new pendapatan resource", async() => {
    pendapatanMock.create.mockResolvedValue(testPendapatan)

    const res = await app.request("/pendapatan", {
      method: "post",
      body: JSON.stringify(testPendapatan),
      headers: {
        "Content-Type": "application/json"
      }
    })
    expect(res.status).toBe(201)
    expect(pendapatanMock.create).toHaveBeenCalled()
    const data = await res.json()
    expect(data).toHaveProperty("id", testPendapatan.id)
  })
})

describe("GET /pendapatan/{id}", () => {
  it("should returns pendapatan resource", async() => {
    pendapatanMock.find.mockResolvedValue(testPendapatan)

    const res = await app.request(`/pendapatan/${testPendapatan.id}`)

    expect(pendapatanMock.find).toHaveBeenCalledWith(testPendapatan.id)
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toHaveProperty("id", testPendapatan.id)
  })
})

describe("PUT /pendapatan/{id}", () =>{
  it("should update pendapatan resource", async() => {
    pendapatanMock.update.mockResolvedValue(testPendapatan)

    const res = await app.request(`/pendapatan/${testPendapatan.id}`, {
      method: "put",
      body: JSON.stringify(testPendapatan)
    })

    expect(pendapatanMock.update).toHaveBeenCalledWith(testPendapatan.id, expect.anything())
    expect(res.status).toBe(200)

    const json = await res.json()
    expect(json).toHaveProperty("id")
  })


})

describe("DELETE /pendapatan/{id}", () => {
  it("should removes the pendapatan resource", async() => {
    pendapatanMock.delete.mockResolvedValue(testPendapatan)

    const res = await app.request(`/pendapatan/${testPendapatan.id}`, {
      method: "delete",
    })

    expect(res.status).toBe(204)
    expect(pendapatanMock.delete).toHaveBeenCalledWith(testPendapatan.id, false)

  })
})
