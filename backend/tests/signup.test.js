import request from "supertest";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import z from "zod";
import app from "../app"; // Assuming your app is configured properly and exported from 'app.js'
import User from "../db/models/userModel"; // Assuming the User model is imported properly

// Mocking dependencies
jest.mock("bcryptjs", () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("zod", () => ({
  string: jest.fn(() => ({
    email: jest.fn(),
    safeParse: jest.fn(() => ({ success: true })),
  })),
}));

// Mocking User.findOne function
const mockFindOne = jest.fn();

jest.mock("../db/models/userModel", () => ({
  findOne: mockFindOne,
  save: jest.fn(),
}));

describe("POST /api/signup", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should return 400 if invalid email or password", async () => {
    z.string().email.mockReturnValueOnce({
      safeParse: jest.fn(() => ({ success: false })),
    });

    const res = await request(app)
      .post("/api/signup")
      .send({ email: "invalid-email", password: "weak" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Invalid email or password");
  });

  it("should return 400 if email already exists", async () => {
    mockFindOne.mockReturnValueOnce(true);

    const res = await request(app)
      .post("/api/signup")
      .send({ email: "existing-email@example.com", password: "validPassword" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Email already exists");
  });

  it("should return 400 if username already exists", async () => {
    mockFindOne.mockReturnValueOnce(false); // Email does not exist
    mockFindOne.mockReturnValueOnce(true); // User already exists

    const res = await request(app)
      .post("/api/signup")
      .send({
        user: "existingUser",
        email: "new-email@example.com",
        password: "validPassword",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Username already exists");
  });

  it("should create user and return token if everything is valid", async () => {
    const mockHashedPassword = "hashedPassword";
    const mockUser = {
      _id: "mockId",
      save: jest.fn(),
    };
    bcrypt.genSalt.mockResolvedValue("mockSalt");
    bcrypt.hash.mockResolvedValue(mockHashedPassword);
    User.mockReturnValue(mockUser);
    jwt.sign.mockReturnValue("mockToken");

    mockFindOne.mockReturnValueOnce(false); // Email does not exist
    mockFindOne.mockReturnValueOnce(false); // User does not exist

    const res = await request(app)
      .post("/api/signup")
      .send({
        user: "newUser",
        email: "new-email@example.com",
        password: "validPassword",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("User created");
    expect(res.body.token).toBe("Bearer mockToken");
  });
});
