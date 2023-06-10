import { greet } from "./greet";

// jest.mockを冒頭で呼び出すと対象モジュールの置き換え準備が実施される
jest.mock("./greet");

test("挨拶を返さない（本来の実装ではない）", () => {
  expect(greet("Taro")).toBe(undefined);
});
