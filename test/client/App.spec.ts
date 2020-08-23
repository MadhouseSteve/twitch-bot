import App from "../../src/client/App.svelte";

import { render } from "@testing-library/svelte";

jest.mock("../../src/client/components/Navigation.svelte", () =>
  require("./mocks/Navigation.svelte")
);

jest.mock("../../src/client/pages/Homepage.svelte", () =>
  require("./mocks/Homepage.svelte")
);

jest.mock("../../src/client/pages/Dashboard.svelte", () =>
  require("./mocks/Dashboard.svelte")
);

describe("app renders", () => {
  it("renders app", () => {
    const { container } = render(App);
    expect(container).not.toBeNull();
  });

  it("contains the navigation", () => {
    const { container } = render(App);
    expect(container).toContainHTML("NAVIGATION!");
  });
});

describe("routing", () => {
  it("shows the homepage on /", () => {
    // @ts-ignore
    delete window.location;
    (window.location as Partial<Location>) = { pathname: "/" };
    const { container } = render(App);
    expect(container).toContainHTML("HOMEPAGE!");
  });
  it("shows the dashboard on /dashboard", () => {
    // @ts-ignore
    delete window.location;
    (window.location as Partial<Location>) = { pathname: "/dashboard" };
    const { container } = render(App);
    expect(container).toContainHTML("DASHBOARD!");
  });
});
