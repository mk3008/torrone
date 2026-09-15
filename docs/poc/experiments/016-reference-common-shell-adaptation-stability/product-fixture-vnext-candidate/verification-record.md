# Fixture vNext candidate — ブラウザ検証記録

## 対象範囲

この記録は候補previewだけを対象にします。product inputの固定化、過去Attemptの
変更、適応成功の確定は行いません。

## ローカル観測方法

- Server: 既に導入済みのAttempt 5 Run 2レビュー環境のVite実行ファイルを利用。
  新しい依存関係は追加していません。
- Bind: `127.0.0.1:4175`。
- 配信root: 候補と再利用する承認済みReference stylesheetを両方含む最小rootである
  `docs/poc/experiments`。
- Light URL:
  `/016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/preview/index.html?theme=light&drawer=open`。
- Dark URL:
  `/016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/preview/index.html?theme=dark&drawer=open`。

サーバーは人間レビューのためだけに起動し、確認後に停止しました。候補や将来の
凍結harnessの一部ではなく、観測手段です。

## 自動観測

`1440 × 900`でHTTP `200`を返し、配信root修正後のbrowser console errorは0件でした。
アクセシビリティsnapshotではDrawerの順序を次のように確認しました。

1. `Overview` — 親に属さないトップレベル項目
2. `Workspace` — 展開中の親button
3. `Section 01`、`Section 02`、`Section 03` — `Workspace`の子
4. `Activity` — 親に属さないトップレベル項目

`Workspace`を操作すると、親行と2つのトップレベル行を残したまま、3つの子行だけ
が消えました。ダークテーマでも同じ役割順を確認しました。

## 静的検証

- `node --check preview/preview.js`: passed。
- `check-fixture-candidate.ps1`: passed。トップレベル・親・子の役割と、previewが
  データを複製せず`fixture.json`を取得することを確認します。
- `git diff --check`: この記録の追加前にpassed。commit前に再実行します。

## 人間確認

人間レビューは`clear`として完了しました。画面だけで親、子、トップレベルの
非親項目を区別できることを確認しています。記録は
[human-approval-record.md](human-approval-record.md)を参照してください。
