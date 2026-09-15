# Run 3 common shell

Standalone static implementation derived only from the supplied Attempt 14 inputs.

`?drawer=open|hidden` and `?theme=light|dark` choose the initial shell state. Activating a leaf replaces the binding current-destination value and moves exactly one selection treatment, without changing its hierarchy indentation.

The parent disclosure changes only its expanded state. It never changes or clears the binding current destination; collapsing a selected child merely hides it, and expanding restores its selection. The X clear control is absent when the menu query is empty. No external dependencies are used.
