import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import createServer from "../server";
import { signJwt } from "../utils/jwt.utils";
import ItemModel from "../models/item.model";
import { createItem } from "../services/item.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const user = {
  _id: userId,
  username: "Villa Myo",
  email: "myatmyo299@gmail.com",
  phone: "09780878870",
  role: "super-admin",
};

const url = "/api/v1/items";

describe("item", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get all items", () => {
    beforeEach(async () => {
      await ItemModel.deleteMany({});
    });
    afterEach(async () => {
      await ItemModel.deleteMany({});
    });
    it("should return status code 200 and list of items", async () => {
      const token = signJwt(user);
      const mockItems = [
        {
          name: "ကြေးအိုးဆီချက်",
          price: 4500,
          description:
            "အသား၊ မုန်ညင်းရွက်၊ ငုံးဥ၊ အသားအဆီနှင့် နယ်ထားသော ကြာဇံတို့ပါဝင်သော တရုတ်အစားအစာ",
          imgs: [
            "http://localhost:1337/api/v1/imgs-1691273621233-581216243.jpeg",
            "http://localhost:1337/api/v1/imgs-1691273621237-47595813.jpeg",
            "http://localhost:1337/api/v1/imgs-1691273621240-624036792.jpeg",
          ],
          itemCategory: new mongoose.Types.ObjectId().toString(),
          createdBy: user._id,
          updatedBy: user._id,
        },
        {
          name: "ထမင်းကြော်",
          price: 2500,
          description: "ထမင်း၊ ကြက်သား၊ အသီးအရွက်တို့ဖြင့်ကြော်သည်",
          imgs: [
            "http://localhost:1337/api/v1/imgs-1691273621233-581216243.jpeg",
            "http://localhost:1337/api/v1/imgs-1691273621237-47595813.jpeg",
            "http://localhost:1337/api/v1/imgs-1691273621240-624036792.jpeg",
          ],
          itemCategory: new mongoose.Types.ObjectId().toString(),
          createdBy: user._id,
          updatedBy: user._id,
        },
      ];
      mockItems.forEach(async (item) => {
        await createItem(item);
      });
      const { statusCode, body } = await request(app)
        .get(url)
        .set("Authorization", `Bearer ${token}`);
      expect(statusCode).toBe(200);
      expect(body.length).toBe(2);
    });
  });

  describe("create item", () => {
    it("should return 201 and created item", async () => {
      const token = signJwt(user);
      const name = "Item name";
      const price = 4500;
      const description = "Item description";
      const itemCategory = new mongoose.Types.ObjectId().toString();
      const mockImages = [
        `C:/Users/User/Pictures/Products/cor_pyant.jpg`,
        "C:/Users/User/Pictures/Products/hamburger.jpg",
      ];
      const { statusCode, body } = await request(app)
        .post("/api/v1/items")
        .set("Authorization", `Bearer ${token}`)
        .field("name", name)
        .field("price", String(price))
        .field("description", description)
        .field("itemCategory", itemCategory)
        .attach("imgs", mockImages[0])
        .attach("imgs", mockImages[1]);

      expect(statusCode).toBe(201);
      expect(body).toEqual({
        _id: expect.any(String),
        name: name,
        price: price,
        description: description,
        imgs: expect.any(Array),
        itemCategory: itemCategory,
        createdBy: userId,
        updatedBy: userId,
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        __v: 0,
      });
    });
  });
});
