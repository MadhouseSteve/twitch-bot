import index from "../../src/client/index";
import App from "../../src/client/App.svelte";

jest.mock("../../src/client/App.svelte");

it("mounts the App in the body", () => {
  expect(index).toBeInstanceOf(App);
  expect(App).toBeCalled();
  expect(App).toBeCalledWith({
    target: document.body,
  });
});
