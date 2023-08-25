import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../server";
import ItemCategoryModel from "../models/item-category.model";
import { signJwt } from "../utils/jwt.utils";
import { createItemCategory } from "../services/item-category.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const user = {
  _id: userId,
  username: "Villa Myo",
  email: "myatmyo299@gmail.com",
  phone: "09780878870",
  role: "super-admin",
};

const itemCategories = [
  {
    name: "Main courses",
  },
  {
    name: "Side Meal",
  },
];

describe("item-category", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get all item-categories", () => {
    beforeEach(async () => {
      await ItemCategoryModel.deleteMany({});
    });
    afterEach(async () => {
      await ItemCategoryModel.deleteMany({});
    });
    it("should return status 200 and list of item-categories", async () => {
      const token = signJwt(user);
      itemCategories.forEach(async (itemCategory) => {
        await createItemCategory({
          name: itemCategory.name,
          createdBy: user._id,
          updatedBy: user._id,
        });
      });
      const { statusCode, body } = await request(app)
        .get("/api/v1/item-categories")
        .set("Authorization", `Bearer ${token}`);
      expect(statusCode).toBe(200);
      expect(body.length).toBe(2);
    });
  });

  describe("get all item-categories for unauthorized", () => {
    it("should return status code 403 and message forbidden", async () => {
      const { statusCode, body } = await request(app).get(
        "/api/v1/item-categories"
      );
      expect(statusCode).toBe(403);
    });
  });

  describe("create item category", () => {
    beforeEach(async () => {
      await ItemCategoryModel.deleteMany({});
    });
    it("should return status code 201 and created data", async () => {
      const token = signJwt(user);
      const mockItemCat = { name: "Main Courses" };
      const { statusCode, body } = await request(app)
        .post("/api/v1/item-categories")
        .set("Authorization", `Bearer ${token}`)
        .send(mockItemCat);
      expect(statusCode).toBe(201);
      expect(body).toEqual({
        _id: expect.any(String),
        __v: 0,
        name: "Main Courses",
        createdBy: user._id,
        updatedBy: user._id,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      });
    });
  });

  describe("create item-category for unauthorized", () => {
    it("should return status code 403 and message forbidden", async () => {
      const mockItemCat = { name: "Main Courses" };
      const { statusCode, body } = await request(app)
        .post("/api/v1/item-categories")
        .send(mockItemCat);
      expect(statusCode).toBe(403);
    });
  });
});
