# Test B: fresh Human Calibration replay task

Use only the files listed under **Allowed input** plus this task. Do not inspect
the approved adjusted DatePicker files, Phase 2 result/analysis/reviews,
historical output, other repository paths, or chat history. Do not browse the
web. The CLI/Core executables may be run without reading their source. Write
only below this task's `test-b` directory and do not modify any allowed input.

Replay the human correction process from the supplied AI drafts and the
verbatim feedback below. Do not seek or infer byte/DOM identity with an unseen
answer. Reproduce the operation model and observable responsibilities implied
by the feedback.

## Verbatim human feedback

### Single date — round 1

> もうちょっとテキストボックスと統合してほしい。今のは一般的なデザインとは言えない。少なくともこれぐらいの機能は欲しい。手入力できること。日付でない場合は拒否すること。表示形式は yyyy-mm-dd とすること。入力は yyyymmdd でも許可すること。テキストボックスにフォーカスが当たったとき、日付の入力のためのコントロールが表示されること。choosedate ボタン要るのか要らないのか判断付かない。テキストボックスと統合するならいらないけども、アクセシビリティ的に必要ならカレンダーアイコンのボタンがあってもいいです。また、現状カレンダーが表示されると閉じることができないので、閉じるボタンで閉じる、またはESCキーで閉じるなどの挙動は欲しい。上記はあくまで要望例として、システムデザインや一般的入力方法と乖離があったり、現在のトレンドとずれるようならそこは改変していいです。

### Single date — round 2

> テキストボックスからフォーカスがTAB移動なのでフォーカスが外れたらカレンダー表示はクローズしてほしい。バツとカレンダーアイコンの並びはこれが一般的なのか気になる。それが一般的ならそのままにする。バツにタブフォーカスが移ってよいか気になる。それが一般的ならそのままにする。TAB移動すると変なフォーカス状態の時がある。フォーカスリングが切れている。カレンダーコントロールが気になる。これはサンプルだからかどうかがわからないが、今週しか選べない。サンプルなので、年移動、月移動はできてもいいし、選べない日付（未来日とか）はどう表現するかもサンプルとして見せてほしい。

### Single date — round 3

> バツボタンとカレンダボタンの間に｜線があるといい。日曜日は赤字、土曜日は青字になるといい（週初めを日にするか月にするか、は紛らわしいので、視認性を上げたい）。カレンダーが大きすぎる気がする。縦サイズで画面の1/3～1/2ぐらいの大きさがあり、わかりやすいものの、大きすぎないかな？一般的なサイズを調べてみてほしい。

### Single date — round 4

> 今日の日付というボタンというか、今月のカレンダー表示に戻すというのはあってもいいかな。どれが一般的化はわからないが、カレンダー移動したら元に戻したくなった、っていうケースはあるかなぁと。一般的でないならなしてもいいです。今日の日付っぽいところに下線が引いてあるのは良いです。ただ、今日は 2026-08-14 のはずで、カレンダーは 2026-09-14 のところに下線があり、今日の日付ではないので、下線にどういう意図があるのか見えづらい。

### Single date — round 5 and transition

> テキストボックスの横幅にも注意が欲しい。長さが明確なので、日付以上の横幅は要らないです。

> いいね、これを採用します。これをベースに日付範囲選択も修正してほしい。

### Date range — correction

> おおむね良いが、テキストボックスが2つあること、カレンダーが２回クリック（レンジ選択）であることがかえって混乱する。（１回クリックでなぜ閉じない？と思ってしまう）これはホテルの１泊２日みたいなGUIを参考にするといいのかもしれない。また、開始日だけ未定、終了日だけ未定というような操作が必要かもしれない。レンジの日付背景色表示と、入力不可期間の表示が似すぎており、視認性が悪い。これらを一般的なデザインと比較して見直してほしい。

The fixed review date is 2026-08-14. This is a test fixture, not a production
clock policy.

## Required work

1. Produce an adjusted Single date Reference, then use that locally calibrated
   model to produce an adjusted Date range Reference.
2. Run Reference Conformance and provide scenarios/negative evidence for the
   important focus, completion, partial, validation, availability, and visual
   states implied by the feedback.
3. Keep product-specific Date range choices separate from principles proposed
   for reuse across References.
4. Create an independent Target with different business content, fixtures, DOM
   grouping, classes, local IDs, state/JavaScript organization, and CSS; run
   comparative validation.
5. Do a two-cycle self-review, fix in-scope defects, and write
   `agent-report.md` with commands, evidence, source metrics, explicit identity
   and Consumer annotation counts, generalized/local knowledge proposals, and
   unresolved questions.

Do not modify CLI/Core unless a reproducible, generally applicable observation
defect makes the replay otherwise impossible. Do not add dependencies, data or
network layers, a framework, long-lived knowledge, or a new canonical UI
family.

## Allowed input

- `AGENTS.md`
- `docs/poc/reference-html-observation-boundary.md`
- `docs/poc/experiments/017-reference-html-ssot/cli/README.md`
- `docs/poc/experiments/017-reference-html-ssot/cli/reference-ui.mjs`
- `docs/poc/experiments/017-reference-html-ssot/core/browser-core.js`
- `docs/poc/experiments/017-reference-html-ssot/variants/04-partial-reference/references/common-shell.html`
- `docs/poc/experiments/017-reference-html-ssot/variants/04-partial-reference/references/search-workspace.html`
- `docs/poc/experiments/017-reference-html-ssot/review/date-picker-human-calibration/baseline/single-date.html`
- `docs/poc/experiments/017-reference-html-ssot/review/date-picker-human-calibration/baseline/date-range.html`

