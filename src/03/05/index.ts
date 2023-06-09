// Eroorを継承したRangeErrorを定義
export class RangeError extends Error {}
export class HttpError extends Error {}

// if(error instanceof RangeError) {
//   // RangeErrorの場合の処理
// } else if(error instanceof HttpError) {
//   // HttpErrorの場合の処理
// }

function checkRange(value: number) {
  if (value < 0 || value > 100) {
    // 閾値を超えた場合はRangeErrorを投げる
    throw new RangeError("入力値は0〜100の間で入力してください");
  }
}

export function add(a: number, b: number) {
  checkRange(a);
  checkRange(b);
  const sum = a + b;
  if (sum > 100) {
    return 100;
  }
  return sum;
}

export function sub(a: number, b: number) {
  checkRange(a);
  checkRange(b);
  const sum = a - b;
  if (sum < 0) {
    return 0;
  }
  return sum;
}
