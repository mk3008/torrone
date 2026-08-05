---
type: human review request
title: 共通シェルReference契約vNext候補の承認依頼
status: 履歴資料。現行Gateではない。
scope: 過去のレビュー方式の記録。現行の承認フロー・固定入力化・実験開始条件には使用しない。
---

# 共通シェルReference契約vNext候補のレビュー依頼

> **履歴資料**
>
> この文書は過去に作成されたレビュー方式の記録です。Exact visual
> bindings、SVG契約、Interaction Foundations、Validationを人間へ再承認
> させる現行Gateとして使用しません。現行の承認フロー、次の実験開始
> 条件、または固定入力化の判断にも使用しません。

## 主題

### 1. Exact visual bindingsの範囲

#### 判断してほしいこと

次の扱いを承認するか確認してください。

- テーマtokenは、このReferenceを採用した場合の標準テーマとして扱う。
- テーマtokenの具体値を、すべての案件へ自動的に強制しない。
- 7つの固定SVG、アイコンと状態の対応、形状、向き、基本サイズ、意味的配置をExact対象とする。
- Header、Drawer、選択状態、active indicatorの視覚処理をExact対象とする。
- DOM、コンポーネント、CSS実装方法、フレームワークは固定しない。

#### 見てほしいファイル

- [reference-contract.md](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/reference-contract.md#exact-visual-bindings)

必要な場合のみ:

- [visual-tokens.css](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/visual-tokens.css)
- [binding-map.json](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/reference-owned/visual-bindings/binding-map.json)

#### 見てほしい点

- Referenceの標準テーマと、全案件への必達値が混同されていないか。
- Exact対象が広すぎず、実装方法まで固定していないか。
- 7つのSVGとその配置を固定することが妥当か。

#### 承認した場合に確定すること

Reference採用時に維持する視覚的出力の範囲と、実装方法を自由として残す境界が確定します。全案件への具体色の一律強制は確定しません。

#### 回答

`承認`、`修正が必要`、`判断保留` のいずれかを選んでください。`修正が必要`の場合は、Exactから外す項目または追加する条件を記載してください。

### 2. SVG rendering contract

#### 判断してほしいこと

次の契約を承認するか確認してください。

- 固定SVGの形状と、テーマ前景色での表示結果を保証する。
- inline SVG、CSS mask、検証済みのフレームワーク固有実装を許容する。
- CSS maskなど特定の実装方法は必須にしない。
- `currentColor`を適用できない外部`img`利用、別アイコンへの置換、CSS filterによる近似は禁止する。
- 現時点の対象は、既存の7つの単色`currentColor` SVGとする。
- 多色SVGなど別種の資産は、将来別途判断する。

#### 見てほしいファイル

- [svg-rendering-contract.md](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/svg-rendering-contract.md)

#### 見てほしい点

- 実装方法ではなく、必要な描画結果を固定する契約になっているか。
- 現在の7つのSVGを対象とする契約として過不足がないか。
- 将来の多色SVGなどまで誤って禁止する内容になっていないか。

#### 承認した場合に確定すること

対象SVGについて、テーマ色で視認できる結果を守ることと、許容・禁止する実装方式の境界が確定します。CSS mask自体を必須方式にはしません。

#### 回答

`承認`、`修正が必要`、`判断保留` のいずれかを選んでください。

### 3. Interaction Foundationsへの分離

#### 判断してほしいこと

hover、focus-visible、selected、active、disabledを、共通シェル固有の仕様ではなく、アプリ全体に関係する横断仕様候補として分離する方針を承認するか確認してください。

今回は次の具体値を確定しません。

- hover背景色
- focus ringの色
- focus ringの太さ
- focus ringのoffset
- 各コンポーネントでの具体的な適用方法

今回承認するのは責任分離だけであり、具体的なInteraction仕様のCanonical化ではありません。

#### 見てほしいファイル

- [interaction-foundations-candidate.md](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/interaction-foundations-candidate.md)

#### 見てほしい点

- 共通シェルだけの仕様に閉じ込めず、アプリ全体の横断仕様候補として扱う判断が妥当か。
- 未検証の具体値が、確定仕様のように書かれていないか。
- selectedなど、共通シェルのExact bindingとの責任境界が分かるか。

#### 承認した場合に確定すること

interaction状態の責任を将来の横断Foundationへ分離する方針だけが確定します。状態ごとの具体値や実装方法は確定しません。

#### 回答

`責任分離を承認`、`共通シェル側へ残す`、`分類を修正する`、`判断保留` のいずれかを選んでください。

### 4. Validationの範囲

#### 判断してほしいこと

次の検証分担を承認するか確認してください。

- 静的検証: token、SVG、binding mapの変更、固定SVGの置換、テーマ色を適用できない`currentColor` SVGの直接`img`利用。
- ブラウザ検証: ライト／ダーク、実際のアイコン色と視認性、selected、hover、focus-visibleなどの状態。
- 人間レビュー: 自動観測できない状態、実際の視認性や違和感。

静的検証だけで実際の描画結果を保証したことにはしません。

#### 見てほしいファイル

- [validation-plan.md](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/validation-plan.md)
- [verification-record.md](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/verification-record.md)

必要な場合のみ:

- [check-svg-rendering-contract.ps1](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/validation/check-svg-rendering-contract.ps1)
- [self-test-svg-rendering-contract.ps1](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/validation/self-test-svg-rendering-contract.ps1)

#### 見てほしい点

- 静的検証がCSS maskなど特定の実装方法を強制していないか。
- 実証済みの誤用だけを適切に検出できているか。
- ブラウザ確認と人間確認が必要な項目を、静的検証済みと誤認させないか。
- 実装自由を不必要に狭めていないか。

#### 承認した場合に確定すること

静的・ブラウザ・人間レビューの検証責任の分担が確定します。静的検証の成功だけを描画適合の最終判定にはしません。

#### 回答

`承認`、`修正が必要`、`判断保留` のいずれかを選んでください。

### 5. 最終判断

上記4項目への回答を踏まえ、次のいずれかを選んでください。

- `vNext候補を、次のフレームワーク適応実験の入力候補として承認する`
- `条件付きで承認する`
- `指定箇所を修正して再レビューする`
- `契約構造から見直す`

条件付き承認の場合は、条件を具体的に記載してください。

## 回答欄

1. Exact visual bindings:
   - 承認 / 修正が必要 / 判断保留
   - コメント:

2. SVG rendering contract:
   - 承認 / 修正が必要 / 判断保留
   - コメント:

3. Interaction Foundationsへの分離:
   - 責任分離を承認 / 共通シェル側へ残す / 分類を修正する / 判断保留
   - コメント:

4. Validation:
   - 承認 / 修正が必要 / 判断保留
   - コメント:

5. vNext候補の最終判断:
   - 承認 / 条件付き承認 / 修正後に再レビュー / 構造から見直し
   - 条件またはコメント:

## 補足

- Attempt 3の実験結果はすでに人間承認済みであり、今回の再レビュー対象ではありません。
- Run 1とRun 3は初回適合しました。
- Run 2は3回の実装修正後に適合しました。
- 今回はCanonical化、固定入力化、React等への適用を行いません。
- 今回の判断対象は、Attempt 3の知見から作成した契約候補だけです。

詳細な経緯、実験記録、自己テスト結果、個別Runの記録は、必要な場合のみ以下を参照してください。

- [詳細な人間レビュー資料](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/reference-contract-vnext-candidate/human-review-packet.md)
- [Attempt 3人間承認記録](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/human-approval.md)
- [Attempt 3最終評価](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/final-evaluation.md)
- [Run 2最終レビュー](/C:/Users/mssgm/github/ui-design-manifest/docs/poc/experiments/016-reference-common-shell-adaptation-stability/attempt-3/runs/run-2/reference-alignment-icon-color/review.md)
