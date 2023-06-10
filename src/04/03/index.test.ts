import { getGreet } from ".";
import * as Fetchers from "../fetchers"; // fetchers/index.ts に定義した関数をインポート
import { httpError } from "../fetchers/fixtures";

jest.mock("../fetchers");

describe("getGreet", () => {
  test("データ取得成功時：ユーザー名がない場合", async () => {
    // getMyProfile が resolve した時の値を再現
    // 流れとしては、jest.spyOn で getMyProfile のスパイを作成して、getMyProfileが次に呼び出された時にmockResolvedValueOnceで指定した値を返すようにしている
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
    });
    await expect(getGreet()).resolves.toBe("Hello, anonymous user!");
  });
  test("データ取得成功時：ユーザー名がある場合", async () => {
    jest.spyOn(Fetchers, "getMyProfile").mockResolvedValueOnce({
      id: "xxxxxxx-123456",
      email: "taroyamada@myapi.testing.com",
      name: "taroyamada",
    });
    await expect(getGreet()).resolves.toBe("Hello, taroyamada!");
  });
  test("データ取得失敗時", async () => {
    // getMyProfile が reject した時の値を再現
    // 200番台以外の、エラーが発生している場合はErrorインスタンスとして返ってくる
    // httpErrorは個別に定義したエラーインスタンス
    jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
    await expect(getGreet()).rejects.toMatchObject({
      err: { message: "internal server error" },
    });
  });
  test("データ取得失敗時、エラー相当のデータが例外としてスローされる", async () => {
    expect.assertions(1);
    jest.spyOn(Fetchers, "getMyProfile").mockRejectedValueOnce(httpError);
    try {
      await getGreet();
    } catch (err) {
      expect(err).toMatchObject(httpError);
    }
  });
});
