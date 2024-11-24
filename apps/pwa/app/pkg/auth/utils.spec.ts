import { describe, expect, it } from "vitest";
import { hasPolicy, isAdmin, isGranted, isOrganisator } from "./utils";
describe("user role", () => {
  it("isGranted() should check user role", () => {
    expect(isGranted("admin", "user")).toBeTruthy();
    expect(isGranted("user", "admin")).toBeFalsy();
    expect(isGranted("admin", "admin")).toBeTruthy();
  });

  it("isAdmin() should ensure admin user", () => {
    expect(isAdmin("admin")).toBeTruthy();
    expect(isAdmin("organisator")).toBeFalsy();
    expect(isAdmin("user")).toBeFalsy();
  });

  it("isOrganisator() should ensure organisator", () => {
    expect(isOrganisator("organisator")).toBeTruthy();
    expect(isOrganisator("admin")).toBeTruthy();
    expect(isOrganisator("penerbit")).toBeFalsy();
    expect(isOrganisator("pengarang")).toBeFalsy();
  });
});

describe("user policy", () => {
  it("hasPolicy() should check user with policy", () => {
    const policies = ["Pengurus Harian"];
    expect(hasPolicy(policies, "PengurusHarian")).toBeTruthy();
    expect(hasPolicy(policies, "Bendahara")).toBeFalsy();

    policies.push("Bendahara");
    expect(hasPolicy(policies, "Bendahara")).toBeTruthy();
    expect(hasPolicy(policies, "PengurusHarian")).toBeTruthy();
  });
});
