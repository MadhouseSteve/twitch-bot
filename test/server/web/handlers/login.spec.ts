import login from "../../../../src/server/web/handlers/login";
import mocker from "jest-mock-req-res";
import randomstring from "randomstring";
import axios from "axios";
import redis from "redis";

jest.mock("redis", () => {
  const set = jest
    .fn()
    .mockImplementation((key, value, cb: redis.Callback<"OK">) => {
      cb(null, "OK");
    });
  return {
    createClient: jest.fn().mockReturnThis(),
    set,
  };
});

jest.mock("axios", () => ({
  post: jest.fn().mockImplementation(() => ({ data: "HERE IS SOME DATA" })),
}));

jest.mock("randomstring", () => ({
  generate: () => "THIS IS A RANDOM STRING",
}));

let response = mocker.mockResponse();
beforeEach(() => {
  (axios.post as jest.Mock).mockClear();
  response = mocker.mockResponse();
});

describe("handles successes", () => {
  beforeEach(async (done) => {
    const request = mocker.mockRequest({ query: { code: "SOME CODE" } });
    await login(request, response);
    done();
  });

  it("calls to Twitch to validate the code", () => {
    expect(axios.post).toHaveBeenCalled();
  });
  it("redirects to the dashboard", () => {
    expect(response.redirect).toHaveBeenCalled();
    expect(response.redirect).toHaveBeenCalledWith("/dashboard");
  });

  it("sets a session cookie", () => {
    expect(response.cookie).toHaveBeenCalled();
    expect(response.cookie).toHaveBeenCalledWith(
      "LOGIN_TOKEN",
      randomstring.generate(32), // Hard coded in the mock
      {
        sameSite: true,
        httpOnly: true,
      }
    );
  });

  it("sets a logged in notification cookie", () => {
    expect(response.cookie).toHaveBeenCalled();
    expect(response.cookie).toHaveBeenCalledWith("LOGGED_IN", "1", {
      sameSite: true,
    });
  });

  it("sets the redis session up correctly", () => {
    expect((redis as any).set).toHaveBeenCalledWith(
      randomstring.generate(32),
      JSON.stringify((axios as any).post().data),
      expect.any(Function)
    );
  });
});

describe("handles missing code", () => {
  let response = mocker.mockResponse();

  beforeEach(async (done) => {
    const request = mocker.mockRequest();
    await login(request, response);
    done();
  });

  it("redirects to the homepage", () => {
    expect(response.redirect).toHaveBeenCalled();
    expect(response.redirect).toHaveBeenCalledWith("/");
  });

  it("doesn't call to Twitch to validate the code", () => {
    expect(axios.post).not.toHaveBeenCalled();
  });
  it("doesn't set any cookies", () => {
    expect(response.cookie).not.toHaveBeenCalled();
  });
});

describe("handles invalid code", () => {
  let response = mocker.mockResponse();

  beforeEach(async (done) => {
    (axios.post as jest.Mock).mockImplementation(() => {
      throw new Error();
    });
    const request = mocker.mockRequest({ query: { code: "INVALID CODE" } });
    process.env.TWITCH_CLIENT_ID = "test client id";
    await login(request, response);
    done();
  });

  it("calls to Twitch to validate the code", () => {
    expect(axios.post).toHaveBeenCalled();
  });

  it("redirects to the OAuth login", () => {
    let url = "https://id.twitch.tv/oauth2/authorize?";
    url += "&client_id=" + process.env.TWITCH_CLIENT_ID;
    url += "&redirect_uri=http://localhost:3000/login";
    url += "&response_type=code";
    url += "&scope=user:read:email";

    expect(response.redirect).toHaveBeenCalled();
    expect(response.redirect).toHaveBeenCalledWith(url);
  });

  it("doesn't set any cookies", () => {
    expect(response.cookie).not.toHaveBeenCalled();
  });
});
