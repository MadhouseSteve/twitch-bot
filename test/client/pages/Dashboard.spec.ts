import Dashboard from "../../../src/client/pages/Dashboard.svelte";
import { render, fireEvent } from "@testing-library/svelte";

global.fetch = jest.fn();

describe("dashboard renders", () => {
  it("renders dashboard", () => {
    const { container } = render(Dashboard);
    expect(container).not.toBeNull();
  });
});

describe("join bot button", () => {
  it("exists", () => {
    const { getByText } = render(Dashboard);
    expect(getByText("Join Bot")).toBeInTheDocument();
  });

  it("asks server to join when clicked", async (done) => {
    const { getByText } = render(Dashboard);
    const button = getByText("Join Bot");
    await fireEvent.click(button);

    expect(global.fetch).toBeCalled();
    expect(global.fetch).toBeCalledWith("/bot/join", { method: "POST" });

    done();
  });
});
