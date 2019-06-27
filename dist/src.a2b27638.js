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
})({"src/ui/base-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BaseElement = void 0;

class BaseElement {
  constructor() {
    this.element = null;
  }

  appendToElement(el) {
    this.createElement();
    el.insertAdjacentHTML('beforeend', this.element); // this.enableMdlJS(); // enables animations on MDL (seems to work fine without it)
  }

  createElement() {
    let s = this.getElementString();
    this.element = s;
  }

  getElementString() {
    console.log(`I'm overidden`);
    throw 'Please override getElementString() in BaseElement';
  }

  enableMdlJS() {
    componentHandler.upgradeElement(this.element[0]);
  }

}

exports.BaseElement = BaseElement;
},{}],"src/ui/button.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Button = void 0;

var _baseElement = require("./base-element");

class Button extends _baseElement.BaseElement {
  constructor(title) {
    super();
    this.title = title;
  } //   override same method name in base class


  getElementString() {
    return `
            <button class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--accent">
            ${this.title}
            </button>
      `;
  }

}

exports.Button = Button;
},{"./base-element":"src/ui/base-element.js"}],"images/image-urls.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.drone1 = void 0;
// drone
let drone1 = 'https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ffortunedotcom.files.wordpress.com%2F2017%2F10%2Fmind-control-drones.jpg&f=1';
exports.drone1 = drone1;
},{}],"src/ui/image.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Image = void 0;

var _baseElement = require("./base-element");

class Image extends _baseElement.BaseElement {
  constructor(src) {
    super();
    this.src = src;
  } //   override same method name in base class


  getElementString() {
    return ` <img src=${this.src} style="width:100%;"> `;
  }

}

exports.Image = Image;
},{"./base-element":"src/ui/base-element.js"}],"src/ui/title-bar.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TitleBar = void 0;

var _baseElement = require("./base-element");

class TitleBar extends _baseElement.BaseElement {
  constructor(title) {
    super();
    this.title = title;
    this.links = [];
  }

  addLink(title, href) {
    this.links.push({
      title,
      href
    });
  } //   override same method name in base class


  getElementString() {
    let links = '';

    for (const link of this.links) {
      links += `<a class="mdl-navigation__link" href="${link.href}">${link.title}</a>\n`;
    } // return ``;


    return `
    <!-- Uses a header that contracts as the page scrolls down. -->
    <style>
    .demo-layout-waterfall .mdl-layout__header-row .mdl-navigation__link:last-of-type  {
    padding-right: 0;
    }
    </style>

    <div class="demo-layout-waterfall mdl-layout mdl-js-layout">
        <header class="mdl-layout__header mdl-layout__header--waterfall">
            <!-- Top row, always visible -->
            <div class="mdl-layout__header-row">
            <!-- Title -->
            <span class="mdl-layout-title">${this.title}</span>
            <div class="mdl-layout-spacer"></div>
            <div class="mdl-textfield mdl-js-textfield mdl-textfield--expandable
                        mdl-textfield--floating-label mdl-textfield--align-right">
                <label class="mdl-button mdl-js-button mdl-button--icon"
                    for="waterfall-exp">
                <i class="material-icons">search</i>
                </label>
                <div class="mdl-textfield__expandable-holder">
                <input class="mdl-textfield__input" type="text" name="sample"
                        id="waterfall-exp">
                </div>
            </div>
            </div>
            <!-- Bottom row, not visible on scroll -->
            <div class="mdl-layout__header-row">
            <div class="mdl-layout-spacer"></div>
            <!-- Navigation -->
            <nav class="mdl-navigation">
                ${links}
            </nav>
            </div>
        </header>
        <div class="mdl-layout__drawer">
            <span class="mdl-layout-title">${this.title}</span>
            <nav class="mdl-navigation">
        ${links}
            </nav>
        </div>
        <main class="mdl-layout__content">
            <div class="page-content"><!-- Your content goes here --></div>
        </main>
     </div>
    `;
  }

}

exports.TitleBar = TitleBar;
},{"./base-element":"src/ui/base-element.js"}],"src/classes/vehicle.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vehicle = void 0;

class Vehicle {
  constructor(license, model, latLong) {
    this.license = license;
    this.model = model;
    this.latLong = latLong;
  }

}

exports.Vehicle = Vehicle;
},{}],"src/classes/car.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Car = void 0;

var _vehicle = require("./vehicle");

class Car extends _vehicle.Vehicle {
  constructor(license, model, latLong) {
    super(license, model, latLong);
  }

}

exports.Car = Car;
},{"./vehicle":"src/classes/vehicle.js"}],"src/classes/drone.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Drone = void 0;

var _vehicle = require("./vehicle");

class Drone extends _vehicle.Vehicle {
  constructor(license, model, latLong) {
    super(license, model, latLong);
  }

}

exports.Drone = Drone;
},{"./vehicle":"src/classes/vehicle.js"}],"src/classes/errors.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ErrorData = void 0;

class ErrorData {
  constructor(message, data) {
    this.message = message;
    this.data = data;
  }

}

exports.ErrorData = ErrorData;
},{}],"src/services/fleet-data-service.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FleetDataService = void 0;

var _car = require("../classes/car");

var _drone = require("../classes/drone");

var _errors = require("../classes/errors");

class FleetDataService {
  constructor() {
    this.cars = [];
    this.drones = [];
    this.errors = [];
  }

