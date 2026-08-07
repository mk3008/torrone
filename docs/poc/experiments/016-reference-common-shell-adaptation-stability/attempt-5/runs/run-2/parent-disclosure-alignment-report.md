---
type: post-review React implementation correction
run: run-2
source-artifact: initial
corrected-artifact: final
scope: parent disclosure activation target
---

# Run 2 — 親メニュー開閉のReference整合記録

## 観測

承認済みReferenceの親メニューは、ラベルと開閉アイコンを含む
`button.navigation-row.group-row`です。したがって、行のテキスト部分を
含む親メニュー全体が開閉操作の対象です。

Run 2初回成果物では、`Workspace`ラベルは非操作要素で、隣接する
開閉アイコンだけが`button`でした。この差はReferenceの構造・操作表現と
一致しないため、**React実装の取りこぼし**として扱います。Reference、
token、SVG、binding map、固定入力の不備ではありません。

## 修正

初回成果物は変更せず、`runs/run-2/final/`を派生させました。親行全体を
単一のボタンにし、次を同じ操作対象へまとめています。

- `Workspace`ラベル
- 開閉状態を表す固定SVG
- `aria-expanded`
- `Collapse Workspace` / `Expand Workspace` のアクセシブル名

固定SVG、token、binding map、親子ナビゲーションの状態モデル、ライト／
ダークの配色は変更していません。

## 観測結果

固定viewport `1440 × 900`、`http://127.0.0.1:4175` で確認しました。

| 確認項目 | 結果 |
| --- | --- |
| ライトテーマ・展開状態 | `Workspace`を含む単一buttonが`Collapse Workspace`として露出。 |
| ラベル部分を含む親行の操作 | 親buttonの操作で子項目が非表示になり、アクセシブル名が`Expand Workspace`へ更新。 |
| ダークテーマ・折りたたみ状態 | `Workspace`を含む単一buttonが`Expand Workspace`として露出。 |
| 固定SVG | 展開／折りたたみに応じて既存の`disclosure-expanded.svg`／`disclosure-collapsed.svg`を使用。 |
| 回帰 | TypeScript、production build、5系統preflight、visual binding、SVG rendering contractの静的検証が通過。 |

## 境界

この記録はRun 2の実装修正と観測事項です。Attempt 5の固定入力・契約・
validationを変更または拡張しません。将来の契約化が必要かは、この単一の
実装取りこぼしだけからは判断しません。
