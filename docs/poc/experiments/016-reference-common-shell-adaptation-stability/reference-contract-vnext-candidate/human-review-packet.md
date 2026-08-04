---
type: human review packet
title: 共通シェルReference契約vNext候補の承認判断
status: 人間レビュー待ち
scope: レビュー資料のみ。候補はCanonical化・固定化しない。
---

# 人間レビュー資料: 共通シェルReference契約vNext候補

## 目的

vNext候補を、将来の固定入力化を検討できる契約候補として承認するかを判断します。この資料自体は候補を承認・固定・変更するものではありません。

## 現在地と次の判断

browser-nativeのAttempt 3実験結果は、すでに人間承認済みです。今回の対象は、その実験知見から作成した契約候補だけです。この資料の質問へ回答した後、承認条件を記録するか、候補を修正して再レビューします。この資料からフレームワーク適応を開始しません。

## 今回の承認対象

| 対象 | 状態 | 今回の判断対象か |
| --- | --- | --- |
| Attempt 3の実験結果 | `b240d92`で人間承認済み | いいえ。歴史的根拠のみ |
| 共通シェルReference契約vNext候補 | `8aa5fe2`で提案済み | はい |
| Interaction Foundations候補 | 責任分離の提案 | はい。具体値は対象外 |
| Canonicalなtoken値・Foundation値 | 今回新規に承認しない | いいえ |
| React等の別フレームワークへの適用 | 未実施 | いいえ |

## この資料で可能になること

候補の正本、未確定事項、判断理由を推測せずに、承認・条件付き承認・修正要求・方向性見直しを選べます。

## なぜ重要か

この候補は、Attempt 3で見つかったテーマ色を継承できない`currentColor` SVGの失敗を防ぎつつ、ReferenceのHTML/CSSコピーや未検証の横断interaction仕様を不用意に要求しないための境界です。

## 到達状況

`完了` — 要求されたレビュー入口資料は作成済みです。ただし、承認判断そのものは人間Gateとして残ります。

## 判断項目

