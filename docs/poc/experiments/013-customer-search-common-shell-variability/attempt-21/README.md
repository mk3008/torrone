# Customer-search action-alignment variability test: Terra medium three-run comparison

This test uses the current distributable Manifest snapshot, the same fixed
Japanese product prompt, and an immutable common-shell fixture. It evaluates
whether a fresh consumer implementation consistently keeps form actions at the
logical start of their bounded pane while retaining collection actions at the
logical end of the fluid result toolbar.

## Generation conditions

- Model: `gpt-5.6-terra`
- Reasoning effort: `medium`
- Runs: `3`
- [Default Manifest snapshot](consumer-input/design-manifest/manifest.md)
- [Fixed common-shell fixture](consumer-input/common-shell-fixture/shell-template.html?drawer=open&theme=light)

## Full user prompt

> 顧客検索の静的HTMLページを作成してください。
> - 画面名は `顧客検索`、説明は `登録済みの顧客情報を検索・確認します。` とします。
> - 顧客IDは内部管理用の連番で編集不可です。検索対象は氏名、生年月日、電話番号、メールアドレスです。結果として氏名、生年月日、住所、電話番号、メールアドレス、備考を表示します。
> - 検索結果はグリッド形式で表示します。
> - 検索実行とリセットの操作が利用可能です。
> - 顧客IDを使った詳細確認が利用可能です。結果操作として `顧客を追加` が利用可能です。保存、実行、遷移、権限、結果は実装しません。
> - 結果は6件の中立fixtureとし、件数とページング能力があります。実データ接続やページ遷移は実装しません。
> - 画像は表示しません。

The comparison and final assessment are linked from [comparison.html](comparison.html)
and [evaluation.md](evaluation.md).
