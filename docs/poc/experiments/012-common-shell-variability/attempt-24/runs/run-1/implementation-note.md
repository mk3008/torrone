# Run 1 implementation note

This independent static artifact implements the frozen common-shell prompt only. It has no external images, fonts, scripts, or CDN references.

URL state: `?drawer=open|hidden` and `?theme=light|dark`. The Header controls permit Drawer visibility and Light/Dark changes after load. Drawer search filters the supplied fixed navigation list; the group disclosure retains the selected item state, and selecting a fixed item updates only the current navigation value.
