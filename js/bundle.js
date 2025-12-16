(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __esm = (fn2, res) => function __init() {
    return fn2 && (res = (0, fn2[__getOwnPropNames(fn2)[0]])(fn2 = 0)), res;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // <define:process.env>
  var define_process_env_default;
  var init_define_process_env = __esm({
    "<define:process.env>"() {
      define_process_env_default = {};
    }
  });

  // node_modules/base64-js/index.js
  var require_base64_js = __commonJS({
    "node_modules/base64-js/index.js"(exports2) {
      "use strict";
      init_define_process_env();
      init_buffer_global();
      exports2.byteLength = byteLength;
      exports2.toByteArray = toByteArray;
      exports2.fromByteArray = fromByteArray;
      var lookup2 = [];
      var revLookup = [];
      var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
      for (i = 0, len = code.length; i < len; ++i) {
        lookup2[i] = code[i];
        revLookup[code.charCodeAt(i)] = i;
      }
      var i;
      var len;
      revLookup["-".charCodeAt(0)] = 62;
      revLookup["_".charCodeAt(0)] = 63;
      function getLens(b64) {
        var len2 = b64.length;
        if (len2 % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        var validLen = b64.indexOf("=");
        if (validLen === -1) validLen = len2;
        var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
        return [validLen, placeHoldersLen];
      }
      function byteLength(b64) {
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function _byteLength(b64, validLen, placeHoldersLen) {
        return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
      }
      function toByteArray(b64) {
        var tmp;
        var lens = getLens(b64);
        var validLen = lens[0];
        var placeHoldersLen = lens[1];
        var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
        var curByte = 0;
        var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
        var i2;
        for (i2 = 0; i2 < len2; i2 += 4) {
          tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
          arr[curByte++] = tmp >> 16 & 255;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 2) {
          tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
          arr[curByte++] = tmp & 255;
        }
        if (placeHoldersLen === 1) {
          tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
          arr[curByte++] = tmp >> 8 & 255;
          arr[curByte++] = tmp & 255;
        }
        return arr;
      }
      function tripletToBase64(num) {
        return lookup2[num >> 18 & 63] + lookup2[num >> 12 & 63] + lookup2[num >> 6 & 63] + lookup2[num & 63];
      }
      function encodeChunk(uint8, start, end) {
        var tmp;
        var output = [];
        for (var i2 = start; i2 < end; i2 += 3) {
          tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
          output.push(tripletToBase64(tmp));
        }
        return output.join("");
      }
      function fromByteArray(uint8) {
        var tmp;
        var len2 = uint8.length;
        var extraBytes = len2 % 3;
        var parts = [];
        var maxChunkLength = 16383;
        for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
          parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
        }
        if (extraBytes === 1) {
          tmp = uint8[len2 - 1];
          parts.push(
            lookup2[tmp >> 2] + lookup2[tmp << 4 & 63] + "=="
          );
        } else if (extraBytes === 2) {
          tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
          parts.push(
            lookup2[tmp >> 10] + lookup2[tmp >> 4 & 63] + lookup2[tmp << 2 & 63] + "="
          );
        }
        return parts.join("");
      }
    }
  });

  // node_modules/ieee754/index.js
  var require_ieee754 = __commonJS({
    "node_modules/ieee754/index.js"(exports2) {
      init_define_process_env();
      init_buffer_global();
      exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
        var e, m;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var nBits = -7;
        var i = isLE ? nBytes - 1 : 0;
        var d = isLE ? -1 : 1;
        var s = buffer[offset + i];
        i += d;
        e = s & (1 << -nBits) - 1;
        s >>= -nBits;
        nBits += eLen;
        for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        m = e & (1 << -nBits) - 1;
        e >>= -nBits;
        nBits += mLen;
        for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
        }
        if (e === 0) {
          e = 1 - eBias;
        } else if (e === eMax) {
          return m ? NaN : (s ? -1 : 1) * Infinity;
        } else {
          m = m + Math.pow(2, mLen);
          e = e - eBias;
        }
        return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
      };
      exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
        var e, m, c;
        var eLen = nBytes * 8 - mLen - 1;
        var eMax = (1 << eLen) - 1;
        var eBias = eMax >> 1;
        var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var i = isLE ? 0 : nBytes - 1;
        var d = isLE ? 1 : -1;
        var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
        value = Math.abs(value);
        if (isNaN(value) || value === Infinity) {
          m = isNaN(value) ? 1 : 0;
          e = eMax;
        } else {
          e = Math.floor(Math.log(value) / Math.LN2);
          if (value * (c = Math.pow(2, -e)) < 1) {
            e--;
            c *= 2;
          }
          if (e + eBias >= 1) {
            value += rt / c;
          } else {
            value += rt * Math.pow(2, 1 - eBias);
          }
          if (value * c >= 2) {
            e++;
            c /= 2;
          }
          if (e + eBias >= eMax) {
            m = 0;
            e = eMax;
          } else if (e + eBias >= 1) {
            m = (value * c - 1) * Math.pow(2, mLen);
            e = e + eBias;
          } else {
            m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
            e = 0;
          }
        }
        for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
        }
        e = e << mLen | m;
        eLen += mLen;
        for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
        }
        buffer[offset + i - d] |= s * 128;
      };
    }
  });

  // node_modules/buffer/index.js
  var require_buffer = __commonJS({
    "node_modules/buffer/index.js"(exports2) {
      "use strict";
      init_define_process_env();
      init_buffer_global();
      var base64 = require_base64_js();
      var ieee754 = require_ieee754();
      var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
      exports2.Buffer = Buffer3;
      exports2.SlowBuffer = SlowBuffer;
      exports2.INSPECT_MAX_BYTES = 50;
      var K_MAX_LENGTH = 2147483647;
      exports2.kMaxLength = K_MAX_LENGTH;
      Buffer3.TYPED_ARRAY_SUPPORT = typedArraySupport();
      if (!Buffer3.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
        console.error(
          "This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."
        );
      }
      function typedArraySupport() {
        try {
          const arr = new Uint8Array(1);
          const proto = { foo: function() {
            return 42;
          } };
          Object.setPrototypeOf(proto, Uint8Array.prototype);
          Object.setPrototypeOf(arr, proto);
          return arr.foo() === 42;
        } catch (e) {
          return false;
        }
      }
      Object.defineProperty(Buffer3.prototype, "parent", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.buffer;
        }
      });
      Object.defineProperty(Buffer3.prototype, "offset", {
        enumerable: true,
        get: function() {
          if (!Buffer3.isBuffer(this)) return void 0;
          return this.byteOffset;
        }
      });
      function createBuffer(length) {
        if (length > K_MAX_LENGTH) {
          throw new RangeError('The value "' + length + '" is invalid for option "size"');
        }
        const buf = new Uint8Array(length);
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function Buffer3(arg, encodingOrOffset, length) {
        if (typeof arg === "number") {
          if (typeof encodingOrOffset === "string") {
            throw new TypeError(
              'The "string" argument must be of type string. Received type number'
            );
          }
          return allocUnsafe(arg);
        }
        return from(arg, encodingOrOffset, length);
      }
      Buffer3.poolSize = 8192;
      function from(value, encodingOrOffset, length) {
        if (typeof value === "string") {
          return fromString(value, encodingOrOffset);
        }
        if (ArrayBuffer.isView(value)) {
          return fromArrayView(value);
        }
        if (value == null) {
          throw new TypeError(
            "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
          );
        }
        if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
          return fromArrayBuffer(value, encodingOrOffset, length);
        }
        if (typeof value === "number") {
          throw new TypeError(
            'The "value" argument must not be of type number. Received type number'
          );
        }
        const valueOf = value.valueOf && value.valueOf();
        if (valueOf != null && valueOf !== value) {
          return Buffer3.from(valueOf, encodingOrOffset, length);
        }
        const b = fromObject(value);
        if (b) return b;
        if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
          return Buffer3.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length);
        }
        throw new TypeError(
          "The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value
        );
      }
      Buffer3.from = function(value, encodingOrOffset, length) {
        return from(value, encodingOrOffset, length);
      };
      Object.setPrototypeOf(Buffer3.prototype, Uint8Array.prototype);
      Object.setPrototypeOf(Buffer3, Uint8Array);
      function assertSize(size) {
        if (typeof size !== "number") {
          throw new TypeError('"size" argument must be of type number');
        } else if (size < 0) {
          throw new RangeError('The value "' + size + '" is invalid for option "size"');
        }
      }
      function alloc(size, fill, encoding) {
        assertSize(size);
        if (size <= 0) {
          return createBuffer(size);
        }
        if (fill !== void 0) {
          return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
        }
        return createBuffer(size);
      }
      Buffer3.alloc = function(size, fill, encoding) {
        return alloc(size, fill, encoding);
      };
      function allocUnsafe(size) {
        assertSize(size);
        return createBuffer(size < 0 ? 0 : checked(size) | 0);
      }
      Buffer3.allocUnsafe = function(size) {
        return allocUnsafe(size);
      };
      Buffer3.allocUnsafeSlow = function(size) {
        return allocUnsafe(size);
      };
      function fromString(string, encoding) {
        if (typeof encoding !== "string" || encoding === "") {
          encoding = "utf8";
        }
        if (!Buffer3.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        const length = byteLength(string, encoding) | 0;
        let buf = createBuffer(length);
        const actual = buf.write(string, encoding);
        if (actual !== length) {
          buf = buf.slice(0, actual);
        }
        return buf;
      }
      function fromArrayLike(array) {
        const length = array.length < 0 ? 0 : checked(array.length) | 0;
        const buf = createBuffer(length);
        for (let i = 0; i < length; i += 1) {
          buf[i] = array[i] & 255;
        }
        return buf;
      }
      function fromArrayView(arrayView) {
        if (isInstance(arrayView, Uint8Array)) {
          const copy = new Uint8Array(arrayView);
          return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
        }
        return fromArrayLike(arrayView);
      }
      function fromArrayBuffer(array, byteOffset, length) {
        if (byteOffset < 0 || array.byteLength < byteOffset) {
          throw new RangeError('"offset" is outside of buffer bounds');
        }
        if (array.byteLength < byteOffset + (length || 0)) {
          throw new RangeError('"length" is outside of buffer bounds');
        }
        let buf;
        if (byteOffset === void 0 && length === void 0) {
          buf = new Uint8Array(array);
        } else if (length === void 0) {
          buf = new Uint8Array(array, byteOffset);
        } else {
          buf = new Uint8Array(array, byteOffset, length);
        }
        Object.setPrototypeOf(buf, Buffer3.prototype);
        return buf;
      }
      function fromObject(obj) {
        if (Buffer3.isBuffer(obj)) {
          const len = checked(obj.length) | 0;
          const buf = createBuffer(len);
          if (buf.length === 0) {
            return buf;
          }
          obj.copy(buf, 0, 0, len);
          return buf;
        }
        if (obj.length !== void 0) {
          if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
            return createBuffer(0);
          }
          return fromArrayLike(obj);
        }
        if (obj.type === "Buffer" && Array.isArray(obj.data)) {
          return fromArrayLike(obj.data);
        }
      }
      function checked(length) {
        if (length >= K_MAX_LENGTH) {
          throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
        }
        return length | 0;
      }
      function SlowBuffer(length) {
        if (+length != length) {
          length = 0;
        }
        return Buffer3.alloc(+length);
      }
      Buffer3.isBuffer = function isBuffer(b) {
        return b != null && b._isBuffer === true && b !== Buffer3.prototype;
      };
      Buffer3.compare = function compare(a, b) {
        if (isInstance(a, Uint8Array)) a = Buffer3.from(a, a.offset, a.byteLength);
        if (isInstance(b, Uint8Array)) b = Buffer3.from(b, b.offset, b.byteLength);
        if (!Buffer3.isBuffer(a) || !Buffer3.isBuffer(b)) {
          throw new TypeError(
            'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
          );
        }
        if (a === b) return 0;
        let x = a.length;
        let y = b.length;
        for (let i = 0, len = Math.min(x, y); i < len; ++i) {
          if (a[i] !== b[i]) {
            x = a[i];
            y = b[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      Buffer3.isEncoding = function isEncoding(encoding) {
        switch (String(encoding).toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "latin1":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return true;
          default:
            return false;
        }
      };
      Buffer3.concat = function concat(list, length) {
        if (!Array.isArray(list)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        if (list.length === 0) {
          return Buffer3.alloc(0);
        }
        let i;
        if (length === void 0) {
          length = 0;
          for (i = 0; i < list.length; ++i) {
            length += list[i].length;
          }
        }
        const buffer = Buffer3.allocUnsafe(length);
        let pos = 0;
        for (i = 0; i < list.length; ++i) {
          let buf = list[i];
          if (isInstance(buf, Uint8Array)) {
            if (pos + buf.length > buffer.length) {
              if (!Buffer3.isBuffer(buf)) buf = Buffer3.from(buf);
              buf.copy(buffer, pos);
            } else {
              Uint8Array.prototype.set.call(
                buffer,
                buf,
                pos
              );
            }
          } else if (!Buffer3.isBuffer(buf)) {
            throw new TypeError('"list" argument must be an Array of Buffers');
          } else {
            buf.copy(buffer, pos);
          }
          pos += buf.length;
        }
        return buffer;
      };
      function byteLength(string, encoding) {
        if (Buffer3.isBuffer(string)) {
          return string.length;
        }
        if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
          return string.byteLength;
        }
        if (typeof string !== "string") {
          throw new TypeError(
            'The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string
          );
        }
        const len = string.length;
        const mustMatch = arguments.length > 2 && arguments[2] === true;
        if (!mustMatch && len === 0) return 0;
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "ascii":
            case "latin1":
            case "binary":
              return len;
            case "utf8":
            case "utf-8":
              return utf8ToBytes(string).length;
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return len * 2;
            case "hex":
              return len >>> 1;
            case "base64":
              return base64ToBytes(string).length;
            default:
              if (loweredCase) {
                return mustMatch ? -1 : utf8ToBytes(string).length;
              }
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.byteLength = byteLength;
      function slowToString(encoding, start, end) {
        let loweredCase = false;
        if (start === void 0 || start < 0) {
          start = 0;
        }
        if (start > this.length) {
          return "";
        }
        if (end === void 0 || end > this.length) {
          end = this.length;
        }
        if (end <= 0) {
          return "";
        }
        end >>>= 0;
        start >>>= 0;
        if (end <= start) {
          return "";
        }
        if (!encoding) encoding = "utf8";
        while (true) {
          switch (encoding) {
            case "hex":
              return hexSlice(this, start, end);
            case "utf8":
            case "utf-8":
              return utf8Slice(this, start, end);
            case "ascii":
              return asciiSlice(this, start, end);
            case "latin1":
            case "binary":
              return latin1Slice(this, start, end);
            case "base64":
              return base64Slice(this, start, end);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return utf16leSlice(this, start, end);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = (encoding + "").toLowerCase();
              loweredCase = true;
          }
        }
      }
      Buffer3.prototype._isBuffer = true;
      function swap(b, n, m) {
        const i = b[n];
        b[n] = b[m];
        b[m] = i;
      }
      Buffer3.prototype.swap16 = function swap16() {
        const len = this.length;
        if (len % 2 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 16-bits");
        }
        for (let i = 0; i < len; i += 2) {
          swap(this, i, i + 1);
        }
        return this;
      };
      Buffer3.prototype.swap32 = function swap32() {
        const len = this.length;
        if (len % 4 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 32-bits");
        }
        for (let i = 0; i < len; i += 4) {
          swap(this, i, i + 3);
          swap(this, i + 1, i + 2);
        }
        return this;
      };
      Buffer3.prototype.swap64 = function swap64() {
        const len = this.length;
        if (len % 8 !== 0) {
          throw new RangeError("Buffer size must be a multiple of 64-bits");
        }
        for (let i = 0; i < len; i += 8) {
          swap(this, i, i + 7);
          swap(this, i + 1, i + 6);
          swap(this, i + 2, i + 5);
          swap(this, i + 3, i + 4);
        }
        return this;
      };
      Buffer3.prototype.toString = function toString() {
        const length = this.length;
        if (length === 0) return "";
        if (arguments.length === 0) return utf8Slice(this, 0, length);
        return slowToString.apply(this, arguments);
      };
      Buffer3.prototype.toLocaleString = Buffer3.prototype.toString;
      Buffer3.prototype.equals = function equals(b) {
        if (!Buffer3.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
        if (this === b) return true;
        return Buffer3.compare(this, b) === 0;
      };
      Buffer3.prototype.inspect = function inspect2() {
        let str = "";
        const max = exports2.INSPECT_MAX_BYTES;
        str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
        if (this.length > max) str += " ... ";
        return "<Buffer " + str + ">";
      };
      if (customInspectSymbol) {
        Buffer3.prototype[customInspectSymbol] = Buffer3.prototype.inspect;
      }
      Buffer3.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
        if (isInstance(target, Uint8Array)) {
          target = Buffer3.from(target, target.offset, target.byteLength);
        }
        if (!Buffer3.isBuffer(target)) {
          throw new TypeError(
            'The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target
          );
        }
        if (start === void 0) {
          start = 0;
        }
        if (end === void 0) {
          end = target ? target.length : 0;
        }
        if (thisStart === void 0) {
          thisStart = 0;
        }
        if (thisEnd === void 0) {
          thisEnd = this.length;
        }
        if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
          throw new RangeError("out of range index");
        }
        if (thisStart >= thisEnd && start >= end) {
          return 0;
        }
        if (thisStart >= thisEnd) {
          return -1;
        }
        if (start >= end) {
          return 1;
        }
        start >>>= 0;
        end >>>= 0;
        thisStart >>>= 0;
        thisEnd >>>= 0;
        if (this === target) return 0;
        let x = thisEnd - thisStart;
        let y = end - start;
        const len = Math.min(x, y);
        const thisCopy = this.slice(thisStart, thisEnd);
        const targetCopy = target.slice(start, end);
        for (let i = 0; i < len; ++i) {
          if (thisCopy[i] !== targetCopy[i]) {
            x = thisCopy[i];
            y = targetCopy[i];
            break;
          }
        }
        if (x < y) return -1;
        if (y < x) return 1;
        return 0;
      };
      function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
        if (buffer.length === 0) return -1;
        if (typeof byteOffset === "string") {
          encoding = byteOffset;
          byteOffset = 0;
        } else if (byteOffset > 2147483647) {
          byteOffset = 2147483647;
        } else if (byteOffset < -2147483648) {
          byteOffset = -2147483648;
        }
        byteOffset = +byteOffset;
        if (numberIsNaN(byteOffset)) {
          byteOffset = dir ? 0 : buffer.length - 1;
        }
        if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
        if (byteOffset >= buffer.length) {
          if (dir) return -1;
          else byteOffset = buffer.length - 1;
        } else if (byteOffset < 0) {
          if (dir) byteOffset = 0;
          else return -1;
        }
        if (typeof val === "string") {
          val = Buffer3.from(val, encoding);
        }
        if (Buffer3.isBuffer(val)) {
          if (val.length === 0) {
            return -1;
          }
          return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
        } else if (typeof val === "number") {
          val = val & 255;
          if (typeof Uint8Array.prototype.indexOf === "function") {
            if (dir) {
              return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
            } else {
              return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
            }
          }
          return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
        }
        throw new TypeError("val must be string, number or Buffer");
      }
      function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
        let indexSize = 1;
        let arrLength = arr.length;
        let valLength = val.length;
        if (encoding !== void 0) {
          encoding = String(encoding).toLowerCase();
          if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
            if (arr.length < 2 || val.length < 2) {
              return -1;
            }
            indexSize = 2;
            arrLength /= 2;
            valLength /= 2;
            byteOffset /= 2;
          }
        }
        function read(buf, i2) {
          if (indexSize === 1) {
            return buf[i2];
          } else {
            return buf.readUInt16BE(i2 * indexSize);
          }
        }
        let i;
        if (dir) {
          let foundIndex = -1;
          for (i = byteOffset; i < arrLength; i++) {
            if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
              if (foundIndex === -1) foundIndex = i;
              if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
            } else {
              if (foundIndex !== -1) i -= i - foundIndex;
              foundIndex = -1;
            }
          }
        } else {
          if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
          for (i = byteOffset; i >= 0; i--) {
            let found = true;
            for (let j = 0; j < valLength; j++) {
              if (read(arr, i + j) !== read(val, j)) {
                found = false;
                break;
              }
            }
            if (found) return i;
          }
        }
        return -1;
      }
      Buffer3.prototype.includes = function includes(val, byteOffset, encoding) {
        return this.indexOf(val, byteOffset, encoding) !== -1;
      };
      Buffer3.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
      };
      Buffer3.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
        return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
      };
      function hexWrite(buf, string, offset, length) {
        offset = Number(offset) || 0;
        const remaining = buf.length - offset;
        if (!length) {
          length = remaining;
        } else {
          length = Number(length);
          if (length > remaining) {
            length = remaining;
          }
        }
        const strLen = string.length;
        if (length > strLen / 2) {
          length = strLen / 2;
        }
        let i;
        for (i = 0; i < length; ++i) {
          const parsed = parseInt(string.substr(i * 2, 2), 16);
          if (numberIsNaN(parsed)) return i;
          buf[offset + i] = parsed;
        }
        return i;
      }
      function utf8Write(buf, string, offset, length) {
        return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
      }
      function asciiWrite(buf, string, offset, length) {
        return blitBuffer(asciiToBytes(string), buf, offset, length);
      }
      function base64Write(buf, string, offset, length) {
        return blitBuffer(base64ToBytes(string), buf, offset, length);
      }
      function ucs2Write(buf, string, offset, length) {
        return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
      }
      Buffer3.prototype.write = function write(string, offset, length, encoding) {
        if (offset === void 0) {
          encoding = "utf8";
          length = this.length;
          offset = 0;
        } else if (length === void 0 && typeof offset === "string") {
          encoding = offset;
          length = this.length;
          offset = 0;
        } else if (isFinite(offset)) {
          offset = offset >>> 0;
          if (isFinite(length)) {
            length = length >>> 0;
            if (encoding === void 0) encoding = "utf8";
          } else {
            encoding = length;
            length = void 0;
          }
        } else {
          throw new Error(
            "Buffer.write(string, encoding, offset[, length]) is no longer supported"
          );
        }
        const remaining = this.length - offset;
        if (length === void 0 || length > remaining) length = remaining;
        if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
          throw new RangeError("Attempt to write outside buffer bounds");
        }
        if (!encoding) encoding = "utf8";
        let loweredCase = false;
        for (; ; ) {
          switch (encoding) {
            case "hex":
              return hexWrite(this, string, offset, length);
            case "utf8":
            case "utf-8":
              return utf8Write(this, string, offset, length);
            case "ascii":
            case "latin1":
            case "binary":
              return asciiWrite(this, string, offset, length);
            case "base64":
              return base64Write(this, string, offset, length);
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return ucs2Write(this, string, offset, length);
            default:
              if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
              encoding = ("" + encoding).toLowerCase();
              loweredCase = true;
          }
        }
      };
      Buffer3.prototype.toJSON = function toJSON() {
        return {
          type: "Buffer",
          data: Array.prototype.slice.call(this._arr || this, 0)
        };
      };
      function base64Slice(buf, start, end) {
        if (start === 0 && end === buf.length) {
          return base64.fromByteArray(buf);
        } else {
          return base64.fromByteArray(buf.slice(start, end));
        }
      }
      function utf8Slice(buf, start, end) {
        end = Math.min(buf.length, end);
        const res = [];
        let i = start;
        while (i < end) {
          const firstByte = buf[i];
          let codePoint = null;
          let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
          if (i + bytesPerSequence <= end) {
            let secondByte, thirdByte, fourthByte, tempCodePoint;
            switch (bytesPerSequence) {
              case 1:
                if (firstByte < 128) {
                  codePoint = firstByte;
                }
                break;
              case 2:
                secondByte = buf[i + 1];
                if ((secondByte & 192) === 128) {
                  tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                  if (tempCodePoint > 127) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 3:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                  if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                    codePoint = tempCodePoint;
                  }
                }
                break;
              case 4:
                secondByte = buf[i + 1];
                thirdByte = buf[i + 2];
                fourthByte = buf[i + 3];
                if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                  tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                  if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                    codePoint = tempCodePoint;
                  }
                }
            }
          }
          if (codePoint === null) {
            codePoint = 65533;
            bytesPerSequence = 1;
          } else if (codePoint > 65535) {
            codePoint -= 65536;
            res.push(codePoint >>> 10 & 1023 | 55296);
            codePoint = 56320 | codePoint & 1023;
          }
          res.push(codePoint);
          i += bytesPerSequence;
        }
        return decodeCodePointsArray(res);
      }
      var MAX_ARGUMENTS_LENGTH = 4096;
      function decodeCodePointsArray(codePoints) {
        const len = codePoints.length;
        if (len <= MAX_ARGUMENTS_LENGTH) {
          return String.fromCharCode.apply(String, codePoints);
        }
        let res = "";
        let i = 0;
        while (i < len) {
          res += String.fromCharCode.apply(
            String,
            codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
          );
        }
        return res;
      }
      function asciiSlice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i] & 127);
        }
        return ret;
      }
      function latin1Slice(buf, start, end) {
        let ret = "";
        end = Math.min(buf.length, end);
        for (let i = start; i < end; ++i) {
          ret += String.fromCharCode(buf[i]);
        }
        return ret;
      }
      function hexSlice(buf, start, end) {
        const len = buf.length;
        if (!start || start < 0) start = 0;
        if (!end || end < 0 || end > len) end = len;
        let out = "";
        for (let i = start; i < end; ++i) {
          out += hexSliceLookupTable[buf[i]];
        }
        return out;
      }
      function utf16leSlice(buf, start, end) {
        const bytes = buf.slice(start, end);
        let res = "";
        for (let i = 0; i < bytes.length - 1; i += 2) {
          res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
        }
        return res;
      }
      Buffer3.prototype.slice = function slice(start, end) {
        const len = this.length;
        start = ~~start;
        end = end === void 0 ? len : ~~end;
        if (start < 0) {
          start += len;
          if (start < 0) start = 0;
        } else if (start > len) {
          start = len;
        }
        if (end < 0) {
          end += len;
          if (end < 0) end = 0;
        } else if (end > len) {
          end = len;
        }
        if (end < start) end = start;
        const newBuf = this.subarray(start, end);
        Object.setPrototypeOf(newBuf, Buffer3.prototype);
        return newBuf;
      };
      function checkOffset(offset, ext, length) {
        if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
        if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
      }
      Buffer3.prototype.readUintLE = Buffer3.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUintBE = Buffer3.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          checkOffset(offset, byteLength2, this.length);
        }
        let val = this[offset + --byteLength2];
        let mul = 1;
        while (byteLength2 > 0 && (mul *= 256)) {
          val += this[offset + --byteLength2] * mul;
        }
        return val;
      };
      Buffer3.prototype.readUint8 = Buffer3.prototype.readUInt8 = function readUInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        return this[offset];
      };
      Buffer3.prototype.readUint16LE = Buffer3.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] | this[offset + 1] << 8;
      };
      Buffer3.prototype.readUint16BE = Buffer3.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        return this[offset] << 8 | this[offset + 1];
      };
      Buffer3.prototype.readUint32LE = Buffer3.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
      };
      Buffer3.prototype.readUint32BE = Buffer3.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
      };
      Buffer3.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
        const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
        return BigInt(lo) + (BigInt(hi) << BigInt(32));
      });
      Buffer3.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
        return (BigInt(hi) << BigInt(32)) + BigInt(lo);
      });
      Buffer3.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let val = this[offset];
        let mul = 1;
        let i = 0;
        while (++i < byteLength2 && (mul *= 256)) {
          val += this[offset + i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) checkOffset(offset, byteLength2, this.length);
        let i = byteLength2;
        let mul = 1;
        let val = this[offset + --i];
        while (i > 0 && (mul *= 256)) {
          val += this[offset + --i] * mul;
        }
        mul *= 128;
        if (val >= mul) val -= Math.pow(2, 8 * byteLength2);
        return val;
      };
      Buffer3.prototype.readInt8 = function readInt8(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 1, this.length);
        if (!(this[offset] & 128)) return this[offset];
        return (255 - this[offset] + 1) * -1;
      };
      Buffer3.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset] | this[offset + 1] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 2, this.length);
        const val = this[offset + 1] | this[offset] << 8;
        return val & 32768 ? val | 4294901760 : val;
      };
      Buffer3.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
      };
      Buffer3.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
      };
      Buffer3.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
        return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
      });
      Buffer3.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
        offset = offset >>> 0;
        validateNumber(offset, "offset");
        const first = this[offset];
        const last = this[offset + 7];
        if (first === void 0 || last === void 0) {
          boundsError(offset, this.length - 8);
        }
        const val = (first << 24) + // Overflow
        this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
        return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
      });
      Buffer3.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, true, 23, 4);
      };
      Buffer3.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 4, this.length);
        return ieee754.read(this, offset, false, 23, 4);
      };
      Buffer3.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, true, 52, 8);
      };
      Buffer3.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
        offset = offset >>> 0;
        if (!noAssert) checkOffset(offset, 8, this.length);
        return ieee754.read(this, offset, false, 52, 8);
      };
      function checkInt(buf, value, offset, ext, max, min) {
        if (!Buffer3.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance');
        if (value > max || value < min) throw new RangeError('"value" argument is out of bounds');
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
      }
      Buffer3.prototype.writeUintLE = Buffer3.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let mul = 1;
        let i = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUintBE = Buffer3.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        byteLength2 = byteLength2 >>> 0;
        if (!noAssert) {
          const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
          checkInt(this, value, offset, byteLength2, maxBytes, 0);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          this[offset + i] = value / mul & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeUint8 = Buffer3.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeUint16LE = Buffer3.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeUint16BE = Buffer3.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeUint32LE = Buffer3.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeUint32BE = Buffer3.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      function wrtBigUInt64LE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        lo = lo >> 8;
        buf[offset++] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        hi = hi >> 8;
        buf[offset++] = hi;
        return offset;
      }
      function wrtBigUInt64BE(buf, value, offset, min, max) {
        checkIntBI(value, min, max, buf, offset, 7);
        let lo = Number(value & BigInt(4294967295));
        buf[offset + 7] = lo;
        lo = lo >> 8;
        buf[offset + 6] = lo;
        lo = lo >> 8;
        buf[offset + 5] = lo;
        lo = lo >> 8;
        buf[offset + 4] = lo;
        let hi = Number(value >> BigInt(32) & BigInt(4294967295));
        buf[offset + 3] = hi;
        hi = hi >> 8;
        buf[offset + 2] = hi;
        hi = hi >> 8;
        buf[offset + 1] = hi;
        hi = hi >> 8;
        buf[offset] = hi;
        return offset + 8;
      }
      Buffer3.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
      });
      Buffer3.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = 0;
        let mul = 1;
        let sub = 0;
        this[offset] = value & 255;
        while (++i < byteLength2 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          const limit = Math.pow(2, 8 * byteLength2 - 1);
          checkInt(this, value, offset, byteLength2, limit - 1, -limit);
        }
        let i = byteLength2 - 1;
        let mul = 1;
        let sub = 0;
        this[offset + i] = value & 255;
        while (--i >= 0 && (mul *= 256)) {
          if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
            sub = 1;
          }
          this[offset + i] = (value / mul >> 0) - sub & 255;
        }
        return offset + byteLength2;
      };
      Buffer3.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
        if (value < 0) value = 255 + value + 1;
        this[offset] = value & 255;
        return offset + 1;
      };
      Buffer3.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        return offset + 2;
      };
      Buffer3.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
        return offset + 2;
      };
      Buffer3.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
        return offset + 4;
      };
      Buffer3.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
        if (value < 0) value = 4294967295 + value + 1;
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
        return offset + 4;
      };
      Buffer3.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
        return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      Buffer3.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
        return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
      });
      function checkIEEE754(buf, value, offset, ext, max, min) {
        if (offset + ext > buf.length) throw new RangeError("Index out of range");
        if (offset < 0) throw new RangeError("Index out of range");
      }
      function writeFloat(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
        }
        ieee754.write(buf, value, offset, littleEndian, 23, 4);
        return offset + 4;
      }
      Buffer3.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
        return writeFloat(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
        return writeFloat(this, value, offset, false, noAssert);
      };
      function writeDouble(buf, value, offset, littleEndian, noAssert) {
        value = +value;
        offset = offset >>> 0;
        if (!noAssert) {
          checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
        }
        ieee754.write(buf, value, offset, littleEndian, 52, 8);
        return offset + 8;
      }
      Buffer3.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
        return writeDouble(this, value, offset, true, noAssert);
      };
      Buffer3.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
        return writeDouble(this, value, offset, false, noAssert);
      };
      Buffer3.prototype.copy = function copy(target, targetStart, start, end) {
        if (!Buffer3.isBuffer(target)) throw new TypeError("argument should be a Buffer");
        if (!start) start = 0;
        if (!end && end !== 0) end = this.length;
        if (targetStart >= target.length) targetStart = target.length;
        if (!targetStart) targetStart = 0;
        if (end > 0 && end < start) end = start;
        if (end === start) return 0;
        if (target.length === 0 || this.length === 0) return 0;
        if (targetStart < 0) {
          throw new RangeError("targetStart out of bounds");
        }
        if (start < 0 || start >= this.length) throw new RangeError("Index out of range");
        if (end < 0) throw new RangeError("sourceEnd out of bounds");
        if (end > this.length) end = this.length;
        if (target.length - targetStart < end - start) {
          end = target.length - targetStart + start;
        }
        const len = end - start;
        if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
          this.copyWithin(targetStart, start, end);
        } else {
          Uint8Array.prototype.set.call(
            target,
            this.subarray(start, end),
            targetStart
          );
        }
        return len;
      };
      Buffer3.prototype.fill = function fill(val, start, end, encoding) {
        if (typeof val === "string") {
          if (typeof start === "string") {
            encoding = start;
            start = 0;
            end = this.length;
          } else if (typeof end === "string") {
            encoding = end;
            end = this.length;
          }
          if (encoding !== void 0 && typeof encoding !== "string") {
            throw new TypeError("encoding must be a string");
          }
          if (typeof encoding === "string" && !Buffer3.isEncoding(encoding)) {
            throw new TypeError("Unknown encoding: " + encoding);
          }
          if (val.length === 1) {
            const code = val.charCodeAt(0);
            if (encoding === "utf8" && code < 128 || encoding === "latin1") {
              val = code;
            }
          }
        } else if (typeof val === "number") {
          val = val & 255;
        } else if (typeof val === "boolean") {
          val = Number(val);
        }
        if (start < 0 || this.length < start || this.length < end) {
          throw new RangeError("Out of range index");
        }
        if (end <= start) {
          return this;
        }
        start = start >>> 0;
        end = end === void 0 ? this.length : end >>> 0;
        if (!val) val = 0;
        let i;
        if (typeof val === "number") {
          for (i = start; i < end; ++i) {
            this[i] = val;
          }
        } else {
          const bytes = Buffer3.isBuffer(val) ? val : Buffer3.from(val, encoding);
          const len = bytes.length;
          if (len === 0) {
            throw new TypeError('The value "' + val + '" is invalid for argument "value"');
          }
          for (i = 0; i < end - start; ++i) {
            this[i + start] = bytes[i % len];
          }
        }
        return this;
      };
      var errors = {};
      function E(sym, getMessage, Base) {
        errors[sym] = class NodeError extends Base {
          constructor() {
            super();
            Object.defineProperty(this, "message", {
              value: getMessage.apply(this, arguments),
              writable: true,
              configurable: true
            });
            this.name = `${this.name} [${sym}]`;
            this.stack;
            delete this.name;
          }
          get code() {
            return sym;
          }
          set code(value) {
            Object.defineProperty(this, "code", {
              configurable: true,
              enumerable: true,
              value,
              writable: true
            });
          }
          toString() {
            return `${this.name} [${sym}]: ${this.message}`;
          }
        };
      }
      E(
        "ERR_BUFFER_OUT_OF_BOUNDS",
        function(name) {
          if (name) {
            return `${name} is outside of buffer bounds`;
          }
          return "Attempt to access memory outside buffer bounds";
        },
        RangeError
      );
      E(
        "ERR_INVALID_ARG_TYPE",
        function(name, actual) {
          return `The "${name}" argument must be of type number. Received type ${typeof actual}`;
        },
        TypeError
      );
      E(
        "ERR_OUT_OF_RANGE",
        function(str, range, input) {
          let msg = `The value of "${str}" is out of range.`;
          let received = input;
          if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
            received = addNumericalSeparator(String(input));
          } else if (typeof input === "bigint") {
            received = String(input);
            if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
              received = addNumericalSeparator(received);
            }
            received += "n";
          }
          msg += ` It must be ${range}. Received ${received}`;
          return msg;
        },
        RangeError
      );
      function addNumericalSeparator(val) {
        let res = "";
        let i = val.length;
        const start = val[0] === "-" ? 1 : 0;
        for (; i >= start + 4; i -= 3) {
          res = `_${val.slice(i - 3, i)}${res}`;
        }
        return `${val.slice(0, i)}${res}`;
      }
      function checkBounds(buf, offset, byteLength2) {
        validateNumber(offset, "offset");
        if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
          boundsError(offset, buf.length - (byteLength2 + 1));
        }
      }
      function checkIntBI(value, min, max, buf, offset, byteLength2) {
        if (value > max || value < min) {
          const n = typeof min === "bigint" ? "n" : "";
          let range;
          if (byteLength2 > 3) {
            if (min === 0 || min === BigInt(0)) {
              range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
            } else {
              range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
            }
          } else {
            range = `>= ${min}${n} and <= ${max}${n}`;
          }
          throw new errors.ERR_OUT_OF_RANGE("value", range, value);
        }
        checkBounds(buf, offset, byteLength2);
      }
      function validateNumber(value, name) {
        if (typeof value !== "number") {
          throw new errors.ERR_INVALID_ARG_TYPE(name, "number", value);
        }
      }
      function boundsError(value, length, type2) {
        if (Math.floor(value) !== value) {
          validateNumber(value, type2);
          throw new errors.ERR_OUT_OF_RANGE(type2 || "offset", "an integer", value);
        }
        if (length < 0) {
          throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
        }
        throw new errors.ERR_OUT_OF_RANGE(
          type2 || "offset",
          `>= ${type2 ? 1 : 0} and <= ${length}`,
          value
        );
      }
      var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
      function base64clean(str) {
        str = str.split("=")[0];
        str = str.trim().replace(INVALID_BASE64_RE, "");
        if (str.length < 2) return "";
        while (str.length % 4 !== 0) {
          str = str + "=";
        }
        return str;
      }
      function utf8ToBytes(string, units) {
        units = units || Infinity;
        let codePoint;
        const length = string.length;
        let leadSurrogate = null;
        const bytes = [];
        for (let i = 0; i < length; ++i) {
          codePoint = string.charCodeAt(i);
          if (codePoint > 55295 && codePoint < 57344) {
            if (!leadSurrogate) {
              if (codePoint > 56319) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              } else if (i + 1 === length) {
                if ((units -= 3) > -1) bytes.push(239, 191, 189);
                continue;
              }
              leadSurrogate = codePoint;
              continue;
            }
            if (codePoint < 56320) {
              if ((units -= 3) > -1) bytes.push(239, 191, 189);
              leadSurrogate = codePoint;
              continue;
            }
            codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
          } else if (leadSurrogate) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
          }
          leadSurrogate = null;
          if (codePoint < 128) {
            if ((units -= 1) < 0) break;
            bytes.push(codePoint);
          } else if (codePoint < 2048) {
            if ((units -= 2) < 0) break;
            bytes.push(
              codePoint >> 6 | 192,
              codePoint & 63 | 128
            );
          } else if (codePoint < 65536) {
            if ((units -= 3) < 0) break;
            bytes.push(
              codePoint >> 12 | 224,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else if (codePoint < 1114112) {
            if ((units -= 4) < 0) break;
            bytes.push(
              codePoint >> 18 | 240,
              codePoint >> 12 & 63 | 128,
              codePoint >> 6 & 63 | 128,
              codePoint & 63 | 128
            );
          } else {
            throw new Error("Invalid code point");
          }
        }
        return bytes;
      }
      function asciiToBytes(str) {
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          byteArray.push(str.charCodeAt(i) & 255);
        }
        return byteArray;
      }
      function utf16leToBytes(str, units) {
        let c, hi, lo;
        const byteArray = [];
        for (let i = 0; i < str.length; ++i) {
          if ((units -= 2) < 0) break;
          c = str.charCodeAt(i);
          hi = c >> 8;
          lo = c % 256;
          byteArray.push(lo);
          byteArray.push(hi);
        }
        return byteArray;
      }
      function base64ToBytes(str) {
        return base64.toByteArray(base64clean(str));
      }
      function blitBuffer(src, dst, offset, length) {
        let i;
        for (i = 0; i < length; ++i) {
          if (i + offset >= dst.length || i >= src.length) break;
          dst[i + offset] = src[i];
        }
        return i;
      }
      function isInstance(obj, type2) {
        return obj instanceof type2 || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type2.name;
      }
      function numberIsNaN(obj) {
        return obj !== obj;
      }
      var hexSliceLookupTable = function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      }();
      function defineBigIntMethod(fn2) {
        return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn2;
      }
      function BufferBigIntNotDefined() {
        throw new Error("BigInt not supported");
      }
    }
  });

  // js/shims/buffer-global.js
  var import_buffer;
  var init_buffer_global = __esm({
    "js/shims/buffer-global.js"() {
      import_buffer = __toESM(require_buffer(), 1);
      globalThis.Buffer = import_buffer.Buffer;
    }
  });

  // node_modules/reqwest/reqwest.js
  var require_reqwest = __commonJS({
    "node_modules/reqwest/reqwest.js"(exports, module) {
      init_define_process_env();
      init_buffer_global();
      !function(name, context, definition) {
        if (typeof module != "undefined" && module.exports) module.exports = definition();
        else if (typeof define == "function" && define.amd) define(definition);
        else context[name] = definition();
      }("reqwest", exports, function() {
        var win = window, doc = document, twoHundo = /^20\d$/, byTag = "getElementsByTagName", readyState = "readyState", contentType = "Content-Type", requestedWith = "X-Requested-With", head = doc[byTag]("head")[0], uniqid = 0, callbackPrefix = "reqwest_" + +/* @__PURE__ */ new Date(), lastValue, xmlHttpRequest = "XMLHttpRequest", noop = function() {
        }, isArray = typeof Array.isArray == "function" ? Array.isArray : function(a) {
          return a instanceof Array;
        }, defaultHeaders = {
          contentType: "application/x-www-form-urlencoded",
          requestedWith: xmlHttpRequest,
          accept: {
            "*": "text/javascript, text/html, application/xml, text/xml, */*",
            xml: "application/xml, text/xml",
            html: "text/html",
            text: "text/plain",
            json: "application/json, text/javascript",
            js: "application/javascript, text/javascript"
          }
        }, xhr = win[xmlHttpRequest] ? function() {
          return new XMLHttpRequest();
        } : function() {
          return new ActiveXObject("Microsoft.XMLHTTP");
        }, globalSetupOptions = {
          dataFilter: function(data) {
            return data;
          }
        };
        function handleReadyState(r2, success2, error2) {
          return function() {
            if (r2._aborted) return error2(r2.request);
            if (r2.request && r2.request[readyState] == 4) {
              r2.request.onreadystatechange = noop;
              if (twoHundo.test(r2.request.status))
                success2(r2.request);
              else
                error2(r2.request);
            }
          };
        }
        function setHeaders(http, o2) {
          var headers = o2.headers || {}, h;
          headers.Accept = headers.Accept || defaultHeaders.accept[o2.type] || defaultHeaders.accept["*"];
          if (!o2.crossOrigin && !headers[requestedWith]) headers[requestedWith] = defaultHeaders.requestedWith;
          if (!headers[contentType]) headers[contentType] = o2.contentType || defaultHeaders.contentType;
          for (h in headers)
            headers.hasOwnProperty(h) && http.setRequestHeader(h, headers[h]);
        }
        function setCredentials(http, o2) {
          if (typeof o2.withCredentials !== "undefined" && typeof http.withCredentials !== "undefined") {
            http.withCredentials = !!o2.withCredentials;
          }
        }
        function generalCallback(data) {
          lastValue = data;
        }
        function urlappend(url, s) {
          return url + (/\?/.test(url) ? "&" : "?") + s;
        }
        function handleJsonp(o2, fn2, err, url) {
          var reqId = uniqid++, cbkey = o2.jsonpCallback || "callback", cbval = o2.jsonpCallbackName || reqwest.getcallbackPrefix(reqId), cbreg = new RegExp("((^|\\?|&)" + cbkey + ")=([^&]+)"), match2 = url.match(cbreg), script = doc.createElement("script"), loaded = 0, isIE10 = navigator.userAgent.indexOf("MSIE 10.0") !== -1;
          if (match2) {
            if (match2[3] === "?") {
              url = url.replace(cbreg, "$1=" + cbval);
            } else {
              cbval = match2[3];
            }
          } else {
            url = urlappend(url, cbkey + "=" + cbval);
          }
          win[cbval] = generalCallback;
          script.type = "text/javascript";
          script.src = url;
          script.async = true;
          if (typeof script.onreadystatechange !== "undefined" && !isIE10) {
            script.event = "onclick";
            script.htmlFor = script.id = "_reqwest_" + reqId;
          }
          script.onload = script.onreadystatechange = function() {
            if (script[readyState] && script[readyState] !== "complete" && script[readyState] !== "loaded" || loaded) {
              return false;
            }
            script.onload = script.onreadystatechange = null;
            script.onclick && script.onclick();
            o2.success && o2.success(lastValue);
            lastValue = void 0;
            head.removeChild(script);
            loaded = 1;
          };
          head.appendChild(script);
          return {
            abort: function() {
              script.onload = script.onreadystatechange = null;
              o2.error && o2.error({}, "Request is aborted: timeout", {});
              lastValue = void 0;
              head.removeChild(script);
              loaded = 1;
            }
          };
        }
        function getRequest(fn2, err) {
          var o2 = this.o, method = (o2.method || "GET").toUpperCase(), url = typeof o2 === "string" ? o2 : o2.url, data = o2.processData !== false && o2.data && typeof o2.data !== "string" ? reqwest.toQueryString(o2.data) : o2.data || null, http;
          if ((o2.type == "jsonp" || method == "GET") && data) {
            url = urlappend(url, data);
            data = null;
          }
          if (o2.type == "jsonp") return handleJsonp(o2, fn2, err, url);
          http = xhr();
          http.open(method, url, true);
          setHeaders(http, o2);
          setCredentials(http, o2);
          http.onreadystatechange = handleReadyState(this, fn2, err);
          o2.before && o2.before(http);
          http.send(data);
          return http;
        }
        function Reqwest(o2, fn2) {
          this.o = o2;
          this.fn = fn2;
          init.apply(this, arguments);
        }
        function setType(url) {
          var m = url.match(/\.(json|jsonp|html|xml)(\?|$)/);
          return m ? m[1] : "js";
        }
        function init(o, fn) {
          this.url = typeof o == "string" ? o : o.url;
          this.timeout = null;
          this._fulfilled = false;
          this._fulfillmentHandlers = [];
          this._errorHandlers = [];
          this._completeHandlers = [];
          this._erred = false;
          this._responseArgs = {};
          var self = this, type = o.type || setType(this.url);
          fn = fn || function() {
          };
          if (o.timeout) {
            this.timeout = setTimeout(function() {
              self.abort();
            }, o.timeout);
          }
          if (o.success) {
            this._fulfillmentHandlers.push(function() {
              o.success.apply(o, arguments);
            });
          }
          if (o.error) {
            this._errorHandlers.push(function() {
              o.error.apply(o, arguments);
            });
          }
          if (o.complete) {
            this._completeHandlers.push(function() {
              o.complete.apply(o, arguments);
            });
          }
          function complete(resp2) {
            o.timeout && clearTimeout(self.timeout);
            self.timeout = null;
            while (self._completeHandlers.length > 0) {
              self._completeHandlers.shift()(resp2);
            }
          }
          function success(resp) {
            var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type), r = resp.responseText = filteredResponse;
            if (r) {
              switch (type) {
                case "json":
                  try {
                    resp = win.JSON ? win.JSON.parse(r) : eval("(" + r + ")");
                  } catch (err) {
                    return error(resp, "Could not parse JSON in response", err);
                  }
                  break;
                case "js":
                  resp = eval(r);
                  break;
                case "html":
                  resp = r;
                  break;
                case "xml":
                  resp = resp.responseXML && resp.responseXML.parseError && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML;
                  break;
              }
            }
            self._responseArgs.resp = resp;
            self._fulfilled = true;
            fn(resp);
            while (self._fulfillmentHandlers.length > 0) {
              self._fulfillmentHandlers.shift()(resp);
            }
            complete(resp);
          }
          function error(resp2, msg, t) {
            self._responseArgs.resp = resp2;
            self._responseArgs.msg = msg;
            self._responseArgs.t = t;
            self._erred = true;
            while (self._errorHandlers.length > 0) {
              self._errorHandlers.shift()(resp2, msg, t);
            }
            complete(resp2);
          }
          this.request = getRequest.call(this, success, error);
        }
        Reqwest.prototype = {
          abort: function() {
            this._aborted = true;
            this.request.abort();
          },
          retry: function() {
            init.call(this, this.o, this.fn);
          },
          then: function(success2, fail) {
            if (this._fulfilled) {
              success2(this._responseArgs.resp);
            } else if (this._erred) {
              fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
            } else {
              this._fulfillmentHandlers.push(success2);
              this._errorHandlers.push(fail);
            }
            return this;
          },
          always: function(fn2) {
            if (this._fulfilled || this._erred) {
              fn2(this._responseArgs.resp);
            } else {
              this._completeHandlers.push(fn2);
            }
            return this;
          },
          fail: function(fn2) {
            if (this._erred) {
              fn2(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
            } else {
              this._errorHandlers.push(fn2);
            }
            return this;
          }
        };
        function reqwest(o2, fn2) {
          return new Reqwest(o2, fn2);
        }
        function normalize(s) {
          return s ? s.replace(/\r?\n/g, "\r\n") : "";
        }
        function serial(el, cb) {
          var n = el.name, t = el.tagName.toLowerCase(), optCb = function(o2) {
            if (o2 && !o2.disabled)
              cb(n, normalize(o2.attributes.value && o2.attributes.value.specified ? o2.value : o2.text));
          }, ch, ra, val, i;
          if (el.disabled || !n) return;
          switch (t) {
            case "input":
              if (!/reset|button|image|file/i.test(el.type)) {
                ch = /checkbox/i.test(el.type);
                ra = /radio/i.test(el.type);
                val = el.value;
                (!(ch || ra) || el.checked) && cb(n, normalize(ch && val === "" ? "on" : val));
              }
              break;
            case "textarea":
              cb(n, normalize(el.value));
              break;
            case "select":
              if (el.type.toLowerCase() === "select-one") {
                optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null);
              } else {
                for (i = 0; el.length && i < el.length; i++) {
                  el.options[i].selected && optCb(el.options[i]);
                }
              }
              break;
          }
        }
        function eachFormElement() {
          var cb = this, e, i, serializeSubtags = function(e2, tags) {
            var i2, j, fa;
            for (i2 = 0; i2 < tags.length; i2++) {
              fa = e2[byTag](tags[i2]);
              for (j = 0; j < fa.length; j++) serial(fa[j], cb);
            }
          };
          for (i = 0; i < arguments.length; i++) {
            e = arguments[i];
            if (/input|select|textarea/i.test(e.tagName)) serial(e, cb);
            serializeSubtags(e, ["input", "select", "textarea"]);
          }
        }
        function serializeQueryString() {
          return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments));
        }
        function serializeHash() {
          var hash = {};
          eachFormElement.apply(function(name, value) {
            if (name in hash) {
              hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]]);
              hash[name].push(value);
            } else hash[name] = value;
          }, arguments);
          return hash;
        }
        reqwest.serializeArray = function() {
          var arr = [];
          eachFormElement.apply(function(name, value) {
            arr.push({ name, value });
          }, arguments);
          return arr;
        };
        reqwest.serialize = function() {
          if (arguments.length === 0) return "";
          var opt, fn2, args = Array.prototype.slice.call(arguments, 0);
          opt = args.pop();
          opt && opt.nodeType && args.push(opt) && (opt = null);
          opt && (opt = opt.type);
          if (opt == "map") fn2 = serializeHash;
          else if (opt == "array") fn2 = reqwest.serializeArray;
          else fn2 = serializeQueryString;
          return fn2.apply(null, args);
        };
        reqwest.toQueryString = function(o2, trad) {
          var prefix, i, traditional = trad || false, s = [], enc = encodeURIComponent, add = function(key, value) {
            value = "function" === typeof value ? value() : value == null ? "" : value;
            s[s.length] = enc(key) + "=" + enc(value);
          };
          if (isArray(o2)) {
            for (i = 0; o2 && i < o2.length; i++) add(o2[i].name, o2[i].value);
          } else {
            for (prefix in o2) {
              buildParams(prefix, o2[prefix], traditional, add);
            }
          }
          return s.join("&").replace(/%20/g, "+");
        };
        function buildParams(prefix, obj, traditional, add) {
          var name, i, v, rbracket = /\[\]$/;
          if (isArray(obj)) {
            for (i = 0; obj && i < obj.length; i++) {
              v = obj[i];
              if (traditional || rbracket.test(prefix)) {
                add(prefix, v);
              } else {
                buildParams(prefix + "[" + (typeof v === "object" ? i : "") + "]", v, traditional, add);
              }
            }
          } else if (obj.toString() === "[object Object]") {
            for (name in obj) {
              buildParams(prefix + "[" + name + "]", obj[name], traditional, add);
            }
          } else {
            add(prefix, obj);
          }
        }
        reqwest.getcallbackPrefix = function() {
          return callbackPrefix;
        };
        reqwest.compat = function(o2, fn2) {
          if (o2) {
            o2.type && (o2.method = o2.type) && delete o2.type;
            o2.dataType && (o2.type = o2.dataType);
            o2.jsonpCallback && (o2.jsonpCallbackName = o2.jsonpCallback) && delete o2.jsonpCallback;
            o2.jsonp && (o2.jsonpCallback = o2.jsonp);
          }
          return new Reqwest(o2, fn2);
        };
        reqwest.ajaxSetup = function(options) {
          options = options || {};
          for (var k in options) {
            globalSetupOptions[k] = options[k];
          }
        };
        return reqwest;
      });
    }
  });

  // node_modules/qs/lib/stringify.js
  var require_stringify = __commonJS({
    "node_modules/qs/lib/stringify.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      var internals = {};
      internals.stringify = function(obj, prefix) {
        if (Buffer.isBuffer(obj)) {
          obj = obj.toString();
        } else if (obj instanceof Date) {
          obj = obj.toISOString();
        }
        if (typeof obj === "string" || typeof obj === "number" || typeof obj === "boolean") {
          return [prefix + "=" + encodeURIComponent(obj)];
        }
        if (obj === null) {
          return [prefix];
        }
        var values = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            values = values.concat(internals.stringify(obj[key], prefix + "[" + encodeURIComponent(key) + "]"));
          }
        }
        return values;
      };
      module2.exports = function(obj) {
        var keys = [];
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            keys = keys.concat(internals.stringify(obj[key], encodeURIComponent(key)));
          }
        }
        return keys.join("&");
      };
    }
  });

  // node_modules/qs/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/qs/lib/utils.js"(exports2) {
      init_define_process_env();
      init_buffer_global();
      exports2.arrayToObject = function(source) {
        var obj = {};
        for (var i = 0, il = source.length; i < il; ++i) {
          if (source[i] !== void 0 && source[i] !== null) {
            obj[i] = source[i];
          }
        }
        return obj;
      };
      exports2.clone = function(source) {
        if (typeof source !== "object" || source === null) {
          return source;
        }
        if (Buffer.isBuffer(source)) {
          return source.toString();
        }
        var obj = Array.isArray(source) ? [] : {};
        for (var i in source) {
          if (source.hasOwnProperty(i)) {
            obj[i] = exports2.clone(source[i]);
          }
        }
        return obj;
      };
      exports2.merge = function(target, source) {
        if (!source) {
          return target;
        }
        var obj = exports2.clone(target);
        if (Array.isArray(source)) {
          for (var i = 0, il = source.length; i < il; ++i) {
            if (source[i] !== void 0) {
              obj[i] = source[i];
            }
          }
          return obj;
        }
        if (Array.isArray(obj)) {
          obj = exports2.arrayToObject(obj);
        }
        var keys = Object.keys(source);
        for (var k = 0, kl = keys.length; k < kl; ++k) {
          var key = keys[k];
          var value = source[key];
          if (value && typeof value === "object") {
            if (!obj[key]) {
              obj[key] = exports2.clone(value);
            } else {
              obj[key] = exports2.merge(obj[key], value);
            }
          } else {
            obj[key] = value;
          }
        }
        return obj;
      };
      exports2.decode = function(str) {
        try {
          return decodeURIComponent(str.replace(/\+/g, " "));
        } catch (e) {
          return str;
        }
      };
      exports2.compact = function(obj) {
        if (typeof obj !== "object") {
          return obj;
        }
        var compacted = {};
        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (Array.isArray(obj[key])) {
              compacted[key] = [];
              for (var i = 0, l = obj[key].length; i < l; i++) {
                if (obj[key].hasOwnProperty(i) && obj[key][i]) {
                  compacted[key].push(obj[key][i]);
                }
              }
            } else {
              compacted[key] = exports2.compact(obj[key]);
            }
          }
        }
        return compacted;
      };
    }
  });

  // node_modules/qs/lib/parse.js
  var require_parse = __commonJS({
    "node_modules/qs/lib/parse.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      var Utils = require_utils();
      var internals = {
        depth: 5,
        arrayLimit: 20,
        parametersLimit: 1e3
      };
      internals.parseValues = function(str) {
        var obj = {};
        var parts = str.split("&").slice(0, internals.parametersLimit);
        for (var i = 0, il = parts.length; i < il; ++i) {
          var part = parts[i];
          var pos = part.indexOf("]=") === -1 ? part.indexOf("=") : part.indexOf("]=") + 1;
          if (pos === -1) {
            obj[Utils.decode(part)] = "";
          } else {
            var key = Utils.decode(part.slice(0, pos));
            var val = Utils.decode(part.slice(pos + 1));
            if (!obj[key]) {
              obj[key] = val;
            } else {
              obj[key] = [].concat(obj[key]).concat(val);
            }
          }
        }
        return obj;
      };
      internals.parseObject = function(chain, val) {
        if (!chain.length) {
          return val;
        }
        var root = chain.shift();
        var obj = {};
        if (root === "[]") {
          obj = [];
          obj = obj.concat(internals.parseObject(chain, val));
        } else {
          var cleanRoot = root[0] === "[" && root[root.length - 1] === "]" ? root.slice(1, root.length - 1) : root;
          var index = parseInt(cleanRoot, 10);
          if (!isNaN(index) && root !== cleanRoot && index <= internals.arrayLimit) {
            obj = [];
            obj[index] = internals.parseObject(chain, val);
          } else {
            obj[cleanRoot] = internals.parseObject(chain, val);
          }
        }
        return obj;
      };
      internals.parseKeys = function(key, val, depth) {
        if (!key) {
          return;
        }
        depth = typeof depth === "undefined" ? internals.depth : depth;
        var parent = /^([^\[\]]*)/;
        var child = /(\[[^\[\]]*\])/g;
        var segment = parent.exec(key);
        if (Object.prototype.hasOwnProperty(segment[1])) {
          return;
        }
        var keys = [];
        if (segment[1]) {
          keys.push(segment[1]);
        }
        var i = 0;
        while ((segment = child.exec(key)) !== null && i < depth) {
          ++i;
          if (!Object.prototype.hasOwnProperty(segment[1].replace(/\[|\]/g, ""))) {
            keys.push(segment[1]);
          }
        }
        if (segment) {
          keys.push("[" + key.slice(segment.index) + "]");
        }
        return internals.parseObject(keys, val);
      };
      module2.exports = function(str, depth) {
        if (str === "" || str === null || typeof str === "undefined") {
          return {};
        }
        var tempObj = typeof str === "string" ? internals.parseValues(str) : Utils.clone(str);
        var obj = {};
        for (var key in tempObj) {
          if (tempObj.hasOwnProperty(key)) {
            var newObj = internals.parseKeys(key, tempObj[key], depth);
            obj = Utils.merge(obj, newObj);
          }
        }
        return Utils.compact(obj);
      };
    }
  });

  // node_modules/qs/lib/index.js
  var require_lib = __commonJS({
    "node_modules/qs/lib/index.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      var Stringify = require_stringify();
      var Parse = require_parse();
      module2.exports = {
        stringify: Stringify,
        parse: Parse
      };
    }
  });

  // node_modules/qs/index.js
  var require_qs = __commonJS({
    "node_modules/qs/index.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      module2.exports = require_lib();
    }
  });

  // js/shims/stream.js
  var stream_exports = {};
  __export(stream_exports, {
    default: () => stream_default
  });
  function Stream() {
  }
  var stream_default;
  var init_stream = __esm({
    "js/shims/stream.js"() {
      init_define_process_env();
      init_buffer_global();
      Stream.prototype.pipe = function(dest) {
        return dest;
      };
      stream_default = Stream;
    }
  });

  // node_modules/through/index.js
  var require_through = __commonJS({
    "node_modules/through/index.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      var Stream2 = (init_stream(), __toCommonJS(stream_exports));
      exports2 = module2.exports = through;
      through.through = through;
      function through(write, end, opts) {
        write = write || function(data) {
          this.queue(data);
        };
        end = end || function() {
          this.queue(null);
        };
        var ended = false, destroyed = false, buffer = [], _ended = false;
        var stream = new Stream2();
        stream.readable = stream.writable = true;
        stream.paused = false;
        stream.autoDestroy = !(opts && opts.autoDestroy === false);
        stream.write = function(data) {
          write.call(this, data);
          return !stream.paused;
        };
        function drain() {
          while (buffer.length && !stream.paused) {
            var data = buffer.shift();
            if (null === data)
              return stream.emit("end");
            else
              stream.emit("data", data);
          }
        }
        stream.queue = stream.push = function(data) {
          if (_ended) return stream;
          if (data === null) _ended = true;
          buffer.push(data);
          drain();
          return stream;
        };
        stream.on("end", function() {
          stream.readable = false;
          if (!stream.writable && stream.autoDestroy)
            process.nextTick(function() {
              stream.destroy();
            });
        });
        function _end() {
          stream.writable = false;
          end.call(stream);
          if (!stream.readable && stream.autoDestroy)
            stream.destroy();
        }
        stream.end = function(data) {
          if (ended) return;
          ended = true;
          if (arguments.length) stream.write(data);
          _end();
          return stream;
        };
        stream.destroy = function() {
          if (destroyed) return;
          destroyed = true;
          ended = true;
          buffer.length = 0;
          stream.writable = stream.readable = false;
          stream.emit("close");
          return stream;
        };
        stream.pause = function() {
          if (stream.paused) return;
          stream.paused = true;
          return stream;
        };
        stream.resume = function() {
          if (stream.paused) {
            stream.paused = false;
            stream.emit("resume");
          }
          drain();
          if (!stream.paused)
            stream.emit("drain");
          return stream;
        };
        return stream;
      }
    }
  });

  // node_modules/osm-stream/index.js
  var require_osm_stream = __commonJS({
    "node_modules/osm-stream/index.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      var reqwest2 = require_reqwest();
      var qs = require_qs();
      var through = require_through();
      var osmStream2 = function osmMinutely() {
        var s = {};
        var baseUrl = "https://overpass-api.de/", minuteStatePath = "api/augmented_diff_status", changePath = "api/augmented_diff?";
        function minuteStateUrl() {
          return baseUrl + minuteStatePath;
        }
        function changeUrl(id, bbox) {
          return baseUrl + changePath + qs.stringify({
            id,
            info: "no",
            bbox: bbox || "-180,-90,180,90"
          });
        }
        function requestState(cb) {
          reqwest2({
            url: minuteStateUrl(),
            crossOrigin: true,
            type: "text",
            success: function(res) {
              cb(null, parseInt(res.response, 10));
            }
          });
        }
        function requestChangeset(state, cb, bbox) {
          reqwest2({
            url: changeUrl(state, bbox),
            crossOrigin: true,
            type: "xml",
            success: function(res) {
              cb(null, res);
            },
            error: function(err) {
              cb(err);
            }
          });
        }
        function parseTags(x) {
          var tgs = x.getElementsByTagName("tag");
          var tags = {};
          for (var j = 0; j < tgs.length; j++) {
            tags[tgs[j].getAttribute("k")] = tgs[j].getAttribute("v");
          }
          return tags;
        }
        function parseNodeBase(x) {
          if (!x) return void 0;
          return {
            type: x.tagName,
            id: +x.getAttribute("id"),
            version: +x.getAttribute("version"),
            timestamp: x.getAttribute("timestamp"),
            changeset: +x.getAttribute("changeset"),
            uid: +x.getAttribute("uid"),
            user: x.getAttribute("user"),
            visible: x.getAttribute("visible") !== "false",
            tags: parseTags(x)
          };
        }
        function parseBounds(x) {
          var bounds = get(x, ["bounds"]);
          return [
            +bounds.getAttribute("maxlat"),
            +bounds.getAttribute("maxlon"),
            +bounds.getAttribute("minlat"),
            +bounds.getAttribute("minlon")
          ];
        }
        function parseMembers(x) {
          var mbrs = x.getElementsByTagName("members");
          var members = [];
          for (var i = 0; i < mbrs.length; i++) {
            var mbr = {
              type: mbrs[i].getAttribute("type"),
              ref: +mbrs[i].getAttribute("ref"),
              role: mbrs[i].getAttribute("role")
            };
            members.push(mbr);
          }
          return members;
        }
        function parseLinestring(x) {
          var nds = x.getElementsByTagName("nd");
          var nodes = [];
          for (var i = 0; i < nds.length; i++) {
            nodes.push([
              +nds[i].getAttribute("lat"),
              +nds[i].getAttribute("lon")
            ]);
          }
          return nodes;
        }
        function parseNode(x) {
          if (!x) return void 0;
          var o2 = parseNodeBase(x);
          if (o2.type === "node") {
            o2.lat = +x.getAttribute("lat");
            o2.lon = +x.getAttribute("lon");
          } else if (o2.type === "way") {
            o2.bounds = parseBounds(x);
            var nodes = parseLinestring(x);
            if (nodes.length > 0) {
              o2.linestring = nodes;
            }
          } else if (o2.type === "relation") {
            o2.bounds = parseBounds(x);
            o2.members = parseMembers(x);
          }
          return o2;
        }
        function get(x, y) {
          if (!x) return void 0;
          for (var i = 0; i < y.length; i++) {
            var o2 = x.getElementsByTagName(y[i])[0];
            if (o2) return o2;
          }
        }
        function run(id, cb, bbox) {
          requestChangeset(id, function(err, xml) {
            if (err || !xml) return cb("Error");
            if (!xml.getElementsByTagName) return cb("No items");
            var actions = xml.getElementsByTagName("action"), a;
            var items = [];
            for (var i = 0; i < actions.length; i++) {
              var o2 = {};
              a = actions[i];
              o2.type = a.getAttribute("type");
              if (o2.type == "create") {
                o2.neu = parseNode(get(a, ["node", "way"]));
              } else if (o2.type == "modify") {
                o2.old = parseNode(get(get(a, ["old"]), ["node", "way"]));
                o2.neu = parseNode(get(get(a, ["new"]), ["node", "way"]));
              } else if (o2.type == "delete") {
                o2.old = parseNode(get(get(a, ["old"]), ["node", "way"]));
                o2.neu = parseNodeBase(get(get(a, ["new"]), ["node", "way"]));
              }
              if (o2.old || o2.neu) {
                items.push(o2);
              }
            }
            cb(null, items);
          }, bbox);
        }
        s.once = function(cb, bbox) {
          requestState(function(err, state) {
            var stream = through(function write(err2, data) {
              cb(null, data);
            });
            run(state, stream.write, bbox);
          });
        };
        s.run = function(cb, duration, dir, bbox, maxRetries) {
          dir = dir || 1;
          duration = duration || 60 * 1e3;
          var tries = 0;
          var cancel = false;
          function setCancel() {
            cancel = true;
          }
          requestState(function(err, state) {
            var stream = through(
              function write2(data) {
                this.queue(data);
              },
              function end() {
                cancel = true;
                this.queue(null);
              }
            );
            function write(items) {
              for (var i = 0; i < items.length; i++) {
                stream.write(items[i]);
              }
            }
            cb(null, stream);
            function iterate() {
              run(state, function(err2, items) {
                if (!err2) {
                  write(items);
                }
                if (!err2 || (maxRetries || maxRetries === 0) && tries >= maxRetries) {
                  tries = 0;
                  state += dir;
                } else {
                  tries++;
                }
                if (!cancel) setTimeout(iterate, duration);
              }, bbox);
            }
            iterate();
          });
          return { cancel: setCancel };
        };
        s.runFn = function(cb, duration, dir, bbox, maxRetries) {
          dir = dir || 1;
          duration = duration || 60 * 1e3;
          var tries = 0;
          function setCancel() {
            cancel = true;
          }
          var cancel = false;
          requestState(function(err, state) {
            function write(items) {
              cb(null, items);
            }
            function iterate() {
              run(state, function(err2, items) {
                if (!err2) {
                  write(items);
                }
                if (!err2 || (maxRetries || maxRetries === 0) && tries >= maxRetries) {
                  tries = 0;
                  state += dir;
                } else {
                  tries++;
                }
                if (!cancel) setTimeout(iterate, duration);
              }, bbox);
            }
            iterate();
          });
          return { cancel: setCancel };
        };
        return s;
      }();
      module2.exports = osmStream2;
    }
  });

  // node_modules/pseudomap/pseudomap.js
  var require_pseudomap = __commonJS({
    "node_modules/pseudomap/pseudomap.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      module2.exports = PseudoMap;
      function PseudoMap(set2) {
        if (!(this instanceof PseudoMap))
          throw new TypeError("Constructor PseudoMap requires 'new'");
        this.clear();
        if (set2) {
          if (set2 instanceof PseudoMap || typeof Map === "function" && set2 instanceof Map)
            set2.forEach(function(value, key) {
              this.set(key, value);
            }, this);
          else if (Array.isArray(set2))
            set2.forEach(function(kv) {
              this.set(kv[0], kv[1]);
            }, this);
          else
            throw new TypeError("invalid argument");
        }
      }
      PseudoMap.prototype.forEach = function(fn2, thisp) {
        thisp = thisp || this;
        Object.keys(this._data).forEach(function(k) {
          if (k !== "size")
            fn2.call(thisp, this._data[k].value, this._data[k].key);
        }, this);
      };
      PseudoMap.prototype.has = function(k) {
        return !!find(this._data, k);
      };
      PseudoMap.prototype.get = function(k) {
        var res = find(this._data, k);
        return res && res.value;
      };
      PseudoMap.prototype.set = function(k, v) {
        set(this._data, k, v);
      };
      PseudoMap.prototype.delete = function(k) {
        var res = find(this._data, k);
        if (res) {
          delete this._data[res._index];
          this._data.size--;
        }
      };
      PseudoMap.prototype.clear = function() {
        var data = /* @__PURE__ */ Object.create(null);
        data.size = 0;
        Object.defineProperty(this, "_data", {
          value: data,
          enumerable: false,
          configurable: true,
          writable: false
        });
      };
      Object.defineProperty(PseudoMap.prototype, "size", {
        get: function() {
          return this._data.size;
        },
        set: function(n) {
        },
        enumerable: true,
        configurable: true
      });
      PseudoMap.prototype.values = PseudoMap.prototype.keys = PseudoMap.prototype.entries = function() {
        throw new Error("iterators are not implemented in this version");
      };
      function same(a, b) {
        return a === b || a !== a && b !== b;
      }
      function Entry(k, v, i) {
        this.key = k;
        this.value = v;
        this._index = i;
      }
      function find(data, k) {
        for (var i = 0, s = "_" + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
          if (same(data[key].key, k))
            return data[key];
        }
      }
      function set(data, k, v) {
        for (var i = 0, s = "_" + k, key = s; hasOwnProperty.call(data, key); key = s + i++) {
          if (same(data[key].key, k)) {
            data[key].value = v;
            return;
          }
        }
        data.size++;
        data[key] = new Entry(k, v, key);
      }
    }
  });

  // node_modules/pseudomap/map.js
  var require_map = __commonJS({
    "node_modules/pseudomap/map.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      if (define_process_env_default.npm_package_name === "pseudomap" && define_process_env_default.npm_lifecycle_script === "test")
        define_process_env_default.TEST_PSEUDOMAP = "true";
      if (typeof Map === "function" && !define_process_env_default.TEST_PSEUDOMAP) {
        module2.exports = Map;
      } else {
        module2.exports = require_pseudomap();
      }
    }
  });

  // js/shims/util.js
  var util_exports = {};
  __export(util_exports, {
    default: () => util_default,
    inspect: () => inspect
  });
  var inspect, util_default;
  var init_util = __esm({
    "js/shims/util.js"() {
      init_define_process_env();
      init_buffer_global();
      inspect = { custom: Symbol("util.inspect.custom") };
      util_default = { inspect };
    }
  });

  // node_modules/yallist/yallist.js
  var require_yallist = __commonJS({
    "node_modules/yallist/yallist.js"(exports2, module2) {
      init_define_process_env();
      init_buffer_global();
      module2.exports = Yallist;
      Yallist.Node = Node;
      Yallist.create = Yallist;
      function Yallist(list) {
        var self2 = this;
        if (!(self2 instanceof Yallist)) {
          self2 = new Yallist();
        }
        self2.tail = null;
        self2.head = null;
        self2.length = 0;
        if (list && typeof list.forEach === "function") {
          list.forEach(function(item) {
            self2.push(item);
          });
        } else if (arguments.length > 0) {
          for (var i = 0, l = arguments.length; i < l; i++) {
            self2.push(arguments[i]);
          }
        }
        return self2;
      }
      Yallist.prototype.removeNode = function(node) {
        if (node.list !== this) {
          throw new Error("removing node which does not belong to this list");
        }
        var next = node.next;
        var prev = node.prev;
        if (next) {
          next.prev = prev;
        }
        if (prev) {
          prev.next = next;
        }
        if (node === this.head) {
          this.head = next;
        }
        if (node === this.tail) {
          this.tail = prev;
        }
        node.list.length--;
        node.next = null;
        node.prev = null;
        node.list = null;
      };
      Yallist.prototype.unshiftNode = function(node) {
        if (node === this.head) {
          return;
        }
        if (node.list) {
          node.list.removeNode(node);
        }
        var head2 = this.head;
        node.list = this;
        node.next = head2;
        if (head2) {
          head2.prev = node;
        }
        this.head = node;
        if (!this.tail) {
          this.tail = node;
        }
        this.length++;
      };
      Yallist.prototype.pushNode = function(node) {
        if (node === this.tail) {
          return;
        }
        if (node.list) {
          node.list.removeNode(node);
        }
        var tail = this.tail;
        node.list = this;
        node.prev = tail;
        if (tail) {
          tail.next = node;
        }
        this.tail = node;
        if (!this.head) {
          this.head = node;
        }
        this.length++;
      };
      Yallist.prototype.push = function() {
        for (var i = 0, l = arguments.length; i < l; i++) {
          push2(this, arguments[i]);
        }
        return this.length;
      };
      Yallist.prototype.unshift = function() {
        for (var i = 0, l = arguments.length; i < l; i++) {
          unshift(this, arguments[i]);
        }
        return this.length;
      };
      Yallist.prototype.pop = function() {
        if (!this.tail) {
          return void 0;
        }
        var res = this.tail.value;
        this.tail = this.tail.prev;
        if (this.tail) {
          this.tail.next = null;
        } else {
          this.head = null;
        }
        this.length--;
        return res;
      };
      Yallist.prototype.shift = function() {
        if (!this.head) {
          return void 0;
        }
        var res = this.head.value;
        this.head = this.head.next;
        if (this.head) {
          this.head.prev = null;
        } else {
          this.tail = null;
        }
        this.length--;
        return res;
      };
      Yallist.prototype.forEach = function(fn2, thisp) {
        thisp = thisp || this;
        for (var walker = this.head, i = 0; walker !== null; i++) {
          fn2.call(thisp, walker.value, i, this);
          walker = walker.next;
        }
      };
      Yallist.prototype.forEachReverse = function(fn2, thisp) {
        thisp = thisp || this;
        for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
          fn2.call(thisp, walker.value, i, this);
          walker = walker.prev;
        }
      };
      Yallist.prototype.get = function(n) {
        for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
          walker = walker.next;
        }
        if (i === n && walker !== null) {
          return walker.value;
        }
      };
      Yallist.prototype.getReverse = function(n) {
        for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
          walker = walker.prev;
        }
        if (i === n && walker !== null) {
          return walker.value;
        }
      };
      Yallist.prototype.map = function(fn2, thisp) {
        thisp = thisp || this;
        var res = new Yallist();
        for (var walker = this.head; walker !== null; ) {
          res.push(fn2.call(thisp, walker.value, this));
          walker = walker.next;
        }
        return res;
      };
      Yallist.prototype.mapReverse = function(fn2, thisp) {
        thisp = thisp || this;
        var res = new Yallist();
        for (var walker = this.tail; walker !== null; ) {
          res.push(fn2.call(thisp, walker.value, this));
          walker = walker.prev;
        }
        return res;
      };
      Yallist.prototype.reduce = function(fn2, initial) {
        var acc;
        var walker = this.head;
        if (arguments.length > 1) {
          acc = initial;
        } else if (this.head) {
          walker = this.head.next;
          acc = this.head.value;
        } else {
          throw new TypeError("Reduce of empty list with no initial value");
        }
        for (var i = 0; walker !== null; i++) {
          acc = fn2(acc, walker.value, i);
          walker = walker.next;
        }
        return acc;
      };
      Yallist.prototype.reduceReverse = function(fn2, initial) {
        var acc;
        var walker = this.tail;
        if (arguments.length > 1) {
          acc = initial;
        } else if (this.tail) {
          walker = this.tail.prev;
          acc = this.tail.value;
        } else {
          throw new TypeError("Reduce of empty list with no initial value");
        }
        for (var i = this.length - 1; walker !== null; i--) {
          acc = fn2(acc, walker.value, i);
          walker = walker.prev;
        }
        return acc;
      };
      Yallist.prototype.toArray = function() {
        var arr = new Array(this.length);
        for (var i = 0, walker = this.head; walker !== null; i++) {
          arr[i] = walker.value;
          walker = walker.next;
        }
        return arr;
      };
      Yallist.prototype.toArrayReverse = function() {
        var arr = new Array(this.length);
        for (var i = 0, walker = this.tail; walker !== null; i++) {
          arr[i] = walker.value;
          walker = walker.prev;
        }
        return arr;
      };
      Yallist.prototype.slice = function(from, to) {
        to = to || this.length;
        if (to < 0) {
          to += this.length;
        }
        from = from || 0;
        if (from < 0) {
          from += this.length;
        }
        var ret = new Yallist();
        if (to < from || to < 0) {
          return ret;
        }
        if (from < 0) {
          from = 0;
        }
        if (to > this.length) {
          to = this.length;
        }
        for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
          walker = walker.next;
        }
        for (; walker !== null && i < to; i++, walker = walker.next) {
          ret.push(walker.value);
        }
        return ret;
      };
      Yallist.prototype.sliceReverse = function(from, to) {
        to = to || this.length;
        if (to < 0) {
          to += this.length;
        }
        from = from || 0;
        if (from < 0) {
          from += this.length;
        }
        var ret = new Yallist();
        if (to < from || to < 0) {
          return ret;
        }
        if (from < 0) {
          from = 0;
        }
        if (to > this.length) {
          to = this.length;
        }
        for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
          walker = walker.prev;
        }
        for (; walker !== null && i > from; i--, walker = walker.prev) {
          ret.push(walker.value);
        }
        return ret;
      };
      Yallist.prototype.reverse = function() {
        var head2 = this.head;
        var tail = this.tail;
        for (var walker = head2; walker !== null; walker = walker.prev) {
          var p = walker.prev;
          walker.prev = walker.next;
          walker.next = p;
        }
        this.head = tail;
        this.tail = head2;
        return this;
      };
      function push2(self2, item) {
        self2.tail = new Node(item, self2.tail, null, self2);
        if (!self2.head) {
          self2.head = self2.tail;
        }
        self2.length++;
      }
      function unshift(self2, item) {
        self2.head = new Node(item, null, self2.head, self2);
        if (!self2.tail) {
          self2.tail = self2.head;
        }
        self2.length++;
      }
      function Node(value, prev, next, list) {
        if (!(this instanceof Node)) {
          return new Node(value, prev, next, list);
        }
        this.list = list;
        this.value = value;
        if (prev) {
          prev.next = this;
          this.prev = prev;
        } else {
          this.prev = null;
        }
        if (next) {
          next.prev = this;
          this.next = next;
        } else {
          this.next = null;
        }
      }
    }
  });

  // node_modules/lru-cache/index.js
  var require_lru_cache = __commonJS({
    "node_modules/lru-cache/index.js"(exports2, module2) {
      "use strict";
      init_define_process_env();
      init_buffer_global();
      module2.exports = LRUCache;
      var Map2 = require_map();
      var util = (init_util(), __toCommonJS(util_exports));
      var Yallist = require_yallist();
      var hasSymbol = typeof Symbol === "function" && define_process_env_default._nodeLRUCacheForceNoSymbol !== "1";
      var makeSymbol;
      if (hasSymbol) {
        makeSymbol = function(key) {
          return Symbol(key);
        };
      } else {
        makeSymbol = function(key) {
          return "_" + key;
        };
      }
      var MAX = makeSymbol("max");
      var LENGTH = makeSymbol("length");
      var LENGTH_CALCULATOR = makeSymbol("lengthCalculator");
      var ALLOW_STALE = makeSymbol("allowStale");
      var MAX_AGE = makeSymbol("maxAge");
      var DISPOSE = makeSymbol("dispose");
      var NO_DISPOSE_ON_SET = makeSymbol("noDisposeOnSet");
      var LRU_LIST = makeSymbol("lruList");
      var CACHE = makeSymbol("cache");
      function naiveLength() {
        return 1;
      }
      function LRUCache(options) {
        if (!(this instanceof LRUCache)) {
          return new LRUCache(options);
        }
        if (typeof options === "number") {
          options = { max: options };
        }
        if (!options) {
          options = {};
        }
        var max = this[MAX] = options.max;
        if (!max || !(typeof max === "number") || max <= 0) {
          this[MAX] = Infinity;
        }
        var lc = options.length || naiveLength;
        if (typeof lc !== "function") {
          lc = naiveLength;
        }
        this[LENGTH_CALCULATOR] = lc;
        this[ALLOW_STALE] = options.stale || false;
        this[MAX_AGE] = options.maxAge || 0;
        this[DISPOSE] = options.dispose;
        this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
        this.reset();
      }
      Object.defineProperty(LRUCache.prototype, "max", {
        set: function(mL) {
          if (!mL || !(typeof mL === "number") || mL <= 0) {
            mL = Infinity;
          }
          this[MAX] = mL;
          trim(this);
        },
        get: function() {
          return this[MAX];
        },
        enumerable: true
      });
      Object.defineProperty(LRUCache.prototype, "allowStale", {
        set: function(allowStale) {
          this[ALLOW_STALE] = !!allowStale;
        },
        get: function() {
          return this[ALLOW_STALE];
        },
        enumerable: true
      });
      Object.defineProperty(LRUCache.prototype, "maxAge", {
        set: function(mA) {
          if (!mA || !(typeof mA === "number") || mA < 0) {
            mA = 0;
          }
          this[MAX_AGE] = mA;
          trim(this);
        },
        get: function() {
          return this[MAX_AGE];
        },
        enumerable: true
      });
      Object.defineProperty(LRUCache.prototype, "lengthCalculator", {
        set: function(lC) {
          if (typeof lC !== "function") {
            lC = naiveLength;
          }
          if (lC !== this[LENGTH_CALCULATOR]) {
            this[LENGTH_CALCULATOR] = lC;
            this[LENGTH] = 0;
            this[LRU_LIST].forEach(function(hit) {
              hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
              this[LENGTH] += hit.length;
            }, this);
          }
          trim(this);
        },
        get: function() {
          return this[LENGTH_CALCULATOR];
        },
        enumerable: true
      });
      Object.defineProperty(LRUCache.prototype, "length", {
        get: function() {
          return this[LENGTH];
        },
        enumerable: true
      });
      Object.defineProperty(LRUCache.prototype, "itemCount", {
        get: function() {
          return this[LRU_LIST].length;
        },
        enumerable: true
      });
      LRUCache.prototype.rforEach = function(fn2, thisp) {
        thisp = thisp || this;
        for (var walker = this[LRU_LIST].tail; walker !== null; ) {
          var prev = walker.prev;
          forEachStep(this, fn2, walker, thisp);
          walker = prev;
        }
      };
      function forEachStep(self2, fn2, node, thisp) {
        var hit = node.value;
        if (isStale(self2, hit)) {
          del(self2, node);
          if (!self2[ALLOW_STALE]) {
            hit = void 0;
          }
        }
        if (hit) {
          fn2.call(thisp, hit.value, hit.key, self2);
        }
      }
      LRUCache.prototype.forEach = function(fn2, thisp) {
        thisp = thisp || this;
        for (var walker = this[LRU_LIST].head; walker !== null; ) {
          var next = walker.next;
          forEachStep(this, fn2, walker, thisp);
          walker = next;
        }
      };
      LRUCache.prototype.keys = function() {
        return this[LRU_LIST].toArray().map(function(k) {
          return k.key;
        }, this);
      };
      LRUCache.prototype.values = function() {
        return this[LRU_LIST].toArray().map(function(k) {
          return k.value;
        }, this);
      };
      LRUCache.prototype.reset = function() {
        if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
          this[LRU_LIST].forEach(function(hit) {
            this[DISPOSE](hit.key, hit.value);
          }, this);
        }
        this[CACHE] = new Map2();
        this[LRU_LIST] = new Yallist();
        this[LENGTH] = 0;
      };
      LRUCache.prototype.dump = function() {
        return this[LRU_LIST].map(function(hit) {
          if (!isStale(this, hit)) {
            return {
              k: hit.key,
              v: hit.value,
              e: hit.now + (hit.maxAge || 0)
            };
          }
        }, this).toArray().filter(function(h) {
          return h;
        });
      };
      LRUCache.prototype.dumpLru = function() {
        return this[LRU_LIST];
      };
      LRUCache.prototype.inspect = function(n, opts) {
        var str = "LRUCache {";
        var extras = false;
        var as = this[ALLOW_STALE];
        if (as) {
          str += "\n  allowStale: true";
          extras = true;
        }
        var max = this[MAX];
        if (max && max !== Infinity) {
          if (extras) {
            str += ",";
          }
          str += "\n  max: " + util.inspect(max, opts);
          extras = true;
        }
        var maxAge = this[MAX_AGE];
        if (maxAge) {
          if (extras) {
            str += ",";
          }
          str += "\n  maxAge: " + util.inspect(maxAge, opts);
          extras = true;
        }
        var lc = this[LENGTH_CALCULATOR];
        if (lc && lc !== naiveLength) {
          if (extras) {
            str += ",";
          }
          str += "\n  length: " + util.inspect(this[LENGTH], opts);
          extras = true;
        }
        var didFirst = false;
        this[LRU_LIST].forEach(function(item) {
          if (didFirst) {
            str += ",\n  ";
          } else {
            if (extras) {
              str += ",\n";
            }
            didFirst = true;
            str += "\n  ";
          }
          var key = util.inspect(item.key).split("\n").join("\n  ");
          var val = { value: item.value };
          if (item.maxAge !== maxAge) {
            val.maxAge = item.maxAge;
          }
          if (lc !== naiveLength) {
            val.length = item.length;
          }
          if (isStale(this, item)) {
            val.stale = true;
          }
          val = util.inspect(val, opts).split("\n").join("\n  ");
          str += key + " => " + val;
        });
        if (didFirst || extras) {
          str += "\n";
        }
        str += "}";
        return str;
      };
      LRUCache.prototype.set = function(key, value, maxAge) {
        maxAge = maxAge || this[MAX_AGE];
        var now = maxAge ? Date.now() : 0;
        var len = this[LENGTH_CALCULATOR](value, key);
        if (this[CACHE].has(key)) {
          if (len > this[MAX]) {
            del(this, this[CACHE].get(key));
            return false;
          }
          var node = this[CACHE].get(key);
          var item = node.value;
          if (this[DISPOSE]) {
            if (!this[NO_DISPOSE_ON_SET]) {
              this[DISPOSE](key, item.value);
            }
          }
          item.now = now;
          item.maxAge = maxAge;
          item.value = value;
          this[LENGTH] += len - item.length;
          item.length = len;
          this.get(key);
          trim(this);
          return true;
        }
        var hit = new Entry(key, value, len, now, maxAge);
        if (hit.length > this[MAX]) {
          if (this[DISPOSE]) {
            this[DISPOSE](key, value);
          }
          return false;
        }
        this[LENGTH] += hit.length;
        this[LRU_LIST].unshift(hit);
        this[CACHE].set(key, this[LRU_LIST].head);
        trim(this);
        return true;
      };
      LRUCache.prototype.has = function(key) {
        if (!this[CACHE].has(key)) return false;
        var hit = this[CACHE].get(key).value;
        if (isStale(this, hit)) {
          return false;
        }
        return true;
      };
      LRUCache.prototype.get = function(key) {
        return get(this, key, true);
      };
      LRUCache.prototype.peek = function(key) {
        return get(this, key, false);
      };
      LRUCache.prototype.pop = function() {
        var node = this[LRU_LIST].tail;
        if (!node) return null;
        del(this, node);
        return node.value;
      };
      LRUCache.prototype.del = function(key) {
        del(this, this[CACHE].get(key));
      };
      LRUCache.prototype.load = function(arr) {
        this.reset();
        var now = Date.now();
        for (var l = arr.length - 1; l >= 0; l--) {
          var hit = arr[l];
          var expiresAt = hit.e || 0;
          if (expiresAt === 0) {
            this.set(hit.k, hit.v);
          } else {
            var maxAge = expiresAt - now;
            if (maxAge > 0) {
              this.set(hit.k, hit.v, maxAge);
            }
          }
        }
      };
      LRUCache.prototype.prune = function() {
        var self2 = this;
        this[CACHE].forEach(function(value, key) {
          get(self2, key, false);
        });
      };
      function get(self2, key, doUse) {
        var node = self2[CACHE].get(key);
        if (node) {
          var hit = node.value;
          if (isStale(self2, hit)) {
            del(self2, node);
            if (!self2[ALLOW_STALE]) hit = void 0;
          } else {
            if (doUse) {
              self2[LRU_LIST].unshiftNode(node);
            }
          }
          if (hit) hit = hit.value;
        }
        return hit;
      }
      function isStale(self2, hit) {
        if (!hit || !hit.maxAge && !self2[MAX_AGE]) {
          return false;
        }
        var stale = false;
        var diff = Date.now() - hit.now;
        if (hit.maxAge) {
          stale = diff > hit.maxAge;
        } else {
          stale = self2[MAX_AGE] && diff > self2[MAX_AGE];
        }
        return stale;
      }
      function trim(self2) {
        if (self2[LENGTH] > self2[MAX]) {
          for (var walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
            var prev = walker.prev;
            del(self2, walker);
            walker = prev;
          }
        }
      }
      function del(self2, node) {
        if (node) {
          var hit = node.value;
          if (self2[DISPOSE]) {
            self2[DISPOSE](hit.key, hit.value);
          }
          self2[LENGTH] -= hit.length;
          self2[CACHE].delete(hit.key);
          self2[LRU_LIST].removeNode(node);
        }
      }
      function Entry(key, value, length, now, maxAge) {
        this.key = key;
        this.value = value;
        this.length = length;
        this.now = now;
        this.maxAge = maxAge || 0;
      }
    }
  });

  // js/site.js
  init_define_process_env();
  init_buffer_global();

  // js/change.js
  init_define_process_env();
  init_buffer_global();

  // js/utils.js
  init_define_process_env();
  init_buffer_global();
  function makeBbox(boundsArray) {
    return new L.LatLngBounds(
      new L.LatLng(boundsArray[0], boundsArray[1]),
      new L.LatLng(boundsArray[2], boundsArray[3])
    );
  }
  function makeBboxString(bbox) {
    return bbox.toBBoxString();
  }
  function isBboxSizeAcceptable(bbox) {
    const width = Math.abs(bbox.getSouthWest().lat - bbox.getNorthEast().lat);
    const height = Math.abs(bbox.getSouthWest().lng - bbox.getNorthEast().lng);
    return width * height < 2;
  }

  // node_modules/date-fns/esm/index.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/esm/toDate/index.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/esm/_lib/requiredArgs/index.js
  init_define_process_env();
  init_buffer_global();
  function requiredArgs(required, args) {
    if (args.length < required) {
      throw new TypeError(required + " argument" + (required > 1 ? "s" : "") + " required, but only " + args.length + " present");
    }
  }

  // node_modules/date-fns/esm/toDate/index.js
  function toDate(argument) {
    requiredArgs(1, arguments);
    var argStr = Object.prototype.toString.call(argument);
    if (argument instanceof Date || typeof argument === "object" && argStr === "[object Date]") {
      return new Date(argument.getTime());
    } else if (typeof argument === "number" || argStr === "[object Number]") {
      return new Date(argument);
    } else {
      if ((typeof argument === "string" || argStr === "[object String]") && typeof console !== "undefined") {
        console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule");
        console.warn(new Error().stack);
      }
      return /* @__PURE__ */ new Date(NaN);
    }
  }

  // node_modules/date-fns/esm/_lib/getTimezoneOffsetInMilliseconds/index.js
  init_define_process_env();
  init_buffer_global();
  function getTimezoneOffsetInMilliseconds(date) {
    var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    utcDate.setUTCFullYear(date.getFullYear());
    return date.getTime() - utcDate.getTime();
  }

  // node_modules/date-fns/esm/compareAsc/index.js
  init_define_process_env();
  init_buffer_global();
  function compareAsc(dirtyDateLeft, dirtyDateRight) {
    requiredArgs(2, arguments);
    var dateLeft = toDate(dirtyDateLeft);
    var dateRight = toDate(dirtyDateRight);
    var diff = dateLeft.getTime() - dateRight.getTime();
    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return diff;
    }
  }

  // node_modules/date-fns/esm/locale/en-US/index.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/esm/locale/en-US/_lib/formatDistance/index.js
  init_define_process_env();
  init_buffer_global();
  var formatDistanceLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXWeeks: {
      one: "about 1 week",
      other: "about {{count}} weeks"
    },
    xWeeks: {
      one: "1 week",
      other: "{{count}} weeks"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  var formatDistance = function(token, count, options) {
    var result;
    var tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options !== null && options !== void 0 && options.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };
  var formatDistance_default = formatDistance;

  // node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/esm/locale/_lib/buildFormatLongFn/index.js
  init_define_process_env();
  init_buffer_global();
  function buildFormatLongFn(args) {
    return function() {
      var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var width = options.width ? String(options.width) : args.defaultWidth;
      var format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }

  // node_modules/date-fns/esm/locale/en-US/_lib/formatLong/index.js
  var dateFormats = {
    full: "EEEE, MMMM do, y",
    long: "MMMM do, y",
    medium: "MMM d, y",
    short: "MM/dd/yyyy"
  };
  var timeFormats = {
    full: "h:mm:ss a zzzz",
    long: "h:mm:ss a z",
    medium: "h:mm:ss a",
    short: "h:mm a"
  };
  var dateTimeFormats = {
    full: "{{date}} 'at' {{time}}",
    long: "{{date}} 'at' {{time}}",
    medium: "{{date}}, {{time}}",
    short: "{{date}}, {{time}}"
  };
  var formatLong = {
    date: buildFormatLongFn({
      formats: dateFormats,
      defaultWidth: "full"
    }),
    time: buildFormatLongFn({
      formats: timeFormats,
      defaultWidth: "full"
    }),
    dateTime: buildFormatLongFn({
      formats: dateTimeFormats,
      defaultWidth: "full"
    })
  };
  var formatLong_default = formatLong;

  // node_modules/date-fns/esm/locale/en-US/_lib/formatRelative/index.js
  init_define_process_env();
  init_buffer_global();
  var formatRelativeLocale = {
    lastWeek: "'last' eeee 'at' p",
    yesterday: "'yesterday at' p",
    today: "'today at' p",
    tomorrow: "'tomorrow at' p",
    nextWeek: "eeee 'at' p",
    other: "P"
  };
  var formatRelative = function(token, _date, _baseDate, _options) {
    return formatRelativeLocale[token];
  };
  var formatRelative_default = formatRelative;

  // node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/esm/locale/_lib/buildLocalizeFn/index.js
  init_define_process_env();
  init_buffer_global();
  function buildLocalizeFn(args) {
    return function(dirtyIndex, dirtyOptions) {
      var options = dirtyOptions || {};
      var context = options.context ? String(options.context) : "standalone";
      var valuesArray;
      if (context === "formatting" && args.formattingValues) {
        var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        var width = options.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        var _defaultWidth = args.defaultWidth;
        var _width = options.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[_width] || args.values[_defaultWidth];
      }
      var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
      return valuesArray[index];
    };
  }

  // node_modules/date-fns/esm/locale/en-US/_lib/localize/index.js
  var eraValues = {
    narrow: ["B", "A"],
    abbreviated: ["BC", "AD"],
    wide: ["Before Christ", "Anno Domini"]
  };
  var quarterValues = {
    narrow: ["1", "2", "3", "4"],
    abbreviated: ["Q1", "Q2", "Q3", "Q4"],
    wide: ["1st quarter", "2nd quarter", "3rd quarter", "4th quarter"]
  };
  var monthValues = {
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"],
    abbreviated: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    wide: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  };
  var dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  };
  var dayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "morning",
      afternoon: "afternoon",
      evening: "evening",
      night: "night"
    }
  };
  var formattingDayPeriodValues = {
    narrow: {
      am: "a",
      pm: "p",
      midnight: "mi",
      noon: "n",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    abbreviated: {
      am: "AM",
      pm: "PM",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    },
    wide: {
      am: "a.m.",
      pm: "p.m.",
      midnight: "midnight",
      noon: "noon",
      morning: "in the morning",
      afternoon: "in the afternoon",
      evening: "in the evening",
      night: "at night"
    }
  };
  var ordinalNumber = function(dirtyNumber, _options) {
    var number = Number(dirtyNumber);
    var rem100 = number % 100;
    if (rem100 > 20 || rem100 < 10) {
      switch (rem100 % 10) {
        case 1:
          return number + "st";
        case 2:
          return number + "nd";
        case 3:
          return number + "rd";
      }
    }
    return number + "th";
  };
  var localize = {
    ordinalNumber,
    era: buildLocalizeFn({
      values: eraValues,
      defaultWidth: "wide"
    }),
    quarter: buildLocalizeFn({
      values: quarterValues,
      defaultWidth: "wide",
      argumentCallback: function(quarter) {
        return quarter - 1;
      }
    }),
    month: buildLocalizeFn({
      values: monthValues,
      defaultWidth: "wide"
    }),
    day: buildLocalizeFn({
      values: dayValues,
      defaultWidth: "wide"
    }),
    dayPeriod: buildLocalizeFn({
      values: dayPeriodValues,
      defaultWidth: "wide",
      formattingValues: formattingDayPeriodValues,
      defaultFormattingWidth: "wide"
    })
  };
  var localize_default = localize;

  // node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/esm/locale/_lib/buildMatchFn/index.js
  init_define_process_env();
  init_buffer_global();
  function buildMatchFn(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var width = options.width;
      var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      var matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      var matchedString = matchResult[0];
      var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      var key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      }) : findKey(parsePatterns, function(pattern) {
        return pattern.test(matchedString);
      });
      var value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }
  function findKey(object, predicate) {
    for (var key in object) {
      if (object.hasOwnProperty(key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (var key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }

  // node_modules/date-fns/esm/locale/_lib/buildMatchPatternFn/index.js
  init_define_process_env();
  init_buffer_global();
  function buildMatchPatternFn(args) {
    return function(string) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      var matchedString = matchResult[0];
      var parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      var rest = string.slice(matchedString.length);
      return {
        value,
        rest
      };
    };
  }

  // node_modules/date-fns/esm/locale/en-US/_lib/match/index.js
  var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
  var parseOrdinalNumberPattern = /\d+/i;
  var matchEraPatterns = {
    narrow: /^(b|a)/i,
    abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
    wide: /^(before christ|before common era|anno domini|common era)/i
  };
  var parseEraPatterns = {
    any: [/^b/i, /^(a|c)/i]
  };
  var matchQuarterPatterns = {
    narrow: /^[1234]/i,
    abbreviated: /^q[1234]/i,
    wide: /^[1234](th|st|nd|rd)? quarter/i
  };
  var parseQuarterPatterns = {
    any: [/1/i, /2/i, /3/i, /4/i]
  };
  var matchMonthPatterns = {
    narrow: /^[jfmasond]/i,
    abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
    wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
  };
  var parseMonthPatterns = {
    narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
    any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
  };
  var matchDayPatterns = {
    narrow: /^[smtwf]/i,
    short: /^(su|mo|tu|we|th|fr|sa)/i,
    abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
    wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
  };
  var parseDayPatterns = {
    narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
    any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
  };
  var matchDayPeriodPatterns = {
    narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
    any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
  };
  var parseDayPeriodPatterns = {
    any: {
      am: /^a/i,
      pm: /^p/i,
      midnight: /^mi/i,
      noon: /^no/i,
      morning: /morning/i,
      afternoon: /afternoon/i,
      evening: /evening/i,
      night: /night/i
    }
  };
  var match = {
    ordinalNumber: buildMatchPatternFn({
      matchPattern: matchOrdinalNumberPattern,
      parsePattern: parseOrdinalNumberPattern,
      valueCallback: function(value) {
        return parseInt(value, 10);
      }
    }),
    era: buildMatchFn({
      matchPatterns: matchEraPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseEraPatterns,
      defaultParseWidth: "any"
    }),
    quarter: buildMatchFn({
      matchPatterns: matchQuarterPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseQuarterPatterns,
      defaultParseWidth: "any",
      valueCallback: function(index) {
        return index + 1;
      }
    }),
    month: buildMatchFn({
      matchPatterns: matchMonthPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseMonthPatterns,
      defaultParseWidth: "any"
    }),
    day: buildMatchFn({
      matchPatterns: matchDayPatterns,
      defaultMatchWidth: "wide",
      parsePatterns: parseDayPatterns,
      defaultParseWidth: "any"
    }),
    dayPeriod: buildMatchFn({
      matchPatterns: matchDayPeriodPatterns,
      defaultMatchWidth: "any",
      parsePatterns: parseDayPeriodPatterns,
      defaultParseWidth: "any"
    })
  };
  var match_default = match;

  // node_modules/date-fns/esm/locale/en-US/index.js
  var locale = {
    code: "en-US",
    formatDistance: formatDistance_default,
    formatLong: formatLong_default,
    formatRelative: formatRelative_default,
    localize: localize_default,
    match: match_default,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };
  var en_US_default = locale;

  // node_modules/date-fns/esm/_lib/cloneObject/index.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/esm/_lib/assign/index.js
  init_define_process_env();
  init_buffer_global();
  function assign(target, dirtyObject) {
    if (target == null) {
      throw new TypeError("assign requires that input parameter not be null or undefined");
    }
    dirtyObject = dirtyObject || {};
    for (var property in dirtyObject) {
      if (Object.prototype.hasOwnProperty.call(dirtyObject, property)) {
        target[property] = dirtyObject[property];
      }
    }
    return target;
  }

  // node_modules/date-fns/esm/_lib/cloneObject/index.js
  function cloneObject(dirtyObject) {
    return assign({}, dirtyObject);
  }

  // node_modules/date-fns/esm/formatDistanceStrict/index.js
  init_define_process_env();
  init_buffer_global();
  var MILLISECONDS_IN_MINUTE = 1e3 * 60;
  var MINUTES_IN_DAY = 60 * 24;
  var MINUTES_IN_MONTH = MINUTES_IN_DAY * 30;
  var MINUTES_IN_YEAR = MINUTES_IN_DAY * 365;
  function formatDistanceStrict(dirtyDate, dirtyBaseDate) {
    var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
    requiredArgs(2, arguments);
    var locale2 = options.locale || en_US_default;
    if (!locale2.formatDistance) {
      throw new RangeError("locale must contain localize.formatDistance property");
    }
    var comparison = compareAsc(dirtyDate, dirtyBaseDate);
    if (isNaN(comparison)) {
      throw new RangeError("Invalid time value");
    }
    var localizeOptions = cloneObject(options);
    localizeOptions.addSuffix = Boolean(options.addSuffix);
    localizeOptions.comparison = comparison;
    var dateLeft;
    var dateRight;
    if (comparison > 0) {
      dateLeft = toDate(dirtyBaseDate);
      dateRight = toDate(dirtyDate);
    } else {
      dateLeft = toDate(dirtyDate);
      dateRight = toDate(dirtyBaseDate);
    }
    var roundingMethod = options.roundingMethod == null ? "round" : String(options.roundingMethod);
    var roundingMethodFn;
    if (roundingMethod === "floor") {
      roundingMethodFn = Math.floor;
    } else if (roundingMethod === "ceil") {
      roundingMethodFn = Math.ceil;
    } else if (roundingMethod === "round") {
      roundingMethodFn = Math.round;
    } else {
      throw new RangeError("roundingMethod must be 'floor', 'ceil' or 'round'");
    }
    var milliseconds = dateRight.getTime() - dateLeft.getTime();
    var minutes = milliseconds / MILLISECONDS_IN_MINUTE;
    var timezoneOffset = getTimezoneOffsetInMilliseconds(dateRight) - getTimezoneOffsetInMilliseconds(dateLeft);
    var dstNormalizedMinutes = (milliseconds - timezoneOffset) / MILLISECONDS_IN_MINUTE;
    var unit;
    if (options.unit == null) {
      if (minutes < 1) {
        unit = "second";
      } else if (minutes < 60) {
        unit = "minute";
      } else if (minutes < MINUTES_IN_DAY) {
        unit = "hour";
      } else if (dstNormalizedMinutes < MINUTES_IN_MONTH) {
        unit = "day";
      } else if (dstNormalizedMinutes < MINUTES_IN_YEAR) {
        unit = "month";
      } else {
        unit = "year";
      }
    } else {
      unit = String(options.unit);
    }
    if (unit === "second") {
      var seconds = roundingMethodFn(milliseconds / 1e3);
      return locale2.formatDistance("xSeconds", seconds, localizeOptions);
    } else if (unit === "minute") {
      var roundedMinutes = roundingMethodFn(minutes);
      return locale2.formatDistance("xMinutes", roundedMinutes, localizeOptions);
    } else if (unit === "hour") {
      var hours = roundingMethodFn(minutes / 60);
      return locale2.formatDistance("xHours", hours, localizeOptions);
    } else if (unit === "day") {
      var days = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_DAY);
      return locale2.formatDistance("xDays", days, localizeOptions);
    } else if (unit === "month") {
      var months = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_MONTH);
      return months === 12 && options.unit !== "month" ? locale2.formatDistance("xYears", 1, localizeOptions) : locale2.formatDistance("xMonths", months, localizeOptions);
    } else if (unit === "year") {
      var years = roundingMethodFn(dstNormalizedMinutes / MINUTES_IN_YEAR);
      return locale2.formatDistance("xYears", years, localizeOptions);
    }
    throw new RangeError("unit must be 'second', 'minute', 'hour', 'day', 'month' or 'year'");
  }

  // js/change.js
  var Change = class {
    constructor(context, changeObj) {
      this.context = context;
      Object.assign(this, changeObj);
    }
    fetchChangesetData(id) {
      return new Promise((resolve, reject) => {
        const cachedData = this.context.changesetCache.get(id);
        if (cachedData) {
          return resolve(cachedData);
        }
        fetch(`//www.openstreetmap.org/api/0.6/changeset/${id}`, {
          mode: "cors"
        }).then((response) => response.text()).then((responseString) => {
          return new window.DOMParser().parseFromString(responseString, "text/xml");
        }).then((data) => {
          const changesetData = {};
          const tags = data.getElementsByTagName("tag");
          for (let i = 0; i < tags.length; i++) {
            const key = tags[i].getAttribute("k");
            const value = tags[i].getAttribute("v");
            changesetData[key] = value;
          }
          this.context.changesetCache.set(id, changesetData);
          resolve(changesetData);
        }).catch((err) => {
          console.log("Error fetching changeset data", err);
          reject(err);
        });
      });
    }
    fetchDisplayName(boundsCenter) {
      return new Promise((resolve, reject) => {
        const CLOSE_THRESHOLD_METERS = 1e4;
        const closeByKey = this.context.geocodeCache.keys().find((key) => {
          const [lat2, lon2] = key.split(",").map(parseFloat);
          return boundsCenter.distanceTo(L.latLng(lat2, lon2)) < CLOSE_THRESHOLD_METERS;
        });
        if (closeByKey) {
          const cachedGeocode = this.context.geocodeCache.get(closeByKey);
          if (cachedGeocode) {
            return resolve(cachedGeocode);
          }
        }
        const lat = boundsCenter.lat;
        const lon = boundsCenter.lng;
        const nominatimUrl = `//nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=5`;
        fetch(nominatimUrl, {
          mode: "cors"
        }).then((response) => response.json()).then((data) => {
          const id = `${lat},${lon}`;
          const displayName = data.display_name;
          this.context.geocodeCache.set(id, displayName);
          resolve(displayName);
        }).catch((err) => {
          console.error("Error fetching location", err);
          reject(err);
        });
      });
    }
    isRelevant() {
      return new Promise((resolve) => {
        let commentRelevance = false;
        let keyRelevance = false;
        const mapElement = this.neu || this.old;
        if (this.context.comment === "" && !this.context.key) {
          return resolve(true);
        }
        this.fetchChangesetData(mapElement.changeset).then((changesetData) => {
          commentRelevance = this.context.comment !== "" && changesetData.comment?.toLowerCase().includes(this.context.comment.toLowerCase()) || false;
          keyRelevance = Object.keys(mapElement.tags).includes(this.context.key);
          if (!(commentRelevance || keyRelevance)) {
            console.log(
              "Skipping map element " + mapElement.id + " because it didn't match filters."
            );
          }
          return resolve(commentRelevance | keyRelevance);
        });
      });
    }
    createTagText() {
      const showTags = [
        "building",
        "natural",
        "leisure",
        "waterway",
        "barrier",
        "landuse",
        "highway",
        "power",
        "amenity",
        "place",
        "addr:housenumber",
        "memorial",
        "historic",
        "shop",
        "office",
        "emergency"
      ];
      const mapElement = this.type === "delete" ? this.old : this.neu;
      const tags = mapElement.tags;
      for (let i = 0; i < showTags.length; i++) {
        if (tags[showTags[i]]) {
          return showTags[i] + "=" + tags[showTags[i]];
        }
      }
      return "a " + mapElement.type;
    }
    enhance() {
      const mapElement = this.type === "delete" ? this.old : this.neu;
      const bounds = mapElement.type === "way" ? makeBbox(mapElement.bounds) : makeBbox([
        mapElement.lat,
        mapElement.lon,
        mapElement.lat,
        mapElement.lon
      ]);
      const pastTense = {
        create: "created",
        modify: "modified",
        delete: "deleted"
      };
      this.meta = {
        action: pastTense[this.type],
        bounds,
        id: mapElement.id,
        type: mapElement.type,
        // always pull in the neu user, timestamp, and changeset info
        user: this.neu.user,
        changeset: this.neu.changeset
      };
      this.meta.timetext = formatDistanceStrict(
        new Date(this.neu.timestamp),
        /* @__PURE__ */ new Date(),
        { addSuffix: true }
      );
      this.tagText = this.createTagText();
      return Promise.all([
        this.fetchChangesetData(this.meta.changeset),
        this.fetchDisplayName(bounds.getCenter())
      ]).then(([changesetData, displayName]) => {
        this.meta.comment = changesetData.comment;
        this.meta.createdBy = changesetData.created_by;
        this.meta.displayName = displayName;
        return this;
      });
    }
  };

  // js/maps.js
  init_define_process_env();
  init_buffer_global();

  // js/config.js
  init_define_process_env();
  init_buffer_global();
  var config = {
    "bounds": "-90,-180,90,180",
    "comment": "",
    "runTime": 2,
    "debug": false
  };

  // js/maps.js
  var Maps = class {
    constructor(context, bbox) {
      this.context = context;
      const filteredBbox = context.bounds != config.bounds;
      const defaultCenter = "51.505,-0.09".split(",");
      this.main = L.map("map", {
        zoomControl: false,
        dragging: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false
      });
      if (filteredBbox) {
        L.rectangle(bbox, {
          color: "#ffffff",
          weight: 5,
          fill: false
        }).addTo(this.main);
        this.main.fitBounds(bbox);
      } else {
        this.main.setView(defaultCenter, 13);
      }
      this.overviewMap = L.map("overview_map", {
        zoomControl: false,
        dragging: false,
        touchZoom: false,
        scrollWheelZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        minZoom: 4,
        maxZoom: 8
      });
      if (filteredBbox) {
        L.rectangle(bbox, {
          color: "#ffffff",
          weight: 1,
          fill: false
        }).addTo(this.overviewMap);
        this.overviewMap.fitBounds(bbox);
      } else {
        this.overviewMap.setView(defaultCenter, 4);
      }
      const isLocal = window.location.hostname === "localhost" || window.location.hostname.startsWith("192");
      if (isLocal) {
        this.mainTileLayer = new L.TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
          crossOrigin: "anonymous"
        }).addTo(this.main);
        new L.TileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          minZoom: 4,
          maxZoom: 8,
          attribution: '&copy; <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.overviewMap);
      } else {
        const mapboxKey = "pk.eyJ1Ijoib3BlbnN0cmVldG1hcHVzIiwiYSI6ImNqdTM1ZWxqeTBqa2MzeXBhODIxdnE2eG8ifQ.zyhAo181muDzPRdyYsqLGw";
        this.mainTileLayer = new L.TileLayer(
          "https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}",
          {
            style_id: "cju35gljt1bpm1fp2z93dlyca",
            key: mapboxKey,
            attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>',
            crossOrigin: "anonymous"
          }
        ).addTo(this.main);
        new L.TileLayer(
          "https://api.mapbox.com/styles/v1/openstreetmapus/{style_id}/tiles/256/{z}/{x}/{y}?access_token={key}",
          {
            minZoom: 4,
            maxZoom: 8,
            style_id: "cj8xtgojqhd3z2sorzpi01csj",
            key: mapboxKey,
            attribution: '<a href="https://mapbox.com/about/maps/">Terms &amp; Conditions</a>'
          }
        ).addTo(this.overviewMap);
      }
      this.main.attributionControl.setPrefix("");
      this.overviewMap.attributionControl.setPrefix(false);
      this.featureGroup = L.featureGroup().addTo(this.main);
      this.debugRect = null;
      if (this.context.debug) {
        this.main.on("moveend", () => this.updateDebugRect());
      }
    }
    // Calculate the no-pan zone bounds
    getNoPanBounds() {
      const currentBounds = this.main.getBounds();
      const north = currentBounds.getNorth();
      const south = currentBounds.getSouth();
      const east = currentBounds.getEast();
      const west = currentBounds.getWest();
      const latHeight = north - south;
      const lngWidth = east - west;
      return L.latLngBounds(
        [south + 0.125 * latHeight, west + 0.125 * lngWidth],
        [north - 0.05 * latHeight, east - 0.125 * lngWidth]
      );
    }
    updateDebugRect() {
      const noPanBounds = this.getNoPanBounds();
      if (this.debugRect) {
        this.main.removeLayer(this.debugRect);
      }
      this.debugRect = L.rectangle(noPanBounds, {
        color: "#00ffff",
        weight: 2,
        fill: false,
        dashArray: "5, 5",
        interactive: false
      }).addTo(this.main);
    }
    pruneMapElements() {
      const visibleBounds = this.main.getBounds();
      this.featureGroup.eachLayer((l) => {
        const featureBounds = "getBounds" in l ? l.getBounds() : l.getLatLng().toBounds(10);
        if (visibleBounds.intersects(featureBounds)) {
          l.setStyle({ opacity: 0.5 });
        } else {
          this.featureGroup.removeLayer(l);
        }
      });
    }
    drawMapElement(change, cb) {
      this.pruneMapElements();
      const noPanBounds = this.getNoPanBounds();
      if (!noPanBounds.contains(change.meta.bounds)) {
        this.main.fitBounds(change.meta.bounds);
      } else if (this.context.debug) {
        this.updateDebugRect();
      }
      this.overviewMap.panTo(change.meta.bounds.getCenter());
      const color = {
        create: "#B7FF00",
        modify: "#FF00EA",
        delete: "#FF0000"
      }[change.type];
      const drawTime = this.context.runTime * 0.7;
      const waitTime = this.context.runTime - drawTime;
      const mapElement = change.type === "delete" ? change.old : change.neu;
      switch (mapElement.type) {
        case "way": {
          let drawPt = function(pt) {
            newLine.addLatLng(pt);
            if (mapElement.linestring.length) {
              window.setTimeout(() => {
                drawPt(mapElement.linestring.pop());
              }, perPt);
            } else {
              window.setTimeout(cb, waitTime);
            }
          };
          let newLine;
          if (mapElement.tags.building || mapElement.tags.area) {
            newLine = L.polygon([], {
              opacity: 1,
              color,
              fill: color,
              weight: 5,
              interactive: false
            }).addTo(this.featureGroup);
          } else {
            newLine = L.polyline([], {
              opacity: 1,
              color,
              weight: 5,
              interactive: false
            }).addTo(this.featureGroup);
          }
          const perPt = drawTime / mapElement.linestring.length;
          newLine.addLatLng(mapElement.linestring.pop());
          drawPt(mapElement.linestring.pop());
          break;
        }
        case "node": {
          let nodeMarkerAnimation = function() {
            newMarker.setRadius(radii.shift());
            if (radii.length) {
              window.setTimeout(nodeMarkerAnimation, perRadius);
            } else {
              window.setTimeout(cb, waitTime);
            }
          };
          const radii = [];
          for (let i = 0; i <= 25; i += 1) {
            radii.push(17 * Math.sin(i / 10));
          }
          const newMarker = L.circleMarker([mapElement.lat, mapElement.lon], {
            opacity: 1,
            color,
            weight: 5,
            interactive: false
          }).addTo(this.featureGroup);
          const perRadius = drawTime / radii.length;
          nodeMarkerAnimation();
          break;
        }
      }
    }
  };

  // js/ui.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/mustache/mustache.mjs
  init_define_process_env();
  init_buffer_global();
  var objectToString = Object.prototype.toString;
  var isArray2 = Array.isArray || function isArrayPolyfill(object) {
    return objectToString.call(object) === "[object Array]";
  };
  function isFunction(object) {
    return typeof object === "function";
  }
  function typeStr(obj) {
    return isArray2(obj) ? "array" : typeof obj;
  }
  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }
  function hasProperty(obj, propName) {
    return obj != null && typeof obj === "object" && propName in obj;
  }
  function primitiveHasOwnProperty(primitive, propName) {
    return primitive != null && typeof primitive !== "object" && primitive.hasOwnProperty && primitive.hasOwnProperty(propName);
  }
  var regExpTest = RegExp.prototype.test;
  function testRegExp(re, string) {
    return regExpTest.call(re, string);
  }
  var nonSpaceRe = /\S/;
  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }
  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
    "/": "&#x2F;",
    "`": "&#x60;",
    "=": "&#x3D;"
  };
  function escapeHtml(string) {
    return String(string).replace(/[&<>"'`=\/]/g, function fromEntityMap(s) {
      return entityMap[s];
    });
  }
  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var equalsRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;
  function parseTemplate(template, tags) {
    if (!template)
      return [];
    var lineHasNonSpace = false;
    var sections = [];
    var tokens = [];
    var spaces = [];
    var hasTag = false;
    var nonSpace = false;
    var indentation = "";
    var tagIndex = 0;
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length)
          delete tokens[spaces.pop()];
      } else {
        spaces = [];
      }
      hasTag = false;
      nonSpace = false;
    }
    var openingTagRe, closingTagRe, closingCurlyRe;
    function compileTags(tagsToCompile) {
      if (typeof tagsToCompile === "string")
        tagsToCompile = tagsToCompile.split(spaceRe, 2);
      if (!isArray2(tagsToCompile) || tagsToCompile.length !== 2)
        throw new Error("Invalid tags: " + tagsToCompile);
      openingTagRe = new RegExp(escapeRegExp(tagsToCompile[0]) + "\\s*");
      closingTagRe = new RegExp("\\s*" + escapeRegExp(tagsToCompile[1]));
      closingCurlyRe = new RegExp("\\s*" + escapeRegExp("}" + tagsToCompile[1]));
    }
    compileTags(tags || mustache.tags);
    var scanner = new Scanner(template);
    var start, type2, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;
      value = scanner.scanUntil(openingTagRe);
      if (value) {
        for (var i = 0, valueLength = value.length; i < valueLength; ++i) {
          chr = value.charAt(i);
          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
            indentation += chr;
          } else {
            nonSpace = true;
            lineHasNonSpace = true;
            indentation += " ";
          }
          tokens.push(["text", chr, start, start + 1]);
          start += 1;
          if (chr === "\n") {
            stripSpace();
            indentation = "";
            tagIndex = 0;
            lineHasNonSpace = false;
          }
        }
      }
      if (!scanner.scan(openingTagRe))
        break;
      hasTag = true;
      type2 = scanner.scan(tagRe) || "name";
      scanner.scan(whiteRe);
      if (type2 === "=") {
        value = scanner.scanUntil(equalsRe);
        scanner.scan(equalsRe);
        scanner.scanUntil(closingTagRe);
      } else if (type2 === "{") {
        value = scanner.scanUntil(closingCurlyRe);
        scanner.scan(curlyRe);
        scanner.scanUntil(closingTagRe);
        type2 = "&";
      } else {
        value = scanner.scanUntil(closingTagRe);
      }
      if (!scanner.scan(closingTagRe))
        throw new Error("Unclosed tag at " + scanner.pos);
      if (type2 == ">") {
        token = [type2, value, start, scanner.pos, indentation, tagIndex, lineHasNonSpace];
      } else {
        token = [type2, value, start, scanner.pos];
      }
      tagIndex++;
      tokens.push(token);
      if (type2 === "#" || type2 === "^") {
        sections.push(token);
      } else if (type2 === "/") {
        openSection = sections.pop();
        if (!openSection)
          throw new Error('Unopened section "' + value + '" at ' + start);
        if (openSection[1] !== value)
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
      } else if (type2 === "name" || type2 === "{" || type2 === "&") {
        nonSpace = true;
      } else if (type2 === "=") {
        compileTags(value);
      }
    }
    stripSpace();
    openSection = sections.pop();
    if (openSection)
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    return nestTokens(squashTokens(tokens));
  }
  function squashTokens(tokens) {
    var squashedTokens = [];
    var token, lastToken;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];
      if (token) {
        if (token[0] === "text" && lastToken && lastToken[0] === "text") {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }
    return squashedTokens;
  }
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];
    var token, section;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      token = tokens[i];
      switch (token[0]) {
        case "#":
        case "^":
          collector.push(token);
          sections.push(token);
          collector = token[4] = [];
          break;
        case "/":
          section = sections.pop();
          section[5] = token[2];
          collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
          break;
        default:
          collector.push(token);
      }
    }
    return nestedTokens;
  }
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }
  Scanner.prototype.eos = function eos() {
    return this.tail === "";
  };
  Scanner.prototype.scan = function scan(re) {
    var match2 = this.tail.match(re);
    if (!match2 || match2.index !== 0)
      return "";
    var string = match2[0];
    this.tail = this.tail.substring(string.length);
    this.pos += string.length;
    return string;
  };
  Scanner.prototype.scanUntil = function scanUntil(re) {
    var index = this.tail.search(re), match2;
    switch (index) {
      case -1:
        match2 = this.tail;
        this.tail = "";
        break;
      case 0:
        match2 = "";
        break;
      default:
        match2 = this.tail.substring(0, index);
        this.tail = this.tail.substring(index);
    }
    this.pos += match2.length;
    return match2;
  };
  function Context(view, parentContext) {
    this.view = view;
    this.cache = { ".": this.view };
    this.parent = parentContext;
  }
  Context.prototype.push = function push(view) {
    return new Context(view, this);
  };
  Context.prototype.lookup = function lookup(name) {
    var cache = this.cache;
    var value;
    if (cache.hasOwnProperty(name)) {
      value = cache[name];
    } else {
      var context = this, intermediateValue, names, index, lookupHit = false;
      while (context) {
        if (name.indexOf(".") > 0) {
          intermediateValue = context.view;
          names = name.split(".");
          index = 0;
          while (intermediateValue != null && index < names.length) {
            if (index === names.length - 1)
              lookupHit = hasProperty(intermediateValue, names[index]) || primitiveHasOwnProperty(intermediateValue, names[index]);
            intermediateValue = intermediateValue[names[index++]];
          }
        } else {
          intermediateValue = context.view[name];
          lookupHit = hasProperty(context.view, name);
        }
        if (lookupHit) {
          value = intermediateValue;
          break;
        }
        context = context.parent;
      }
      cache[name] = value;
    }
    if (isFunction(value))
      value = value.call(this.view);
    return value;
  };
  function Writer() {
    this.templateCache = {
      _cache: {},
      set: function set(key, value) {
        this._cache[key] = value;
      },
      get: function get(key) {
        return this._cache[key];
      },
      clear: function clear() {
        this._cache = {};
      }
    };
  }
  Writer.prototype.clearCache = function clearCache() {
    if (typeof this.templateCache !== "undefined") {
      this.templateCache.clear();
    }
  };
  Writer.prototype.parse = function parse(template, tags) {
    var cache = this.templateCache;
    var cacheKey = template + ":" + (tags || mustache.tags).join(":");
    var isCacheEnabled = typeof cache !== "undefined";
    var tokens = isCacheEnabled ? cache.get(cacheKey) : void 0;
    if (tokens == void 0) {
      tokens = parseTemplate(template, tags);
      isCacheEnabled && cache.set(cacheKey, tokens);
    }
    return tokens;
  };
  Writer.prototype.render = function render(template, view, partials, config2) {
    var tags = this.getConfigTags(config2);
    var tokens = this.parse(template, tags);
    var context = view instanceof Context ? view : new Context(view, void 0);
    return this.renderTokens(tokens, context, partials, template, config2);
  };
  Writer.prototype.renderTokens = function renderTokens(tokens, context, partials, originalTemplate, config2) {
    var buffer = "";
    var token, symbol, value;
    for (var i = 0, numTokens = tokens.length; i < numTokens; ++i) {
      value = void 0;
      token = tokens[i];
      symbol = token[0];
      if (symbol === "#") value = this.renderSection(token, context, partials, originalTemplate, config2);
      else if (symbol === "^") value = this.renderInverted(token, context, partials, originalTemplate, config2);
      else if (symbol === ">") value = this.renderPartial(token, context, partials, config2);
      else if (symbol === "&") value = this.unescapedValue(token, context);
      else if (symbol === "name") value = this.escapedValue(token, context, config2);
      else if (symbol === "text") value = this.rawValue(token);
      if (value !== void 0)
        buffer += value;
    }
    return buffer;
  };
  Writer.prototype.renderSection = function renderSection(token, context, partials, originalTemplate, config2) {
    var self2 = this;
    var buffer = "";
    var value = context.lookup(token[1]);
    function subRender(template) {
      return self2.render(template, context, partials, config2);
    }
    if (!value) return;
    if (isArray2(value)) {
      for (var j = 0, valueLength = value.length; j < valueLength; ++j) {
        buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate, config2);
      }
    } else if (typeof value === "object" || typeof value === "string" || typeof value === "number") {
      buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate, config2);
    } else if (isFunction(value)) {
      if (typeof originalTemplate !== "string")
        throw new Error("Cannot use higher-order sections without the original template");
      value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);
      if (value != null)
        buffer += value;
    } else {
      buffer += this.renderTokens(token[4], context, partials, originalTemplate, config2);
    }
    return buffer;
  };
  Writer.prototype.renderInverted = function renderInverted(token, context, partials, originalTemplate, config2) {
    var value = context.lookup(token[1]);
    if (!value || isArray2(value) && value.length === 0)
      return this.renderTokens(token[4], context, partials, originalTemplate, config2);
  };
  Writer.prototype.indentPartial = function indentPartial(partial, indentation, lineHasNonSpace) {
    var filteredIndentation = indentation.replace(/[^ \t]/g, "");
    var partialByNl = partial.split("\n");
    for (var i = 0; i < partialByNl.length; i++) {
      if (partialByNl[i].length && (i > 0 || !lineHasNonSpace)) {
        partialByNl[i] = filteredIndentation + partialByNl[i];
      }
    }
    return partialByNl.join("\n");
  };
  Writer.prototype.renderPartial = function renderPartial(token, context, partials, config2) {
    if (!partials) return;
    var tags = this.getConfigTags(config2);
    var value = isFunction(partials) ? partials(token[1]) : partials[token[1]];
    if (value != null) {
      var lineHasNonSpace = token[6];
      var tagIndex = token[5];
      var indentation = token[4];
      var indentedValue = value;
      if (tagIndex == 0 && indentation) {
        indentedValue = this.indentPartial(value, indentation, lineHasNonSpace);
      }
      var tokens = this.parse(indentedValue, tags);
      return this.renderTokens(tokens, context, partials, indentedValue, config2);
    }
  };
  Writer.prototype.unescapedValue = function unescapedValue(token, context) {
    var value = context.lookup(token[1]);
    if (value != null)
      return value;
  };
  Writer.prototype.escapedValue = function escapedValue(token, context, config2) {
    var escape = this.getConfigEscape(config2) || mustache.escape;
    var value = context.lookup(token[1]);
    if (value != null)
      return typeof value === "number" && escape === mustache.escape ? String(value) : escape(value);
  };
  Writer.prototype.rawValue = function rawValue(token) {
    return token[1];
  };
  Writer.prototype.getConfigTags = function getConfigTags(config2) {
    if (isArray2(config2)) {
      return config2;
    } else if (config2 && typeof config2 === "object") {
      return config2.tags;
    } else {
      return void 0;
    }
  };
  Writer.prototype.getConfigEscape = function getConfigEscape(config2) {
    if (config2 && typeof config2 === "object" && !isArray2(config2)) {
      return config2.escape;
    } else {
      return void 0;
    }
  };
  var mustache = {
    name: "mustache.js",
    version: "4.2.0",
    tags: ["{{", "}}"],
    clearCache: void 0,
    escape: void 0,
    parse: void 0,
    render: void 0,
    Scanner: void 0,
    Context: void 0,
    Writer: void 0,
    /**
     * Allows a user to override the default caching strategy, by providing an
     * object with set, get and clear methods. This can also be used to disable
     * the cache by setting it to the literal `undefined`.
     */
    set templateCache(cache) {
      defaultWriter.templateCache = cache;
    },
    /**
     * Gets the default or overridden caching object from the default writer.
     */
    get templateCache() {
      return defaultWriter.templateCache;
    }
  };
  var defaultWriter = new Writer();
  mustache.clearCache = function clearCache2() {
    return defaultWriter.clearCache();
  };
  mustache.parse = function parse2(template, tags) {
    return defaultWriter.parse(template, tags);
  };
  mustache.render = function render2(template, view, partials, config2) {
    if (typeof template !== "string") {
      throw new TypeError('Invalid template! Template should be a "string" but "' + typeStr(template) + '" was given as the first argument for mustache#render(template, view, partials)');
    }
    return defaultWriter.render(template, view, partials, config2);
  };
  mustache.escape = escapeHtml;
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;
  var mustache_default = mustache;

  // js/ui.js
  var Ui = class {
    constructor() {
      this.changesetInfo = document.getElementById("changeset_info");
      this.changesetTemplate = document.getElementById("changeset-template").innerHTML;
    }
    update(change) {
      document.getElementById("loading").classList.add("fade-out");
      document.querySelectorAll(".overlay").forEach((overlay) => {
        overlay.classList.add("fade-in");
      });
      this._updateComment(change);
      this._updateLocation(change);
      this.changesetInfo.innerHTML = mustache_default.render(this.changesetTemplate, change);
    }
    _updateComment(change) {
      document.getElementById("comment").textContent = change.meta.comment + " in " + change.meta.createdBy;
    }
    updateQueueSize(numChanges) {
      document.getElementById("queuesize").textContent = numChanges;
    }
    _updateLocation(change) {
      document.getElementById("reverse-location").textContent = change.meta.displayName;
    }
  };

  // js/ui/sidebar.js
  init_define_process_env();
  init_buffer_global();
  var Sidebar = class {
    constructor(hashParams, windowLocationObj, context) {
      this.hashParams = hashParams;
      this.windowLocationObj = windowLocationObj;
      this.context = context;
      this.application = document.body;
      this.sidebarButton = document.getElementById("sidebar-button");
      this.settingsForm = document.getElementById("settings-form");
      this.runTimeElement = document.getElementsByName("runTime")[0];
      this.runTimeElement.value = -1 * this.context.runTime / 1e3;
      this.commentElement = document.getElementsByName("comment")[0];
      this.commentElement.value = this.context.comment;
      this.bboxLinkElement = document.getElementById("bbox-link");
      this._updateBboxLink();
    }
    initializeEventListeners() {
      this.sidebarButton.addEventListener("click", () => {
        this.application.classList.toggle("sidebar-visible");
      });
      this.runTimeElement.addEventListener("change", () => {
        this._updateRuntime(-1 * this.runTimeElement.value);
      });
      this.settingsForm.addEventListener("submit", (e) => {
        e.preventDefault();
        this._updateComment(this.commentElement.value);
      });
      ["keyup", "change"].forEach((eventName) => {
        this.commentElement.addEventListener(eventName, (e) => {
          this._updateComment(this.commentElement.value);
        });
      });
      window.addEventListener("hashchange", () => {
        this._updateBboxLink();
      });
    }
    _updateRuntime(newRunTime) {
      this._updateHash("runTime", newRunTime);
      this.context.runTime = newRunTime * 1e3;
    }
    _updateComment(comment) {
      this._updateHash("comment", comment);
      this.context.comment = comment;
    }
    _updateHash(key, value) {
      this.hashParams.set(key, value);
      this.windowLocationObj.hash = "#" + this.hashParams.toString();
    }
    _updateBboxLink() {
      const bboxUrl = new URL("bbox.html", this.windowLocationObj.href);
      bboxUrl.hash = this.hashParams;
      this.bboxLinkElement.setAttribute("href", bboxUrl);
    }
  };

  // js/filters.js
  init_define_process_env();
  init_buffer_global();
  function happenedToday(change) {
    return change.neu && new Date(change.neu.timestamp).toDateString() === (/* @__PURE__ */ new Date()).toDateString();
  }
  function userNotIgnored(change) {
    const ignore = ["bot-mode"];
    return change.old && ignore.indexOf(change.old.user) === -1 || change.neu && ignore.indexOf(change.neu.user) === -1;
  }
  function wayLongEnough(change) {
    const type2 = change.old && change.old.type || change.neu && change.neu.type;
    if (type2 !== "way") return true;
    return change.old && change.old.linestring && change.old.linestring.length > 4 || change.neu && change.neu.linestring && change.neu.linestring.length > 4;
  }
  function acceptableType(change) {
    return change.old && change.old.type || (change.neu && change.neu.type) !== "relation";
  }
  function withinBbox(change, bbox) {
    const c = change;
    const type2 = c.old && c.old.type || c.neu && c.neu.type;
    let within = false;
    if (type2 == "way") {
      const bboxIntersectsOld = c.old && c.old.bounds && bbox.intersects(makeBbox(c.old.bounds));
      const bboxIntersectsNew = c.neu && c.neu.bounds && bbox.intersects(makeBbox(c.neu.bounds));
      within = bboxIntersectsOld || bboxIntersectsNew;
    } else if (type2 == "node") {
      const bboxContainsOld = c.old && c.old.lat && c.old.lon && bbox.contains(new L.LatLng(c.old.lat, c.old.lon));
      const bboxContainsNew = c.neu && c.neu.lat && c.neu.lon && bbox.contains(new L.LatLng(c.neu.lat, c.neu.lon));
      within = bboxContainsOld || bboxContainsNew;
    } else {
      console.error("no bbox check for this geometry type");
    }
    return within;
  }
  function hasTags(change) {
    return change.neu && Object.keys(change.neu.tags || {}).length > 0 || change.old && Object.keys(change.old.tags || {}).length > 0;
  }

  // js/site.js
  var import_osm_stream = __toESM(require_osm_stream(), 1);
  var import_lru_cache = __toESM(require_lru_cache(), 1);
  function init2(windowLocationObj) {
    const ui = new Ui();
    const hashParams = new URLSearchParams(windowLocationObj.hash.replace("#", ""));
    const params = Object.fromEntries(hashParams);
    const context = setContext(params);
    let queue = [];
    const bbox = makeBbox(context.bounds);
    const requestingBbox = context.bounds != config.bounds && isBboxSizeAcceptable(bbox) ? makeBboxString(makeBbox(context.bounds)) : null;
    const maxDiffRetries = 2;
    import_osm_stream.default.runFn((err, data) => {
      queue = data.filter(happenedToday).filter(userNotIgnored).filter(acceptableType).filter(hasTags).filter(wayLongEnough).filter((change) => withinBbox(change, bbox)).sort((a, b) => {
        return +new Date(a.neu && a.neu.timestamp) - +new Date(b.neu && b.neu.timestamp);
      });
    }, null, null, requestingBbox, maxDiffRetries);
    const maps = new Maps(context, bbox);
    const sidebar = new Sidebar(hashParams, windowLocationObj, context);
    sidebar.initializeEventListeners();
    function controller() {
      if (queue.length) {
        const change = new Change(context, queue.pop());
        ui.updateQueueSize(queue.length);
        change.isRelevant().then((isRelevant) => {
          if (isRelevant) {
            change.enhance().then(() => {
              ui.update(change);
              maps.drawMapElement(change, controller);
            });
          } else {
            controller();
          }
        });
      } else {
        setTimeout(controller, context.runTime);
      }
    }
    controller();
  }
  function setContext(obj) {
    const comment = obj.comment || config.comment;
    if (comment.length) document.title += ` # ${comment}`;
    const context = Object.assign({}, config, obj);
    context.bounds = context.bounds.split(",");
    context.runTime = 1e3 * context.runTime;
    context.debug = context.debug === "true" || context.debug === true;
    context.changesetCache = (0, import_lru_cache.default)(50);
    context.geocodeCache = (0, import_lru_cache.default)(200);
    return context;
  }
  init2(window.location);
})();
/*! Bundled license information:

ieee754/index.js:
  (*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> *)

buffer/index.js:
  (*!
   * The buffer module from node.js, for the browser.
   *
   * @author   Feross Aboukhadijeh <https://feross.org>
   * @license  MIT
   *)

reqwest/reqwest.js:
  (*!
    * Reqwest! A general purpose XHR connection manager
    * (c) Dustin Diaz 2013
    * https://github.com/ded/reqwest
    * license MIT
    *)

mustache/mustache.mjs:
  (*!
   * mustache.js - Logic-less {{mustache}} templates with JavaScript
   * http://github.com/janl/mustache.js
   *)
*/
