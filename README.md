show-me-the-way
===============

See OSM edits happen in real time.

## Development

```
npm install
npm run dev
```

Starts esbuild in watch mode and a local server at http://localhost:3000.

This code is deployed and running here:
https://osmlab.github.io/show-me-the-way/

## Parameters

### Filter by bounding box

- bounds={southwest\_lng, southwest\_lat, northeast\_lng, northeast\_lat} ([Leaflet bboxString notation](https://leafletjs.com/reference.html#latlngbounds-tobboxstring))
- Restrict viewing only edits within a specified bounding-box.
    - https://osmlab.github.io/show-me-the-way/#bounds=32.55,-15.82,71.65,44.65

Build a bounding box URL using this page: https://osmlab.github.io/show-me-the-way/bbox.html

### Filter by changeset comment

- comment={string}
- Restrict viewing only edits where the changeset comment matches a string.
    - https://osmlab.github.io/show-me-the-way/#comment=missingmaps
    - `comment=missingmaps`, will only show changes where the changeset comment contained missingmaps somewhere

### Filter by feature keys

- key={string}
- Restrict viewing only edits where the changeset's features include keys equal to a string.
    - https://osmlab.github.io/show-me-the-way/#key=building
    - `key=building`, will only show changes where the changeset includes features with the key building

### Change the playback speed

- runTime={seconds}
- Specify how many seconds it takes for each change to fully render.
    - https://osmlab.github.io/show-me-the-way/#runTime=5
    - The default runTime is 2.

You can combine the parameters using querystring notation:

- https://osmlab.github.io/show-me-the-way/#comment=missingmaps&bounds=32.55,-15.82,71.65,44.65&runTime=5
