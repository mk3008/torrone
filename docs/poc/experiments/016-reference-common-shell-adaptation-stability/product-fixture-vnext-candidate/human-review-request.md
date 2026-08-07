# Fixture vNext candidate — 人間レビュー依頼

## 判断してほしい一点

Drawerの画面だけを見て、次の3種類を区別できますか。

1. 親に属さないトップレベル項目
2. 展開できる親メニュー
3. その親に属する子項目

## 確認方法

`docs/poc/experiments`をローカルHTTPで配信し、次を開いてください。

- `016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/preview/index.html?theme=light&drawer=open`
- `016-reference-common-shell-adaptation-stability/product-fixture-vnext-candidate/preview/index.html?theme=dark&drawer=open`

`Workspace`行を操作し、展開時と折りたたみ時を確認してください。
このpreviewは観測用であり、承認済みReferenceの視覚表現を再利用します。
product inputに新しい表示方法を定義するものではありません。

## 回答

- `clear` — 3種類を画面だけで区別できる
- `unclear` — 混同する2種類を記載する
- `needs product-data revision` — 不足している階層情報を記載する

このレビューでは、固定入力化、3 Run再開、フレームワーク適応の開始を承認しません。
