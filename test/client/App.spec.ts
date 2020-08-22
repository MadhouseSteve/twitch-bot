import App from "../../src/client/App.svelte";
import { render } from "@testing-library/svelte";

jest.mock("../../src/client/components/Navigation.svelte", () =>
  require("./mocks/Navigation.svelte")
);

jest.mock("../../src/client/pages/Homepage.svelte", () =>
  require("./mocks/Homepage.svelte")
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

  it("contains the homepage", () => {
    const { container } = render(App);
    expect(container).toContainHTML("HOMEPAGE!");
  });
});
