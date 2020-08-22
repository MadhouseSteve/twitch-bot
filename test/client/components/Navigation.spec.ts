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
