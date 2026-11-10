const assert = require('node:assert/strict');
const fs = require('node:fs/promises');
const { chromium } = require('playwright');

(async () => {
  await fs.writeFile('writable.txt', 'write passed\n');
  assert.equal(await fs.readFile('writable.txt', 'utf8'), 'write passed\n');
  for (const path of ['/private-canary.txt', '/bench/../private-canary.txt', '/host_mnt', '/var/run/docker.sock']) {
    await assert.rejects(fs.access(path));
  }
  await assert.rejects(fetch('https://github.com/mk3008/torrone', { signal: AbortSignal.timeout(3000) }));
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setContent('<h1>隔離環境のブラウザーテスト</h1><button>Open</button>');
  await page.getByRole('button', { name: 'Open' }).click();
  await page.screenshot({ path: 'browser.png' });
  console.log(JSON.stringify({
    writable: true,
    outsideCanariesUnavailable: true,
    gitHubFetchUnavailable: true,
    chromium: browser.version(),
    screenshot: 'browser.png',
  }));
  await browser.close();
})().catch(error => { console.error(error); process.exitCode = 1; });
