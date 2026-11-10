Manual self-check checklist:
1. Serve the directory over HTTP and open ?case=fit, ?case=parent, ?case=child, ?case=both, ?case=desktop, and ?case=pcChild.
2. At 600px and wider, verify each row independently shows all tabs when they fit and adds two data-scroll buttons only when overflowing; wheel over an overflowing row scrolls without changing selection.
3. At 599px and narrower, verify an overflowing row shows one selected tab, a 6px gap, and a .more button whose text is exactly ほかN.
4. Verify the parent chooser contains thumbnail cards and that the West Japan 受注管理 card accessible name contains both 受注管理 and 西日本.
5. Verify the child chooser excludes the selected child; choosing another child updates the level-two content heading and returns focus to the count trigger.
6. Verify Left/Right changes focus without changing aria-selected, while Enter/Space activates the focused tab.
7. Verify Escape closes either chooser and restores focus to its trigger.
8. Close inactive, selected, first, and last documents; verify selection preservation and next/previous focus behavior. Close all documents and verify focus returns to 新しい文書.
9. Inspect both tablists for role=tablist, every tab for role=tab and aria-selected, parent scroll-button names, and the level-two content heading.