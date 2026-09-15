# Attempt 5 — fixture-coverage gap記録

## 状態

**fixture coverageのため停止。** Attempt 5の固定入力、すべての初回・最終
Run成果物、および履歴レビューは変更しません。途中結果は適応安定性の成功・
失敗判定から除外します。

## 人間観測

レビューしたReact fixtureでは、親メニュー、その子、親に属さないトップレベル
項目の区別をDrawerだけから理解できませんでした。画面を見ただけでは、意図した
階層を判定できない状態です。

## 正本確認

凍結product contractには、`Workspace`の子として`Overview`と`Activity`、
その後に`Section 01`から`Section 29`を置く記述があります。承認済みReference
rendererもSectionsを子ではない行として扱います。しかしAttempt 5のReact Runは、
渡された項目を一つの`Workspace`グループの中へ描画していました。

よって今回の問題は、履歴product fileにトップレベル項目が全くない証拠ではあり
ません。既存fixtureの階層が、この適応・レビュー面で十分に明示されず、観測可能
にならなかった証拠です。

## 分類と境界

Attempt 5では**`fixture-coverage-gap`**として記録します。Reference、token、
SVG、binding map、vNext contractの不備を確定するものではなく、凍結済みRunの
遡及修正も許可しません。Attempt 5の途中結果は安定性のpass/failへ昇格させません。

## 次の作業

別の未凍結候補として
[product-fixture-vnext-candidate](../product-fixture-vnext-candidate/)を準備します。
目的は将来のfreeze判断前に、3種類の階層役割を観測できるようにすることだけです。
この候補からadaptation Runは開始しません。
