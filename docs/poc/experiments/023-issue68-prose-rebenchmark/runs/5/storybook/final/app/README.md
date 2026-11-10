# Document-tab workspace

## Run standalone

```sh
cd /bench/app
npx vite --host 0.0.0.0
```

Open `http://localhost:5173/?case=both`. Supported cases: `fit`, `parent`, `child`, `both`, `desktop`, `pcChild`; absent/unknown uses `both`.

## Storybook and tests

```sh
npm run storybook -- --host 0.0.0.0
npm run test-storybook
```
