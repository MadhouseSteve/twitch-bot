import logout from "../../../../src/server/web/handlers/logout";
import mocker from "jest-mock-req-res";
import { request } from "express";

let response = mocker.mockResponse();
beforeEach(() => {
  response = mocker.mockResponse();
  let request = mocker.mockRequest();
  logout(request, response);
});

describe("logout handler", () => {
  it("redirects to the homepage", () => {
    expect(response.redirect).toHaveBeenCalled();
    expect(response.redirect).toHaveBeenCalledWith("/");
  });

  it("removes the session cookie", () => {
    expect(response.clearCookie).toHaveBeenCalled();
    expect(response.clearCookie).toHaveBeenCalledWith("LOGIN_TOKEN");
  });

  it("removes the logged in cookie", () => {
    expect(response.clearCookie).toHaveBeenCalled();
    expect(response.clearCookie).toHaveBeenCalledWith("LOGGED_IN");
  });
});
