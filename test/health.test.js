const request = require("supertest");
const app = require("../src/app");

describe("Health endpoint", () => {
  it("returns 200 OK", async () => {
    await request(app).get("/health").expect(200);
  });
});
