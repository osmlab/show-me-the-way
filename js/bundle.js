(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __typeError = (msg) => {
    throw TypeError(msg);
  };
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __accessCheck = (obj, member, msg) => member.has(obj) || __typeError("Cannot " + msg);
  var __privateGet = (obj, member, getter) => (__accessCheck(obj, member, "read from private field"), getter ? getter.call(obj) : member.get(obj));
  var __privateAdd = (obj, member, value) => member.has(obj) ? __typeError("Cannot add the same private member more than once") : member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
  var __privateSet = (obj, member, value, setter) => (__accessCheck(obj, member, "write to private field"), setter ? setter.call(obj, value) : member.set(obj, value), value);
  var __privateMethod = (obj, member, method) => (__accessCheck(obj, member, "access private method"), method);
  var __privateWrapper = (obj, member, setter, getter) => ({
    set _(value) {
      __privateSet(obj, member, value, setter);
    },
    get _() {
      return __privateGet(obj, member, getter);
    }
  });

  // <define:process.env>
  var init_define_process_env = __esm({
    "<define:process.env>"() {
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
      Buffer3.prototype.inspect = function inspect() {
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
      var hexSliceLookupTable = (function() {
        const alphabet = "0123456789abcdef";
        const table = new Array(256);
        for (let i = 0; i < 16; ++i) {
          const i16 = i * 16;
          for (let j = 0; j < 16; ++j) {
            table[i16 + j] = alphabet[i] + alphabet[j];
          }
        }
        return table;
      })();
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
      !(function(name, context, definition) {
        if (typeof module != "undefined" && module.exports) module.exports = definition();
        else if (typeof define == "function" && define.amd) define(definition);
        else context[name] = definition();
      })("reqwest", exports, function() {
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
      var osmStream2 = (function osmMinutely() {
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
      })();
      module2.exports = osmStream2;
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
    const lat1 = Number(boundsArray[0]);
    const lng1 = Number(boundsArray[1]);
    const lat2 = Number(boundsArray[2]);
    const lng2 = Number(boundsArray[3]);
    const south = Math.min(lat1, lat2);
    const north = Math.max(lat1, lat2);
    const west = Math.min(lng1, lng2);
    const east = Math.max(lng1, lng2);
    return new maplibregl.LngLatBounds(
      [west, south],
      // sw
      [east, north]
      // ne
    );
  }
  function makeBboxString(bbox) {
    return `${bbox.getWest()},${bbox.getSouth()},${bbox.getEast()},${bbox.getNorth()}`;
  }
  function isBboxSizeAcceptable(bbox) {
    const width = Math.abs(bbox.getSouth() - bbox.getNorth());
    const height = Math.abs(bbox.getWest() - bbox.getEast());
    return width * height < 2;
  }
  function distanceBetween(lat1, lon1, lat2, lon2) {
    const R = 6371e3;
    const lat1Rad = lat1 * Math.PI / 180;
    const lat2Rad = lat2 * Math.PI / 180;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  async function fetchWithRetry(url, options = {}, config2 = {}) {
    const { timeout = 5e3, retries = 2, backoff = 1e3 } = config2;
    for (let attempt = 0; attempt <= retries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);
      try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(timeoutId);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response;
      } catch (err) {
        clearTimeout(timeoutId);
        if (attempt === retries) throw err;
        await new Promise((r2) => setTimeout(r2, backoff * (attempt + 1)));
      }
    }
  }

  // node_modules/date-fns/constructFrom.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/constants.js
  init_define_process_env();
  init_buffer_global();
  var daysInYear = 365.2425;
  var maxTime = Math.pow(10, 8) * 24 * 60 * 60 * 1e3;
  var minTime = -maxTime;
  var millisecondsInMinute = 6e4;
  var minutesInYear = 525600;
  var minutesInMonth = 43200;
  var minutesInDay = 1440;
  var secondsInHour = 3600;
  var secondsInDay = secondsInHour * 24;
  var secondsInWeek = secondsInDay * 7;
  var secondsInYear = secondsInDay * daysInYear;
  var secondsInMonth = secondsInYear / 12;
  var secondsInQuarter = secondsInMonth * 3;
  var constructFromSymbol = /* @__PURE__ */ Symbol.for("constructDateFrom");

  // node_modules/date-fns/constructFrom.js
  function constructFrom(date, value) {
    if (typeof date === "function") return date(value);
    if (date && typeof date === "object" && constructFromSymbol in date)
      return date[constructFromSymbol](value);
    if (date instanceof Date) return new date.constructor(value);
    return new Date(value);
  }

  // node_modules/date-fns/toDate.js
  init_define_process_env();
  init_buffer_global();
  function toDate(argument, context) {
    return constructFrom(context || argument, argument);
  }

  // node_modules/date-fns/_lib/defaultOptions.js
  init_define_process_env();
  init_buffer_global();
  var defaultOptions = {};
  function getDefaultOptions() {
    return defaultOptions;
  }

  // node_modules/date-fns/_lib/getTimezoneOffsetInMilliseconds.js
  init_define_process_env();
  init_buffer_global();
  function getTimezoneOffsetInMilliseconds(date) {
    const _date = toDate(date);
    const utcDate = new Date(
      Date.UTC(
        _date.getFullYear(),
        _date.getMonth(),
        _date.getDate(),
        _date.getHours(),
        _date.getMinutes(),
        _date.getSeconds(),
        _date.getMilliseconds()
      )
    );
    utcDate.setUTCFullYear(_date.getFullYear());
    return +date - +utcDate;
  }

  // node_modules/date-fns/_lib/normalizeDates.js
  init_define_process_env();
  init_buffer_global();
  function normalizeDates(context, ...dates) {
    const normalize2 = constructFrom.bind(
      null,
      context || dates.find((date) => typeof date === "object")
    );
    return dates.map(normalize2);
  }

  // node_modules/date-fns/compareAsc.js
  init_define_process_env();
  init_buffer_global();
  function compareAsc(dateLeft, dateRight) {
    const diff = +toDate(dateLeft) - +toDate(dateRight);
    if (diff < 0) return -1;
    else if (diff > 0) return 1;
    return diff;
  }

  // node_modules/date-fns/_lib/getRoundingMethod.js
  init_define_process_env();
  init_buffer_global();
  function getRoundingMethod(method) {
    return (number) => {
      const round = method ? Math[method] : Math.trunc;
      const result = round(number);
      return result === 0 ? 0 : result;
    };
  }

  // node_modules/date-fns/_lib/defaultLocale.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/locale/en-US.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/locale/en-US/_lib/formatDistance.js
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
  var formatDistance = (token, count, options) => {
    let result;
    const tokenValue = formatDistanceLocale[token];
    if (typeof tokenValue === "string") {
      result = tokenValue;
    } else if (count === 1) {
      result = tokenValue.one;
    } else {
      result = tokenValue.other.replace("{{count}}", count.toString());
    }
    if (options?.addSuffix) {
      if (options.comparison && options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  };

  // node_modules/date-fns/locale/en-US/_lib/formatLong.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/locale/_lib/buildFormatLongFn.js
  init_define_process_env();
  init_buffer_global();
  function buildFormatLongFn(args) {
    return (options = {}) => {
      const width = options.width ? String(options.width) : args.defaultWidth;
      const format = args.formats[width] || args.formats[args.defaultWidth];
      return format;
    };
  }

  // node_modules/date-fns/locale/en-US/_lib/formatLong.js
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

  // node_modules/date-fns/locale/en-US/_lib/formatRelative.js
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
  var formatRelative = (token, _date, _baseDate, _options) => formatRelativeLocale[token];

  // node_modules/date-fns/locale/en-US/_lib/localize.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/locale/_lib/buildLocalizeFn.js
  init_define_process_env();
  init_buffer_global();
  function buildLocalizeFn(args) {
    return (value, options) => {
      const context = options?.context ? String(options.context) : "standalone";
      let valuesArray;
      if (context === "formatting" && args.formattingValues) {
        const defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
        const width = options?.width ? String(options.width) : defaultWidth;
        valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
      } else {
        const defaultWidth = args.defaultWidth;
        const width = options?.width ? String(options.width) : args.defaultWidth;
        valuesArray = args.values[width] || args.values[defaultWidth];
      }
      const index = args.argumentCallback ? args.argumentCallback(value) : value;
      return valuesArray[index];
    };
  }

  // node_modules/date-fns/locale/en-US/_lib/localize.js
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
    abbreviated: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ],
    wide: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ]
  };
  var dayValues = {
    narrow: ["S", "M", "T", "W", "T", "F", "S"],
    short: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    abbreviated: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    wide: [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ]
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
  var ordinalNumber = (dirtyNumber, _options) => {
    const number = Number(dirtyNumber);
    const rem100 = number % 100;
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
      argumentCallback: (quarter) => quarter - 1
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

  // node_modules/date-fns/locale/en-US/_lib/match.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/date-fns/locale/_lib/buildMatchFn.js
  init_define_process_env();
  init_buffer_global();
  function buildMatchFn(args) {
    return (string, options = {}) => {
      const width = options.width;
      const matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
      const matchResult = string.match(matchPattern);
      if (!matchResult) {
        return null;
      }
      const matchedString = matchResult[0];
      const parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
      const key = Array.isArray(parsePatterns) ? findIndex(parsePatterns, (pattern) => pattern.test(matchedString)) : (
        // [TODO] -- I challenge you to fix the type
        findKey(parsePatterns, (pattern) => pattern.test(matchedString))
      );
      let value;
      value = args.valueCallback ? args.valueCallback(key) : key;
      value = options.valueCallback ? (
        // [TODO] -- I challenge you to fix the type
        options.valueCallback(value)
      ) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }
  function findKey(object, predicate) {
    for (const key in object) {
      if (Object.prototype.hasOwnProperty.call(object, key) && predicate(object[key])) {
        return key;
      }
    }
    return void 0;
  }
  function findIndex(array, predicate) {
    for (let key = 0; key < array.length; key++) {
      if (predicate(array[key])) {
        return key;
      }
    }
    return void 0;
  }

  // node_modules/date-fns/locale/_lib/buildMatchPatternFn.js
  init_define_process_env();
  init_buffer_global();
  function buildMatchPatternFn(args) {
    return (string, options = {}) => {
      const matchResult = string.match(args.matchPattern);
      if (!matchResult) return null;
      const matchedString = matchResult[0];
      const parseResult = string.match(args.parsePattern);
      if (!parseResult) return null;
      let value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
      value = options.valueCallback ? options.valueCallback(value) : value;
      const rest = string.slice(matchedString.length);
      return { value, rest };
    };
  }

  // node_modules/date-fns/locale/en-US/_lib/match.js
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
    narrow: [
      /^j/i,
      /^f/i,
      /^m/i,
      /^a/i,
      /^m/i,
      /^j/i,
      /^j/i,
      /^a/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ],
    any: [
      /^ja/i,
      /^f/i,
      /^mar/i,
      /^ap/i,
      /^may/i,
      /^jun/i,
      /^jul/i,
      /^au/i,
      /^s/i,
      /^o/i,
      /^n/i,
      /^d/i
    ]
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
      valueCallback: (value) => parseInt(value, 10)
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
      valueCallback: (index) => index + 1
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

  // node_modules/date-fns/locale/en-US.js
  var enUS = {
    code: "en-US",
    formatDistance,
    formatLong,
    formatRelative,
    localize,
    match,
    options: {
      weekStartsOn: 0,
      firstWeekContainsDate: 1
    }
  };

  // node_modules/date-fns/formatDistanceStrict.js
  init_define_process_env();
  init_buffer_global();
  function formatDistanceStrict(laterDate, earlierDate, options) {
    const defaultOptions2 = getDefaultOptions();
    const locale = options?.locale ?? defaultOptions2.locale ?? enUS;
    const comparison = compareAsc(laterDate, earlierDate);
    if (isNaN(comparison)) {
      throw new RangeError("Invalid time value");
    }
    const localizeOptions = Object.assign({}, options, {
      addSuffix: options?.addSuffix,
      comparison
    });
    const [laterDate_, earlierDate_] = normalizeDates(
      options?.in,
      ...comparison > 0 ? [earlierDate, laterDate] : [laterDate, earlierDate]
    );
    const roundingMethod = getRoundingMethod(options?.roundingMethod ?? "round");
    const milliseconds = earlierDate_.getTime() - laterDate_.getTime();
    const minutes = milliseconds / millisecondsInMinute;
    const timezoneOffset = getTimezoneOffsetInMilliseconds(earlierDate_) - getTimezoneOffsetInMilliseconds(laterDate_);
    const dstNormalizedMinutes = (milliseconds - timezoneOffset) / millisecondsInMinute;
    const defaultUnit = options?.unit;
    let unit;
    if (!defaultUnit) {
      if (minutes < 1) {
        unit = "second";
      } else if (minutes < 60) {
        unit = "minute";
      } else if (minutes < minutesInDay) {
        unit = "hour";
      } else if (dstNormalizedMinutes < minutesInMonth) {
        unit = "day";
      } else if (dstNormalizedMinutes < minutesInYear) {
        unit = "month";
      } else {
        unit = "year";
      }
    } else {
      unit = defaultUnit;
    }
    if (unit === "second") {
      const seconds = roundingMethod(milliseconds / 1e3);
      return locale.formatDistance("xSeconds", seconds, localizeOptions);
    } else if (unit === "minute") {
      const roundedMinutes = roundingMethod(minutes);
      return locale.formatDistance("xMinutes", roundedMinutes, localizeOptions);
    } else if (unit === "hour") {
      const hours = roundingMethod(minutes / 60);
      return locale.formatDistance("xHours", hours, localizeOptions);
    } else if (unit === "day") {
      const days = roundingMethod(dstNormalizedMinutes / minutesInDay);
      return locale.formatDistance("xDays", days, localizeOptions);
    } else if (unit === "month") {
      const months = roundingMethod(dstNormalizedMinutes / minutesInMonth);
      return months === 12 && defaultUnit !== "month" ? locale.formatDistance("xYears", 1, localizeOptions) : locale.formatDistance("xMonths", months, localizeOptions);
    } else {
      const years = roundingMethod(dstNormalizedMinutes / minutesInYear);
      return locale.formatDistance("xYears", years, localizeOptions);
    }
  }

  // js/change.js
  var Change = class {
    constructor(context, changeObj) {
      this.context = context;
      Object.assign(this, changeObj);
    }
    async isRelevant() {
      const mapElement = this.neu || this.old;
      if (this.context.comment === "" && !this.context.key) {
        return true;
      }
      const changesetData = await this.context.changesetService.get(mapElement.changeset);
      const commentRelevance = this.context.comment !== "" && changesetData.comment?.toLowerCase().includes(this.context.comment.toLowerCase()) || false;
      const keyRelevance = Object.keys(mapElement.tags).includes(this.context.key);
      if (!(commentRelevance || keyRelevance)) {
        console.log(
          "Skipping map element " + mapElement.id + " because it didn't match filters."
        );
      }
      return commentRelevance || keyRelevance;
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
    async enhance() {
      console.log("Enhancing change, fetching changeset + geocode...");
      const startTime = Date.now();
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
      const [changesetData, displayName] = await Promise.all([
        this.context.changesetService.get(this.meta.changeset),
        this.context.geocodeService.get(bounds.getCenter())
      ]);
      console.log(`Enhance complete in ${Date.now() - startTime}ms`);
      this.meta.comment = changesetData.comment || "";
      this.meta.createdBy = changesetData.created_by || "";
      this.meta.displayName = displayName || "";
      return this;
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
    "multi": true,
    "debug": false
  };

  // js/cities.js
  init_define_process_env();
  init_buffer_global();
  var cities = [
    // North America
    { name: "New York", landmark: "Times Square", center: [-73.9855, 40.758] },
    { name: "San Francisco", landmark: "Golden Gate Bridge", center: [-122.4783, 37.8199] },
    { name: "Mexico City", landmark: "Z\xF3calo", center: [-99.1332, 19.4326] },
    { name: "Toronto", landmark: "CN Tower", center: [-79.3871, 43.6426] },
    { name: "Vancouver", landmark: "Canada Place", center: [-123.1139, 49.2888] },
    // South America
    { name: "Rio de Janeiro", landmark: "Christ the Redeemer", center: [-43.2105, -22.9519] },
    { name: "Buenos Aires", landmark: "Obelisco", center: [-58.3816, -34.6037] },
    { name: "Lima", landmark: "Plaza Mayor", center: [-77.0282, -12.0464] },
    // Europe
    { name: "London", landmark: "Big Ben", center: [-0.1246, 51.5007] },
    { name: "Paris", landmark: "Eiffel Tower", center: [2.2945, 48.8584] },
    { name: "Rome", landmark: "Colosseum", center: [12.4924, 41.8902] },
    { name: "Berlin", landmark: "Brandenburg Gate", center: [13.3777, 52.5163] },
    { name: "Barcelona", landmark: "Sagrada Fam\xEDlia", center: [2.1744, 41.4036] },
    { name: "Amsterdam", landmark: "Dam Square", center: [4.8952, 52.3676] },
    // Eastern Europe & Russia
    { name: "Moscow", landmark: "Red Square", center: [37.6173, 55.7539] },
    { name: "Istanbul", landmark: "Hagia Sophia", center: [28.9784, 41.0082] },
    // Africa
    { name: "Cairo", landmark: "Great Pyramid of Giza", center: [31.1342, 29.9792] },
    { name: "Cape Town", landmark: "Table Mountain", center: [18.4241, -33.9628] },
    { name: "Marrakech", landmark: "Jemaa el-Fnaa", center: [-7.9811, 31.6295] },
    // Middle East & Asia
    { name: "Dubai", landmark: "Burj Khalifa", center: [55.2744, 25.1972] },
    { name: "Mumbai", landmark: "Gateway of India", center: [72.8347, 18.922] },
    { name: "Bangkok", landmark: "Grand Palace", center: [100.4913, 13.75] },
    { name: "Singapore", landmark: "Marina Bay Sands", center: [103.861, 1.2834] },
    { name: "Tokyo", landmark: "Shibuya Crossing", center: [139.7016, 35.6595] },
    { name: "Beijing", landmark: "Forbidden City", center: [116.3972, 39.9169] },
    { name: "Seoul", landmark: "Gyeongbokgung Palace", center: [126.977, 37.5796] },
    // Oceania
    { name: "Sydney", landmark: "Sydney Opera House", center: [151.2153, -33.8568] },
    { name: "Auckland", landmark: "Sky Tower", center: [174.7633, -36.8485] }
  ];
  function getRandomCity() {
    return cities[Math.floor(Math.random() * cities.length)];
  }

  // js/maps.js
  var Maps = class {
    constructor(context, bbox) {
      this.context = context;
      const filteredBbox = context.bounds != config.bounds;
      const defaultCenter = getRandomCity().center;
      const isLocal = window.location.hostname === "localhost" || window.location.hostname.startsWith("192");
      const overviewStyle = "https://demotiles.maplibre.org/style.json";
      let mainStyle;
      if (isLocal) {
        mainStyle = {
          version: 8,
          name: "Dark Basemap",
          sources: {
            "osm-tiles": {
              type: "raster",
              tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
              tileSize: 256,
              attribution: "\xA9 OpenStreetMap contributors"
            }
          },
          layers: [{
            id: "osm-tiles",
            type: "raster",
            source: "osm-tiles",
            paint: {
              "raster-saturation": -1,
              "raster-brightness-max": 0.5,
              "raster-contrast": 0.1
            }
          }]
        };
      } else {
        const mapboxKey = "pk.eyJ1Ijoib3BlbnN0cmVldG1hcHVzIiwiYSI6ImNqdTM1ZWxqeTBqa2MzeXBhODIxdnE2eG8ifQ.zyhAo181muDzPRdyYsqLGw";
        mainStyle = {
          version: 8,
          name: "Mapbox Dark",
          sources: {
            "mapbox-tiles": {
              type: "raster",
              tiles: [`https://api.mapbox.com/styles/v1/openstreetmapus/cju35gljt1bpm1fp2z93dlyca/tiles/256/{z}/{x}/{y}?access_token=${mapboxKey}`],
              tileSize: 256,
              attribution: '<a href="https://mapbox.com/about/maps/">Terms & Conditions</a>'
            }
          },
          layers: [{
            id: "mapbox-tiles",
            type: "raster",
            source: "mapbox-tiles"
          }]
        };
      }
      this.main = new maplibregl.Map({
        container: "map",
        style: mainStyle,
        center: defaultCenter,
        zoom: 13,
        interactive: false,
        attributionControl: false
      });
      this.main.addControl(new maplibregl.AttributionControl({ compact: true }));
      this.main.on("style.load", () => {
        this.main.setProjection({ type: "globe" });
      });
      this.overviewMap = new maplibregl.Map({
        container: "overview_map",
        style: overviewStyle,
        center: defaultCenter,
        zoom: 1,
        minZoom: 0.5,
        maxZoom: 2,
        interactive: false,
        attributionControl: false
      });
      this.overviewMap.on("style.load", () => {
        this.overviewMap.setProjection({ type: "globe" });
      });
      this.overviewMarker = new maplibregl.Marker({ color: "#3887be" }).setLngLat([0, 0]).addTo(this.overviewMap);
      this.overviewMarker.getElement().style.display = "none";
      this.lastOverviewLocation = null;
      if (filteredBbox) {
        const bounds = [[bbox.getWest(), bbox.getSouth()], [bbox.getEast(), bbox.getNorth()]];
        this.main.on("load", () => {
          this.main.fitBounds(bounds, { padding: 50, duration: 0 });
          this.addBboxRectangle(this.main, bbox, "main-bbox-rect", 5);
        });
        this.overviewMap.on("load", () => {
          this.overviewMap.fitBounds(bounds, { padding: 20, duration: 0 });
          this.addBboxRectangle(this.overviewMap, bbox, "overview-bbox-rect", 1);
        });
      }
      this.featureCounter = 0;
      this.activeFeatures = [];
      this.currentChangesetId = null;
      this.main.on("load", () => {
        this.setupDrawingLayers();
        if (this.context.debug) {
          this.setupDebugLayer();
        }
      });
    }
    addBboxRectangle(map, bbox, id, width) {
      const coordinates = [
        [bbox.getWest(), bbox.getNorth()],
        [bbox.getEast(), bbox.getNorth()],
        [bbox.getEast(), bbox.getSouth()],
        [bbox.getWest(), bbox.getSouth()],
        [bbox.getWest(), bbox.getNorth()]
      ];
      map.addSource(id, {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: { type: "LineString", coordinates }
        }
      });
      map.addLayer({
        id,
        type: "line",
        source: id,
        paint: {
          "line-color": "#ffffff",
          "line-width": width
        }
      });
    }
    setupDrawingLayers() {
      this.main.addSource("drawn-features", {
        type: "geojson",
        data: { type: "FeatureCollection", features: [] }
      });
      this.main.addLayer({
        id: "drawn-lines",
        type: "line",
        source: "drawn-features",
        filter: ["==", ["geometry-type"], "LineString"],
        paint: {
          "line-color": ["get", "color"],
          "line-width": 5,
          "line-opacity": ["get", "opacity"]
        }
      });
      this.main.addLayer({
        id: "drawn-fills",
        type: "fill",
        source: "drawn-features",
        filter: ["==", ["geometry-type"], "Polygon"],
        paint: {
          "fill-color": ["get", "color"],
          "fill-opacity": ["*", ["get", "opacity"], 0.3]
        }
      });
      this.main.addLayer({
        id: "drawn-polygon-outlines",
        type: "line",
        source: "drawn-features",
        filter: ["==", ["geometry-type"], "Polygon"],
        paint: {
          "line-color": ["get", "color"],
          "line-width": 5,
          "line-opacity": ["get", "opacity"]
        }
      });
      this.main.addLayer({
        id: "drawn-points",
        type: "circle",
        source: "drawn-features",
        filter: ["==", ["geometry-type"], "Point"],
        paint: {
          "circle-color": ["get", "color"],
          "circle-radius": ["get", "radius"],
          "circle-opacity": ["get", "opacity"],
          "circle-stroke-width": 2,
          "circle-stroke-color": ["get", "color"]
        }
      });
    }
    setupDebugLayer() {
      this.main.addSource("debug-rect", {
        type: "geojson",
        data: { type: "Feature", geometry: { type: "LineString", coordinates: [] } }
      });
      this.main.addLayer({
        id: "debug-rect",
        type: "line",
        source: "debug-rect",
        paint: {
          "line-color": "#00ffff",
          "line-width": 2,
          "line-dasharray": [5, 5]
        }
      });
      this.main.on("moveend", () => this.updateDebugRect());
    }
    // Calculate the no-pan zone
    getNoPanBounds() {
      const bounds = this.main.getBounds();
      const north = bounds.getNorth();
      const south = bounds.getSouth();
      const east = bounds.getEast();
      const west = bounds.getWest();
      const latHeight = north - south;
      const lngWidth = east - west;
      return new maplibregl.LngLatBounds(
        [west + 0.125 * lngWidth, south + 0.125 * latHeight],
        [east - 0.125 * lngWidth, north - 0.05 * latHeight]
      );
    }
    updateDebugRect() {
      const noPanBounds = this.getNoPanBounds();
      const coordinates = [
        [noPanBounds.getWest(), noPanBounds.getNorth()],
        [noPanBounds.getEast(), noPanBounds.getNorth()],
        [noPanBounds.getEast(), noPanBounds.getSouth()],
        [noPanBounds.getWest(), noPanBounds.getSouth()],
        [noPanBounds.getWest(), noPanBounds.getNorth()]
      ];
      this.main.getSource("debug-rect").setData({
        type: "Feature",
        geometry: { type: "LineString", coordinates }
      });
    }
    pruneMapElements() {
      const visibleBounds = this.main.getBounds();
      this.activeFeatures = this.activeFeatures.filter((feature) => {
        let coordPairs;
        if (feature.geometry.type === "Point") {
          coordPairs = [feature.geometry.coordinates];
        } else if (feature.geometry.type === "Polygon") {
          coordPairs = feature.geometry.coordinates[0] || [];
        } else {
          coordPairs = feature.geometry.coordinates;
        }
        const isVisible = coordPairs.some((coord) => {
          if (!coord || coord.length < 2) return false;
          return visibleBounds.contains([coord[0], coord[1]]);
        });
        if (isVisible) {
          feature.properties.opacity = 0.5;
          return true;
        }
        return false;
      });
      this.updateDrawnFeatures();
    }
    updateDrawnFeatures() {
      const source = this.main.getSource("drawn-features");
      if (source) {
        source.setData({
          type: "FeatureCollection",
          features: this.activeFeatures
        });
      }
    }
    // Calculate bounding box containing all active features
    getActiveFeaturesBounds() {
      const bounds = new maplibregl.LngLatBounds();
      for (const feature of this.activeFeatures) {
        const geom = feature.geometry;
        if (geom.type === "Point") {
          bounds.extend(geom.coordinates);
        } else if (geom.type === "LineString") {
          for (const coord of geom.coordinates) {
            bounds.extend(coord);
          }
        } else if (geom.type === "Polygon") {
          for (const coord of geom.coordinates[0] || []) {
            bounds.extend(coord);
          }
        }
      }
      return bounds;
    }
    drawMapElement(change, cb) {
      this.pruneMapElements();
      const noPanBounds = this.getNoPanBounds();
      const changeBounds = change.meta.bounds;
      const changeCenter = changeBounds.getCenter();
      const changesetId = change.meta.changeset;
      const distance = this.getDistanceFromCenter(changeCenter);
      const isSameChangeset = this.currentChangesetId === changesetId;
      const isNearby = distance <= 5e3;
      const boundsContained = noPanBounds.contains([changeCenter.lng, changeCenter.lat]);
      if (isSameChangeset && isNearby && !boundsContained) {
        const combinedBounds = this.getActiveFeaturesBounds();
        combinedBounds.extend([changeBounds.getWest(), changeBounds.getSouth()]);
        combinedBounds.extend([changeBounds.getEast(), changeBounds.getNorth()]);
        this.main.fitBounds(
          [
            [combinedBounds.getWest(), combinedBounds.getSouth()],
            [combinedBounds.getEast(), combinedBounds.getNorth()]
          ],
          {
            maxZoom: 18,
            padding: { top: 50, bottom: 200, left: 100, right: 100 },
            duration: 500
          }
        );
      } else if (!boundsContained) {
        this.main.fitBounds(
          [
            [changeBounds.getWest(), changeBounds.getSouth()],
            [changeBounds.getEast(), changeBounds.getNorth()]
          ],
          {
            maxZoom: 18,
            padding: { top: 50, bottom: 200, left: 100, right: 100 },
            duration: this.getFlightDuration(distance)
          }
        );
      } else if (this.context.debug) {
        this.updateDebugRect();
      }
      if (!this.currentChangesetId || !isSameChangeset) {
        this.currentChangesetId = changesetId;
      }
      this.updateOverviewGlobe(changeCenter);
      const color = this.getChangeColor(change.type);
      const drawTime = this.context.runTime * 0.7;
      const waitTime = this.context.runTime - drawTime;
      const mapElement = change.type === "delete" ? change.old : change.neu;
      const featureId = `feature-${this.featureCounter++}`;
      const startDrawing = () => {
        switch (mapElement.type) {
          case "way": {
            this.drawWay(mapElement, color, featureId, drawTime, waitTime, cb);
            break;
          }
          case "node": {
            this.drawNode(mapElement, color, featureId, drawTime, waitTime, cb);
            break;
          }
          default: {
            console.warn("Unknown mapElement type:", mapElement.type);
            cb();
          }
        }
      };
      if (!isNearby) {
        this.main.once("moveend", startDrawing);
      } else {
        startDrawing();
      }
    }
    getDistanceFromCenter(lngLat) {
      const center = this.main.getCenter();
      const R = 6371e3;
      const lat1 = center.lat * Math.PI / 180;
      const lat2 = lngLat.lat * Math.PI / 180;
      const dLat = (lngLat.lat - center.lat) * Math.PI / 180;
      const dLng = (lngLat.lng - center.lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    getChangeColor(type2) {
      return {
        create: "#B7FF00",
        modify: "#FF00EA",
        delete: "#FF0000"
      }[type2];
    }
    getFlightDuration(distance) {
      return distance > 1e6 ? 3e3 : distance > 1e5 ? 2e3 : 1200;
    }
    updateOverviewGlobe(center, alwaysHideMarker = false) {
      const targetLat = center.lat;
      const targetLng = center.lng;
      const maxCenterLat = 50;
      let centerLat = targetLat;
      let pitch = 0;
      if (Math.abs(targetLat) > maxCenterLat) {
        centerLat = Math.sign(targetLat) * maxCenterLat;
        const latBeyond = Math.abs(targetLat) - maxCenterLat;
        pitch = Math.min(50, latBeyond * 1.2);
      }
      const isCloseToLast = !alwaysHideMarker && this.lastOverviewLocation && Math.abs(targetLat - this.lastOverviewLocation.lat) < 5 && Math.abs(targetLng - this.lastOverviewLocation.lng) < 5;
      if (!isCloseToLast) {
        this.overviewMarker.getElement().style.display = "none";
      }
      this.overviewMarker.setLngLat([targetLng, targetLat]);
      this.lastOverviewLocation = { lat: targetLat, lng: targetLng };
      this.overviewMap.flyTo({
        center: [targetLng, centerLat],
        pitch,
        duration: 1500
      });
      this.overviewMap.once("moveend", () => {
        this.overviewMarker.getElement().style.display = "block";
      });
    }
    drawWay(mapElement, color, featureId, drawTime, waitTime, cb) {
      const isPolygon = mapElement.tags.building || mapElement.tags.area;
      const linestring = [...mapElement.linestring];
      if (Math.random() > 0.5) {
        linestring.reverse();
      }
      const coordinates = [];
      const perPt = drawTime / linestring.length;
      const feature = {
        type: "Feature",
        id: featureId,
        properties: { color, opacity: 1, id: featureId },
        geometry: {
          type: isPolygon ? "Polygon" : "LineString",
          coordinates: isPolygon ? [[]] : []
        }
      };
      this.activeFeatures.push(feature);
      const drawPt = () => {
        if (linestring.length) {
          const pt = linestring.pop();
          coordinates.push([pt[1], pt[0]]);
          if (isPolygon) {
            feature.geometry.coordinates = [coordinates];
          } else {
            feature.geometry.coordinates = coordinates;
          }
          this.updateDrawnFeatures();
          window.setTimeout(drawPt, perPt);
        } else {
          feature.properties.opacity = 0.5;
          this.updateDrawnFeatures();
          window.setTimeout(cb, waitTime);
        }
      };
      if (linestring.length) {
        const pt = linestring.pop();
        coordinates.push([pt[1], pt[0]]);
        if (isPolygon) {
          feature.geometry.coordinates = [coordinates];
        } else {
          feature.geometry.coordinates = coordinates;
        }
        this.updateDrawnFeatures();
        drawPt();
      }
    }
    drawNode(mapElement, color, featureId, drawTime, waitTime, cb) {
      const radii = [];
      for (let i = 0; i <= 25; i += 1) {
        radii.push(17 * Math.sin(i / 10));
      }
      const feature = {
        type: "Feature",
        id: featureId,
        properties: { color, opacity: 1, radius: 0, id: featureId },
        geometry: {
          type: "Point",
          coordinates: [mapElement.lon, mapElement.lat]
        }
      };
      this.activeFeatures.push(feature);
      const perRadius = drawTime / radii.length;
      const animateRadius = () => {
        if (radii.length) {
          feature.properties.radius = radii.shift();
          this.updateDrawnFeatures();
          window.setTimeout(animateRadius, perRadius);
        } else {
          feature.properties.opacity = 0.5;
          this.updateDrawnFeatures();
          window.setTimeout(cb, waitTime);
        }
      };
      animateRadius();
    }
    // Draw multiple changes simultaneously
    drawMapElementBatch(changes, cb) {
      this.pruneMapElements();
      const combinedBounds = new maplibregl.LngLatBounds();
      for (const change of changes) {
        const changeBounds = change.meta.bounds;
        combinedBounds.extend([changeBounds.getWest(), changeBounds.getSouth()]);
        combinedBounds.extend([changeBounds.getEast(), changeBounds.getNorth()]);
      }
      const changeCenter = combinedBounds.getCenter();
      const changesetId = changes[0].meta.changeset;
      this.currentChangesetId = changesetId;
      const distance = this.getDistanceFromCenter(changeCenter);
      this.main.fitBounds(
        [
          [combinedBounds.getWest(), combinedBounds.getSouth()],
          [combinedBounds.getEast(), combinedBounds.getNorth()]
        ],
        {
          maxZoom: 17,
          // Slightly lower max zoom for batches
          padding: 150,
          duration: this.getFlightDuration(distance)
        }
      );
      this.updateOverviewGlobe(changeCenter, true);
      let completedCount = 0;
      const totalCount = changes.length;
      const onDrawingComplete = () => {
        completedCount++;
        if (completedCount === totalCount) {
          cb();
        }
      };
      const startAllDrawings = () => {
        const CONCURRENT_DRAWINGS = 4 + Math.floor(Math.random() * 4);
        const baseDrawTime = this.context.runTime * 0.7;
        const spacingPerItem = baseDrawTime / CONCURRENT_DRAWINGS;
        changes.forEach((change, index) => {
          const baseDelay = index * spacingPerItem;
          const jitter = (Math.random() - 0.5) * spacingPerItem;
          const startDelay = Math.max(0, baseDelay + jitter);
          const r2 = Math.random();
          const speedMultiplier = r2 < 0.5 ? 0.5 + r2 : 1 + (r2 - 0.5) * 4;
          setTimeout(() => {
            this.drawSingleElement(change, speedMultiplier, onDrawingComplete);
          }, startDelay);
        });
      };
      if (distance > 1e3) {
        this.main.once("moveend", startAllDrawings);
      } else {
        startAllDrawings();
      }
    }
    /**
     * Draw a single element with custom speed (used by batch drawing)
     * speedMultiplier only affects ways; nodes use consistent timing
     */
    drawSingleElement(change, speedMultiplier, cb) {
      const color = this.getChangeColor(change.type);
      const baseDrawTime = this.context.runTime * 0.7;
      const waitTime = 0;
      const mapElement = change.type === "delete" ? change.old : change.neu;
      const featureId = `feature-${this.featureCounter++}`;
      switch (mapElement.type) {
        case "way": {
          const drawTime = baseDrawTime * speedMultiplier;
          this.drawWay(mapElement, color, featureId, drawTime, waitTime, cb);
          break;
        }
        case "node": {
          this.drawNode(mapElement, color, featureId, baseDrawTime, waitTime, cb);
          break;
        }
        default: {
          console.warn("Unknown mapElement type:", mapElement.type);
          cb();
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
      const locationEl = document.getElementById("reverse-location");
      if (change.meta.displayName) {
        locationEl.textContent = change.meta.displayName;
        locationEl.style.display = "";
      } else {
        locationEl.style.display = "none";
      }
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
      const bboxIntersectsOld = c.old && c.old.bounds && bboxIntersects(bbox, makeBbox(c.old.bounds));
      const bboxIntersectsNew = c.neu && c.neu.bounds && bboxIntersects(bbox, makeBbox(c.neu.bounds));
      within = bboxIntersectsOld || bboxIntersectsNew;
    } else if (type2 == "node") {
      const bboxContainsOld = c.old && c.old.lat && c.old.lon && bbox.contains([c.old.lon, c.old.lat]);
      const bboxContainsNew = c.neu && c.neu.lat && c.neu.lon && bbox.contains([c.neu.lon, c.neu.lat]);
      within = bboxContainsOld || bboxContainsNew;
    } else {
      console.error("no bbox check for this geometry type");
    }
    return within;
  }
  function bboxIntersects(bbox1, bbox2) {
    return !(bbox2.getWest() > bbox1.getEast() || bbox2.getEast() < bbox1.getWest() || bbox2.getSouth() > bbox1.getNorth() || bbox2.getNorth() < bbox1.getSouth());
  }
  function hasTags(change) {
    return change.neu && Object.keys(change.neu.tags || {}).length > 0 || change.old && Object.keys(change.old.tags || {}).length > 0;
  }

  // js/diff-service.js
  init_define_process_env();
  init_buffer_global();
  var import_osm_stream = __toESM(require_osm_stream(), 1);
  var DB_NAME = "smtw-diffs";
  var STORE_NAME = "diffs";
  var MAX_STORED_ENTRIES = 10;
  var TTL_MS = 10 * 60 * 1e3;
  var CULL_INTERVAL_MS = 60 * 1e3;
  var MAX_RETRIES = 2;
  var DiffService = class {
    constructor() {
      this.cullIntervalId = null;
      this.streamHandle = null;
      this.db = null;
      this.memoryCache = [];
    }
    async init() {
      await this.openDatabase();
      await this.loadFromDB();
    }
    openDatabase() {
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, 1);
        request.onerror = () => {
          console.warn("[DiffService] Failed to open IndexedDB:", request.error);
          reject(request.error);
        };
        request.onsuccess = () => {
          this.db = request.result;
          console.log("[DiffService] IndexedDB opened");
          resolve();
        };
        request.onupgradeneeded = (event) => {
          const db = event.target.result;
          if (!db.objectStoreNames.contains(STORE_NAME)) {
            db.createObjectStore(STORE_NAME, { keyPath: "key" });
            console.log("[DiffService] Created IndexedDB store");
          }
        };
      });
    }
    async loadFromDB() {
      if (!this.db) return;
      return new Promise((resolve) => {
        const transaction = this.db.transaction([STORE_NAME], "readonly");
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();
        request.onsuccess = () => {
          this.memoryCache = request.result || [];
          if (this.memoryCache.length) {
            console.log(`[DiffService] Loaded ${this.memoryCache.length} entries from IndexedDB`);
          }
          resolve();
        };
        request.onerror = () => {
          console.warn("[DiffService] Failed to load from IndexedDB:", request.error);
          resolve();
        };
      });
    }
    async saveToDB(entries) {
      if (!this.db) return;
      return new Promise((resolve) => {
        const transaction = this.db.transaction([STORE_NAME], "readwrite");
        const store = transaction.objectStore(STORE_NAME);
        store.clear();
        for (const entry of entries) {
          store.put(entry);
        }
        transaction.oncomplete = () => {
          console.log(`[DiffService] Saved ${entries.length} entries to IndexedDB`);
          resolve();
        };
        transaction.onerror = () => {
          console.warn("[DiffService] Failed to save to IndexedDB:", transaction.error);
          resolve();
        };
      });
    }
    start(onData, bbox = null) {
      if (!this.cullIntervalId) {
        this.cullIntervalId = setInterval(() => this.cull(), CULL_INTERVAL_MS);
      }
      this.streamHandle = import_osm_stream.default.runFn((err, data) => {
        this.add(data);
        onData(data);
      }, null, null, bbox, MAX_RETRIES);
    }
    stop() {
      if (this.cullIntervalId) {
        clearInterval(this.cullIntervalId);
        this.cullIntervalId = null;
      }
      if (this.streamHandle) {
        this.streamHandle.cancel();
        this.streamHandle = null;
      }
    }
    /**
     * Get all valid (non-expired) cached diff data (sync, from memory)
     */
    getCached() {
      const now = Date.now();
      const validEntries = this.memoryCache.filter((entry) => {
        const entryTime = new Date(entry.key).getTime();
        return now - entryTime < TTL_MS;
      });
      if (validEntries.length) {
        console.log(`[DiffService] Found ${validEntries.length} valid cached diffs`);
      }
      return validEntries.flatMap((entry) => entry.data);
    }
    /**
     * Cache a new diff
     */
    add(data) {
      if (!data || !data.length) return;
      const key = this.getTimestamp(data);
      if (!key) return;
      if (this.memoryCache.some((e) => e.key === key)) return;
      this.memoryCache.push({ key, data });
      if (this.memoryCache.length > MAX_STORED_ENTRIES) {
        this.memoryCache = this.memoryCache.slice(-MAX_STORED_ENTRIES);
      }
      console.log(`[DiffService] Cached diff with key ${key}, total entries: ${this.memoryCache.length}`);
      this.saveToDB(this.memoryCache);
    }
    /**
     * Remove expired entries (older than TTL)
     */
    cull() {
      const now = Date.now();
      const before = this.memoryCache.length;
      this.memoryCache = this.memoryCache.filter((entry) => {
        const entryTime = new Date(entry.key).getTime();
        return now - entryTime < TTL_MS;
      });
      if (this.memoryCache.length !== before) {
        console.log(`[DiffService] Culled ${before - this.memoryCache.length} expired diffs`);
        this.saveToDB(this.memoryCache);
      }
    }
    /**
     * Get timestamp from first item in diff data
     * Uses timestamp because osm-stream doesn't include the state file used
     */
    getTimestamp(data) {
      const firstItem = data[0];
      if (firstItem && firstItem.neu && firstItem.neu.timestamp) {
        return firstItem.neu.timestamp;
      }
      return null;
    }
  };

  // js/changeset-service.js
  init_define_process_env();
  init_buffer_global();

  // node_modules/lru-cache/dist/esm/index.js
  init_define_process_env();
  init_buffer_global();
  var defaultPerf = typeof performance === "object" && performance && typeof performance.now === "function" ? performance : Date;
  var warned = /* @__PURE__ */ new Set();
  var PROCESS = typeof process === "object" && !!process ? process : {};
  var emitWarning = (msg, type2, code, fn2) => {
    typeof PROCESS.emitWarning === "function" ? PROCESS.emitWarning(msg, type2, code, fn2) : console.error(`[${code}] ${type2}: ${msg}`);
  };
  var AC = globalThis.AbortController;
  var AS = globalThis.AbortSignal;
  if (typeof AC === "undefined") {
    AS = class AbortSignal {
      constructor() {
        __publicField(this, "onabort");
        __publicField(this, "_onabort", []);
        __publicField(this, "reason");
        __publicField(this, "aborted", false);
      }
      addEventListener(_, fn2) {
        this._onabort.push(fn2);
      }
    };
    AC = class AbortController {
      constructor() {
        __publicField(this, "signal", new AS());
        warnACPolyfill();
      }
      abort(reason) {
        if (this.signal.aborted)
          return;
        this.signal.reason = reason;
        this.signal.aborted = true;
        for (const fn2 of this.signal._onabort) {
          fn2(reason);
        }
        this.signal.onabort?.(reason);
      }
    };
    let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== "1";
    const warnACPolyfill = () => {
      if (!printACPolyfillWarning)
        return;
      printACPolyfillWarning = false;
      emitWarning("AbortController is not defined. If using lru-cache in node 14, load an AbortController polyfill from the `node-abort-controller` package. A minimal polyfill is provided for use by LRUCache.fetch(), but it should not be relied upon in other contexts (eg, passing it to other APIs that use AbortController/AbortSignal might have undesirable effects). You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.", "NO_ABORT_CONTROLLER", "ENOTSUP", warnACPolyfill);
    };
  }
  var shouldWarn = (code) => !warned.has(code);
  var isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
  var getUintArray = (max) => !isPosInt(max) ? null : max <= Math.pow(2, 8) ? Uint8Array : max <= Math.pow(2, 16) ? Uint16Array : max <= Math.pow(2, 32) ? Uint32Array : max <= Number.MAX_SAFE_INTEGER ? ZeroArray : null;
  var ZeroArray = class extends Array {
    constructor(size) {
      super(size);
      this.fill(0);
    }
  };
  var _constructing;
  var _Stack = class _Stack {
    constructor(max, HeapCls) {
      __publicField(this, "heap");
      __publicField(this, "length");
      if (!__privateGet(_Stack, _constructing)) {
        throw new TypeError("instantiate Stack using Stack.create(n)");
      }
      this.heap = new HeapCls(max);
      this.length = 0;
    }
    static create(max) {
      const HeapCls = getUintArray(max);
      if (!HeapCls)
        return [];
      __privateSet(_Stack, _constructing, true);
      const s = new _Stack(max, HeapCls);
      __privateSet(_Stack, _constructing, false);
      return s;
    }
    push(n) {
      this.heap[this.length++] = n;
    }
    pop() {
      return this.heap[--this.length];
    }
  };
  _constructing = new WeakMap();
  // private constructor
  __privateAdd(_Stack, _constructing, false);
  var Stack = _Stack;
  var _a, _b, _max, _maxSize, _dispose, _onInsert, _disposeAfter, _fetchMethod, _memoMethod, _perf, _size, _calculatedSize, _keyMap, _keyList, _valList, _next, _prev, _head, _tail, _free, _disposed, _sizes, _starts, _ttls, _autopurgeTimers, _hasDispose, _hasFetchMethod, _hasDisposeAfter, _hasOnInsert, _LRUCache_instances, initializeTTLTracking_fn, _updateItemAge, _statusTTL, _setItemTTL, _isStale, initializeSizeTracking_fn, _removeItemSize, _addItemSize, _requireSize, indexes_fn, rindexes_fn, isValidIndex_fn, evict_fn, backgroundFetch_fn, isBackgroundFetch_fn, connect_fn, moveToTail_fn, delete_fn, clear_fn;
  var _LRUCache = class _LRUCache {
    constructor(options) {
      __privateAdd(this, _LRUCache_instances);
      // options that cannot be changed without disaster
      __privateAdd(this, _max);
      __privateAdd(this, _maxSize);
      __privateAdd(this, _dispose);
      __privateAdd(this, _onInsert);
      __privateAdd(this, _disposeAfter);
      __privateAdd(this, _fetchMethod);
      __privateAdd(this, _memoMethod);
      __privateAdd(this, _perf);
      /**
       * {@link LRUCache.OptionsBase.ttl}
       */
      __publicField(this, "ttl");
      /**
       * {@link LRUCache.OptionsBase.ttlResolution}
       */
      __publicField(this, "ttlResolution");
      /**
       * {@link LRUCache.OptionsBase.ttlAutopurge}
       */
      __publicField(this, "ttlAutopurge");
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnGet}
       */
      __publicField(this, "updateAgeOnGet");
      /**
       * {@link LRUCache.OptionsBase.updateAgeOnHas}
       */
      __publicField(this, "updateAgeOnHas");
      /**
       * {@link LRUCache.OptionsBase.allowStale}
       */
      __publicField(this, "allowStale");
      /**
       * {@link LRUCache.OptionsBase.noDisposeOnSet}
       */
      __publicField(this, "noDisposeOnSet");
      /**
       * {@link LRUCache.OptionsBase.noUpdateTTL}
       */
      __publicField(this, "noUpdateTTL");
      /**
       * {@link LRUCache.OptionsBase.maxEntrySize}
       */
      __publicField(this, "maxEntrySize");
      /**
       * {@link LRUCache.OptionsBase.sizeCalculation}
       */
      __publicField(this, "sizeCalculation");
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
       */
      __publicField(this, "noDeleteOnFetchRejection");
      /**
       * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
       */
      __publicField(this, "noDeleteOnStaleGet");
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
       */
      __publicField(this, "allowStaleOnFetchAbort");
      /**
       * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
       */
      __publicField(this, "allowStaleOnFetchRejection");
      /**
       * {@link LRUCache.OptionsBase.ignoreFetchAbort}
       */
      __publicField(this, "ignoreFetchAbort");
      // computed properties
      __privateAdd(this, _size);
      __privateAdd(this, _calculatedSize);
      __privateAdd(this, _keyMap);
      __privateAdd(this, _keyList);
      __privateAdd(this, _valList);
      __privateAdd(this, _next);
      __privateAdd(this, _prev);
      __privateAdd(this, _head);
      __privateAdd(this, _tail);
      __privateAdd(this, _free);
      __privateAdd(this, _disposed);
      __privateAdd(this, _sizes);
      __privateAdd(this, _starts);
      __privateAdd(this, _ttls);
      __privateAdd(this, _autopurgeTimers);
      __privateAdd(this, _hasDispose);
      __privateAdd(this, _hasFetchMethod);
      __privateAdd(this, _hasDisposeAfter);
      __privateAdd(this, _hasOnInsert);
      // conditionally set private methods related to TTL
      __privateAdd(this, _updateItemAge, () => {
      });
      __privateAdd(this, _statusTTL, () => {
      });
      __privateAdd(this, _setItemTTL, () => {
      });
      /* c8 ignore stop */
      __privateAdd(this, _isStale, () => false);
      __privateAdd(this, _removeItemSize, (_i) => {
      });
      __privateAdd(this, _addItemSize, (_i, _s, _st) => {
      });
      __privateAdd(this, _requireSize, (_k, _v, size, sizeCalculation) => {
        if (size || sizeCalculation) {
          throw new TypeError("cannot set size without setting maxSize or maxEntrySize on cache");
        }
        return 0;
      });
      /**
       * A String value that is used in the creation of the default string
       * description of an object. Called by the built-in method
       * `Object.prototype.toString`.
       */
      __publicField(this, _a, "LRUCache");
      const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, onInsert, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort, perf } = options;
      if (perf !== void 0) {
        if (typeof perf?.now !== "function") {
          throw new TypeError("perf option must have a now() method if specified");
        }
      }
      __privateSet(this, _perf, perf ?? defaultPerf);
      if (max !== 0 && !isPosInt(max)) {
        throw new TypeError("max option must be a nonnegative integer");
      }
      const UintArray = max ? getUintArray(max) : Array;
      if (!UintArray) {
        throw new Error("invalid max value: " + max);
      }
      __privateSet(this, _max, max);
      __privateSet(this, _maxSize, maxSize);
      this.maxEntrySize = maxEntrySize || __privateGet(this, _maxSize);
      this.sizeCalculation = sizeCalculation;
      if (this.sizeCalculation) {
        if (!__privateGet(this, _maxSize) && !this.maxEntrySize) {
          throw new TypeError("cannot set sizeCalculation without setting maxSize or maxEntrySize");
        }
        if (typeof this.sizeCalculation !== "function") {
          throw new TypeError("sizeCalculation set to non-function");
        }
      }
      if (memoMethod !== void 0 && typeof memoMethod !== "function") {
        throw new TypeError("memoMethod must be a function if defined");
      }
      __privateSet(this, _memoMethod, memoMethod);
      if (fetchMethod !== void 0 && typeof fetchMethod !== "function") {
        throw new TypeError("fetchMethod must be a function if specified");
      }
      __privateSet(this, _fetchMethod, fetchMethod);
      __privateSet(this, _hasFetchMethod, !!fetchMethod);
      __privateSet(this, _keyMap, /* @__PURE__ */ new Map());
      __privateSet(this, _keyList, new Array(max).fill(void 0));
      __privateSet(this, _valList, new Array(max).fill(void 0));
      __privateSet(this, _next, new UintArray(max));
      __privateSet(this, _prev, new UintArray(max));
      __privateSet(this, _head, 0);
      __privateSet(this, _tail, 0);
      __privateSet(this, _free, Stack.create(max));
      __privateSet(this, _size, 0);
      __privateSet(this, _calculatedSize, 0);
      if (typeof dispose === "function") {
        __privateSet(this, _dispose, dispose);
      }
      if (typeof onInsert === "function") {
        __privateSet(this, _onInsert, onInsert);
      }
      if (typeof disposeAfter === "function") {
        __privateSet(this, _disposeAfter, disposeAfter);
        __privateSet(this, _disposed, []);
      } else {
        __privateSet(this, _disposeAfter, void 0);
        __privateSet(this, _disposed, void 0);
      }
      __privateSet(this, _hasDispose, !!__privateGet(this, _dispose));
      __privateSet(this, _hasOnInsert, !!__privateGet(this, _onInsert));
      __privateSet(this, _hasDisposeAfter, !!__privateGet(this, _disposeAfter));
      this.noDisposeOnSet = !!noDisposeOnSet;
      this.noUpdateTTL = !!noUpdateTTL;
      this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
      this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
      this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
      this.ignoreFetchAbort = !!ignoreFetchAbort;
      if (this.maxEntrySize !== 0) {
        if (__privateGet(this, _maxSize) !== 0) {
          if (!isPosInt(__privateGet(this, _maxSize))) {
            throw new TypeError("maxSize must be a positive integer if specified");
          }
        }
        if (!isPosInt(this.maxEntrySize)) {
          throw new TypeError("maxEntrySize must be a positive integer if specified");
        }
        __privateMethod(this, _LRUCache_instances, initializeSizeTracking_fn).call(this);
      }
      this.allowStale = !!allowStale;
      this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
      this.updateAgeOnGet = !!updateAgeOnGet;
      this.updateAgeOnHas = !!updateAgeOnHas;
      this.ttlResolution = isPosInt(ttlResolution) || ttlResolution === 0 ? ttlResolution : 1;
      this.ttlAutopurge = !!ttlAutopurge;
      this.ttl = ttl || 0;
      if (this.ttl) {
        if (!isPosInt(this.ttl)) {
          throw new TypeError("ttl must be a positive integer if specified");
        }
        __privateMethod(this, _LRUCache_instances, initializeTTLTracking_fn).call(this);
      }
      if (__privateGet(this, _max) === 0 && this.ttl === 0 && __privateGet(this, _maxSize) === 0) {
        throw new TypeError("At least one of max, maxSize, or ttl is required");
      }
      if (!this.ttlAutopurge && !__privateGet(this, _max) && !__privateGet(this, _maxSize)) {
        const code = "LRU_CACHE_UNBOUNDED";
        if (shouldWarn(code)) {
          warned.add(code);
          const msg = "TTL caching without ttlAutopurge, max, or maxSize can result in unbounded memory consumption.";
          emitWarning(msg, "UnboundedCacheWarning", code, _LRUCache);
        }
      }
    }
    /**
     * {@link LRUCache.OptionsBase.perf}
     */
    get perf() {
      return __privateGet(this, _perf);
    }
    /**
     * Do not call this method unless you need to inspect the
     * inner workings of the cache.  If anything returned by this
     * object is modified in any way, strange breakage may occur.
     *
     * These fields are private for a reason!
     *
     * @internal
     */
    static unsafeExposeInternals(c) {
      return {
        // properties
        starts: __privateGet(c, _starts),
        ttls: __privateGet(c, _ttls),
        autopurgeTimers: __privateGet(c, _autopurgeTimers),
        sizes: __privateGet(c, _sizes),
        keyMap: __privateGet(c, _keyMap),
        keyList: __privateGet(c, _keyList),
        valList: __privateGet(c, _valList),
        next: __privateGet(c, _next),
        prev: __privateGet(c, _prev),
        get head() {
          return __privateGet(c, _head);
        },
        get tail() {
          return __privateGet(c, _tail);
        },
        free: __privateGet(c, _free),
        // methods
        isBackgroundFetch: (p) => {
          var _a2;
          return __privateMethod(_a2 = c, _LRUCache_instances, isBackgroundFetch_fn).call(_a2, p);
        },
        backgroundFetch: (k, index, options, context) => {
          var _a2;
          return __privateMethod(_a2 = c, _LRUCache_instances, backgroundFetch_fn).call(_a2, k, index, options, context);
        },
        moveToTail: (index) => {
          var _a2;
          return __privateMethod(_a2 = c, _LRUCache_instances, moveToTail_fn).call(_a2, index);
        },
        indexes: (options) => {
          var _a2;
          return __privateMethod(_a2 = c, _LRUCache_instances, indexes_fn).call(_a2, options);
        },
        rindexes: (options) => {
          var _a2;
          return __privateMethod(_a2 = c, _LRUCache_instances, rindexes_fn).call(_a2, options);
        },
        isStale: (index) => {
          var _a2;
          return __privateGet(_a2 = c, _isStale).call(_a2, index);
        }
      };
    }
    // Protected read-only members
    /**
     * {@link LRUCache.OptionsBase.max} (read-only)
     */
    get max() {
      return __privateGet(this, _max);
    }
    /**
     * {@link LRUCache.OptionsBase.maxSize} (read-only)
     */
    get maxSize() {
      return __privateGet(this, _maxSize);
    }
    /**
     * The total computed size of items in the cache (read-only)
     */
    get calculatedSize() {
      return __privateGet(this, _calculatedSize);
    }
    /**
     * The number of items stored in the cache (read-only)
     */
    get size() {
      return __privateGet(this, _size);
    }
    /**
     * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
     */
    get fetchMethod() {
      return __privateGet(this, _fetchMethod);
    }
    get memoMethod() {
      return __privateGet(this, _memoMethod);
    }
    /**
     * {@link LRUCache.OptionsBase.dispose} (read-only)
     */
    get dispose() {
      return __privateGet(this, _dispose);
    }
    /**
     * {@link LRUCache.OptionsBase.onInsert} (read-only)
     */
    get onInsert() {
      return __privateGet(this, _onInsert);
    }
    /**
     * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
     */
    get disposeAfter() {
      return __privateGet(this, _disposeAfter);
    }
    /**
     * Return the number of ms left in the item's TTL. If item is not in cache,
     * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
     */
    getRemainingTTL(key) {
      return __privateGet(this, _keyMap).has(key) ? Infinity : 0;
    }
    /**
     * Return a generator yielding `[key, value]` pairs,
     * in order from most recently used to least recently used.
     */
    *entries() {
      for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
        if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
          yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
        }
      }
    }
    /**
     * Inverse order version of {@link LRUCache.entries}
     *
     * Return a generator yielding `[key, value]` pairs,
     * in order from least recently used to most recently used.
     */
    *rentries() {
      for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
        if (__privateGet(this, _valList)[i] !== void 0 && __privateGet(this, _keyList)[i] !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
          yield [__privateGet(this, _keyList)[i], __privateGet(this, _valList)[i]];
        }
      }
    }
    /**
     * Return a generator yielding the keys in the cache,
     * in order from most recently used to least recently used.
     */
    *keys() {
      for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
        const k = __privateGet(this, _keyList)[i];
        if (k !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
          yield k;
        }
      }
    }
    /**
     * Inverse order version of {@link LRUCache.keys}
     *
     * Return a generator yielding the keys in the cache,
     * in order from least recently used to most recently used.
     */
    *rkeys() {
      for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
        const k = __privateGet(this, _keyList)[i];
        if (k !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
          yield k;
        }
      }
    }
    /**
     * Return a generator yielding the values in the cache,
     * in order from most recently used to least recently used.
     */
    *values() {
      for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
        const v = __privateGet(this, _valList)[i];
        if (v !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
          yield __privateGet(this, _valList)[i];
        }
      }
    }
    /**
     * Inverse order version of {@link LRUCache.values}
     *
     * Return a generator yielding the values in the cache,
     * in order from least recently used to most recently used.
     */
    *rvalues() {
      for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
        const v = __privateGet(this, _valList)[i];
        if (v !== void 0 && !__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, __privateGet(this, _valList)[i])) {
          yield __privateGet(this, _valList)[i];
        }
      }
    }
    /**
     * Iterating over the cache itself yields the same results as
     * {@link LRUCache.entries}
     */
    [(_b = Symbol.iterator, _a = Symbol.toStringTag, _b)]() {
      return this.entries();
    }
    /**
     * Find a value for which the supplied fn method returns a truthy value,
     * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
     */
    find(fn2, getOptions = {}) {
      for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
        const v = __privateGet(this, _valList)[i];
        const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
        if (value === void 0)
          continue;
        if (fn2(value, __privateGet(this, _keyList)[i], this)) {
          return this.get(__privateGet(this, _keyList)[i], getOptions);
        }
      }
    }
    /**
     * Call the supplied function on each item in the cache, in order from most
     * recently used to least recently used.
     *
     * `fn` is called as `fn(value, key, cache)`.
     *
     * If `thisp` is provided, function will be called in the `this`-context of
     * the provided object, or the cache if no `thisp` object is provided.
     *
     * Does not update age or recenty of use, or iterate over stale values.
     */
    forEach(fn2, thisp = this) {
      for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this)) {
        const v = __privateGet(this, _valList)[i];
        const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
        if (value === void 0)
          continue;
        fn2.call(thisp, value, __privateGet(this, _keyList)[i], this);
      }
    }
    /**
     * The same as {@link LRUCache.forEach} but items are iterated over in
     * reverse order.  (ie, less recently used items are iterated over first.)
     */
    rforEach(fn2, thisp = this) {
      for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this)) {
        const v = __privateGet(this, _valList)[i];
        const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
        if (value === void 0)
          continue;
        fn2.call(thisp, value, __privateGet(this, _keyList)[i], this);
      }
    }
    /**
     * Delete any stale entries. Returns true if anything was removed,
     * false otherwise.
     */
    purgeStale() {
      let deleted = false;
      for (const i of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this, { allowStale: true })) {
        if (__privateGet(this, _isStale).call(this, i)) {
          __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[i], "expire");
          deleted = true;
        }
      }
      return deleted;
    }
    /**
     * Get the extended info about a given entry, to get its value, size, and
     * TTL info simultaneously. Returns `undefined` if the key is not present.
     *
     * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
     * serialization, the `start` value is always the current timestamp, and the
     * `ttl` is a calculated remaining time to live (negative if expired).
     *
     * Always returns stale values, if their info is found in the cache, so be
     * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
     * if relevant.
     */
    info(key) {
      const i = __privateGet(this, _keyMap).get(key);
      if (i === void 0)
        return void 0;
      const v = __privateGet(this, _valList)[i];
      const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
      if (value === void 0)
        return void 0;
      const entry = { value };
      if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
        const ttl = __privateGet(this, _ttls)[i];
        const start = __privateGet(this, _starts)[i];
        if (ttl && start) {
          const remain = ttl - (__privateGet(this, _perf).now() - start);
          entry.ttl = remain;
          entry.start = Date.now();
        }
      }
      if (__privateGet(this, _sizes)) {
        entry.size = __privateGet(this, _sizes)[i];
      }
      return entry;
    }
    /**
     * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
     * passed to {@link LRUCache#load}.
     *
     * The `start` fields are calculated relative to a portable `Date.now()`
     * timestamp, even if `performance.now()` is available.
     *
     * Stale entries are always included in the `dump`, even if
     * {@link LRUCache.OptionsBase.allowStale} is false.
     *
     * Note: this returns an actual array, not a generator, so it can be more
     * easily passed around.
     */
    dump() {
      const arr = [];
      for (const i of __privateMethod(this, _LRUCache_instances, indexes_fn).call(this, { allowStale: true })) {
        const key = __privateGet(this, _keyList)[i];
        const v = __privateGet(this, _valList)[i];
        const value = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
        if (value === void 0 || key === void 0)
          continue;
        const entry = { value };
        if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
          entry.ttl = __privateGet(this, _ttls)[i];
          const age = __privateGet(this, _perf).now() - __privateGet(this, _starts)[i];
          entry.start = Math.floor(Date.now() - age);
        }
        if (__privateGet(this, _sizes)) {
          entry.size = __privateGet(this, _sizes)[i];
        }
        arr.unshift([key, entry]);
      }
      return arr;
    }
    /**
     * Reset the cache and load in the items in entries in the order listed.
     *
     * The shape of the resulting cache may be different if the same options are
     * not used in both caches.
     *
     * The `start` fields are assumed to be calculated relative to a portable
     * `Date.now()` timestamp, even if `performance.now()` is available.
     */
    load(arr) {
      this.clear();
      for (const [key, entry] of arr) {
        if (entry.start) {
          const age = Date.now() - entry.start;
          entry.start = __privateGet(this, _perf).now() - age;
        }
        this.set(key, entry.value, entry);
      }
    }
    /**
     * Add a value to the cache.
     *
     * Note: if `undefined` is specified as a value, this is an alias for
     * {@link LRUCache#delete}
     *
     * Fields on the {@link LRUCache.SetOptions} options param will override
     * their corresponding values in the constructor options for the scope
     * of this single `set()` operation.
     *
     * If `start` is provided, then that will set the effective start
     * time for the TTL calculation. Note that this must be a previous
     * value of `performance.now()` if supported, or a previous value of
     * `Date.now()` if not.
     *
     * Options object may also include `size`, which will prevent
     * calling the `sizeCalculation` function and just use the specified
     * number if it is a positive integer, and `noDisposeOnSet` which
     * will prevent calling a `dispose` function in the case of
     * overwrites.
     *
     * If the `size` (or return value of `sizeCalculation`) for a given
     * entry is greater than `maxEntrySize`, then the item will not be
     * added to the cache.
     *
     * Will update the recency of the entry.
     *
     * If the value is `undefined`, then this is an alias for
     * `cache.delete(key)`. `undefined` is never stored in the cache.
     */
    set(k, v, setOptions = {}) {
      var _a2, _b2, _c, _d;
      if (v === void 0) {
        this.delete(k);
        return this;
      }
      const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status } = setOptions;
      let { noUpdateTTL = this.noUpdateTTL } = setOptions;
      const size = __privateGet(this, _requireSize).call(this, k, v, setOptions.size || 0, sizeCalculation);
      if (this.maxEntrySize && size > this.maxEntrySize) {
        if (status) {
          status.set = "miss";
          status.maxEntrySizeExceeded = true;
        }
        __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "set");
        return this;
      }
      let index = __privateGet(this, _size) === 0 ? void 0 : __privateGet(this, _keyMap).get(k);
      if (index === void 0) {
        index = __privateGet(this, _size) === 0 ? __privateGet(this, _tail) : __privateGet(this, _free).length !== 0 ? __privateGet(this, _free).pop() : __privateGet(this, _size) === __privateGet(this, _max) ? __privateMethod(this, _LRUCache_instances, evict_fn).call(this, false) : __privateGet(this, _size);
        __privateGet(this, _keyList)[index] = k;
        __privateGet(this, _valList)[index] = v;
        __privateGet(this, _keyMap).set(k, index);
        __privateGet(this, _next)[__privateGet(this, _tail)] = index;
        __privateGet(this, _prev)[index] = __privateGet(this, _tail);
        __privateSet(this, _tail, index);
        __privateWrapper(this, _size)._++;
        __privateGet(this, _addItemSize).call(this, index, size, status);
        if (status)
          status.set = "add";
        noUpdateTTL = false;
        if (__privateGet(this, _hasOnInsert)) {
          (_a2 = __privateGet(this, _onInsert)) == null ? void 0 : _a2.call(this, v, k, "add");
        }
      } else {
        __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
        const oldVal = __privateGet(this, _valList)[index];
        if (v !== oldVal) {
          if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, oldVal)) {
            oldVal.__abortController.abort(new Error("replaced"));
            const { __staleWhileFetching: s } = oldVal;
            if (s !== void 0 && !noDisposeOnSet) {
              if (__privateGet(this, _hasDispose)) {
                (_b2 = __privateGet(this, _dispose)) == null ? void 0 : _b2.call(this, s, k, "set");
              }
              if (__privateGet(this, _hasDisposeAfter)) {
                __privateGet(this, _disposed)?.push([s, k, "set"]);
              }
            }
          } else if (!noDisposeOnSet) {
            if (__privateGet(this, _hasDispose)) {
              (_c = __privateGet(this, _dispose)) == null ? void 0 : _c.call(this, oldVal, k, "set");
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              __privateGet(this, _disposed)?.push([oldVal, k, "set"]);
            }
          }
          __privateGet(this, _removeItemSize).call(this, index);
          __privateGet(this, _addItemSize).call(this, index, size, status);
          __privateGet(this, _valList)[index] = v;
          if (status) {
            status.set = "replace";
            const oldValue = oldVal && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, oldVal) ? oldVal.__staleWhileFetching : oldVal;
            if (oldValue !== void 0)
              status.oldValue = oldValue;
          }
        } else if (status) {
          status.set = "update";
        }
        if (__privateGet(this, _hasOnInsert)) {
          this.onInsert?.(v, k, v === oldVal ? "update" : "replace");
        }
      }
      if (ttl !== 0 && !__privateGet(this, _ttls)) {
        __privateMethod(this, _LRUCache_instances, initializeTTLTracking_fn).call(this);
      }
      if (__privateGet(this, _ttls)) {
        if (!noUpdateTTL) {
          __privateGet(this, _setItemTTL).call(this, index, ttl, start);
        }
        if (status)
          __privateGet(this, _statusTTL).call(this, status, index);
      }
      if (!noDisposeOnSet && __privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
        const dt = __privateGet(this, _disposed);
        let task;
        while (task = dt?.shift()) {
          (_d = __privateGet(this, _disposeAfter)) == null ? void 0 : _d.call(this, ...task);
        }
      }
      return this;
    }
    /**
     * Evict the least recently used item, returning its value or
     * `undefined` if cache is empty.
     */
    pop() {
      var _a2;
      try {
        while (__privateGet(this, _size)) {
          const val = __privateGet(this, _valList)[__privateGet(this, _head)];
          __privateMethod(this, _LRUCache_instances, evict_fn).call(this, true);
          if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, val)) {
            if (val.__staleWhileFetching) {
              return val.__staleWhileFetching;
            }
          } else if (val !== void 0) {
            return val;
          }
        }
      } finally {
        if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
          const dt = __privateGet(this, _disposed);
          let task;
          while (task = dt?.shift()) {
            (_a2 = __privateGet(this, _disposeAfter)) == null ? void 0 : _a2.call(this, ...task);
          }
        }
      }
    }
    /**
     * Check if a key is in the cache, without updating the recency of use.
     * Will return false if the item is stale, even though it is technically
     * in the cache.
     *
     * Check if a key is in the cache, without updating the recency of
     * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
     * to `true` in either the options or the constructor.
     *
     * Will return `false` if the item is stale, even though it is technically in
     * the cache. The difference can be determined (if it matters) by using a
     * `status` argument, and inspecting the `has` field.
     *
     * Will not update item age unless
     * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
     */
    has(k, hasOptions = {}) {
      const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
      const index = __privateGet(this, _keyMap).get(k);
      if (index !== void 0) {
        const v = __privateGet(this, _valList)[index];
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) && v.__staleWhileFetching === void 0) {
          return false;
        }
        if (!__privateGet(this, _isStale).call(this, index)) {
          if (updateAgeOnHas) {
            __privateGet(this, _updateItemAge).call(this, index);
          }
          if (status) {
            status.has = "hit";
            __privateGet(this, _statusTTL).call(this, status, index);
          }
          return true;
        } else if (status) {
          status.has = "stale";
          __privateGet(this, _statusTTL).call(this, status, index);
        }
      } else if (status) {
        status.has = "miss";
      }
      return false;
    }
    /**
     * Like {@link LRUCache#get} but doesn't update recency or delete stale
     * items.
     *
     * Returns `undefined` if the item is stale, unless
     * {@link LRUCache.OptionsBase.allowStale} is set.
     */
    peek(k, peekOptions = {}) {
      const { allowStale = this.allowStale } = peekOptions;
      const index = __privateGet(this, _keyMap).get(k);
      if (index === void 0 || !allowStale && __privateGet(this, _isStale).call(this, index)) {
        return;
      }
      const v = __privateGet(this, _valList)[index];
      return __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v) ? v.__staleWhileFetching : v;
    }
    async fetch(k, fetchOptions = {}) {
      const {
        // get options
        allowStale = this.allowStale,
        updateAgeOnGet = this.updateAgeOnGet,
        noDeleteOnStaleGet = this.noDeleteOnStaleGet,
        // set options
        ttl = this.ttl,
        noDisposeOnSet = this.noDisposeOnSet,
        size = 0,
        sizeCalculation = this.sizeCalculation,
        noUpdateTTL = this.noUpdateTTL,
        // fetch exclusive options
        noDeleteOnFetchRejection = this.noDeleteOnFetchRejection,
        allowStaleOnFetchRejection = this.allowStaleOnFetchRejection,
        ignoreFetchAbort = this.ignoreFetchAbort,
        allowStaleOnFetchAbort = this.allowStaleOnFetchAbort,
        context,
        forceRefresh = false,
        status,
        signal
      } = fetchOptions;
      if (!__privateGet(this, _hasFetchMethod)) {
        if (status)
          status.fetch = "get";
        return this.get(k, {
          allowStale,
          updateAgeOnGet,
          noDeleteOnStaleGet,
          status
        });
      }
      const options = {
        allowStale,
        updateAgeOnGet,
        noDeleteOnStaleGet,
        ttl,
        noDisposeOnSet,
        size,
        sizeCalculation,
        noUpdateTTL,
        noDeleteOnFetchRejection,
        allowStaleOnFetchRejection,
        allowStaleOnFetchAbort,
        ignoreFetchAbort,
        status,
        signal
      };
      let index = __privateGet(this, _keyMap).get(k);
      if (index === void 0) {
        if (status)
          status.fetch = "miss";
        const p = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k, index, options, context);
        return p.__returned = p;
      } else {
        const v = __privateGet(this, _valList)[index];
        if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
          const stale = allowStale && v.__staleWhileFetching !== void 0;
          if (status) {
            status.fetch = "inflight";
            if (stale)
              status.returnedStale = true;
          }
          return stale ? v.__staleWhileFetching : v.__returned = v;
        }
        const isStale = __privateGet(this, _isStale).call(this, index);
        if (!forceRefresh && !isStale) {
          if (status)
            status.fetch = "hit";
          __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
          if (updateAgeOnGet) {
            __privateGet(this, _updateItemAge).call(this, index);
          }
          if (status)
            __privateGet(this, _statusTTL).call(this, status, index);
          return v;
        }
        const p = __privateMethod(this, _LRUCache_instances, backgroundFetch_fn).call(this, k, index, options, context);
        const hasStale = p.__staleWhileFetching !== void 0;
        const staleVal = hasStale && allowStale;
        if (status) {
          status.fetch = isStale ? "stale" : "refresh";
          if (staleVal && isStale)
            status.returnedStale = true;
        }
        return staleVal ? p.__staleWhileFetching : p.__returned = p;
      }
    }
    async forceFetch(k, fetchOptions = {}) {
      const v = await this.fetch(k, fetchOptions);
      if (v === void 0)
        throw new Error("fetch() returned undefined");
      return v;
    }
    memo(k, memoOptions = {}) {
      const memoMethod = __privateGet(this, _memoMethod);
      if (!memoMethod) {
        throw new Error("no memoMethod provided to constructor");
      }
      const { context, forceRefresh, ...options } = memoOptions;
      const v = this.get(k, options);
      if (!forceRefresh && v !== void 0)
        return v;
      const vv = memoMethod(k, v, {
        options,
        context
      });
      this.set(k, vv, options);
      return vv;
    }
    /**
     * Return a value from the cache. Will update the recency of the cache
     * entry found.
     *
     * If the key is not found, get() will return `undefined`.
     */
    get(k, getOptions = {}) {
      const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status } = getOptions;
      const index = __privateGet(this, _keyMap).get(k);
      if (index !== void 0) {
        const value = __privateGet(this, _valList)[index];
        const fetching = __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, value);
        if (status)
          __privateGet(this, _statusTTL).call(this, status, index);
        if (__privateGet(this, _isStale).call(this, index)) {
          if (status)
            status.get = "stale";
          if (!fetching) {
            if (!noDeleteOnStaleGet) {
              __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "expire");
            }
            if (status && allowStale)
              status.returnedStale = true;
            return allowStale ? value : void 0;
          } else {
            if (status && allowStale && value.__staleWhileFetching !== void 0) {
              status.returnedStale = true;
            }
            return allowStale ? value.__staleWhileFetching : void 0;
          }
        } else {
          if (status)
            status.get = "hit";
          if (fetching) {
            return value.__staleWhileFetching;
          }
          __privateMethod(this, _LRUCache_instances, moveToTail_fn).call(this, index);
          if (updateAgeOnGet) {
            __privateGet(this, _updateItemAge).call(this, index);
          }
          return value;
        }
      } else if (status) {
        status.get = "miss";
      }
    }
    /**
     * Deletes a key out of the cache.
     *
     * Returns true if the key was deleted, false otherwise.
     */
    delete(k) {
      return __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "delete");
    }
    /**
     * Clear the cache entirely, throwing away all values.
     */
    clear() {
      return __privateMethod(this, _LRUCache_instances, clear_fn).call(this, "delete");
    }
  };
  _max = new WeakMap();
  _maxSize = new WeakMap();
  _dispose = new WeakMap();
  _onInsert = new WeakMap();
  _disposeAfter = new WeakMap();
  _fetchMethod = new WeakMap();
  _memoMethod = new WeakMap();
  _perf = new WeakMap();
  _size = new WeakMap();
  _calculatedSize = new WeakMap();
  _keyMap = new WeakMap();
  _keyList = new WeakMap();
  _valList = new WeakMap();
  _next = new WeakMap();
  _prev = new WeakMap();
  _head = new WeakMap();
  _tail = new WeakMap();
  _free = new WeakMap();
  _disposed = new WeakMap();
  _sizes = new WeakMap();
  _starts = new WeakMap();
  _ttls = new WeakMap();
  _autopurgeTimers = new WeakMap();
  _hasDispose = new WeakMap();
  _hasFetchMethod = new WeakMap();
  _hasDisposeAfter = new WeakMap();
  _hasOnInsert = new WeakMap();
  _LRUCache_instances = new WeakSet();
  initializeTTLTracking_fn = function() {
    const ttls = new ZeroArray(__privateGet(this, _max));
    const starts = new ZeroArray(__privateGet(this, _max));
    __privateSet(this, _ttls, ttls);
    __privateSet(this, _starts, starts);
    const purgeTimers = this.ttlAutopurge ? new Array(__privateGet(this, _max)) : void 0;
    __privateSet(this, _autopurgeTimers, purgeTimers);
    __privateSet(this, _setItemTTL, (index, ttl, start = __privateGet(this, _perf).now()) => {
      starts[index] = ttl !== 0 ? start : 0;
      ttls[index] = ttl;
      if (purgeTimers?.[index]) {
        clearTimeout(purgeTimers[index]);
        purgeTimers[index] = void 0;
      }
      if (ttl !== 0 && purgeTimers) {
        const t = setTimeout(() => {
          if (__privateGet(this, _isStale).call(this, index)) {
            __privateMethod(this, _LRUCache_instances, delete_fn).call(this, __privateGet(this, _keyList)[index], "expire");
          }
        }, ttl + 1);
        if (t.unref) {
          t.unref();
        }
        purgeTimers[index] = t;
      }
    });
    __privateSet(this, _updateItemAge, (index) => {
      starts[index] = ttls[index] !== 0 ? __privateGet(this, _perf).now() : 0;
    });
    __privateSet(this, _statusTTL, (status, index) => {
      if (ttls[index]) {
        const ttl = ttls[index];
        const start = starts[index];
        if (!ttl || !start)
          return;
        status.ttl = ttl;
        status.start = start;
        status.now = cachedNow || getNow();
        const age = status.now - start;
        status.remainingTTL = ttl - age;
      }
    });
    let cachedNow = 0;
    const getNow = () => {
      const n = __privateGet(this, _perf).now();
      if (this.ttlResolution > 0) {
        cachedNow = n;
        const t = setTimeout(() => cachedNow = 0, this.ttlResolution);
        if (t.unref) {
          t.unref();
        }
      }
      return n;
    };
    this.getRemainingTTL = (key) => {
      const index = __privateGet(this, _keyMap).get(key);
      if (index === void 0) {
        return 0;
      }
      const ttl = ttls[index];
      const start = starts[index];
      if (!ttl || !start) {
        return Infinity;
      }
      const age = (cachedNow || getNow()) - start;
      return ttl - age;
    };
    __privateSet(this, _isStale, (index) => {
      const s = starts[index];
      const t = ttls[index];
      return !!t && !!s && (cachedNow || getNow()) - s > t;
    });
  };
  _updateItemAge = new WeakMap();
  _statusTTL = new WeakMap();
  _setItemTTL = new WeakMap();
  _isStale = new WeakMap();
  initializeSizeTracking_fn = function() {
    const sizes = new ZeroArray(__privateGet(this, _max));
    __privateSet(this, _calculatedSize, 0);
    __privateSet(this, _sizes, sizes);
    __privateSet(this, _removeItemSize, (index) => {
      __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) - sizes[index]);
      sizes[index] = 0;
    });
    __privateSet(this, _requireSize, (k, v, size, sizeCalculation) => {
      if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
        return 0;
      }
      if (!isPosInt(size)) {
        if (sizeCalculation) {
          if (typeof sizeCalculation !== "function") {
            throw new TypeError("sizeCalculation must be a function");
          }
          size = sizeCalculation(v, k);
          if (!isPosInt(size)) {
            throw new TypeError("sizeCalculation return invalid (expect positive integer)");
          }
        } else {
          throw new TypeError("invalid size value (must be positive integer). When maxSize or maxEntrySize is used, sizeCalculation or size must be set.");
        }
      }
      return size;
    });
    __privateSet(this, _addItemSize, (index, size, status) => {
      sizes[index] = size;
      if (__privateGet(this, _maxSize)) {
        const maxSize = __privateGet(this, _maxSize) - sizes[index];
        while (__privateGet(this, _calculatedSize) > maxSize) {
          __privateMethod(this, _LRUCache_instances, evict_fn).call(this, true);
        }
      }
      __privateSet(this, _calculatedSize, __privateGet(this, _calculatedSize) + sizes[index]);
      if (status) {
        status.entrySize = size;
        status.totalCalculatedSize = __privateGet(this, _calculatedSize);
      }
    });
  };
  _removeItemSize = new WeakMap();
  _addItemSize = new WeakMap();
  _requireSize = new WeakMap();
  indexes_fn = function* ({ allowStale = this.allowStale } = {}) {
    if (__privateGet(this, _size)) {
      for (let i = __privateGet(this, _tail); true; ) {
        if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i)) {
          break;
        }
        if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
          yield i;
        }
        if (i === __privateGet(this, _head)) {
          break;
        } else {
          i = __privateGet(this, _prev)[i];
        }
      }
    }
  };
  rindexes_fn = function* ({ allowStale = this.allowStale } = {}) {
    if (__privateGet(this, _size)) {
      for (let i = __privateGet(this, _head); true; ) {
        if (!__privateMethod(this, _LRUCache_instances, isValidIndex_fn).call(this, i)) {
          break;
        }
        if (allowStale || !__privateGet(this, _isStale).call(this, i)) {
          yield i;
        }
        if (i === __privateGet(this, _tail)) {
          break;
        } else {
          i = __privateGet(this, _next)[i];
        }
      }
    }
  };
  isValidIndex_fn = function(index) {
    return index !== void 0 && __privateGet(this, _keyMap).get(__privateGet(this, _keyList)[index]) === index;
  };
  evict_fn = function(free) {
    var _a2;
    const head2 = __privateGet(this, _head);
    const k = __privateGet(this, _keyList)[head2];
    const v = __privateGet(this, _valList)[head2];
    if (__privateGet(this, _hasFetchMethod) && __privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
      v.__abortController.abort(new Error("evicted"));
    } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
      if (__privateGet(this, _hasDispose)) {
        (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, "evict");
      }
      if (__privateGet(this, _hasDisposeAfter)) {
        __privateGet(this, _disposed)?.push([v, k, "evict"]);
      }
    }
    __privateGet(this, _removeItemSize).call(this, head2);
    if (__privateGet(this, _autopurgeTimers)?.[head2]) {
      clearTimeout(__privateGet(this, _autopurgeTimers)[head2]);
      __privateGet(this, _autopurgeTimers)[head2] = void 0;
    }
    if (free) {
      __privateGet(this, _keyList)[head2] = void 0;
      __privateGet(this, _valList)[head2] = void 0;
      __privateGet(this, _free).push(head2);
    }
    if (__privateGet(this, _size) === 1) {
      __privateSet(this, _head, __privateSet(this, _tail, 0));
      __privateGet(this, _free).length = 0;
    } else {
      __privateSet(this, _head, __privateGet(this, _next)[head2]);
    }
    __privateGet(this, _keyMap).delete(k);
    __privateWrapper(this, _size)._--;
    return head2;
  };
  backgroundFetch_fn = function(k, index, options, context) {
    const v = index === void 0 ? void 0 : __privateGet(this, _valList)[index];
    if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
      return v;
    }
    const ac = new AC();
    const { signal } = options;
    signal?.addEventListener("abort", () => ac.abort(signal.reason), {
      signal: ac.signal
    });
    const fetchOpts = {
      signal: ac.signal,
      options,
      context
    };
    const cb = (v2, updateCache = false) => {
      const { aborted } = ac.signal;
      const ignoreAbort = options.ignoreFetchAbort && v2 !== void 0;
      if (options.status) {
        if (aborted && !updateCache) {
          options.status.fetchAborted = true;
          options.status.fetchError = ac.signal.reason;
          if (ignoreAbort)
            options.status.fetchAbortIgnored = true;
        } else {
          options.status.fetchResolved = true;
        }
      }
      if (aborted && !ignoreAbort && !updateCache) {
        return fetchFail(ac.signal.reason);
      }
      const bf2 = p;
      const vl = __privateGet(this, _valList)[index];
      if (vl === p || ignoreAbort && updateCache && vl === void 0) {
        if (v2 === void 0) {
          if (bf2.__staleWhileFetching !== void 0) {
            __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
          } else {
            __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "fetch");
          }
        } else {
          if (options.status)
            options.status.fetchUpdated = true;
          this.set(k, v2, fetchOpts.options);
        }
      }
      return v2;
    };
    const eb = (er) => {
      if (options.status) {
        options.status.fetchRejected = true;
        options.status.fetchError = er;
      }
      return fetchFail(er);
    };
    const fetchFail = (er) => {
      const { aborted } = ac.signal;
      const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
      const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
      const noDelete = allowStale || options.noDeleteOnFetchRejection;
      const bf2 = p;
      if (__privateGet(this, _valList)[index] === p) {
        const del = !noDelete || bf2.__staleWhileFetching === void 0;
        if (del) {
          __privateMethod(this, _LRUCache_instances, delete_fn).call(this, k, "fetch");
        } else if (!allowStaleAborted) {
          __privateGet(this, _valList)[index] = bf2.__staleWhileFetching;
        }
      }
      if (allowStale) {
        if (options.status && bf2.__staleWhileFetching !== void 0) {
          options.status.returnedStale = true;
        }
        return bf2.__staleWhileFetching;
      } else if (bf2.__returned === bf2) {
        throw er;
      }
    };
    const pcall = (res, rej) => {
      var _a2;
      const fmp = (_a2 = __privateGet(this, _fetchMethod)) == null ? void 0 : _a2.call(this, k, v, fetchOpts);
      if (fmp && fmp instanceof Promise) {
        fmp.then((v2) => res(v2 === void 0 ? void 0 : v2), rej);
      }
      ac.signal.addEventListener("abort", () => {
        if (!options.ignoreFetchAbort || options.allowStaleOnFetchAbort) {
          res(void 0);
          if (options.allowStaleOnFetchAbort) {
            res = (v2) => cb(v2, true);
          }
        }
      });
    };
    if (options.status)
      options.status.fetchDispatched = true;
    const p = new Promise(pcall).then(cb, eb);
    const bf = Object.assign(p, {
      __abortController: ac,
      __staleWhileFetching: v,
      __returned: void 0
    });
    if (index === void 0) {
      this.set(k, bf, { ...fetchOpts.options, status: void 0 });
      index = __privateGet(this, _keyMap).get(k);
    } else {
      __privateGet(this, _valList)[index] = bf;
    }
    return bf;
  };
  isBackgroundFetch_fn = function(p) {
    if (!__privateGet(this, _hasFetchMethod))
      return false;
    const b = p;
    return !!b && b instanceof Promise && b.hasOwnProperty("__staleWhileFetching") && b.__abortController instanceof AC;
  };
  connect_fn = function(p, n) {
    __privateGet(this, _prev)[n] = p;
    __privateGet(this, _next)[p] = n;
  };
  moveToTail_fn = function(index) {
    if (index !== __privateGet(this, _tail)) {
      if (index === __privateGet(this, _head)) {
        __privateSet(this, _head, __privateGet(this, _next)[index]);
      } else {
        __privateMethod(this, _LRUCache_instances, connect_fn).call(this, __privateGet(this, _prev)[index], __privateGet(this, _next)[index]);
      }
      __privateMethod(this, _LRUCache_instances, connect_fn).call(this, __privateGet(this, _tail), index);
      __privateSet(this, _tail, index);
    }
  };
  delete_fn = function(k, reason) {
    var _a2, _b2;
    let deleted = false;
    if (__privateGet(this, _size) !== 0) {
      const index = __privateGet(this, _keyMap).get(k);
      if (index !== void 0) {
        if (__privateGet(this, _autopurgeTimers)?.[index]) {
          clearTimeout(__privateGet(this, _autopurgeTimers)?.[index]);
          __privateGet(this, _autopurgeTimers)[index] = void 0;
        }
        deleted = true;
        if (__privateGet(this, _size) === 1) {
          __privateMethod(this, _LRUCache_instances, clear_fn).call(this, reason);
        } else {
          __privateGet(this, _removeItemSize).call(this, index);
          const v = __privateGet(this, _valList)[index];
          if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
            v.__abortController.abort(new Error("deleted"));
          } else if (__privateGet(this, _hasDispose) || __privateGet(this, _hasDisposeAfter)) {
            if (__privateGet(this, _hasDispose)) {
              (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, reason);
            }
            if (__privateGet(this, _hasDisposeAfter)) {
              __privateGet(this, _disposed)?.push([v, k, reason]);
            }
          }
          __privateGet(this, _keyMap).delete(k);
          __privateGet(this, _keyList)[index] = void 0;
          __privateGet(this, _valList)[index] = void 0;
          if (index === __privateGet(this, _tail)) {
            __privateSet(this, _tail, __privateGet(this, _prev)[index]);
          } else if (index === __privateGet(this, _head)) {
            __privateSet(this, _head, __privateGet(this, _next)[index]);
          } else {
            const pi = __privateGet(this, _prev)[index];
            __privateGet(this, _next)[pi] = __privateGet(this, _next)[index];
            const ni = __privateGet(this, _next)[index];
            __privateGet(this, _prev)[ni] = __privateGet(this, _prev)[index];
          }
          __privateWrapper(this, _size)._--;
          __privateGet(this, _free).push(index);
        }
      }
    }
    if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)?.length) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt?.shift()) {
        (_b2 = __privateGet(this, _disposeAfter)) == null ? void 0 : _b2.call(this, ...task);
      }
    }
    return deleted;
  };
  clear_fn = function(reason) {
    var _a2, _b2;
    for (const index of __privateMethod(this, _LRUCache_instances, rindexes_fn).call(this, { allowStale: true })) {
      const v = __privateGet(this, _valList)[index];
      if (__privateMethod(this, _LRUCache_instances, isBackgroundFetch_fn).call(this, v)) {
        v.__abortController.abort(new Error("deleted"));
      } else {
        const k = __privateGet(this, _keyList)[index];
        if (__privateGet(this, _hasDispose)) {
          (_a2 = __privateGet(this, _dispose)) == null ? void 0 : _a2.call(this, v, k, reason);
        }
        if (__privateGet(this, _hasDisposeAfter)) {
          __privateGet(this, _disposed)?.push([v, k, reason]);
        }
      }
    }
    __privateGet(this, _keyMap).clear();
    __privateGet(this, _valList).fill(void 0);
    __privateGet(this, _keyList).fill(void 0);
    if (__privateGet(this, _ttls) && __privateGet(this, _starts)) {
      __privateGet(this, _ttls).fill(0);
      __privateGet(this, _starts).fill(0);
      for (const t of __privateGet(this, _autopurgeTimers) ?? []) {
        if (t !== void 0)
          clearTimeout(t);
      }
      __privateGet(this, _autopurgeTimers)?.fill(void 0);
    }
    if (__privateGet(this, _sizes)) {
      __privateGet(this, _sizes).fill(0);
    }
    __privateSet(this, _head, 0);
    __privateSet(this, _tail, 0);
    __privateGet(this, _free).length = 0;
    __privateSet(this, _calculatedSize, 0);
    __privateSet(this, _size, 0);
    if (__privateGet(this, _hasDisposeAfter) && __privateGet(this, _disposed)) {
      const dt = __privateGet(this, _disposed);
      let task;
      while (task = dt?.shift()) {
        (_b2 = __privateGet(this, _disposeAfter)) == null ? void 0 : _b2.call(this, ...task);
      }
    }
  };
  var LRUCache = _LRUCache;

  // js/changeset-service.js
  var STORAGE_KEY = "smtw-changesets";
  var MAX_SIZE = 500;
  var PERSIST_INTERVAL_MS = 3e4;
  var ChangesetService = class {
    constructor() {
      this.cache = this.loadFromStorage();
      this.inFlight = /* @__PURE__ */ new Map();
      this.persistIntervalId = null;
    }
    loadFromStorage() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const cache = new LRUCache({ max: MAX_SIZE });
          cache.load(JSON.parse(stored));
          console.log(`[ChangesetService] Loaded ${cache.size} entries from cache`);
          return cache;
        }
      } catch (err) {
        console.warn("[ChangesetService] Failed to load cache:", err.message);
      }
      return new LRUCache({ max: MAX_SIZE });
    }
    saveToStorage() {
      const doSave = () => {
        try {
          const data = JSON.stringify(this.cache.dump());
          localStorage.setItem(STORAGE_KEY, data);
          console.log(`[ChangesetService] Saved ${this.cache.size} entries to cache`);
        } catch (err) {
          console.warn("[ChangesetService] Failed to save cache:", err.message);
        }
      };
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(doSave, { timeout: 1e4 });
      } else {
        setTimeout(doSave, 0);
      }
    }
    saveToStorageSync() {
      try {
        const data = JSON.stringify(this.cache.dump());
        localStorage.setItem(STORAGE_KEY, data);
      } catch (err) {
      }
    }
    startPersisting() {
      if (this.persistIntervalId) return;
      this.persistIntervalId = setInterval(() => this.saveToStorage(), PERSIST_INTERVAL_MS);
      window.addEventListener("beforeunload", () => this.saveToStorageSync());
    }
    stopPersisting() {
      if (this.persistIntervalId) {
        clearInterval(this.persistIntervalId);
        this.persistIntervalId = null;
      }
    }
    /**
     * Get changeset data by ID
     * @param {number} id - Changeset ID
     * @returns {Promise<Object>} Changeset tags/metadata
     */
    async get(id) {
      const cached = this.cache.get(id);
      if (cached) {
        console.log(`[ChangesetService] Cache hit for changeset ${id}`);
        return cached;
      }
      if (this.inFlight.has(id)) {
        console.log(`[ChangesetService] Waiting for in-flight request for changeset ${id}`);
        return this.inFlight.get(id);
      }
      console.log(`[ChangesetService] Cache miss, fetching changeset ${id}`);
      const fetchPromise = this.fetchChangeset(id);
      this.inFlight.set(id, fetchPromise);
      try {
        const result = await fetchPromise;
        return result;
      } finally {
        this.inFlight.delete(id);
      }
    }
    async fetchChangeset(id) {
      const response = await fetchWithRetry(
        `//www.openstreetmap.org/api/0.6/changeset/${id}`,
        { mode: "cors" },
        { timeout: 5e3, retries: 2 }
      );
      const responseString = await response.text();
      const data = new window.DOMParser().parseFromString(responseString, "text/xml");
      const changesetData = {};
      const tags = data.getElementsByTagName("tag");
      for (let i = 0; i < tags.length; i++) {
        const key = tags[i].getAttribute("k");
        const value = tags[i].getAttribute("v");
        changesetData[key] = value;
      }
      this.cache.set(id, changesetData);
      return changesetData;
    }
  };

  // js/geocode-service.js
  init_define_process_env();
  init_buffer_global();
  var STORAGE_KEY2 = "smtw-geocodes";
  var MAX_SIZE2 = 2e3;
  var PERSIST_INTERVAL_MS2 = 3e4;
  var CLOSE_THRESHOLD_METERS = 1e4;
  var GeocodeService = class {
    constructor() {
      this.cache = this.loadFromStorage();
      this.inFlight = /* @__PURE__ */ new Map();
      this.persistIntervalId = null;
    }
    loadFromStorage() {
      try {
        const stored = localStorage.getItem(STORAGE_KEY2);
        if (stored) {
          const cache = new LRUCache({ max: MAX_SIZE2 });
          cache.load(JSON.parse(stored));
          console.log(`[GeocodeService] Loaded ${cache.size} entries from cache`);
          return cache;
        }
      } catch (err) {
        console.warn("[GeocodeService] Failed to load cache:", err.message);
      }
      return new LRUCache({ max: MAX_SIZE2 });
    }
    saveToStorage() {
      const doSave = () => {
        try {
          const data = JSON.stringify(this.cache.dump());
          localStorage.setItem(STORAGE_KEY2, data);
          console.log(`[GeocodeService] Saved ${this.cache.size} entries to cache`);
        } catch (err) {
          console.warn("[GeocodeService] Failed to save cache:", err.message);
        }
      };
      if (typeof requestIdleCallback !== "undefined") {
        requestIdleCallback(doSave, { timeout: 1e4 });
      } else {
        setTimeout(doSave, 0);
      }
    }
    saveToStorageSync() {
      try {
        const data = JSON.stringify(this.cache.dump());
        localStorage.setItem(STORAGE_KEY2, data);
      } catch (err) {
      }
    }
    startPersisting() {
      if (this.persistIntervalId) return;
      this.persistIntervalId = setInterval(() => this.saveToStorage(), PERSIST_INTERVAL_MS2);
      window.addEventListener("beforeunload", () => this.saveToStorageSync());
    }
    stopPersisting() {
      if (this.persistIntervalId) {
        clearInterval(this.persistIntervalId);
        this.persistIntervalId = null;
      }
    }
    /**
     * Find a cached geocode within threshold distance
     */
    findNearbyCache(lat, lon) {
      const closeByKey = [...this.cache.keys()].find((key) => {
        const [cachedLat, cachedLon] = key.split(",").map(parseFloat);
        return distanceBetween(lat, lon, cachedLat, cachedLon) < CLOSE_THRESHOLD_METERS;
      });
      if (closeByKey) {
        return this.cache.get(closeByKey);
      }
      return null;
    }
    /**
     * Get display name for a location
     * @param {Object} boundsCenter - Object with lat and lng properties
     * @returns {Promise<string|null>} Display name or null on failure
     */
    async get(boundsCenter) {
      const lat = boundsCenter.lat;
      const lon = boundsCenter.lng;
      const key = `${lat.toFixed(2)},${lon.toFixed(2)}`;
      if (this.cache.has(key)) {
        const cached = this.cache.get(key);
        console.log(`[GeocodeService] Cache hit for ${key}: ${cached ? "found" : "cached failure"}`);
        return cached;
      }
      const nearbyCached = this.findNearbyCache(lat, lon);
      if (nearbyCached) {
        console.log(`[GeocodeService] Cache hit (nearby) for ${key}`);
        return nearbyCached;
      }
      if (this.inFlight.has(key)) {
        console.log(`[GeocodeService] Waiting for in-flight request for ${key}`);
        return this.inFlight.get(key);
      }
      console.log(`[GeocodeService] Cache miss, fetching ${key}`);
      const fetchPromise = this.fetchGeocode(lat, lon);
      this.inFlight.set(key, fetchPromise);
      try {
        const result = await fetchPromise;
        return result;
      } finally {
        this.inFlight.delete(key);
      }
    }
    async fetchGeocode(lat, lon) {
      const roundedLat = lat.toFixed(2);
      const roundedLon = lon.toFixed(2);
      const nominatimUrl = `//nominatim.openstreetmap.org/reverse?format=json&lat=${roundedLat}&lon=${roundedLon}&zoom=5`;
      try {
        const response = await fetchWithRetry(
          nominatimUrl,
          { mode: "cors" },
          { timeout: 3e3, retries: 1 }
          // 3s timeout, max 2 attempts total
        );
        const data = await response.json();
        const id = `${roundedLat},${roundedLon}`;
        const displayName = data.display_name;
        this.cache.set(id, displayName);
        return displayName;
      } catch (err) {
        console.warn("[GeocodeService] Failed to fetch location after retries:", err.message);
        const id = `${roundedLat},${roundedLon}`;
        this.cache.set(id, null);
        return null;
      }
    }
  };

  // js/site.js
  function init2(windowLocationObj) {
    const ui = new Ui();
    const hashParams = new URLSearchParams(windowLocationObj.hash.replace("#", ""));
    const params = Object.fromEntries(hashParams);
    const context = setContext(params);
    let queue = [];
    const bbox = makeBbox(context.bounds);
    const filterAndGroup = (data) => {
      const filtered = data.filter(happenedToday).filter(userNotIgnored).filter(acceptableType).filter(hasTags).filter(wayLongEnough).filter((change) => withinBbox(change, bbox));
      const byChangeset = /* @__PURE__ */ new Map();
      for (const change of filtered) {
        const changesetId = (change.neu || change.old).changeset;
        if (!byChangeset.has(changesetId)) {
          byChangeset.set(changesetId, []);
        }
        byChangeset.get(changesetId).push(change);
      }
      const sortedGroups = Array.from(byChangeset.values()).sort((a, b) => a.length - b.length);
      const result = sortedGroups.flat();
      console.log(`[Queue] Grouped ${filtered.length} changes into ${byChangeset.size} changesets (largest: ${sortedGroups[sortedGroups.length - 1]?.length || 0} items)`);
      return result;
    };
    const diffService = new DiffService();
    const requestingBbox = context.bounds != config.bounds && isBboxSizeAcceptable(bbox) ? makeBboxString(makeBbox(context.bounds)) : null;
    diffService.init().then(() => {
      const cachedDiffs = diffService.getCached();
      if (cachedDiffs.length) {
        queue = filterAndGroup(cachedDiffs);
        console.log(`Loaded ${queue.length} changes from cached diffs`);
      }
      diffService.start((data) => {
        queue = filterAndGroup(data);
      }, requestingBbox);
    }).catch((err) => {
      console.warn("[DiffService] Init failed, starting without cache:", err);
      diffService.start((data) => {
        queue = filterAndGroup(data);
      }, requestingBbox);
    });
    const maps = new Maps(context, bbox);
    const sidebar = new Sidebar(hashParams, windowLocationObj, context);
    sidebar.initializeEventListeners();
    const PREFETCH_COUNT = 3;
    const PREFETCH_DELAY_MS = 1e3;
    const prefetchMap = /* @__PURE__ */ new Map();
    function getChangesetId(item) {
      return (item.neu || item.old).changeset;
    }
    function getItemCenter(item) {
      const mapElement = item.neu || item.old;
      if (mapElement.type === "way" && mapElement.bounds) {
        const [south, west, north, east] = mapElement.bounds;
        return { lat: (south + north) / 2, lng: (west + east) / 2 };
      } else if (mapElement.lat !== void 0 && mapElement.lon !== void 0) {
        return { lat: mapElement.lat, lng: mapElement.lon };
      }
      return null;
    }
    function getDistance(p1, p2) {
      const R = 6371e3;
      const lat1 = p1.lat * Math.PI / 180;
      const lat2 = p2.lat * Math.PI / 180;
      const dLat = (p2.lat - p1.lat) * Math.PI / 180;
      const dLng = (p2.lng - p1.lng) * Math.PI / 180;
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) * Math.sin(dLng / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      return R * c;
    }
    function findBatchItems(firstItem, firstCenter) {
      const changesetId = getChangesetId(firstItem);
      const batch = [firstItem];
      const maxBatchSize = 15;
      const maxDistance = 1e3;
      for (let i = queue.length - 1; i >= 0 && batch.length < maxBatchSize; i--) {
        const item = queue[i];
        if (getChangesetId(item) !== changesetId) continue;
        const center = getItemCenter(item);
        if (!center) continue;
        if (getDistance(firstCenter, center) <= maxDistance) {
          batch.push(item);
          queue.splice(i, 1);
        }
      }
      return batch;
    }
    function prefetchUpcoming() {
      const toPrefetch = [];
      const seenChangesets = /* @__PURE__ */ new Set();
      for (let i = queue.length - 1; i >= 0 && toPrefetch.length < PREFETCH_COUNT; i--) {
        const item = queue[i];
        const changesetId = getChangesetId(item);
        if (!seenChangesets.has(changesetId)) {
          seenChangesets.add(changesetId);
          toPrefetch.push(item);
        }
      }
      toPrefetch.forEach((item, index) => {
        const changesetId = getChangesetId(item);
        if (prefetchMap.has(changesetId)) return;
        if (context.changesetService.cache.has(changesetId)) return;
        const delay = index * PREFETCH_DELAY_MS;
        const prefetchPromise = new Promise((resolve) => {
          setTimeout(() => {
            const change = new Change(context, item);
            change.isRelevant().then((isRelevant) => {
              if (!isRelevant) {
                resolve({ change, skip: true });
                return;
              }
              change.enhance().then(() => resolve({ change, skip: false })).catch(() => resolve({ change, skip: true }));
            });
          }, delay);
        });
        prefetchMap.set(changesetId, prefetchPromise);
        console.log(`[Prefetch] Started prefetch for changeset ${changesetId}`);
      });
    }
    function controller() {
      if (queue.length) {
        const item = queue.pop();
        const changesetId = getChangesetId(item);
        const itemCenter = getItemCenter(item);
        ui.updateQueueSize(queue.length);
        const MIN_BATCH_SIZE = 5;
        let batchItems = [item];
        if (context.multi && itemCenter && queue.length >= MIN_BATCH_SIZE - 1) {
          batchItems = findBatchItems(item, itemCenter);
        }
        if (batchItems.length >= MIN_BATCH_SIZE) {
          console.log(`[Batch] Processing ${batchItems.length} nearby changes from changeset ${changesetId}`);
          ui.updateQueueSize(queue.length);
          const enhancePromises = batchItems.map(async (batchItem) => {
            const change = new Change(context, batchItem);
            const isRelevant = await change.isRelevant();
            if (!isRelevant) return null;
            try {
              await change.enhance();
              return change;
            } catch (err) {
              console.warn("Skipping batch item due to enhance failure:", err.message);
              return null;
            }
          });
          Promise.all(enhancePromises).then((changes) => {
            const validChanges = changes.filter((c) => c !== null);
            if (validChanges.length >= MIN_BATCH_SIZE) {
              ui.update(validChanges[0]);
              maps.drawMapElementBatch(validChanges, controller);
            } else if (validChanges.length > 0) {
              ui.update(validChanges[0]);
              maps.drawMapElement(validChanges[0], controller);
            } else {
              controller();
            }
            prefetchUpcoming();
          });
        } else {
          const prefetched = prefetchMap.get(changesetId);
          if (prefetched) {
            prefetchMap.delete(changesetId);
            console.log(`[Prefetch] Using prefetched result for changeset ${changesetId}`);
            prefetched.then(({ change, skip }) => {
              if (skip) {
                controller();
              } else {
                ui.update(change);
                maps.drawMapElement(change, controller);
              }
              prefetchUpcoming();
            });
          } else {
            const change = new Change(context, item);
            change.isRelevant().then((isRelevant) => {
              if (isRelevant) {
                change.enhance().then(() => {
                  ui.update(change);
                  maps.drawMapElement(change, controller);
                  prefetchUpcoming();
                }).catch((err) => {
                  console.warn("Skipping change due to enhance failure:", err.message);
                  controller();
                });
              } else {
                controller();
              }
            });
          }
        }
      } else {
        setTimeout(controller, context.runTime);
      }
    }
    prefetchUpcoming();
    controller();
  }
  function setContext(obj) {
    const comment = obj.comment || config.comment;
    if (comment.length) document.title += ` # ${comment}`;
    const context = Object.assign({}, config, obj);
    context.bounds = context.bounds.split(",");
    context.runTime = 1e3 * context.runTime;
    context.multi = context.multi === "true" || context.multi === true;
    context.debug = context.debug === "true" || context.debug === true;
    context.changesetService = new ChangesetService();
    context.changesetService.startPersisting();
    context.geocodeService = new GeocodeService();
    context.geocodeService.startPersisting();
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
