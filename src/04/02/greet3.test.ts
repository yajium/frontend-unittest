import { greet, sayGoodBye } from "./greet";

// Web APIなど特定の状況を再現したいときなど都合の悪い依存が含まれているときは
// モジュールをスタブ化（代用品化）することでテストを実施できる
jest.mock("./greet", () => ({
  sayGoodBye: (name: string) => `Good bye, ${name}.`,
}));

test("挨拶が未実装（本来の実装ではない）", () => {
  expect(greet).toBe(undefined);
});

test("さよならを返す（本来の実装ではない）", () => {
  const message = `${sayGoodBye("Taro")} See you.`;
  expect(message).toBe("Good bye, Taro. See you.");
});
