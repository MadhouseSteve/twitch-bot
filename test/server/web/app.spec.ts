import request from "supertest";
import server from "../../../src/server/web/index";
import express from "express";

jest.mock(
  "../../../src/server/web/handlers/login",
  (): express.Handler => (req, res) => res.send("TEST LOGIN HANDLER")
);
jest.mock(
  "../../../src/server/web/handlers/logout",
  (): express.Handler => (req, res) => res.send("TEST LOGOUT HANDLER")
);

describe("home page", () => {
  it("responds to /", (done) => {
    request(server).get("/").expect(200, done);
  });
});

describe("no matches", () => {
  it("responds with 200", (done) => {
    request(server).get("/nothing").expect(200, done);
  });
});

describe("login", () => {
  it("responds to /login", (done) => {
    request(server).get("/login").expect(200, done);
  });

  it("calls the login handler", (done) => {
    request(server).get("/login").expect("TEST LOGIN HANDLER", done);
  });
});

describe("logout", () => {
  it("responds to /logout", (done) => {
    request(server).get("/logout").expect(200, done);
  });

  it("calls the logout handler", (done) => {
    request(server).get("/logout").expect("TEST LOGOUT HANDLER", done);
  });
});
