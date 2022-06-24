show-me-the-way
===============

See OSM edits happen in real time.

This code is deployed and running here:
https://osmlab.github.io/show-me-the-way/

### Parameters

#### Filter by bounding box - bounds=

- Restrict viewing only edits within a specified bounding-box.
    - https://osmlab.github.io/show-me-the-way/#bounds=32.55,-15.82,71.65,44.65

Build a bounding box URL using this page: https://osmlab.github.io/show-me-the-way/bbox.html

#### Filter by changeset comment, comment=

- Restrict viewing only edits where the changeset comment matches a string.
    - https://osmlab.github.io/show-me-the-way/#comment=missingmaps
    - `comment=missingmaps`, will only show changes where the changeset comment contained missingmaps somewhere

#### Change the playback speed, runTime=

- Specify how many seconds it takes for each change to fully render.
    - https://osmlab.github.io/show-me-the-way/#runTime=5
    - The default runTime is 2.

You can combine the parameters using querystring notation:
https://osmlab.github.io/show-me-the-way/#comment=missingmaps&bounds=32.55,-15.82,71.65,44.65
