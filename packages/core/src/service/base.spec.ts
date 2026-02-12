import { uuid } from "@pkrbt/util";
import { beforeEach, describe, expect, it } from "vitest";
import { mockDeep, mockReset } from "vitest-mock-extended";
import type { IDispatcher } from "../contracts/dispatcher";
import type { IRepository } from "../contracts/repository";
import { BaseError } from "../error";
import type { EventMap } from "../events/event";
import { Events } from "../events/event";
import { PrismaError } from "../infra/prisma/error";
import type { SearchRequest } from "../model";
import { BaseService } from "./base";

export type TestModel = {
  id: string;
  foo: string;
  hello: string;
};

class TestService extends BaseService<TestModel> {}
const dispatcherMock = mockDeep<IDispatcher<EventMap>>();
const repoMock = mockDeep<IRepository<TestModel>>();
const service = new TestService("Test", dispatcherMock, repoMock);

const testData = {
  foo: "Foo Bar",
  hello: "Hello World",
};

const resolved = {
  ...testData,
  id: uuid(),
};
// for clear documentation only
const before = resolved;
const after = resolved;

beforeEach(() => {
  mockReset(repoMock);
  mockReset(dispatcherMock);
});

describe("create()", () => {
  it("should delegate method to repository", async () => {
    repoMock.create.mockResolvedValue([resolved, null]);
    const request = { ...testData };
    await service.create(request);
    expect(repoMock.create).toHaveBeenCalledWith(request);
  });

  it("should dispatch event created", async () => {
    repoMock.create.mockResolvedValue([resolved, null]);
    await service.create(testData);
    expect(dispatcherMock.dispatch).toHaveBeenCalledWith(Events.Created, {
      entity: "Test",
      after: resolved,
    });
  });

  it("should throw error repository returns an error", async () => {
    repoMock.create.mockResolvedValue([null, new BaseError("unknown")]);
    await expect(async () => {
      await service.create(testData);
    }).rejects.toThrow(BaseError);
  });
});

describe("update()", () => {
  it("should delegate update method to repository", async () => {
    repoMock.find.mockResolvedValue([before, null]);
    repoMock.update.mockResolvedValue([after, null]);

    const result = await service.update(resolved.id, testData);

    expect(repoMock.update).toHaveBeenCalledWith(resolved.id, testData);
    expect(result).toStrictEqual(resolved);
  });

  it("should dispatch event updated", async () => {
    repoMock.find.mockResolvedValue([before, null]);
    repoMock.update.mockResolvedValue([resolved, null]);

    const result = await service.update(resolved.id, testData);

    expect(result).toStrictEqual(resolved);
    expect(dispatcherMock.dispatch).toHaveBeenCalledWith(Events.Updated, {
      entity: "Test",
      before: resolved,
      after: resolved,
    });
  });

  it("should throws error when find data returns an error", async () => {
    repoMock.find.mockResolvedValue([null, new BaseError("testing")]);

    await expect(async () => {
      await service.update(resolved.id, testData);
    }).rejects.toThrow(Error);
  });

  it("should throws when repository update returns an error", async () => {
    repoMock.find.mockResolvedValue([before, null]);
    repoMock.update.mockResolvedValue([null, new BaseError("unknown")]);
    await expect(async () => {
      await service.update(resolved.id, testData);
    }).rejects.toThrow(BaseError);
  });
});

describe("delete()", () => {
  it("should delegate delete method to repository", async () => {
    repoMock.find.mockResolvedValue([before, null]);
    repoMock.delete.mockResolvedValue([resolved, null]);

    const result = await service.delete(resolved.id);

    expect(repoMock.delete).toHaveBeenCalledWith(resolved.id, false);
    expect(result).toEqual(resolved);
  });

  it("should dispatch event deleted", async () => {
    repoMock.find.mockResolvedValue([before, null]);
    repoMock.delete.mockResolvedValue([after, null]);

    const result = await service.delete(resolved.id);

    expect(repoMock.delete).toHaveBeenCalledWith(resolved.id, false);
    expect(dispatcherMock.dispatch).toHaveBeenCalledWith(Events.Deleted, {
      entity: "Test",
      before,
      after,
    });
    expect(result).toEqual(after);
  });

  it("should throws when repository find throws an error", async () => {
    repoMock.find.mockResolvedValue([null, new BaseError("testing")]);
    await expect(async () => await service.delete(resolved.id)).rejects.toThrow(
      BaseError,
    );
  });

  it("should throws when repository delete returns an error", async () => {
    repoMock.find.mockResolvedValue([resolved, null]);
    repoMock.delete.mockResolvedValue([null, new BaseError("testing")]);
    await expect(async () => await service.delete(resolved.id)).rejects.toThrow(
      BaseError,
    );
  });
});

describe("find()", () => {
  it("should find resource with id", async () => {
    repoMock.find.mockResolvedValue([resolved, null]);

    const data = await service.find("id");

    expect(repoMock.find).toHaveBeenCalledWith("id");
    expect(data).toEqual(resolved);
  });

  it("should throws error ir repository returns an error", async () => {
    repoMock.find.mockResolvedValue([null, new BaseError("unknown")]);

    await expect(async () => {
      await service.find("idd");
    }).rejects.toThrow(BaseError);
  });
});

describe("search()", () => {
  const resources = {
    items: [resolved],
    total: 1,
  };
  const request: SearchRequest = {
    page: 1,
    size: 10,
  };

  it("should search resources", async () => {
    repoMock.search.mockResolvedValue([resources, null]);

    const data = await service.search(request);

    expect(repoMock.search).toHaveBeenCalledWith(request);
    expect(data).toHaveProperty("items", resources.items);
    expect(data).toHaveProperty("total", resources.total);
  });

  it("should throws when repository returns an error", async () => {
    repoMock.search.mockResolvedValue([null, new BaseError("error")]);

    await expect(async () => {
      await service.search(request);
    }).rejects.toThrow(BaseError);
  });
});
