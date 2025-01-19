const request = require("supertest");
const express = require("express");
const passport = require("passport");
const { authRouter } = require("../routes/auth.route");

const app = express();
app.use(express.json());
app.use("/auth", authRouter); // Importation des routes d'authentification

// Test de la route GET /auth/login/success
describe("GET /auth/login/success", () => {
  it("should return success message if user is logged in", async () => {
    // Simuler une authentification réussie
    jest.spyOn(passport, "authenticate").mockImplementation((strategy, options) => (req, res, next) => next());
    
    const response = await request(app).get("/auth/login/success");

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Successfully Loged In");
  });

  it("should return not authorized if user is not logged in", async () => {
    const response = await request(app).get("/auth/login/success");

    expect(response.status).toBe(403);
    expect(response.body).toHaveProperty("message", "Not Authorized");
  });
});