  loadData(fleet) {
    for (let data of fleet) {
      switch (data.type) {
        case 'drone':
          if (this.validateDroneData(data)) {
            let drone = this.loadDrone(data);

            if (drone) {
              this.drones.push(drone);
            } else {
              let e = new _errors.ErrorData('Invalid drone data', drone);
              this.errors.push(e);
            }
          }

          break;

        case 'car':
          if (this.validateCarData(data)) {
            let car = this.loadCar(data);

            if (car) {
              this.cars.push(car);
            } else {
              let e = new _errors.ErrorData('Invalid car data', car);
              this.errors.push(e);
            }
          }

          break;

        default:
          let e = new _errors.ErrorData('Invalid vehicle type', data);
          this.errors.push(e);
          break;
      }
    }
  }

  loadDrone(drone) {
    try {
      let d = new _drone.Drone(drone.license, drone.model, drone.latLong);
      d.airTimeHours = drone.airTimeHours;
      d.base = drone.base;
      return d;
    } catch (e) {
      this.errors.push(new _errors.ErrorData('Error loading drone', drone));
    }

    return null;
  }

  validateDroneData(drone) {
    let validProps = 'license, type, model, airTimeHours, base, latLong';
    let requiredProps = validProps.split(', ');
    let hasError = false;

    for (let prop of requiredProps) {
      // "!" turns drone[prop] value into a boolean
      // !drone[prop] --> truthy values have err e.g. "undefined"
      if (!drone[prop]) {
        this.errors.push(new _errors.ErrorData(`invalid property "(${prop})" `, drone));
        hasError = true;
      } //   check whether or not prop "airTimeHours" is a number


      if (isNaN(Number(drone['airTimeHours']))) {
        this.errors.push(new _errors.ErrorData(`"(${prop})" is not a number! `, drone));
        hasError = true;
      }
    }

    return !hasError;
  }

  loadCar(car) {
    try {
      let c = new _car.Car(car.license, car.model, car.latLong);
      c.model = car.model;
      c.miles = car.miles;
      c.make = car.make;
      return c;
    } catch (e) {
      this.errors.push(new _errors.ErrorData('Error loading car', car));
    }

    return null;
  }

  validateCarData(car) {
    let validProps = 'license type make model latLong miles'.split(' ');
    let hasError = false;

    for (let prop of validProps) {
      if (!car[prop]) {
        hasError = true;
        this.errors.push(`invalid car property "${prop}"`, car);
      }

      if (!Number(car['miles'])) {
        hasError = true;
        this.errors.push(new _errors.ErrorData(`"(${prop})" is not a number!`, car));
      }
    }

    return !hasError;
  }

  getCarByLicense(license) {
    return this.cars.find((car, index, self) => car.license == license);
  }

  filterCarsByMake(searchTerm) {
    console.log(`TCL: FleetDataService -> filterCarsByMake -> searchTerm, "${searchTerm}"`);
    return this.cars.filter((car, i, self) => car.make.indexOf(searchTerm) >= 0);
  }

  getCarsSortedbyLicence() {
    return this.cars.sort((car1, car2) => {
      return car1.license > car2.license ? 1 : -1;
    });
  }

}

exports.FleetDataService = FleetDataService;
},{"../classes/car":"src/classes/car.js","../classes/drone":"src/classes/drone.js","../classes/errors":"src/classes/errors.js"}],"src/ui/data-table.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DataTable = void 0;

var _baseElement = require("./base-element");

class DataTable extends _baseElement.BaseElement {
  constructor(headers, fleet) {
    super();
    this.headers = headers;
    this.fleet = fleet;
  }

  getElementString() {
    let th = '';
    let tr = '';
    let td = '';

    for (const h of this.headers) {
      th += `
      <th class="mdl-data-table__cell--non-numeric">
        ${h}
      </th>
      `;
    }

    console.log('TCL: DataTable -> getElementString -> this.fleet', this.fleet);

    for (const prop of this.fleet) {
      console.log(prop);
    }

    return `
    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
  <thead>
    <tr>
    ${th}
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Acrylic (Transparent)</td>
      <td>25</td>
      <td>$2.90</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Plywood (Birch)</td>
      <td>50</td>
      <td>$1.25</td>
    </tr>
    <tr>
      <td class="mdl-data-table__cell--non-numeric">Laminate (Gold on Blue)</td>
      <td>10</td>
      <td>$2.35</td>
    </tr>
  </tbody>
</table>
    `;
  }

}

exports.DataTable = DataTable;
},{"./base-element":"src/ui/base-element.js"}],"src/index.js":[function(require,module,exports) {
"use strict";

var _button = require("./ui/button");

var _imageUrls = require("../images/image-urls");

var _image = require("./ui/image");

var _titleBar = require("./ui/title-bar");

var _fleetDataService = require("./services/fleet-data-service");

var _dataTable = require("./ui/data-table");

let body = document.querySelector('body'); // let btn = new Button('Click Me!');
// let image = new Image(drone1);

let title = new _titleBar.TitleBar('AI Vehicles'); // btn.appendToElement(body);
// image.appendToElement(body);

title.addLink('Home', '');
title.addLink('Cars', '');
title.addLink('Drones', '');
title.addLink('Map', '');
title.addLink('Contact', '');
title.appendToElement(body);
let headers = 'License Make Model Miles'.split(' ');
let dataService = new _fleetDataService.FleetDataService();
console.log('TCL: dataService', dataService);
dataService.loadData('car');
let dt = new _dataTable.DataTable(headers, dataService.cars); // console.log('TCL: dataService.cadrors', dataService.drones);
// console.log('TCL: dt', dt);

dt.appendToElement(body);
},{"./ui/button":"src/ui/button.js","../images/image-urls":"images/image-urls.js","./ui/image":"src/ui/image.js","./ui/title-bar":"src/ui/title-bar.js","./services/fleet-data-service":"src/services/fleet-data-service.js","./ui/data-table":"src/ui/data-table.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "60145" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/index.js"], null)
//# sourceMappingURL=/src.a2b27638.js.map