Manual Chromium self-check steps:
1. Serve the project root over HTTP and open `?case=fit`, `?case=parent`, `?case=child`, `?case=both`, `?case=desktop`, and `?case=pcChild`.
2. At desktop widths, set each row content width to exactly `count × tab width`; verify no scroll buttons. Reduce it by 1px; verify two `data-scroll` buttons appear only for that overflowing row.
3. Click the right desktop scroll arrow; verify `scrollLeft` increases immediately and `aria-selected` is unchanged. Verify vertical wheel input also scrolls the row.
4. At 599px or below, verify two 124px parent tabs fit in 248px, while 247px produces one selected tab and `ほか1`. Repeat with child tabs using 86px widths.
5. Verify the narrow selected tab and `.more` have a 6px gap, with no desktop scroll arrows.
6. Open both narrow choosers, check their accessible names include the visible `ほかN`, press Escape, and verify focus returns to the trigger.
7. Use Left/Right to move focus without selection, then Enter/Space to activate. Verify Tab and Shift+Tab reach adjacent controls.
8. Close inactive, selected, last, and final documents; verify selection/focus behavior and final focus on `新しい文書`.
9. Select a child from the list; verify content changes, document/count remain stable, the former child enters the list, and focus returns to `.more`.
