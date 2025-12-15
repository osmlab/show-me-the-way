// Inject Buffer into global scope for legacy packages (qs)
import { Buffer } from 'buffer';
globalThis.Buffer = Buffer;

