import Homepage from "../../../src/client/pages/Homepage.svelte";
import { render } from "@testing-library/svelte";

describe("homepage renders", () => {
  it("renders homepage", () => {
    const { container } = render(Homepage);
    expect(container).not.toBeNull();
  });
});
