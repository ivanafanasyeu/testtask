// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"cons.js":[function(require,module,exports) {
const copy = arr => JSON.parse(JSON.stringify(arr)); // 1. Создаём canvas


const canvas = (rows, cols) => new Array(cols).fill("").map((o, i) => new Array(rows).fill("")); // 2. Функция построения линии


const line = (x1, y1, x2, y2) => {
  if (y1 === y2) {
    for (let i = x1; i <= x2; i++) {
      c[y1 - 1][i - 1] = "x";
    }
  } else {
    for (let i = y1; i <= y2; i++) {
      c[i - 1][x1 - 1] = "x";
    }
  }
}; // 3. Функция построения прямоугольника


const rectangle = (x1, y1, x2, y2) => {
  line(x1, y1, x2, y1);
  line(x2, y1, x2, y2);
  line(x1, y1, x1, y2);
  line(x1, y2, x2, y2);
}; // 4. fill
// const floodFill = function (image, sr, sc, newColor) {
//   const color = image[sr][sc];
//   if (color === newColor) return image;
//   const queue = [];
//   queue.push([sr, sc]);
//   while (queue.length) {
//     const [x, y] = queue.shift();
//     image[x][y] = newColor;
//     if (x - 1 >= 0 && image[x - 1][y] === color) queue.push([x - 1, y]);
//     if (y - 1 >= 0 && image[x][y - 1] === color) queue.push([x, y - 1]);
//     if (x + 1 < image.length && image[x + 1][y] === color)
//       queue.push([x + 1, y]);
//     if (y + 1 < image[0].length && image[x][y + 1] === color)
//       queue.push([x, y + 1]);
//   }
//   return image;
// };
// let floodFill = (A, row, col, cur, seen = new Set()) => {
//   let M = A.length,
//     N = M ? A[0].length : 0;
//   let pre = A[row][col];
//   let q = [[row, col]];
//   while (q.length) {
//     let [i, j] = q.shift();
//     seen.add(`${i},${j}`);
//     A[i][j] = cur;
//     for (let dir of [
//       [-1, 0],
//       [0, 1],
//       [1, 0],
//       [0, -1],
//     ]) {
//       // clockwise [👆, 👉, 👇, 👈]
//       let u = i + dir[0],
//         v = j + dir[1];
//       if (
//         u < 0 ||
//         u == M ||
//         v < 0 ||
//         v == N ||
//         A[u][v] != pre ||
//         seen.has(`${u},${v}`)
//       )
//         continue;
//       q.push([u, v]);
//     }
//   }
//   return A;
// };


var floodFill = function (image, sr, sc, newColor) {
  const currentColor = image[sr][sc]; // No change needed

  if (currentColor === newColor) return image;
  const rowLength = image.length - 1;
  const colLength = image[0].length - 1;
  let stack = [[sr, sc]];

  while (stack.length !== 0) {
    let curr = stack.pop();
    let [row, col] = curr;
    if (row > 0 && image[row - 1][col] === currentColor) stack.push([row - 1, col]);
    if (row < rowLength && image[row + 1][col] === currentColor) stack.push([row + 1, col]);
    if (col > 0 && image[row][col - 1] === currentColor) stack.push([row, col - 1]);
    if (col < colLength && image[row][col + 1] === currentColor) stack.push([row, col + 1]); // Set the color

    image[row][col] = newColor;
  }

  return image;
}; // const c = canvas(20, 4);
// line(1, 2, 6, 2);
// line(6, 3, 6, 4, copy(c));
// rectangle(16, 1, 20, 3);
// floodFill(c, 3, 10, "o");
// console.log(copy(c));
//
// SECOND:


const c = canvas(230, 100);
line(10, 20, 60, 20);
line(60, 30, 60, 50, copy(c));
rectangle(60, 10, 200, 30);
floodFill(c, 30, 100, "0");
console.log(copy(c));
console.log(`STEP: 4`, copy(c));
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54043" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","cons.js"], null)
//# sourceMappingURL=/cons.1a3d4c39.js.map