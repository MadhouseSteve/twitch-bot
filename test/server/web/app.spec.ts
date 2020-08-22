import request from "supertest";
import server from "../../../src/server/web/index";

describe("home page", () => {
  it("responds to /", (done) => {
    request(server).get("/").expect(200, done);
  });
});

describe("404", () => {
  it("responds with 404", (done) => {
    request(server).get("/nothing").expect(404, done);
  });

  it("responds with 404 text", (done) => {
    request(server).get("/nothing").expect("Not Found", done);
  });
});
