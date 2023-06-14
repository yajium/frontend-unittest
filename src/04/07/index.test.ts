import { greetByTime } from ".";

describe("greetByTime(", () => {
  // テストが実行される前に偽のタイマーを使用するように指示
  beforeEach(() => {
    jest.useFakeTimers();
  });

  // テスト終了後はタイマーを戻すように指示
  afterEach(() => {
    jest.useRealTimers();
  });

  test("朝は「おはよう」を返す", () => {
    // 偽のタイマーで使用される現在システム時刻を設定
    jest.setSystemTime(new Date(2023, 4, 23, 8, 0, 0));
    expect(greetByTime()).toBe("おはよう");
  });

  test("昼は「こんにちは」を返す", () => {
    jest.setSystemTime(new Date(2023, 4, 23, 14, 0, 0));
    expect(greetByTime()).toBe("こんにちは");
  });

  test("夜は「こんばんは」を返す", () => {
    jest.setSystemTime(new Date(2023, 4, 23, 21, 0, 0));
    expect(greetByTime()).toBe("こんばんは");
  });
});
