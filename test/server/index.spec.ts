import "../../src/server/index";
import app from "../../src/server/web/index";

jest.mock("../../src/server/web/index.ts", () => ({
  listen: jest.fn(),
}));

describe("starting web server", () => {
  it("listens on port 3000", () => {
    expect(app.listen).toHaveBeenCalledWith(3000);
  });
});
