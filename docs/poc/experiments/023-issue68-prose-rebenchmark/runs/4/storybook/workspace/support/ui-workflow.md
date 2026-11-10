# Storybook UI workflow

Follow this for every change to how the UI looks (components, stories, styles, themes, tokens) and for requests to show components or stories. When the project's agent instructions (such as `AGENTS.md`) describe this workflow without some of its steps, for example without the review, skip those steps, but always look up the components first. Some commands print what to do next; follow that too. Add `--help` to a command only when a call fails.

## Write the component and its stories

Every component you create or change gets stories: one per distinct state it can reach (variants, loading, empty, error, disabled), with realistic props. Never export a story under the name of a global such as `Error`: export `ErrorState` and set `name: 'Error'`. An interactive component also gets a `play` function that drives it and asserts the visible result; for a callback passed as `fn()`, assert whether it was called, as that state expects. The rules below are for the stories you write; do not rewrite existing stories only to match them.

- Import `fn`, `expect`, `mocked` and `sb` from `storybook/test`.
- `play: async ({ canvas, userEvent }) => { ... }`: query `canvas` directly, by role or label. Never wrap it in `within()`. `userEvent.click(element)` takes no options.
- A story never calls a real service. Mock network requests with MSW, never with a module mock or a replaced `fetch`: give the story `beforeEach({ msw }) { msw.use(http.get('/api/users', () => HttpResponse.json([...]))) }`, and leave the code that calls `fetch` as it is. When the project has no `msw-storybook-addon` yet, set it up first: install `msw` and `msw-storybook-addon` as dev dependencies, run `npx msw init ./public --save` (`../public` has to be in `staticDirs` of the main config), and add `loaders: [mswLoader()]` (`import { mswLoader } from 'msw-storybook-addon/csf3'`, without an `initialize()` call) to `.storybook/preview.js`. Read the addon's version in `package.json`: only before version 3 do stories have no `msw` in `beforeEach` and take `parameters: { msw: { handlers: [...] } }` instead. From version 3 on, never write `parameters.msw`.
- Mock a module only for a dependency that is not a network call: register it in `.storybook/preview.js` with `sb.mock(import('../src/api.js'), { spy: true })` (path relative to that file, with its extension), then set the result per story in `beforeEach` with `mocked(getUser).mockResolvedValue(...)`.

## Find the stories

```sh
npx storybook tools stories changed   # stories affected by your uncommitted changes
npx storybook tools stories find-by-component --componentPaths '["/abs/path/Button.tsx"]'   # stories that render these files
```

Run `stories changed` or `find-by-component` before every review, also when you already know the ids of the stories you wrote: they add the stories of other components that your change affects. Story ids come only from these commands. Never build one from a file name, a title or memory. When `stories changed` leaves out a file you touched, pass that file to `find-by-component`; for a shared file (design token, theme, util, hook), which has no stories of its own, pass the components that use it. When `find-by-component` reports stories hidden by `maxDistance`, rerun it with a higher `--maxDistance`. When none of them finds a story for a component, it has no stories yet: say so, or write them.

## Finish with a review

```sh
npx storybook tools review create --input '{
  "title": "Rounder buttons",
  "description": "The **Button** corner radius goes from 4px to 8px.",
  "collections": [
    { "title": "Button variants", "rationale": "The component that changed.", "storyIds": ["button--primary", "button--disabled"] },
    { "title": "Forms that use it", "rationale": "Where the change shows up in context.", "storyIds": ["login-form--default"] }
  ],
  "changedFiles": ["src/Button.tsx"]
}'
```

Publish a review after every change the user can see, and again after each later change. It needs a running Storybook. When you changed files, run `stories changed` or `find-by-component` right before it and take the story ids from there, also when you only wrote stories, not from the output of the tests. Group the stories into two to five collections, from the changed component up to the pages that show it (one is enough when a single component is affected), and include every story you created. List every file you created or changed in `changedFiles`, story files too. When the user only asks to see or browse components or stories and you changed no files, publish the same review with `"changedFiles": []`. Skip the review only when nothing visible changed and the user did not ask to see anything, and say that instead.

Then do both things the command prints, every time: open the review in the in-app browser with a browser tool (unless you have none), and end your answer with the review section it gives you. Do not list separate story links next to it.

## Link to one story

```sh
npx storybook tools stories preview --stories '[{"storyId":"<id>"}]'   # direct links to stories
```

Only for a look at one story while you iterate, or when the user asks for a direct link. It does not replace the review, unless `review create` keeps failing after you fixed what it reported: then share these links and say why.
