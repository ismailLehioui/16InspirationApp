const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { courseRoute } = require("../routes/course.route");
const { auth } = require("../../middlewares/users.middleware");

const app = express();
app.use(express.json());
app.use("/courses", courseRoute); // Importation des routes des cours

// Mocking the authentication middleware to bypass the actual login logic
jest.mock("../middlewares/users.middleware", () => ({
  auth: (req, res, next) => next(),
}));

beforeAll(async () => {
  // Connexion à la base de données en mémoire pour les tests
  await mongoose.connect("mongodb://127.0.0.1:27017/test_db");
});

afterAll(async () => {
  // Déconnexion après les tests
  await mongoose.disconnect();
});

// Test de la route GET /courses/all
describe("GET /courses/all", () => {
  it("should fetch all courses with the correct query", async () => {
    const response = await request(app).get("/courses/all?page=1&limit=10");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("course");
    expect(Array.isArray(response.body.course)).toBe(true);
  });

  it("should handle error if something goes wrong", async () => {
    // Simuler une erreur de la base de données
    jest.spyOn(courseModel, "find").mockRejectedValue(new Error("Database Error"));

    const response = await request(app).get("/courses/all");

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("message", "Something Went Wrong");
  });
});

// Test de la route GET /courses/:courseID
describe("GET /courses/:courseID", () => {
  it("should fetch a course by ID", async () => {
    const courseID = "60d3482f9c5b2c1bbf76f1b2"; // Utilisez un ID valide
    const response = await request(app).get(`/courses/${courseID}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("course");
    expect(response.body.course).toHaveProperty("_id", courseID);
  });
});