| ID | 判断項目 | 候補の現在の方針 | 推奨判定 | 主な根拠 | リスク | 直接確認先 |
| --- | --- | --- | --- | --- | --- | --- |
| A | Exact visual bindingsの範囲 | token stylesheet、7つの固定SVG、binding map上の位置・状態対応、指定されたシェルの視覚処理を、正本ファイル経由でExactとする。 | 条件付き承認 | [層別契約](reference-contract.md#exact-visual-bindings)は、値や資産を文章で再定義せず正本を示す。 | Referenceの標準テーマが、全案件の具体色必達値だと誤解される可能性。 | [質問1](#q1)と[質問2](#q2)を確認。 |
| B | SVG rendering contract | 正しい形状・テーマ色・視認性という結果を要求し、inline SVG、CSS mask、検証済みのフレームワーク固有実装を許容する。 | 条件付き承認 | [SVG契約](svg-rendering-contract.md)は結果中心であり、アクセシブルな名前を描画方法から独立させる。 | 根拠は現在の7つの`currentColor`資産。将来の多色SVG等は別途判断が必要。 | [質問4](#q4)を確認。 |
| C | Exactと実装自由の境界 | DOM、コンポーネント、状態、CSS形式、ファイル、フレームワークは自由として残す。 | 承認 | [層別契約](reference-contract.md#adaptation-freedoms)。 | 後続の実装ガイドがコピーを暗黙要求するおそれはあるが、現候補にはない。 | [質問3](#q3)を確認。 |
| D | Interaction Foundationsへの分離 | hover、focus-visible、selected、active、disabledを横断的関心事として扱い、具体値はCanonical化しない。 | 人間判断が必要 | [Foundations候補](interaction-foundations-candidate.md)は全状態を人間判断として明記する。 | シェルの例を、十分な検証なしに全アプリの規則へ昇格するおそれ。 | [質問5](#q5)と[質問6](#q6)に回答。 |
| E | 自然言語とコード・資産の責任分担 | 文章は正本・意図・境界を示し、色値、SVG path、寸法を重複定義しない。 | 承認 | [自然言語の削減方針](reference-contract.md#natural-language-reduction)と[責任境界](README.md#authority-boundary)。 | 将来固定する場合、正本パスの発見性と安定性を維持する必要。 | 不明なら[binding map](../attempt-3/reference-owned/visual-bindings/binding-map.json)を確認。 |
| F | Validationの妥当性 | 静的検証で資産利用を保護し、実描画・interaction確認はブラウザと人間レビューへ残す。 | 条件付き承認 | [Validation計画](validation-plan.md)と[検証記録](verification-record.md)。 | 静的成功だけではテーマ別の視認性を証明できず、hoverを自動化できない場合がある。 | [質問7](#q7)を確認。 |

## Attempt 3固定契約との意味的比較

| 領域 | Attempt 3固定入力 | vNext候補での意味 | 判断上の意味 |
| --- | --- | --- | --- |
| Exact資産 | browser-native実験用にtoken、資産、binding mapを固定した。 | 値を文章へ複製せず、Exact visual authorityとして責任を明文化する。 | 何を視覚的に同一に保つかが明確になる。 |
| 構造的挙動 | Header、Drawer、workspace、状態、navigationのinvariantを検証した。 | それらの責務を独立した層として維持する。 | HTML/CSSコピーの新規要求はない。 |
| 実装自由 | 各Runは独自のコード構造を選択できた。 | DOM、component、state、CSS、file、frameworkの自由を明記する。 | Exact対象はソースコード同一性ではない。 |
| テーマ付きSVG描画 | Run 2で外部`img`による`currentColor`描画失敗が見つかった。 | 結果契約を新設し、テーマ色を適用できない直接画像利用、filter、代替資産を禁止する。 | 実証済みの失敗を防ぐ新しい境界。 |
| Interaction状態 | Referenceのシェル文脈で確認した。 | hover、focus-visible、selected、active、disabledを将来の横断Foundation候補へ分離する。 | 責任分離のみ提案し、具体値は未確定。 |
| 自然言語 | 実装向けの視覚説明を含んでいた。 | 値、path、寸法の説明を縮め、token・asset・mapの正本を参照する。 | 二重の正本と曖昧な同等表現を減らす。 |
| Validation | provenance、Exact binding、人間による視覚確認を行った。 | canonical `currentColor` SVGの直接画像利用を新たに検出し、ブラウザ・人間Gateを維持する。 | 新しい不適合を検出できるが、視覚結果を過大主張しない。 |

## 必読

1. [候補の入口](README.md) — 提案段階であり、承認済みReferenceや固定入力を置き換えないことを確認します。
2. [層別契約](reference-contract.md) — Exact、構造、実装自由の境界を判断します。
3. [SVG rendering contract](svg-rendering-contract.md) — 技術方式を固定せず、出力結果を固定する内容かを判断します。
4. [Interaction Foundations候補](interaction-foundations-candidate.md) — 具体値を保留した責任分離かを判断します。
5. [検証記録](verification-record.md) — 検証根拠、自己テスト、残る人間Gateを確認します。
6. [Attempt 3人間承認記録](../attempt-3/human-approval.md) — すでに承認済みの範囲と、Run 2の実装修正3回を確認します。

## 必要時のみ確認

- [token stylesheet](../attempt-3/reference-owned/visual-bindings/visual-tokens.css) — テーマ・ブランドへの影響を直接確認するときに読みます。
- [binding map](../attempt-3/reference-owned/visual-bindings/binding-map.json) — 7つのicon ID、状態対応、位置、基本サイズを確認します。
- [固定SVG資産](../attempt-3/reference-owned/visual-bindings/icons/) — 現在の資産範囲が将来の多色資産まで含むと誤解していないか確認します。
- [SVG rendering checker](validation/check-svg-rendering-contract.ps1) — CSS maskを強制せず、直接画像利用だけを拒否しているか確認します。
- [SVG rendering自己テスト](validation/self-test-svg-rendering-contract.ps1) — 意図的な不適合が失敗し、maskのfixtureが成功することを確認します。
- [Attempt 3最終評価](../attempt-3/final-evaluation.md)と[Run 2最終レビュー](../attempt-3/runs/run-2/reference-alignment-icon-color/review.md) — 問題の発見経緯と修正分類を確認します。

## 推奨レビュー順序

1. この資料の「今回の承認対象」を読み、Attempt 3そのものを再承認する作業ではないと確認します。
2. 層別契約を読み、Exactと自由の境界を判断します。
3. SVG契約を読み、実証済みの失敗を防ぎつつ方式を固定していないか判断します。
4. Interaction Foundations候補を読み、未確定事項の保留範囲を決めます。
5. Validation計画と検証記録を読み、静的検証の限界と人間Gateを確認します。
6. 必要な場合だけtoken、binding map、資産、checkerを直接確認します。

## 明示的な回答が必要な質問

| ID | 質問 | 候補上の推奨回答 | 根拠 |
| --- | --- | --- | --- |
| <a id="q1"></a>Q1 | 具体的なテーマtokenを、Referenceを採用する範囲での標準テーマとして固定してよいか。 | はい。 | 候補は値を複製せず、承認済みtokenの正本をExactとして参照する。 |
| <a id="q2"></a>Q2 | それらの具体的tokenを、全案件の必達値には自動的にしないという理解でよいか。 | はい。 | ブランド・アプリ全体の方針は候補で確立しておらず、明示的な採用判断または将来のFoundation判断が必要。 |
| <a id="q3"></a>Q3 | 7つのSVGと意味的な配置をExact対象としてよいか。 | はい。 | canonical binding mapで特定され、DOMやフレームワークは自由として残る。 |
| <a id="q4"></a>Q4 | SVG rendering contractは実装方法ではなく必要な描画結果を固定しているか。 | はい。ただし現行の7つのcanonical `currentColor`資産までを対象とする条件付き。 | inline SVG、CSS mask、検証済みフレームワーク固有実装を許容する。 |
| <a id="q5"></a>Q5 | hover、focus-visible等をInteraction Foundationsの責任へ分離する判断を承認するか。 | 人間判断が必要。 | シェルの実例を、未検証の全アプリ規則にしないため。 |
| <a id="q6"></a>Q6 | Interaction Foundationsの具体値は、別実験まで未確定としてよいか。 | はい。 | 現在のhoverやfocusの測定値を、未検証のまま全アプリ必達値にはしない。 |
| <a id="q7"></a>Q7 | 現行Validationは実装自由を不必要に狭めず、実証済みの誤用を検出できるか。 | はい。ただし実描画の視認性・hoverはブラウザと人間Gateを必須として残す条件付き。 | 自己テストは直接画像利用を拒否するが、pixel完全一致や全状態の自動証明は主張しない。 |
| <a id="q8"></a>Q8 | このvNext候補を、次のフレームワーク適応実験の入力候補として固定してよいか。 | 条件付きで可。 | Q1、Q2、Q5、Q6、Q7を解決し、別途承認された固定化判断を行った後に限る。 |

## 実施したこと

- 既存の候補、承認記録、検証記録を、この1つの判断入口へリンク中心で集約しました。
- token値、SVG path、ソースコードを本文へ複製していません。

## 変更内容

新規のレビュー資料`human-review-packet.md`のみを追加しました。契約候補、Reference、固定入力、検証コード、実験成果物、過去の評価は変更していません。

## 検証方法

- 層別契約、SVG契約、Foundations候補、Validation計画、検証記録を確認しました。
- Reference・product・Attempt 3の既存preflight、候補静的チェック、SVG自己テストの既存結果を根拠として参照しています。この資料は新たな検証結果を主張しません。

## リポジトリ上の根拠

上記のリンク先が根拠です。特に[検証記録](verification-record.md)には、Reference、product、Attempt 3のpreflight成功と、直接外部画像利用を拒否する自己テスト成功が記録されています。

## 補足的な根拠

Attempt 3の承認済み人間レビューとRun 2の最終browser-nativeレビューは、問題と修正の根拠です。ただし、新たなクロスフレームワーク検証の根拠ではありません。

## レビュー判定の整理

- **承認:** C、E。
- **条件付き承認:** A、B、F。
- **人間判断が必要:** D、およびQ1、Q2、Q5、Q6、Q7の条件。
- **修正:** 現在の記録からはなし。ブランド、資産種別、Validationの条件に反対があれば、この判定を選び、対象契約層を指定します。

## 未解決の質問

- Referenceの具体的な標準テーマを、どの案件が採用するか。
- アプリ横断Interaction Foundationsの意味的token値と例外条件をどう定めるか。
- 多色SVGや`currentColor`以外の資産へ、将来どのように描画結果契約を拡張するか。
- フレームワーク別適応を適合と判断するために、どのbrowser証拠を必須とするか。

## 最終推奨

**条件付きで人間承認可能**です。以下を明示的に受け入れる場合に、層別契約の方向性と現行SVG結果契約を承認してください。

1. Referenceテーマtokenは、採用するReferenceインスタンスの標準であり、全案件の具体色必達値ではない。
2. SVG契約は、現行の7つのcanonical `currentColor`資産を対象とし、将来の資産種別は別途レビューする。
3. Interaction Foundationsは責任分離のみ承認し、hover、focus等の具体値は今回Canonical化しない。
4. 静的検証は保護策であり、テーマ別視認性や自動化困難な状態は、ブラウザ・人間レビューGateを残す。

いずれかの条件を受け入れられない場合は、**修正後に再レビュー**を選び、影響する契約層を指定してください。回答を記録する別の承認判断が終わるまで、候補を固定入力化したり、新しい実験入力として使用したりしません。
