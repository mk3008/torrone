# Fixed-shell composition test with canonical theme-role mapping: Terra medium three-run comparison

This is a `composition-with-fixed-shell` test. It uses the current Manifest,
the fixed Header/Drawer shell fixture, and a prompt limited to screen-specific
product facts. It measures the Manifest's page guidance inside an existing
shell; the shell itself is not presented as a Manifest-only result.

The Manifest snapshot explicitly maps the active theme's Grid header,
Grid-body, and filled-primary-action roles to their elements, then requires
page CSS to consume the canonical shared-theme variables directly. This is the
only consumer-visible input change from attempt 11; the product prompt and
fixed shell fixture are unchanged.

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

## Results

### Run 1

[HTML: Light / Drawer open](runs/run-1/index.html?drawer=open&theme=light) · [HTML: Light / Drawer hidden](runs/run-1/index.html?drawer=hidden&theme=light) · [HTML: Dark / Drawer open](runs/run-1/index.html?drawer=open&theme=dark) · [HTML: Dark / Drawer hidden](runs/run-1/index.html?drawer=hidden&theme=dark)

![Run 1 Light / Drawer open](runs/run-1/customer-search-open-light.png)
![Run 1 Light / Drawer hidden](runs/run-1/customer-search-hidden-light.png)
![Run 1 Dark / Drawer open](runs/run-1/customer-search-open-dark.png)
![Run 1 Dark / Drawer hidden](runs/run-1/customer-search-hidden-dark.png)

### Run 2

[HTML: Light / Drawer open](runs/run-2/index.html?drawer=open&theme=light) · [HTML: Light / Drawer hidden](runs/run-2/index.html?drawer=hidden&theme=light) · [HTML: Dark / Drawer open](runs/run-2/index.html?drawer=open&theme=dark) · [HTML: Dark / Drawer hidden](runs/run-2/index.html?drawer=hidden&theme=dark)

![Run 2 Light / Drawer open](runs/run-2/customer-search-open-light.png)
![Run 2 Light / Drawer hidden](runs/run-2/customer-search-hidden-light.png)
![Run 2 Dark / Drawer open](runs/run-2/customer-search-open-dark.png)
![Run 2 Dark / Drawer hidden](runs/run-2/customer-search-hidden-dark.png)

### Run 3

[HTML: Light / Drawer open](runs/run-3/index.html?drawer=open&theme=light) · [HTML: Light / Drawer hidden](runs/run-3/index.html?drawer=hidden&theme=light) · [HTML: Dark / Drawer open](runs/run-3/index.html?drawer=open&theme=dark) · [HTML: Dark / Drawer hidden](runs/run-3/index.html?drawer=hidden&theme=dark)

![Run 3 Light / Drawer open](runs/run-3/customer-search-open-light.png)
![Run 3 Light / Drawer hidden](runs/run-3/customer-search-hidden-light.png)
![Run 3 Dark / Drawer open](runs/run-3/customer-search-open-dark.png)
![Run 3 Dark / Drawer hidden](runs/run-3/customer-search-hidden-dark.png)
