# Visual Rule Synchronization Variants

This directory contains disposable-library candidates for comparing internal Reference CSS maintenance.

- Candidate A is the fixed, self-contained source set in Variant 04 and Variant 05.
- Candidate B moves only values with demonstrated shared ownership to one static CSS file. Component selectors remain visible in each HTML document.
- Candidate C also moves the common focus selector and declaration block to one static CSS file.

The candidates are directly browser-loadable and require no build or runtime. They are not Consumer assets and must not be imported by Consumer Frontends. Similar or equal local values are deliberately left inline unless they share a demonstrated change reason.
