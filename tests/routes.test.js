const server = require("../app");
// require supertest
const request = require("supertest");
// close the server after each test

describe("vouchers", () => {
  test("should respod as exprexted", () => {
    request(server)
      .get("/api/vouchers")
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200);
  });
});
