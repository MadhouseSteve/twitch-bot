import request from "supertest";
import express from "express";
import server from "../../../src/server/web";

jest.mock(
  "../../../src/server/web/handlers/homepage",
  () => (_: express.Request, res: express.Response) =>
    res.status(200).send("hello world!")
);

describe("home page", () => {
  it("responds to /", (done) => {
    request(server).get("/").expect(200, done);
  });

  it("calls to the homepage handler", (done) => {
    request(server).get("/").expect("hello world!", done);
  });
});

describe("404", () => {
  it("responds with 404", (done) => {
    request(server).get("/nothing").expect(404, done);
  });
});
