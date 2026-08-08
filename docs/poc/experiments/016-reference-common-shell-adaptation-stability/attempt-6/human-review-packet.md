# Attempt 6 — 人間レビュー資料

## 今回判断してほしいこと

React実装3件が、承認済みReferenceの共通シェルと**同じ視覚・操作結果**に到達しているかを確認してください。実装コードの構造は判断対象ではありません。

比較は [状態別比較ページ](comparison/index.html) で行います。各画像は1440×900です。

1. ライト／ダークで、Header・Drawer・選択状態・active indicatorの主要配色がReferenceの系統から外れていないか。
2. 7つの固定SVGが別資産や近似形状に替わっておらず、形状・向き・意味的配置が揃っているか。特にDrawer、テーマ、検索、親開閉を確認する。
3. `Overview` / `Activity`（単独トップレベル）、`Workspace`（親）、`Section 01–03`（子）を画面だけで区別できるか。折りたたみ時に子だけが消えるか。
4. `Section 01`の選択状態、hover、検索欄のfocus-visibleが通常状態と混同しないか。
5. Run 3で、折りたたまれた親から`Section 01`を検索したとき、子が見え、親の一時表示が誤って隠れた開閉状態を変更しないという扱いが理解可能か。詳細は [Run 3 final review](reviews/run-3/final-review-attempt-3.md) を参照する。

## 回答

- 承認: React適応はReferenceと同じ共通シェルの結果に到達したと判断する。
- 条件付き承認: 画面または状態名と、確認したい条件を記載する。
- 再確認が必要: Run番号・状態・差異を記載する。

## 判断の前提

- 独立Reviewerは3 Runすべてを最終受理したが、これは人間の視覚判断を置換しない。
- Run 1は1回、Run 2は2回、Run 3は2回のReact実装修正を要した。
- ポート競合・viewport・証跡同期の回復は観測ツールの問題であり、React実装修正回数には含めない。
- 固定入力、Reference、vNext契約、React harness、過去Attemptはこの実験中に変更していない。
- 承認後も、今回の成果物を別frameworkや別Page Patternへ自動展開しない。
