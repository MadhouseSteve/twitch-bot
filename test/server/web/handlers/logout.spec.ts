import logout from "../../../../src/server/web/handlers/logout";
import mocker from "jest-mock-req-res";
import redis from "redis";
import randomstring from "randomstring";

jest.mock("redis", () => {
  const del = jest.fn().mockImplementation((key, cb: redis.Callback<"OK">) => {
    cb(null, "OK");
  });
  return {
    createClient: jest.fn().mockReturnThis(),
    del,
  };
});

let response = mocker.mockResponse();
beforeEach(() => {
  response = mocker.mockResponse();
  let request = mocker.mockRequest({
    headers: {
      cookie: "LOGIN_TOKEN=SOME SESSION IDENTIFIER; LOGGED_IN=1",
    },
  });
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

  it("removes the redis key", () => {
    expect((redis as any).del).toHaveBeenCalledWith(
      "SOME SESSION IDENTIFIER",
      expect.any(Function)
    );
  });

  it("doesn't remove the redis key if there's no cookie", () => {
    const request = mocker.mockRequest({
      headers: {
        cookie: "",
      },
    });
    ((redis as any).del as jest.Mock).mockClear();
    logout(request, response);
    expect((redis as any).del).not.toHaveBeenCalled();
  });
});
