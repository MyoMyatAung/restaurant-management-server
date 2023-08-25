import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../server";
import mongoose from "mongoose";
import request from "supertest";
import UserModel from "../models/user.model";

const app = createServer();

const signupUrl = "/api/v1/auth/signup";
const loginUrl = "/api/v1/auth/signin";

const newUser = {
  username: "testuser",
  email: "test@example.com",
  phone: "09780878870",
  password: "testpassword",
  confirmPassword: "testpassword",
  role: "Chef",
};

const loginPayload = {
  email: "test@example.com",
  password: "testpassword",
};

describe("Auth", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("Sign up", () => {
    describe("if sign up data is not completed", () => {
      it("should return 400", async () => {
        const incompleteUser = { ...newUser, email: null, phone: null };
        const { statusCode } = await request(app)
          .post(signupUrl)
          .send(incompleteUser);
        expect(statusCode).toBe(400);
      });
    });

    describe("if password doesn't match", () => {
      it("should return 400 ", async () => {
        const incompleteUser = {
          ...newUser,
          password: "test123",
          confirmPassword: "123test",
        };
        const { statusCode } = await request(app)
          .post(signupUrl)
          .send(incompleteUser);
        expect(statusCode).toBe(400);
      });
    });

    describe("if the user is already exist", () => {
      beforeEach(async () => {
        await UserModel.create(newUser);
      });
      afterEach(async () => {
        await UserModel.deleteMany({});
      });
      it("should return 409", async () => {
        const { statusCode } = await request(app).post(signupUrl).send(newUser);
        expect(statusCode).toBe(409);
      });
    });

    describe("if user is successfully registered", () => {
      beforeEach(async () => {
        await UserModel.deleteMany({});
      });
      afterEach(async () => {
        await UserModel.deleteMany({});
      });
      it("should return 201", async () => {
        const { statusCode } = await request(app).post(signupUrl).send(newUser);
        expect(statusCode).toBe(201);
      });
    });
  });

  describe("Sign in", () => {
    beforeEach(async () => {
      await UserModel.create(newUser);
    });
    afterEach(async () => {
      await UserModel.deleteMany({});
    });
    describe("if sign in data is not complete", () => {
      it("should return 400", async () => {
        const incompleteLoginPayload = { ...loginPayload, email: null };
        const { statusCode } = await request(app)
          .post(loginUrl)
          .send(incompleteLoginPayload);
        expect(statusCode).toBe(400);
      });
    });
    describe("if email or password isn't match", () => {
      it("should return 401", async () => {
        const incompleteLoginPayload = { ...loginPayload, password: "123test" };
        const { statusCode } = await request(app)
          .post(loginUrl)
          .send(incompleteLoginPayload);
        expect(statusCode).toBe(401);
      });
    });
    describe("if login success", () => {
      it("should return 200", async () => {
        const { statusCode } = await request(app)
          .post(loginUrl)
          .send(loginPayload);
        expect(statusCode).toBe(200);
      });
    });
  });
});
