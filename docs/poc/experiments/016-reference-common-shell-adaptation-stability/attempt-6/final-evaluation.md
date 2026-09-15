# Attempt 6 — React adaptation final evaluation

## 判定

**done（独立Reviewerの最終判定まで）**。3つの独立React実装はすべて、修正後に Structural invariants、Exact visual bindings、SVG rendering contract、承認済み product fixture の階層を満たすと独立Reviewerが判定した。固定入力は変更していない。

これは人間の最終視覚承認ではない。下記の人間レビュー資料で、Referenceと最終Runの描画を確認する Gate が残る。

## 集計

| Run | 初回判定 | 初回 Structural | 初回 Exact visual bindings | React実装修正 | 最終判定 |
| --- | --- | --- | --- | --- | --- |
| Run 1 | correction required | 5/6 | 7/7 | 1 | accepted |
| Run 2 | correction required | 4/6 | 7/7 | 2 | accepted |
| Run 3 | correction required | 5/6 | 7/7 | 2 | accepted |
| 合計 | — | 14/18 (77.8%) | 21/21 (100%) | 5 | 3/3 accepted |

Structural は Header/Drawer/Main、Drawer表示、親子階層、親の開閉、検索時の階層表示、スクロール／状態遷移の6観点で集計した。Exact は token、7 SVG、state-to-icon binding、icon placement、Header/Drawer/selected表現、active indicator、theme切替の7観点で集計した。初回の問題は主に構造・操作と補助的な表示処理であり、固定の資産・token・bindingの取りこぼしは発見されなかった。

## Run別の初回と最終

- Run 1: 初回はDrawerのscroll owner、focus ring、選択項目の視覚的強調、不要な見出し、faviconを修正した。1回のReact修正後に受理された。
- Run 2: 初回のTypeScript型付け修正1回と、独立Reviewer指摘へのReact修正1回（scroll、折りたたみ親の検索結果、focus、tooltip、favicon）を実施した。最終受理された。
- Run 3: 初回指摘（favicon、折りたたみ親の子検索、実装起因コピー）を1回で修正後、検索による一時展開中の親ボタンが隠れた状態だけを変更する回帰を発見した。2回目のReact修正で、検索中の親を一時的に非操作化し、可視状態・ARIA・操作結果を一致させて最終受理された。

観測ハーネスのポート競合、viewport再設定、隔離worktree間の証跡同期は、React実装修正回数に含めない。これらは `harness / observation tooling` として残す。

## Menu hierarchy

3 Runすべてで次を確認した。

- `Overview` と `Activity` は親を持たないトップレベルの移動先。
- `Workspace` は展開可能な親。
- `Section 01`–`Section 03` は `Workspace` の子。
- 通常の折りたたみでは子だけが非表示になる。

Run 3の検索中は、子の探索可能性を保つため親が一時表示される。親はその間非操作化され、検索解除後に保存済みの開閉状態へ戻る。これはRun固有の許容実装差であり、fixtureまたはReference契約の変更ではない。

## Attempt 3（browser-native）との比較

Attempt 3はbrowser-nativeで Exact visual bindings を検証し、Run 1/3は初回適合、Run 2は3回の実装修正後に適合した。Attempt 6ではReactでも固定token、7 SVG、active indicator、ライト／ダークの描画が全Runで維持された。

Attempt 6で残った共通の重大な契約誤解はない。一方、検索時に親子階層をどう一時表示するか、Drawerのscroll owner、focusの外側リングは、React実装で具体的に再確認が必要だった。これはvNext契約の固定資産・SVG描画条件が不足したことを示すものではなく、実装／観測の検証範囲で発見・収束した問題として記録する。

## 残る人間判断と証拠限界

- [最終状態比較ページ](comparison/index.html)で、Referenceと3 Runの主要配色、SVG形状・向き・配置、選択状態とactive indicatorを確認する。
- hoverは自動キャプチャで観測したが、cross-applicationなhover tokenやdisabled表現をCanonical化しない。
- screen readerでのlive region、disabled親の説明、キーボード順序は未実施。Run 3のdisabled一時状態はこの実験の最終表示として受理されたが、横断アクセシビリティ仕様には昇格しない。
- Run 2の初期Reviewerが記録したdark + Drawer-hiddenの個別最終画像不足は、Run 2の修正差分がその状態のrender pathに触れていないという根拠で実装不適合には分類しない。最終比較ページにはDrawer非表示の最終画像を追加した。

## 推奨

**React適応成功（人間の最終比較Gate付き）**を推奨する。固定入力、Reference、vNext契約、React harnessを変更せず、まず人間が比較ページを確認する。承認までは別フレームワークまたは別Patternへ進めない。

## 主要証跡

- [Run 1 initial review](reviews/run-1/initial-review.md) / [final review](reviews/run-1/final-review.md)
- [Run 2 initial review](reviews/run-2/initial-review.md) / [final review](reviews/run-2/final-review.md)
- [Run 3 initial review](reviews/run-3/initial-review.md) / [correction review](reviews/run-3/final-review.md) / [final review](reviews/run-3/final-review-attempt-3.md)
- [比較ページ](comparison/index.html)
