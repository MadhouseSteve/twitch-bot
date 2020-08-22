import Navigation from "../../../src/client/components/Navigation.svelte";
import { render } from "@testing-library/svelte";

describe("navigation renders", () => {
  it("renders navigation", () => {
    const { container } = render(Navigation);
    expect(container).not.toBeNull();
  });

  it("renders a nav component", () => {
    const { container } = render(Navigation);
    expect(container).toContainHTML("<nav ");
  });
});

describe("homepage links", () => {
  it("has a home link", () => {
    const { getByText } = render(Navigation);
    expect(getByText("Home")).toBeInTheDocument();
  });

  it("takes you to / when clicking the home link", async (done) => {
    const { getByText } = render(Navigation);
    const link = getByText("Home");

    expect(link.getAttribute("href")).toBe("/");

    done();
  });
});

describe("login link", () => {
  it("is visible when logged out", () => {
    document.cookie = "";

    const { getByText } = render(Navigation);
    expect(getByText("Login")).toBeInTheDocument();
  });

  it("takes you to twitch", async (done) => {
    document.cookie = "";

    process.env.TWITCH_CLIENT_ID = "test client id";
    const { getByText } = render(Navigation);
    const link = getByText("Login");

    let url = "https://id.twitch.tv/oauth2/authorize?";
    url += "&client_id=" + process.env.TWITCH_CLIENT_ID;
    url += "&redirect_uri=http://localhost:3000/login";
    url += "&response_type=code";
    url += "&scope=user:read:email";

    expect(link.getAttribute("href")).toBe(url);

    done();
  });

  it("doesn't show the login link if you are logged in", () => {
    document.cookie = "LOGGED_IN=1";
    const { component } = render(Navigation);
    expect(component).not.toContain("Login");
  });
});

describe("logout link", () => {
  it("is not displayed when logged out", () => {
    document.cookie = "";
    const { component } = render(Navigation);
    expect(component).not.toContain("Logout");
  });

  it("is displayed when logged in", () => {
    document.cookie = "LOGGED_IN=1";
    const { getByText } = render(Navigation);
    expect(getByText("Logout")).toBeInTheDocument();
  });

  it("links to /logout", () => {
    document.cookie = "LOGGED_IN=1";
    const { getByText } = render(Navigation);
    const link = getByText("Logout");
    expect(link.getAttribute("href")).toBe("/logout");
  });
});
