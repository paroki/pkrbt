import { describe, expect, it } from "vitest";
import { Directus } from "../src";

describe("directus", () => {
  const directus = new Directus({ baseUrl: "http://localhost:8055" });
  it("should load website plugin", () => {
    expect(directus).toHaveProperty("post");
    expect(directus.post).toHaveProperty("create");
  });

  it("should load organisasi plugin", () => {
    expect(directus).toHaveProperty("organisasi");
    // crud validation
    expect(directus.organisasi).toHaveProperty("create");
    expect(directus.organisasi).toHaveProperty("update");
    expect(directus.organisasi).toHaveProperty("remove");

    // sub plugin validation
    expect(directus.organisasi).toHaveProperty("struktur");
    expect(directus.organisasi).toHaveProperty("jabatan");
    expect(directus.organisasi).toHaveProperty("anggota");
  });

  it("should load user plugin", () => {
    expect(directus).toHaveProperty("user");

    const users = directus.user;
    expect(users).toHaveProperty("create");
    expect(users).toHaveProperty("update");
    expect(users).toHaveProperty("remove");
    expect(users).toHaveProperty("read");
  });
});
