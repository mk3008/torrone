# Document-tab workspace

## Run

From `/bench/app`:

```sh
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173/`; optionally add `?case=fit`, `parent`, `child`, `both`, `desktop`, or `pcChild`. Unknown and absent values use `both`. No build is required.
