import Navigation from "../../../src/client/components/Navigation.svelte";
import { render } from "@testing-library/svelte";

describe("navigation renders", () => {
  it("renders navigation", () => {
    const { container } = render(Navigation);
    expect(container).not.toBeNull();
  });
});
