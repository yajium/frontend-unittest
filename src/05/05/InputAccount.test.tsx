import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { InputAccount } from "./InputAccount";

// テストファイルで初めにセットアップ
const user = userEvent.setup();

test("fieldset のアクセシブルネームは、legend を引用している", () => {
  render(<InputAccount />);
  expect(
    screen.getByRole("group", { name: "アカウント情報の入力" })
  ).toBeInTheDocument();
});

test("メールアドレス入力欄", async () => {
  render(<InputAccount />);
  // メールアドレス入力欄を取得
  const textbox = screen.getByRole("textbox", { name: "メールアドレス" });
  const value = "taro.tanaka@example.com";
  await user.type(textbox, value);
  // 期待値が入力されているフォームこ構成要素が存在するかを検証
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

// input type="password"や"radio"などはロール要素を持たないので、getByRoleで取得できない
// getByPlaceholderText()を使って取得する
test("パスワード入力欄", async () => {
  render(<InputAccount />);
  expect(() => screen.getByPlaceholderText("8文字以上で入力")).not.toThrow(); // getByPlaceholderText()で取得できるためエラーにならないlことがわかる
  expect(() => screen.getByRole("textbox", { name: "パスワード" })).toThrow(); // getByRole()で取得できないためエラーになることがわかる
});

test("パスワード入力欄", async () => {
  render(<InputAccount />);
  const password = screen.getByPlaceholderText("8文字以上で入力");
  const value = "abcd1234";
  await user.type(password, value);
  expect(screen.getByDisplayValue(value)).toBeInTheDocument();
});

test("Snapshot: アカウント情報の入力フォームが表示される", () => {
  const { container } = render(<InputAccount />);
  expect(container).toMatchSnapshot();
});
