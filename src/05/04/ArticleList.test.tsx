import { render, screen, within } from "@testing-library/react";
import { ArticleList } from "./ArticleList";
import { items } from "./fixture";

test("タイトルの表示", () => {
  render(<ArticleList items={items} />);
  // screen.getByRole("heading").toHaveTextContent("記事一覧");ともかける
  expect(screen.getByRole("heading", { name: "記事一覧" })).toBeInTheDocument();
});

test("items の数だけ一覧表示される", () => {
  render(<ArticleList items={items} />);
  expect(screen.getAllByRole("listitem")).toHaveLength(3);
});

test("items の数だけ一覧表示される", () => {
  render(<ArticleList items={items} />);
  const list = screen.getByRole("list"); // listはul要素のこと
  expect(list).toBeInTheDocument();
  // within(lis)はscreenと同様な要素取得APIが含まれている
  expect(within(list).getAllByRole("listitem")).toHaveLength(3);
});

test("一覧アイテムが空のとき「投稿記事がありません」が表示される", () => {
  render(<ArticleList items={[]} />);
  // 存在しないことをテストする場合はqueryByRoleを使う
  const list = screen.queryByRole("list");
  expect(list).not.toBeInTheDocument(); // nullが返ってくるため、not.toBeInTheDocument()か↓のtoBeNull()を使う
  expect(list).toBeNull();
  expect(screen.getByText("投稿記事がありません")).toBeInTheDocument();
});

test("Snapshot: items の数だけ一覧表示される", () => {
  const { container } = render(<ArticleList items={items} />);
  expect(container).toMatchSnapshot();
});
