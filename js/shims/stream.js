// Minimal stream shim for through (used by osm-stream)
function Stream() {}
Stream.prototype.pipe = function(dest) { return dest; };
export default Stream;

