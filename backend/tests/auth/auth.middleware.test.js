const { auth } = require("../middlewares/users.middleware");

describe("Auth Middleware", () => {
  it("should allow access if the token is valid", async () => {
    const req = { headers: { authorization: "Bearer valid-token" } };
    const res = {};
    const next = jest.fn();

    // Mock the JWT verification method to simulate success
    jest.spyOn(require("jsonwebtoken"), "verify").mockReturnValue({
      userId: "12345",
      role: "teacher",
    });

    await auth(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it("should deny access if token is invalid", async () => {
    const req = { headers: { authorization: "Bearer invalid-token" } };
    const res = { json: jest.fn() };
    const next = jest.fn();

    // Simulate JWT error
    jest.spyOn(require("jsonwebtoken"), "verify").mockImplementation(() => {
      throw new Error("Invalid token");
    });

    await auth(req, res, next);

    expect(res.json).toHaveBeenCalledWith({ msg: "Please Login" });
  });
});
