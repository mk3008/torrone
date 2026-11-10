# Independent evaluator feedback
This is one allowed repair round. Use this observed-versus-expected feedback only for your own arm.

- PC · scroll retains selection: After activating the right-arrow button, the document tablist had no horizontal scroll offset. It should have moved while keeping the selected tab.
- Mobile · same 2 tabs, 1px short: Mobile · same 2 tabs, 1px short
+ actual - expected

  [
    [
      1,
      0,
+     'ほか1›'
-     'ほか1'
    ],
    [
      2,
      0,
      ''
- Mobile · child only 1px short: Mobile · child only 1px short
+ actual - expected
... Skipped lines

  [
    [
      2,
      0,
      ''
...
      0,
+     'ほか4⌄'
-     'ほか4'
    ]
  ]
- Mobile · parent only: Mobile · parent only
+ actual - expected

  [
    [
+     5,
-     1,
      0,
+     ''
-     'ほか4'
    ],
    [
      2,
      0,
      ''
- Mobile · both: Mobile · both
+ actual - expected

  [
    [
+     5,
-     1,
      0,
+     ''
-     'ほか4'
    ],
    [
+     5,
-     1,
      0,
+     ''
-     'ほか4'
    ]
  ]
- Mobile · selected tab fills remaining width: The expected selected tab plus count button could not be measured. Expected the selected tab to use remaining width with 6px gap.
- Mobile · new document children now fit: Mobile · new document children now fit
+ actual - expected

  [
    [
      1,
      0,
+     'ほか4›'
-     'ほか4'
    ],
    [
+     1,
-     2,
      0,
+     'ほか1⌄'
-     ''
    ]
  ]
