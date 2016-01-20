show-me-the-way
===============

See OSM edits happen in real time.

This code is deployed and running here:
https://osmlab.github.io/show-me-the-way/

### Filtering

#### By Bounding Box

You can restrict it to viewing only edits within a specified bounding-box like so:
https://osmlab.github.io/show-me-the-way/#bounds=32.55,-15.82,71.65,44.65

Build a bounding box URL like that, using this page:
https://osmlab.github.io/show-me-the-way/bbox.html

#### By Changeset Comment

You can restrict it to viewing only edits where the changeset comment matches a string:
https://osmlab.github.io/show-me-the-way/#comment=missingmaps

You can combine the filters using querystring notation:
https://osmlab.github.io/show-me-the-way/#comment=missingmaps&bounds=32.55,-15.82,71.65,44.65
