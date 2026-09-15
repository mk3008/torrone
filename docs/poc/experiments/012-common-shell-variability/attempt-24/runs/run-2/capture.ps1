# Capture command record for the frozen Run 2 artifact.
# Serve this directory locally, then use Chrome through Playwright CLI.
npx --yes --package @playwright/cli playwright-cli -s=common-shell-run2 open 'http://127.0.0.1:4174/index.html?drawer=open&theme=light' --browser chrome
npx --yes --package @playwright/cli playwright-cli -s=common-shell-run2 resize 1440 960
npx --yes --package @playwright/cli playwright-cli -s=common-shell-run2 snapshot
npx --yes --package @playwright/cli playwright-cli -s=common-shell-run2 screenshot --filename captures/desktop-open-light.png
# Interactions are captured after a fresh snapshot: search, item selection, parent disclosure, and workspace scroll.
