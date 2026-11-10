# Independent evaluator feedback
This is one allowed repair round. Use this observed-versus-expected feedback only for your own arm.

- PC · 1px short: PC · 1px short
+ actual - expected

  [
    [
      5,
+     0,
-     2,
      ''
    ],
    [
      2,
      0,
- PC · scroll retains selection: locator.click: Timeout 3500ms exceeded.
- PC · child only 1px short: PC · child only 1px short
+ actual - expected
... Skipped lines

  [
    [
      2,
      0,
      ''
...
      6,
+     0,
-     2,
      ''
    ]
  ]
- Mobile · same 2 tabs, 1px short: Mobile · same 2 tabs, 1px short
+ actual - expected

  [
    [
+     2,
-     1,
      0,
+     ''
-     'ほか1'
    ],
    [
      2,
      0,
      ''
- Mobile · child only 1px short: Mobile · child only 1px short
+ actual - expected

  [
    [
      2,
      0,
      ''
    ],
    [
+     5,
-     1,
      0,
+     ''
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
- Mobile · new document children now fit: Could not complete document chooser selection. After selecting the West Japan document the child row should show all its sections and have no count button.
