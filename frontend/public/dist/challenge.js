"use strict";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __objRest = (source, exclude) => {
    var target = {};
    for (var prop in source)
      if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
        target[prop] = source[prop];
    if (source != null && __getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(source)) {
        if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
          target[prop] = source[prop];
      }
    return target;
  };
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
  var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  var __async = (__this, __arguments, generator) => {
    return new Promise((resolve, reject) => {
      var fulfilled = (value) => {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      };
      var rejected = (value) => {
        try {
          step(generator.throw(value));
        } catch (e) {
          reject(e);
        }
      };
      var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
      step((generator = generator.apply(__this, __arguments)).next());
    });
  };

  // node_modules/redux-persist/lib/storage/getStorage.js
  var require_getStorage = __commonJS({
    "node_modules/redux-persist/lib/storage/getStorage.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.default = getStorage;
      function _typeof2(obj) {
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof2 = function _typeof3(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof2 = function _typeof3(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof2(obj);
      }
      function noop2() {
      }
      var noopStorage = {
        getItem: noop2,
        setItem: noop2,
        removeItem: noop2
      };
      function hasStorage(storageType) {
        if ((typeof self === "undefined" ? "undefined" : _typeof2(self)) !== "object" || !(storageType in self)) {
          return false;
        }
        try {
          var storage2 = self[storageType];
          var testKey = "redux-persist ".concat(storageType, " test");
          storage2.setItem(testKey, "test");
          storage2.getItem(testKey);
          storage2.removeItem(testKey);
        } catch (e) {
          if (true) console.warn("redux-persist ".concat(storageType, " test failed, persistence will be disabled."));
          return false;
        }
        return true;
      }
      function getStorage(type) {
        var storageType = "".concat(type, "Storage");
        if (hasStorage(storageType)) return self[storageType];
        else {
          if (true) {
            console.error("redux-persist failed to create sync storage. falling back to noop storage.");
          }
          return noopStorage;
        }
      }
    }
  });

  // node_modules/redux-persist/lib/storage/createWebStorage.js
  var require_createWebStorage = __commonJS({
    "node_modules/redux-persist/lib/storage/createWebStorage.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.default = createWebStorage;
      var _getStorage = _interopRequireDefault(require_getStorage());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      function createWebStorage(type) {
        var storage2 = (0, _getStorage.default)(type);
        return {
          getItem: function getItem(key) {
            return new Promise(function(resolve, reject) {
              resolve(storage2.getItem(key));
            });
          },
          setItem: function setItem(key, item) {
            return new Promise(function(resolve, reject) {
              resolve(storage2.setItem(key, item));
            });
          },
          removeItem: function removeItem(key) {
            return new Promise(function(resolve, reject) {
              resolve(storage2.removeItem(key));
            });
          }
        };
      }
    }
  });

  // node_modules/redux-persist/lib/storage/index.js
  var require_storage = __commonJS({
    "node_modules/redux-persist/lib/storage/index.js"(exports) {
      "use strict";
      exports.__esModule = true;
      exports.default = void 0;
      var _createWebStorage = _interopRequireDefault(require_createWebStorage());
      function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      var _default = (0, _createWebStorage.default)("local");
      exports.default = _default;
    }
  });

  // node_modules/redux/dist/redux.mjs
  var $$observable = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
  var symbol_observable_default = $$observable;
  var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
  var ActionTypes = {
    INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
    REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
    PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
  };
  var actionTypes_default = ActionTypes;
  function isPlainObject(obj) {
    if (typeof obj !== "object" || obj === null)
      return false;
    let proto = obj;
    while (Object.getPrototypeOf(proto) !== null) {
      proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
  }
  function miniKindOf(val) {
    if (val === void 0)
      return "undefined";
    if (val === null)
      return "null";
    const type = typeof val;
    switch (type) {
      case "boolean":
      case "string":
      case "number":
      case "symbol":
      case "function": {
        return type;
      }
    }
    if (Array.isArray(val))
      return "array";
    if (isDate(val))
      return "date";
    if (isError(val))
      return "error";
    const constructorName = ctorName(val);
    switch (constructorName) {
      case "Symbol":
      case "Promise":
      case "WeakMap":
      case "WeakSet":
      case "Map":
      case "Set":
        return constructorName;
    }
    return Object.prototype.toString.call(val).slice(8, -1).toLowerCase().replace(/\s/g, "");
  }
  function ctorName(val) {
    return typeof val.constructor === "function" ? val.constructor.name : null;
  }
  function isError(val) {
    return val instanceof Error || typeof val.message === "string" && val.constructor && typeof val.constructor.stackTraceLimit === "number";
  }
  function isDate(val) {
    if (val instanceof Date)
      return true;
    return typeof val.toDateString === "function" && typeof val.getDate === "function" && typeof val.setDate === "function";
  }
  function kindOf(val) {
    let typeOfVal = typeof val;
    if (true) {
      typeOfVal = miniKindOf(val);
    }
    return typeOfVal;
  }
  function createStore(reducer, preloadedState, enhancer) {
    if (typeof reducer !== "function") {
      throw new Error(false ? formatProdErrorMessage(2) : `Expected the root reducer to be a function. Instead, received: '${kindOf(reducer)}'`);
    }
    if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
      throw new Error(false ? formatProdErrorMessage(0) : "It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function. See https://redux.js.org/tutorials/fundamentals/part-4-store#creating-a-store-with-enhancers for an example.");
    }
    if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
      enhancer = preloadedState;
      preloadedState = void 0;
    }
    if (typeof enhancer !== "undefined") {
      if (typeof enhancer !== "function") {
        throw new Error(false ? formatProdErrorMessage(1) : `Expected the enhancer to be a function. Instead, received: '${kindOf(enhancer)}'`);
      }
      return enhancer(createStore)(reducer, preloadedState);
    }
    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = /* @__PURE__ */ new Map();
    let nextListeners = currentListeners;
    let listenerIdCounter = 0;
    let isDispatching = false;
    function ensureCanMutateNextListeners() {
      if (nextListeners === currentListeners) {
        nextListeners = /* @__PURE__ */ new Map();
        currentListeners.forEach((listener2, key) => {
          nextListeners.set(key, listener2);
        });
      }
    }
    function getState() {
      if (isDispatching) {
        throw new Error(false ? formatProdErrorMessage(3) : "You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
      }
      return currentState;
    }
    function subscribe(listener2) {
      if (typeof listener2 !== "function") {
        throw new Error(false ? formatProdErrorMessage(4) : `Expected the listener to be a function. Instead, received: '${kindOf(listener2)}'`);
      }
      if (isDispatching) {
        throw new Error(false ? formatProdErrorMessage(5) : "You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api/store#subscribelistener for more details.");
      }
      let isSubscribed = true;
      ensureCanMutateNextListeners();
      const listenerId = listenerIdCounter++;
      nextListeners.set(listenerId, listener2);
      return function unsubscribe() {
        if (!isSubscribed) {
          return;
        }
        if (isDispatching) {
          throw new Error(false ? formatProdErrorMessage(6) : "You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api/store#subscribelistener for more details.");
        }
        isSubscribed = false;
        ensureCanMutateNextListeners();
        nextListeners.delete(listenerId);
        currentListeners = null;
      };
    }
    function dispatch(action) {
      if (!isPlainObject(action)) {
        throw new Error(false ? formatProdErrorMessage(7) : `Actions must be plain objects. Instead, the actual type was: '${kindOf(action)}'. You may need to add middleware to your store setup to handle dispatching other values, such as 'redux-thunk' to handle dispatching functions. See https://redux.js.org/tutorials/fundamentals/part-4-store#middleware and https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware for examples.`);
      }
      if (typeof action.type === "undefined") {
        throw new Error(false ? formatProdErrorMessage(8) : 'Actions may not have an undefined "type" property. You may have misspelled an action type string constant.');
      }
      if (typeof action.type !== "string") {
        throw new Error(false ? formatProdErrorMessage(17) : `Action "type" property must be a string. Instead, the actual type was: '${kindOf(action.type)}'. Value was: '${action.type}' (stringified)`);
      }
      if (isDispatching) {
        throw new Error(false ? formatProdErrorMessage(9) : "Reducers may not dispatch actions.");
      }
      try {
        isDispatching = true;
        currentState = currentReducer(currentState, action);
      } finally {
        isDispatching = false;
      }
      const listeners = currentListeners = nextListeners;
      listeners.forEach((listener2) => {
        listener2();
      });
      return action;
    }
    function replaceReducer(nextReducer) {
      if (typeof nextReducer !== "function") {
        throw new Error(false ? formatProdErrorMessage(10) : `Expected the nextReducer to be a function. Instead, received: '${kindOf(nextReducer)}`);
      }
      currentReducer = nextReducer;
      dispatch({
        type: actionTypes_default.REPLACE
      });
    }
    function observable() {
      const outerSubscribe = subscribe;
      return {
        /**
         * The minimal observable subscription method.
         * @param observer Any object that can be used as an observer.
         * The observer object should have a `next` method.
         * @returns An object with an `unsubscribe` method that can
         * be used to unsubscribe the observable from the store, and prevent further
         * emission of values from the observable.
         */
        subscribe(observer) {
          if (typeof observer !== "object" || observer === null) {
            throw new Error(false ? formatProdErrorMessage(11) : `Expected the observer to be an object. Instead, received: '${kindOf(observer)}'`);
          }
          function observeState() {
            const observerAsObserver = observer;
            if (observerAsObserver.next) {
              observerAsObserver.next(getState());
            }
          }
          observeState();
          const unsubscribe = outerSubscribe(observeState);
          return {
            unsubscribe
          };
        },
        [symbol_observable_default]() {
          return this;
        }
      };
    }
    dispatch({
      type: actionTypes_default.INIT
    });
    const store2 = {
      dispatch,
      subscribe,
      getState,
      replaceReducer,
      [symbol_observable_default]: observable
    };
    return store2;
  }
  function warning(message) {
    if (typeof console !== "undefined" && typeof console.error === "function") {
      console.error(message);
    }
    try {
      throw new Error(message);
    } catch (e) {
    }
  }
  function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
    const reducerKeys = Object.keys(reducers);
    const argumentName = action && action.type === actionTypes_default.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
    if (reducerKeys.length === 0) {
      return "Store does not have a valid reducer. Make sure the argument passed to combineReducers is an object whose values are reducers.";
    }
    if (!isPlainObject(inputState)) {
      return `The ${argumentName} has unexpected type of "${kindOf(inputState)}". Expected argument to be an object with the following keys: "${reducerKeys.join('", "')}"`;
    }
    const unexpectedKeys = Object.keys(inputState).filter((key) => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]);
    unexpectedKeys.forEach((key) => {
      unexpectedKeyCache[key] = true;
    });
    if (action && action.type === actionTypes_default.REPLACE)
      return;
    if (unexpectedKeys.length > 0) {
      return `Unexpected ${unexpectedKeys.length > 1 ? "keys" : "key"} "${unexpectedKeys.join('", "')}" found in ${argumentName}. Expected to find one of the known reducer keys instead: "${reducerKeys.join('", "')}". Unexpected keys will be ignored.`;
    }
  }
  function assertReducerShape(reducers) {
    Object.keys(reducers).forEach((key) => {
      const reducer = reducers[key];
      const initialState5 = reducer(void 0, {
        type: actionTypes_default.INIT
      });
      if (typeof initialState5 === "undefined") {
        throw new Error(false ? formatProdErrorMessage(12) : `The slice reducer for key "${key}" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.`);
      }
      if (typeof reducer(void 0, {
        type: actionTypes_default.PROBE_UNKNOWN_ACTION()
      }) === "undefined") {
        throw new Error(false ? formatProdErrorMessage(13) : `The slice reducer for key "${key}" returned undefined when probed with a random type. Don't try to handle '${actionTypes_default.INIT}' or other actions in "redux/*" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.`);
      }
    });
  }
  function combineReducers(reducers) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    for (let i = 0; i < reducerKeys.length; i++) {
      const key = reducerKeys[i];
      if (true) {
        if (typeof reducers[key] === "undefined") {
          warning(`No reducer provided for key "${key}"`);
        }
      }
      if (typeof reducers[key] === "function") {
        finalReducers[key] = reducers[key];
      }
    }
    const finalReducerKeys = Object.keys(finalReducers);
    let unexpectedKeyCache;
    if (true) {
      unexpectedKeyCache = {};
    }
    let shapeAssertionError;
    try {
      assertReducerShape(finalReducers);
    } catch (e) {
      shapeAssertionError = e;
    }
    return function combination(state = {}, action) {
      if (shapeAssertionError) {
        throw shapeAssertionError;
      }
      if (true) {
        const warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
        if (warningMessage) {
          warning(warningMessage);
        }
      }
      let hasChanged = false;
      const nextState = {};
      for (let i = 0; i < finalReducerKeys.length; i++) {
        const key = finalReducerKeys[i];
        const reducer = finalReducers[key];
        const previousStateForKey = state[key];
        const nextStateForKey = reducer(previousStateForKey, action);
        if (typeof nextStateForKey === "undefined") {
          const actionType = action && action.type;
          throw new Error(false ? formatProdErrorMessage(14) : `When called with an action of type ${actionType ? `"${String(actionType)}"` : "(unknown type)"}, the slice reducer for key "${key}" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.`);
        }
        nextState[key] = nextStateForKey;
        hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
      }
      hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
      return hasChanged ? nextState : state;
    };
  }
  function compose(...funcs) {
    if (funcs.length === 0) {
      return (arg) => arg;
    }
    if (funcs.length === 1) {
      return funcs[0];
    }
    return funcs.reduce((a, b) => (...args) => a(b(...args)));
  }
  function applyMiddleware(...middlewares) {
    return (createStore2) => (reducer, preloadedState) => {
      const store2 = createStore2(reducer, preloadedState);
      let dispatch = () => {
        throw new Error(false ? formatProdErrorMessage(15) : "Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
      };
      const middlewareAPI = {
        getState: store2.getState,
        dispatch: (action, ...args) => dispatch(action, ...args)
      };
      const chain = middlewares.map((middleware) => middleware(middlewareAPI));
      dispatch = compose(...chain)(store2.dispatch);
      return __spreadProps(__spreadValues({}, store2), {
        dispatch
      });
    };
  }
  function isAction(action) {
    return isPlainObject(action) && "type" in action && typeof action.type === "string";
  }

  // node_modules/immer/dist/immer.mjs
  var NOTHING = Symbol.for("immer-nothing");
  var DRAFTABLE = Symbol.for("immer-draftable");
  var DRAFT_STATE = Symbol.for("immer-state");
  var errors = true ? [
    // All error codes, starting by 0:
    function(plugin) {
      return `The plugin for '${plugin}' has not been loaded into Immer. To enable the plugin, import and call \`enable${plugin}()\` when initializing your application.`;
    },
    function(thing) {
      return `produce can only be called on things that are draftable: plain objects, arrays, Map, Set or classes that are marked with '[immerable]: true'. Got '${thing}'`;
    },
    "This object has been frozen and should not be mutated",
    function(data) {
      return "Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process? " + data;
    },
    "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.",
    "Immer forbids circular references",
    "The first or second argument to `produce` must be a function",
    "The third argument to `produce` must be a function or undefined",
    "First argument to `createDraft` must be a plain object, an array, or an immerable object",
    "First argument to `finishDraft` must be a draft returned by `createDraft`",
    function(thing) {
      return `'current' expects a draft, got: ${thing}`;
    },
    "Object.defineProperty() cannot be used on an Immer draft",
    "Object.setPrototypeOf() cannot be used on an Immer draft",
    "Immer only supports deleting array indices",
    "Immer only supports setting array indices and the 'length' property",
    function(thing) {
      return `'original' expects a draft, got: ${thing}`;
    }
    // Note: if more errors are added, the errorOffset in Patches.ts should be increased
    // See Patches.ts for additional errors
  ] : [];
  function die(error, ...args) {
    if (true) {
      const e = errors[error];
      const msg = typeof e === "function" ? e.apply(null, args) : e;
      throw new Error(`[Immer] ${msg}`);
    }
    throw new Error(
      `[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`
    );
  }
  var getPrototypeOf = Object.getPrototypeOf;
  function isDraft(value) {
    return !!value && !!value[DRAFT_STATE];
  }
  function isDraftable(value) {
    var _a;
    if (!value)
      return false;
    return isPlainObject2(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!((_a = value.constructor) == null ? void 0 : _a[DRAFTABLE]) || isMap(value) || isSet(value);
  }
  var objectCtorString = Object.prototype.constructor.toString();
  function isPlainObject2(value) {
    if (!value || typeof value !== "object")
      return false;
    const proto = getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    if (Ctor === Object)
      return true;
    return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
  }
  function each(obj, iter) {
    if (getArchtype(obj) === 0) {
      Reflect.ownKeys(obj).forEach((key) => {
        iter(key, obj[key], obj);
      });
    } else {
      obj.forEach((entry, index) => iter(index, entry, obj));
    }
  }
  function getArchtype(thing) {
    const state = thing[DRAFT_STATE];
    return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
  }
  function has(thing, prop) {
    return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
  }
  function set(thing, propOrOldValue, value) {
    const t = getArchtype(thing);
    if (t === 2)
      thing.set(propOrOldValue, value);
    else if (t === 3) {
      thing.add(value);
    } else
      thing[propOrOldValue] = value;
  }
  function is(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  }
  function isMap(target) {
    return target instanceof Map;
  }
  function isSet(target) {
    return target instanceof Set;
  }
  function latest(state) {
    return state.copy_ || state.base_;
  }
  function shallowCopy(base, strict) {
    if (isMap(base)) {
      return new Map(base);
    }
    if (isSet(base)) {
      return new Set(base);
    }
    if (Array.isArray(base))
      return Array.prototype.slice.call(base);
    const isPlain2 = isPlainObject2(base);
    if (strict === true || strict === "class_only" && !isPlain2) {
      const descriptors = Object.getOwnPropertyDescriptors(base);
      delete descriptors[DRAFT_STATE];
      let keys = Reflect.ownKeys(descriptors);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const desc = descriptors[key];
        if (desc.writable === false) {
          desc.writable = true;
          desc.configurable = true;
        }
        if (desc.get || desc.set)
          descriptors[key] = {
            configurable: true,
            writable: true,
            // could live with !!desc.set as well here...
            enumerable: desc.enumerable,
            value: base[key]
          };
      }
      return Object.create(getPrototypeOf(base), descriptors);
    } else {
      const proto = getPrototypeOf(base);
      if (proto !== null && isPlain2) {
        return __spreadValues({}, base);
      }
      const obj = Object.create(proto);
      return Object.assign(obj, base);
    }
  }
  function freeze(obj, deep = false) {
    if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj))
      return obj;
    if (getArchtype(obj) > 1) {
      obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
    }
    Object.freeze(obj);
    if (deep)
      Object.entries(obj).forEach(([key, value]) => freeze(value, true));
    return obj;
  }
  function dontMutateFrozenCollections() {
    die(2);
  }
  function isFrozen(obj) {
    return Object.isFrozen(obj);
  }
  var plugins = {};
  function getPlugin(pluginKey) {
    const plugin = plugins[pluginKey];
    if (!plugin) {
      die(0, pluginKey);
    }
    return plugin;
  }
  var currentScope;
  function getCurrentScope() {
    return currentScope;
  }
  function createScope(parent_, immer_) {
    return {
      drafts_: [],
      parent_,
      immer_,
      // Whenever the modified draft contains a draft from another scope, we
      // need to prevent auto-freezing so the unowned draft can be finalized.
      canAutoFreeze_: true,
      unfinalizedDrafts_: 0
    };
  }
  function usePatchesInScope(scope, patchListener) {
    if (patchListener) {
      getPlugin("Patches");
      scope.patches_ = [];
      scope.inversePatches_ = [];
      scope.patchListener_ = patchListener;
    }
  }
  function revokeScope(scope) {
    leaveScope(scope);
    scope.drafts_.forEach(revokeDraft);
    scope.drafts_ = null;
  }
  function leaveScope(scope) {
    if (scope === currentScope) {
      currentScope = scope.parent_;
    }
  }
  function enterScope(immer2) {
    return currentScope = createScope(currentScope, immer2);
  }
  function revokeDraft(draft) {
    const state = draft[DRAFT_STATE];
    if (state.type_ === 0 || state.type_ === 1)
      state.revoke_();
    else
      state.revoked_ = true;
  }
  function processResult(result, scope) {
    scope.unfinalizedDrafts_ = scope.drafts_.length;
    const baseDraft = scope.drafts_[0];
    const isReplaced = result !== void 0 && result !== baseDraft;
    if (isReplaced) {
      if (baseDraft[DRAFT_STATE].modified_) {
        revokeScope(scope);
        die(4);
      }
      if (isDraftable(result)) {
        result = finalize(scope, result);
        if (!scope.parent_)
          maybeFreeze(scope, result);
      }
      if (scope.patches_) {
        getPlugin("Patches").generateReplacementPatches_(
          baseDraft[DRAFT_STATE].base_,
          result,
          scope.patches_,
          scope.inversePatches_
        );
      }
    } else {
      result = finalize(scope, baseDraft, []);
    }
    revokeScope(scope);
    if (scope.patches_) {
      scope.patchListener_(scope.patches_, scope.inversePatches_);
    }
    return result !== NOTHING ? result : void 0;
  }
  function finalize(rootScope, value, path) {
    if (isFrozen(value))
      return value;
    const state = value[DRAFT_STATE];
    if (!state) {
      each(
        value,
        (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path)
      );
      return value;
    }
    if (state.scope_ !== rootScope)
      return value;
    if (!state.modified_) {
      maybeFreeze(rootScope, state.base_, true);
      return state.base_;
    }
    if (!state.finalized_) {
      state.finalized_ = true;
      state.scope_.unfinalizedDrafts_--;
      const result = state.copy_;
      let resultEach = result;
      let isSet2 = false;
      if (state.type_ === 3) {
        resultEach = new Set(result);
        result.clear();
        isSet2 = true;
      }
      each(
        resultEach,
        (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2)
      );
      maybeFreeze(rootScope, result, false);
      if (path && rootScope.patches_) {
        getPlugin("Patches").generatePatches_(
          state,
          path,
          rootScope.patches_,
          rootScope.inversePatches_
        );
      }
    }
    return state.copy_;
  }
  function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
    if (childValue === targetObject)
      die(5);
    if (isDraft(childValue)) {
      const path = rootPath && parentState && parentState.type_ !== 3 && // Set objects are atomic since they have no keys.
      !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0;
      const res = finalize(rootScope, childValue, path);
      set(targetObject, prop, res);
      if (isDraft(res)) {
        rootScope.canAutoFreeze_ = false;
      } else
        return;
    } else if (targetIsSet) {
      targetObject.add(childValue);
    }
    if (isDraftable(childValue) && !isFrozen(childValue)) {
      if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) {
        return;
      }
      finalize(rootScope, childValue);
      if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && Object.prototype.propertyIsEnumerable.call(targetObject, prop))
        maybeFreeze(rootScope, childValue);
    }
  }
  function maybeFreeze(scope, value, deep = false) {
    if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) {
      freeze(value, deep);
    }
  }
  function createProxyProxy(base, parent) {
    const isArray = Array.isArray(base);
    const state = {
      type_: isArray ? 1 : 0,
      // Track which produce call this is associated with.
      scope_: parent ? parent.scope_ : getCurrentScope(),
      // True for both shallow and deep changes.
      modified_: false,
      // Used during finalization.
      finalized_: false,
      // Track which properties have been assigned (true) or deleted (false).
      assigned_: {},
      // The parent draft state.
      parent_: parent,
      // The base state.
      base_: base,
      // The base proxy.
      draft_: null,
      // set below
      // The base copy with any updated values.
      copy_: null,
      // Called by the `produce` function.
      revoke_: null,
      isManual_: false
    };
    let target = state;
    let traps = objectTraps;
    if (isArray) {
      target = [state];
      traps = arrayTraps;
    }
    const { revoke, proxy } = Proxy.revocable(target, traps);
    state.draft_ = proxy;
    state.revoke_ = revoke;
    return proxy;
  }
  var objectTraps = {
    get(state, prop) {
      if (prop === DRAFT_STATE)
        return state;
      const source = latest(state);
      if (!has(source, prop)) {
        return readPropFromProto(state, source, prop);
      }
      const value = source[prop];
      if (state.finalized_ || !isDraftable(value)) {
        return value;
      }
      if (value === peek(state.base_, prop)) {
        prepareCopy(state);
        return state.copy_[prop] = createProxy(value, state);
      }
      return value;
    },
    has(state, prop) {
      return prop in latest(state);
    },
    ownKeys(state) {
      return Reflect.ownKeys(latest(state));
    },
    set(state, prop, value) {
      const desc = getDescriptorFromProto(latest(state), prop);
      if (desc == null ? void 0 : desc.set) {
        desc.set.call(state.draft_, value);
        return true;
      }
      if (!state.modified_) {
        const current2 = peek(latest(state), prop);
        const currentState = current2 == null ? void 0 : current2[DRAFT_STATE];
        if (currentState && currentState.base_ === value) {
          state.copy_[prop] = value;
          state.assigned_[prop] = false;
          return true;
        }
        if (is(value, current2) && (value !== void 0 || has(state.base_, prop)))
          return true;
        prepareCopy(state);
        markChanged(state);
      }
      if (state.copy_[prop] === value && // special case: handle new props with value 'undefined'
      (value !== void 0 || prop in state.copy_) || // special case: NaN
      Number.isNaN(value) && Number.isNaN(state.copy_[prop]))
        return true;
      state.copy_[prop] = value;
      state.assigned_[prop] = true;
      return true;
    },
    deleteProperty(state, prop) {
      if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
        state.assigned_[prop] = false;
        prepareCopy(state);
        markChanged(state);
      } else {
        delete state.assigned_[prop];
      }
      if (state.copy_) {
        delete state.copy_[prop];
      }
      return true;
    },
    // Note: We never coerce `desc.value` into an Immer draft, because we can't make
    // the same guarantee in ES5 mode.
    getOwnPropertyDescriptor(state, prop) {
      const owner = latest(state);
      const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
      if (!desc)
        return desc;
      return {
        writable: true,
        configurable: state.type_ !== 1 || prop !== "length",
        enumerable: desc.enumerable,
        value: owner[prop]
      };
    },
    defineProperty() {
      die(11);
    },
    getPrototypeOf(state) {
      return getPrototypeOf(state.base_);
    },
    setPrototypeOf() {
      die(12);
    }
  };
  var arrayTraps = {};
  each(objectTraps, (key, fn) => {
    arrayTraps[key] = function() {
      arguments[0] = arguments[0][0];
      return fn.apply(this, arguments);
    };
  });
  arrayTraps.deleteProperty = function(state, prop) {
    if (isNaN(parseInt(prop)))
      die(13);
    return arrayTraps.set.call(this, state, prop, void 0);
  };
  arrayTraps.set = function(state, prop, value) {
    if (prop !== "length" && isNaN(parseInt(prop)))
      die(14);
    return objectTraps.set.call(this, state[0], prop, value, state[0]);
  };
  function peek(draft, prop) {
    const state = draft[DRAFT_STATE];
    const source = state ? latest(state) : draft;
    return source[prop];
  }
  function readPropFromProto(state, source, prop) {
    var _a;
    const desc = getDescriptorFromProto(source, prop);
    return desc ? `value` in desc ? desc.value : (
      // This is a very special case, if the prop is a getter defined by the
      // prototype, we should invoke it with the draft as context!
      (_a = desc.get) == null ? void 0 : _a.call(state.draft_)
    ) : void 0;
  }
  function getDescriptorFromProto(source, prop) {
    if (!(prop in source))
      return void 0;
    let proto = getPrototypeOf(source);
    while (proto) {
      const desc = Object.getOwnPropertyDescriptor(proto, prop);
      if (desc)
        return desc;
      proto = getPrototypeOf(proto);
    }
    return void 0;
  }
  function markChanged(state) {
    if (!state.modified_) {
      state.modified_ = true;
      if (state.parent_) {
        markChanged(state.parent_);
      }
    }
  }
  function prepareCopy(state) {
    if (!state.copy_) {
      state.copy_ = shallowCopy(
        state.base_,
        state.scope_.immer_.useStrictShallowCopy_
      );
    }
  }
  var Immer2 = class {
    constructor(config) {
      this.autoFreeze_ = true;
      this.useStrictShallowCopy_ = false;
      this.produce = (base, recipe, patchListener) => {
        if (typeof base === "function" && typeof recipe !== "function") {
          const defaultBase = recipe;
          recipe = base;
          const self2 = this;
          return function curriedProduce(base2 = defaultBase, ...args) {
            return self2.produce(base2, (draft) => recipe.call(this, draft, ...args));
          };
        }
        if (typeof recipe !== "function")
          die(6);
        if (patchListener !== void 0 && typeof patchListener !== "function")
          die(7);
        let result;
        if (isDraftable(base)) {
          const scope = enterScope(this);
          const proxy = createProxy(base, void 0);
          let hasError = true;
          try {
            result = recipe(proxy);
            hasError = false;
          } finally {
            if (hasError)
              revokeScope(scope);
            else
              leaveScope(scope);
          }
          usePatchesInScope(scope, patchListener);
          return processResult(result, scope);
        } else if (!base || typeof base !== "object") {
          result = recipe(base);
          if (result === void 0)
            result = base;
          if (result === NOTHING)
            result = void 0;
          if (this.autoFreeze_)
            freeze(result, true);
          if (patchListener) {
            const p = [];
            const ip = [];
            getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
            patchListener(p, ip);
          }
          return result;
        } else
          die(1, base);
      };
      this.produceWithPatches = (base, recipe) => {
        if (typeof base === "function") {
          return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
        }
        let patches, inversePatches;
        const result = this.produce(base, recipe, (p, ip) => {
          patches = p;
          inversePatches = ip;
        });
        return [result, patches, inversePatches];
      };
      if (typeof (config == null ? void 0 : config.autoFreeze) === "boolean")
        this.setAutoFreeze(config.autoFreeze);
      if (typeof (config == null ? void 0 : config.useStrictShallowCopy) === "boolean")
        this.setUseStrictShallowCopy(config.useStrictShallowCopy);
    }
    createDraft(base) {
      if (!isDraftable(base))
        die(8);
      if (isDraft(base))
        base = current(base);
      const scope = enterScope(this);
      const proxy = createProxy(base, void 0);
      proxy[DRAFT_STATE].isManual_ = true;
      leaveScope(scope);
      return proxy;
    }
    finishDraft(draft, patchListener) {
      const state = draft && draft[DRAFT_STATE];
      if (!state || !state.isManual_)
        die(9);
      const { scope_: scope } = state;
      usePatchesInScope(scope, patchListener);
      return processResult(void 0, scope);
    }
    /**
     * Pass true to automatically freeze all copies created by Immer.
     *
     * By default, auto-freezing is enabled.
     */
    setAutoFreeze(value) {
      this.autoFreeze_ = value;
    }
    /**
     * Pass true to enable strict shallow copy.
     *
     * By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
     */
    setUseStrictShallowCopy(value) {
      this.useStrictShallowCopy_ = value;
    }
    applyPatches(base, patches) {
      let i;
      for (i = patches.length - 1; i >= 0; i--) {
        const patch = patches[i];
        if (patch.path.length === 0 && patch.op === "replace") {
          base = patch.value;
          break;
        }
      }
      if (i > -1) {
        patches = patches.slice(i + 1);
      }
      const applyPatchesImpl = getPlugin("Patches").applyPatches_;
      if (isDraft(base)) {
        return applyPatchesImpl(base, patches);
      }
      return this.produce(
        base,
        (draft) => applyPatchesImpl(draft, patches)
      );
    }
  };
  function createProxy(value, parent) {
    const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
    const scope = parent ? parent.scope_ : getCurrentScope();
    scope.drafts_.push(draft);
    return draft;
  }
  function current(value) {
    if (!isDraft(value))
      die(10, value);
    return currentImpl(value);
  }
  function currentImpl(value) {
    if (!isDraftable(value) || isFrozen(value))
      return value;
    const state = value[DRAFT_STATE];
    let copy;
    if (state) {
      if (!state.modified_)
        return state.base_;
      state.finalized_ = true;
      copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
    } else {
      copy = shallowCopy(value, true);
    }
    each(copy, (key, childValue) => {
      set(copy, key, currentImpl(childValue));
    });
    if (state) {
      state.finalized_ = false;
    }
    return copy;
  }
  var immer = new Immer2();
  var produce = immer.produce;
  var produceWithPatches = immer.produceWithPatches.bind(
    immer
  );
  var setAutoFreeze = immer.setAutoFreeze.bind(immer);
  var setUseStrictShallowCopy = immer.setUseStrictShallowCopy.bind(immer);
  var applyPatches = immer.applyPatches.bind(immer);
  var createDraft = immer.createDraft.bind(immer);
  var finishDraft = immer.finishDraft.bind(immer);

  // node_modules/redux-thunk/dist/redux-thunk.mjs
  function createThunkMiddleware(extraArgument) {
    const middleware = ({ dispatch, getState }) => (next) => (action) => {
      if (typeof action === "function") {
        return action(dispatch, getState, extraArgument);
      }
      return next(action);
    };
    return middleware;
  }
  var thunk = createThunkMiddleware();
  var withExtraArgument = createThunkMiddleware;

  // node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs
  var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
    if (arguments.length === 0) return void 0;
    if (typeof arguments[0] === "object") return compose;
    return compose.apply(null, arguments);
  };
  var devToolsEnhancer = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__ : function() {
    return function(noop3) {
      return noop3;
    };
  };
  var hasMatchFunction = (v) => {
    return v && typeof v.match === "function";
  };
  function createAction(type, prepareAction) {
    function actionCreator(...args) {
      if (prepareAction) {
        let prepared = prepareAction(...args);
        if (!prepared) {
          throw new Error(false ? formatProdErrorMessage(0) : "prepareAction did not return an object");
        }
        return __spreadValues(__spreadValues({
          type,
          payload: prepared.payload
        }, "meta" in prepared && {
          meta: prepared.meta
        }), "error" in prepared && {
          error: prepared.error
        });
      }
      return {
        type,
        payload: args[0]
      };
    }
    actionCreator.toString = () => `${type}`;
    actionCreator.type = type;
    actionCreator.match = (action) => isAction(action) && action.type === type;
    return actionCreator;
  }
  function isActionCreator(action) {
    return typeof action === "function" && "type" in action && // hasMatchFunction only wants Matchers but I don't see the point in rewriting it
    hasMatchFunction(action);
  }
  function getMessage(type) {
    const splitType = type ? `${type}`.split("/") : [];
    const actionName = splitType[splitType.length - 1] || "actionCreator";
    return `Detected an action creator with type "${type || "unknown"}" being dispatched. 
Make sure you're calling the action creator before dispatching, i.e. \`dispatch(${actionName}())\` instead of \`dispatch(${actionName})\`. This is necessary even if the action has no payload.`;
  }
  function createActionCreatorInvariantMiddleware(options = {}) {
    if (false) {
      return () => (next) => (action) => next(action);
    }
    const {
      isActionCreator: isActionCreator2 = isActionCreator
    } = options;
    return () => (next) => (action) => {
      if (isActionCreator2(action)) {
        console.warn(getMessage(action.type));
      }
      return next(action);
    };
  }
  function getTimeMeasureUtils(maxDelay, fnName) {
    let elapsed = 0;
    return {
      measureTime(fn) {
        const started = Date.now();
        try {
          return fn();
        } finally {
          const finished = Date.now();
          elapsed += finished - started;
        }
      },
      warnIfExceeded() {
        if (elapsed > maxDelay) {
          console.warn(`${fnName} took ${elapsed}ms, which is more than the warning threshold of ${maxDelay}ms. 
If your state or actions are very large, you may want to disable the middleware as it might cause too much of a slowdown in development mode. See https://redux-toolkit.js.org/api/getDefaultMiddleware for instructions.
It is disabled in production builds, so you don't need to worry about that.`);
        }
      }
    };
  }
  var Tuple = class _Tuple extends Array {
    constructor(...items) {
      super(...items);
      Object.setPrototypeOf(this, _Tuple.prototype);
    }
    static get [Symbol.species]() {
      return _Tuple;
    }
    concat(...arr) {
      return super.concat.apply(this, arr);
    }
    prepend(...arr) {
      if (arr.length === 1 && Array.isArray(arr[0])) {
        return new _Tuple(...arr[0].concat(this));
      }
      return new _Tuple(...arr.concat(this));
    }
  };
  function freezeDraftable(val) {
    return isDraftable(val) ? produce(val, () => {
    }) : val;
  }
  function emplace(map, key, handler) {
    if (map.has(key)) {
      let value = map.get(key);
      if (handler.update) {
        value = handler.update(value, key, map);
        map.set(key, value);
      }
      return value;
    }
    if (!handler.insert) throw new Error(false ? formatProdErrorMessage(10) : "No insert provided for key not already in map");
    const inserted = handler.insert(key, map);
    map.set(key, inserted);
    return inserted;
  }
  function isImmutableDefault(value) {
    return typeof value !== "object" || value == null || Object.isFrozen(value);
  }
  function trackForMutations(isImmutable, ignorePaths, obj) {
    const trackedProperties = trackProperties(isImmutable, ignorePaths, obj);
    return {
      detectMutations() {
        return detectMutations(isImmutable, ignorePaths, trackedProperties, obj);
      }
    };
  }
  function trackProperties(isImmutable, ignorePaths = [], obj, path = "", checkedObjects = /* @__PURE__ */ new Set()) {
    const tracked = {
      value: obj
    };
    if (!isImmutable(obj) && !checkedObjects.has(obj)) {
      checkedObjects.add(obj);
      tracked.children = {};
      for (const key in obj) {
        const childPath = path ? path + "." + key : key;
        if (ignorePaths.length && ignorePaths.indexOf(childPath) !== -1) {
          continue;
        }
        tracked.children[key] = trackProperties(isImmutable, ignorePaths, obj[key], childPath);
      }
    }
    return tracked;
  }
  function detectMutations(isImmutable, ignoredPaths = [], trackedProperty, obj, sameParentRef = false, path = "") {
    const prevObj = trackedProperty ? trackedProperty.value : void 0;
    const sameRef = prevObj === obj;
    if (sameParentRef && !sameRef && !Number.isNaN(obj)) {
      return {
        wasMutated: true,
        path
      };
    }
    if (isImmutable(prevObj) || isImmutable(obj)) {
      return {
        wasMutated: false
      };
    }
    const keysToDetect = {};
    for (let key in trackedProperty.children) {
      keysToDetect[key] = true;
    }
    for (let key in obj) {
      keysToDetect[key] = true;
    }
    const hasIgnoredPaths = ignoredPaths.length > 0;
    for (let key in keysToDetect) {
      const nestedPath = path ? path + "." + key : key;
      if (hasIgnoredPaths) {
        const hasMatches = ignoredPaths.some((ignored) => {
          if (ignored instanceof RegExp) {
            return ignored.test(nestedPath);
          }
          return nestedPath === ignored;
        });
        if (hasMatches) {
          continue;
        }
      }
      const result = detectMutations(isImmutable, ignoredPaths, trackedProperty.children[key], obj[key], sameRef, nestedPath);
      if (result.wasMutated) {
        return result;
      }
    }
    return {
      wasMutated: false
    };
  }
  function createImmutableStateInvariantMiddleware(options = {}) {
    if (false) {
      return () => (next) => (action) => next(action);
    } else {
      let stringify2 = function(obj, serializer, indent, decycler) {
        return JSON.stringify(obj, getSerialize2(serializer, decycler), indent);
      }, getSerialize2 = function(serializer, decycler) {
        let stack = [], keys = [];
        if (!decycler) decycler = function(_, value) {
          if (stack[0] === value) return "[Circular ~]";
          return "[Circular ~." + keys.slice(0, stack.indexOf(value)).join(".") + "]";
        };
        return function(key, value) {
          if (stack.length > 0) {
            var thisPos = stack.indexOf(this);
            ~thisPos ? stack.splice(thisPos + 1) : stack.push(this);
            ~thisPos ? keys.splice(thisPos, Infinity, key) : keys.push(key);
            if (~stack.indexOf(value)) value = decycler.call(this, key, value);
          } else stack.push(value);
          return serializer == null ? value : serializer.call(this, key, value);
        };
      };
      var stringify = stringify2, getSerialize = getSerialize2;
      let {
        isImmutable = isImmutableDefault,
        ignoredPaths,
        warnAfter = 32
      } = options;
      const track = trackForMutations.bind(null, isImmutable, ignoredPaths);
      return ({
        getState
      }) => {
        let state = getState();
        let tracker = track(state);
        let result;
        return (next) => (action) => {
          const measureUtils = getTimeMeasureUtils(warnAfter, "ImmutableStateInvariantMiddleware");
          measureUtils.measureTime(() => {
            state = getState();
            result = tracker.detectMutations();
            tracker = track(state);
            if (result.wasMutated) {
              throw new Error(false ? formatProdErrorMessage(19) : `A state mutation was detected between dispatches, in the path '${result.path || ""}'.  This may cause incorrect behavior. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
            }
          });
          const dispatchedAction = next(action);
          measureUtils.measureTime(() => {
            state = getState();
            result = tracker.detectMutations();
            tracker = track(state);
            if (result.wasMutated) {
              throw new Error(false ? formatProdErrorMessage(20) : `A state mutation was detected inside a dispatch, in the path: ${result.path || ""}. Take a look at the reducer(s) handling the action ${stringify2(action)}. (https://redux.js.org/style-guide/style-guide#do-not-mutate-state)`);
            }
          });
          measureUtils.warnIfExceeded();
          return dispatchedAction;
        };
      };
    }
  }
  function isPlain(val) {
    const type = typeof val;
    return val == null || type === "string" || type === "boolean" || type === "number" || Array.isArray(val) || isPlainObject(val);
  }
  function findNonSerializableValue(value, path = "", isSerializable = isPlain, getEntries, ignoredPaths = [], cache) {
    let foundNestedSerializable;
    if (!isSerializable(value)) {
      return {
        keyPath: path || "<root>",
        value
      };
    }
    if (typeof value !== "object" || value === null) {
      return false;
    }
    if (cache == null ? void 0 : cache.has(value)) return false;
    const entries = getEntries != null ? getEntries(value) : Object.entries(value);
    const hasIgnoredPaths = ignoredPaths.length > 0;
    for (const [key, nestedValue] of entries) {
      const nestedPath = path ? path + "." + key : key;
      if (hasIgnoredPaths) {
        const hasMatches = ignoredPaths.some((ignored) => {
          if (ignored instanceof RegExp) {
            return ignored.test(nestedPath);
          }
          return nestedPath === ignored;
        });
        if (hasMatches) {
          continue;
        }
      }
      if (!isSerializable(nestedValue)) {
        return {
          keyPath: nestedPath,
          value: nestedValue
        };
      }
      if (typeof nestedValue === "object") {
        foundNestedSerializable = findNonSerializableValue(nestedValue, nestedPath, isSerializable, getEntries, ignoredPaths, cache);
        if (foundNestedSerializable) {
          return foundNestedSerializable;
        }
      }
    }
    if (cache && isNestedFrozen(value)) cache.add(value);
    return false;
  }
  function isNestedFrozen(value) {
    if (!Object.isFrozen(value)) return false;
    for (const nestedValue of Object.values(value)) {
      if (typeof nestedValue !== "object" || nestedValue === null) continue;
      if (!isNestedFrozen(nestedValue)) return false;
    }
    return true;
  }
  function createSerializableStateInvariantMiddleware(options = {}) {
    if (false) {
      return () => (next) => (action) => next(action);
    } else {
      const {
        isSerializable = isPlain,
        getEntries,
        ignoredActions = [],
        ignoredActionPaths = ["meta.arg", "meta.baseQueryMeta"],
        ignoredPaths = [],
        warnAfter = 32,
        ignoreState = false,
        ignoreActions = false,
        disableCache = false
      } = options;
      const cache = !disableCache && WeakSet ? /* @__PURE__ */ new WeakSet() : void 0;
      return (storeAPI) => (next) => (action) => {
        if (!isAction(action)) {
          return next(action);
        }
        const result = next(action);
        const measureUtils = getTimeMeasureUtils(warnAfter, "SerializableStateInvariantMiddleware");
        if (!ignoreActions && !(ignoredActions.length && ignoredActions.indexOf(action.type) !== -1)) {
          measureUtils.measureTime(() => {
            const foundActionNonSerializableValue = findNonSerializableValue(action, "", isSerializable, getEntries, ignoredActionPaths, cache);
            if (foundActionNonSerializableValue) {
              const {
                keyPath,
                value
              } = foundActionNonSerializableValue;
              console.error(`A non-serializable value was detected in an action, in the path: \`${keyPath}\`. Value:`, value, "\nTake a look at the logic that dispatched this action: ", action, "\n(See https://redux.js.org/faq/actions#why-should-type-be-a-string-or-at-least-serializable-why-should-my-action-types-be-constants)", "\n(To allow non-serializable values see: https://redux-toolkit.js.org/usage/usage-guide#working-with-non-serializable-data)");
            }
          });
        }
        if (!ignoreState) {
          measureUtils.measureTime(() => {
            const state = storeAPI.getState();
            const foundStateNonSerializableValue = findNonSerializableValue(state, "", isSerializable, getEntries, ignoredPaths, cache);
            if (foundStateNonSerializableValue) {
              const {
                keyPath,
                value
              } = foundStateNonSerializableValue;
              console.error(`A non-serializable value was detected in the state, in the path: \`${keyPath}\`. Value:`, value, `
Take a look at the reducer(s) handling this action type: ${action.type}.
(See https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state)`);
            }
          });
          measureUtils.warnIfExceeded();
        }
        return result;
      };
    }
  }
  function isBoolean(x) {
    return typeof x === "boolean";
  }
  var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
    const {
      thunk: thunk2 = true,
      immutableCheck = true,
      serializableCheck = true,
      actionCreatorCheck = true
    } = options != null ? options : {};
    let middlewareArray = new Tuple();
    if (thunk2) {
      if (isBoolean(thunk2)) {
        middlewareArray.push(thunk);
      } else {
        middlewareArray.push(withExtraArgument(thunk2.extraArgument));
      }
    }
    if (true) {
      if (immutableCheck) {
        let immutableOptions = {};
        if (!isBoolean(immutableCheck)) {
          immutableOptions = immutableCheck;
        }
        middlewareArray.unshift(createImmutableStateInvariantMiddleware(immutableOptions));
      }
      if (serializableCheck) {
        let serializableOptions = {};
        if (!isBoolean(serializableCheck)) {
          serializableOptions = serializableCheck;
        }
        middlewareArray.push(createSerializableStateInvariantMiddleware(serializableOptions));
      }
      if (actionCreatorCheck) {
        let actionCreatorOptions = {};
        if (!isBoolean(actionCreatorCheck)) {
          actionCreatorOptions = actionCreatorCheck;
        }
        middlewareArray.unshift(createActionCreatorInvariantMiddleware(actionCreatorOptions));
      }
    }
    return middlewareArray;
  };
  var SHOULD_AUTOBATCH = "RTK_autoBatch";
  var createQueueWithTimer = (timeout) => {
    return (notify) => {
      setTimeout(notify, timeout);
    };
  };
  var rAF = typeof window !== "undefined" && window.requestAnimationFrame ? window.requestAnimationFrame : createQueueWithTimer(10);
  var autoBatchEnhancer = (options = {
    type: "raf"
  }) => (next) => (...args) => {
    const store2 = next(...args);
    let notifying = true;
    let shouldNotifyAtEndOfTick = false;
    let notificationQueued = false;
    const listeners = /* @__PURE__ */ new Set();
    const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? rAF : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
    const notifyListeners = () => {
      notificationQueued = false;
      if (shouldNotifyAtEndOfTick) {
        shouldNotifyAtEndOfTick = false;
        listeners.forEach((l) => l());
      }
    };
    return Object.assign({}, store2, {
      // Override the base `store.subscribe` method to keep original listeners
      // from running if we're delaying notifications
      subscribe(listener2) {
        const wrappedListener = () => notifying && listener2();
        const unsubscribe = store2.subscribe(wrappedListener);
        listeners.add(listener2);
        return () => {
          unsubscribe();
          listeners.delete(listener2);
        };
      },
      // Override the base `store.dispatch` method so that we can check actions
      // for the `shouldAutoBatch` flag and determine if batching is active
      dispatch(action) {
        var _a;
        try {
          notifying = !((_a = action == null ? void 0 : action.meta) == null ? void 0 : _a[SHOULD_AUTOBATCH]);
          shouldNotifyAtEndOfTick = !notifying;
          if (shouldNotifyAtEndOfTick) {
            if (!notificationQueued) {
              notificationQueued = true;
              queueCallback(notifyListeners);
            }
          }
          return store2.dispatch(action);
        } finally {
          notifying = true;
        }
      }
    });
  };
  var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
    const {
      autoBatch = true
    } = options != null ? options : {};
    let enhancerArray = new Tuple(middlewareEnhancer);
    if (autoBatch) {
      enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
    }
    return enhancerArray;
  };
  function configureStore(options) {
    const getDefaultMiddleware = buildGetDefaultMiddleware();
    const {
      reducer = void 0,
      middleware,
      devTools = true,
      preloadedState = void 0,
      enhancers = void 0
    } = options || {};
    let rootReducer;
    if (typeof reducer === "function") {
      rootReducer = reducer;
    } else if (isPlainObject(reducer)) {
      rootReducer = combineReducers(reducer);
    } else {
      throw new Error(false ? formatProdErrorMessage(1) : "`reducer` is a required argument, and must be a function or an object of functions that can be passed to combineReducers");
    }
    if (middleware && typeof middleware !== "function") {
      throw new Error(false ? formatProdErrorMessage(2) : "`middleware` field must be a callback");
    }
    let finalMiddleware;
    if (typeof middleware === "function") {
      finalMiddleware = middleware(getDefaultMiddleware);
      if (!Array.isArray(finalMiddleware)) {
        throw new Error(false ? formatProdErrorMessage(3) : "when using a middleware builder function, an array of middleware must be returned");
      }
    } else {
      finalMiddleware = getDefaultMiddleware();
    }
    if (finalMiddleware.some((item) => typeof item !== "function")) {
      throw new Error(false ? formatProdErrorMessage(4) : "each middleware provided to configureStore must be a function");
    }
    let finalCompose = compose;
    if (devTools) {
      finalCompose = composeWithDevTools(__spreadValues({
        // Enable capture of stack traces for dispatched Redux actions
        trace: true
      }, typeof devTools === "object" && devTools));
    }
    const middlewareEnhancer = applyMiddleware(...finalMiddleware);
    const getDefaultEnhancers = buildGetDefaultEnhancers(middlewareEnhancer);
    if (enhancers && typeof enhancers !== "function") {
      throw new Error(false ? formatProdErrorMessage(5) : "`enhancers` field must be a callback");
    }
    let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
    if (!Array.isArray(storeEnhancers)) {
      throw new Error(false ? formatProdErrorMessage(6) : "`enhancers` callback must return an array");
    }
    if (storeEnhancers.some((item) => typeof item !== "function")) {
      throw new Error(false ? formatProdErrorMessage(7) : "each enhancer provided to configureStore must be a function");
    }
    if (finalMiddleware.length && !storeEnhancers.includes(middlewareEnhancer)) {
      console.error("middlewares were provided, but middleware enhancer was not included in final enhancers - make sure to call `getDefaultEnhancers`");
    }
    const composedEnhancer = finalCompose(...storeEnhancers);
    return createStore(rootReducer, preloadedState, composedEnhancer);
  }
  function executeReducerBuilderCallback(builderCallback) {
    const actionsMap = {};
    const actionMatchers = [];
    let defaultCaseReducer;
    const builder = {
      addCase(typeOrActionCreator, reducer) {
        if (true) {
          if (actionMatchers.length > 0) {
            throw new Error(false ? formatProdErrorMessage(26) : "`builder.addCase` should only be called before calling `builder.addMatcher`");
          }
          if (defaultCaseReducer) {
            throw new Error(false ? formatProdErrorMessage(27) : "`builder.addCase` should only be called before calling `builder.addDefaultCase`");
          }
        }
        const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
        if (!type) {
          throw new Error(false ? formatProdErrorMessage(28) : "`builder.addCase` cannot be called with an empty action type");
        }
        if (type in actionsMap) {
          throw new Error(false ? formatProdErrorMessage(29) : `\`builder.addCase\` cannot be called with two reducers for the same action type '${type}'`);
        }
        actionsMap[type] = reducer;
        return builder;
      },
      addMatcher(matcher, reducer) {
        if (true) {
          if (defaultCaseReducer) {
            throw new Error(false ? formatProdErrorMessage(30) : "`builder.addMatcher` should only be called before calling `builder.addDefaultCase`");
          }
        }
        actionMatchers.push({
          matcher,
          reducer
        });
        return builder;
      },
      addDefaultCase(reducer) {
        if (true) {
          if (defaultCaseReducer) {
            throw new Error(false ? formatProdErrorMessage(31) : "`builder.addDefaultCase` can only be called once");
          }
        }
        defaultCaseReducer = reducer;
        return builder;
      }
    };
    builderCallback(builder);
    return [actionsMap, actionMatchers, defaultCaseReducer];
  }
  function isStateFunction(x) {
    return typeof x === "function";
  }
  function createReducer(initialState5, mapOrBuilderCallback) {
    if (true) {
      if (typeof mapOrBuilderCallback === "object") {
        throw new Error(false ? formatProdErrorMessage(8) : "The object notation for `createReducer` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createReducer");
      }
    }
    let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
    let getInitialState;
    if (isStateFunction(initialState5)) {
      getInitialState = () => freezeDraftable(initialState5());
    } else {
      const frozenInitialState = freezeDraftable(initialState5);
      getInitialState = () => frozenInitialState;
    }
    function reducer(state = getInitialState(), action) {
      let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({
        matcher
      }) => matcher(action)).map(({
        reducer: reducer2
      }) => reducer2)];
      if (caseReducers.filter((cr) => !!cr).length === 0) {
        caseReducers = [finalDefaultCaseReducer];
      }
      return caseReducers.reduce((previousState, caseReducer) => {
        if (caseReducer) {
          if (isDraft(previousState)) {
            const draft = previousState;
            const result = caseReducer(draft, action);
            if (result === void 0) {
              return previousState;
            }
            return result;
          } else if (!isDraftable(previousState)) {
            const result = caseReducer(previousState, action);
            if (result === void 0) {
              if (previousState === null) {
                return previousState;
              }
              throw Error("A case reducer on a non-draftable value must not return undefined");
            }
            return result;
          } else {
            return produce(previousState, (draft) => {
              return caseReducer(draft, action);
            });
          }
        }
        return previousState;
      }, state);
    }
    reducer.getInitialState = getInitialState;
    return reducer;
  }
  var matches = (matcher, action) => {
    if (hasMatchFunction(matcher)) {
      return matcher.match(action);
    } else {
      return matcher(action);
    }
  };
  function isAnyOf(...matchers) {
    return (action) => {
      return matchers.some((matcher) => matches(matcher, action));
    };
  }
  var urlAlphabet = "ModuleSymbhasOwnPr-0123456789ABCDEFGHNRVfgctiUvz_KqYTJkLxpZXIjQW";
  var nanoid = (size = 21) => {
    let id = "";
    let i = size;
    while (i--) {
      id += urlAlphabet[Math.random() * 64 | 0];
    }
    return id;
  };
  var commonProperties = ["name", "message", "stack", "code"];
  var RejectWithValue = class {
    constructor(payload, meta) {
      /*
      type-only property to distinguish between RejectWithValue and FulfillWithMeta
      does not exist at runtime
      */
      __publicField(this, "_type");
      this.payload = payload;
      this.meta = meta;
    }
  };
  var FulfillWithMeta = class {
    constructor(payload, meta) {
      /*
      type-only property to distinguish between RejectWithValue and FulfillWithMeta
      does not exist at runtime
      */
      __publicField(this, "_type");
      this.payload = payload;
      this.meta = meta;
    }
  };
  var miniSerializeError = (value) => {
    if (typeof value === "object" && value !== null) {
      const simpleError = {};
      for (const property of commonProperties) {
        if (typeof value[property] === "string") {
          simpleError[property] = value[property];
        }
      }
      return simpleError;
    }
    return {
      message: String(value)
    };
  };
  var createAsyncThunk = /* @__PURE__ */ (() => {
    function createAsyncThunk2(typePrefix, payloadCreator, options) {
      const fulfilled = createAction(typePrefix + "/fulfilled", (payload, requestId, arg, meta) => ({
        payload,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "fulfilled"
        })
      }));
      const pending = createAction(typePrefix + "/pending", (requestId, arg, meta) => ({
        payload: void 0,
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          requestStatus: "pending"
        })
      }));
      const rejected = createAction(typePrefix + "/rejected", (error, requestId, arg, payload, meta) => ({
        payload,
        error: (options && options.serializeError || miniSerializeError)(error || "Rejected"),
        meta: __spreadProps(__spreadValues({}, meta || {}), {
          arg,
          requestId,
          rejectedWithValue: !!payload,
          requestStatus: "rejected",
          aborted: (error == null ? void 0 : error.name) === "AbortError",
          condition: (error == null ? void 0 : error.name) === "ConditionError"
        })
      }));
      function actionCreator(arg) {
        return (dispatch, getState, extra) => {
          const requestId = (options == null ? void 0 : options.idGenerator) ? options.idGenerator(arg) : nanoid();
          const abortController = new AbortController();
          let abortHandler;
          let abortReason;
          function abort(reason) {
            abortReason = reason;
            abortController.abort();
          }
          const promise = function() {
            return __async(this, null, function* () {
              var _a, _b;
              let finalAction;
              try {
                let conditionResult = (_a = options == null ? void 0 : options.condition) == null ? void 0 : _a.call(options, arg, {
                  getState,
                  extra
                });
                if (isThenable(conditionResult)) {
                  conditionResult = yield conditionResult;
                }
                if (conditionResult === false || abortController.signal.aborted) {
                  throw {
                    name: "ConditionError",
                    message: "Aborted due to condition callback returning false."
                  };
                }
                const abortedPromise = new Promise((_, reject) => {
                  abortHandler = () => {
                    reject({
                      name: "AbortError",
                      message: abortReason || "Aborted"
                    });
                  };
                  abortController.signal.addEventListener("abort", abortHandler);
                });
                dispatch(pending(requestId, arg, (_b = options == null ? void 0 : options.getPendingMeta) == null ? void 0 : _b.call(options, {
                  requestId,
                  arg
                }, {
                  getState,
                  extra
                })));
                finalAction = yield Promise.race([abortedPromise, Promise.resolve(payloadCreator(arg, {
                  dispatch,
                  getState,
                  extra,
                  requestId,
                  signal: abortController.signal,
                  abort,
                  rejectWithValue: (value, meta) => {
                    return new RejectWithValue(value, meta);
                  },
                  fulfillWithValue: (value, meta) => {
                    return new FulfillWithMeta(value, meta);
                  }
                })).then((result) => {
                  if (result instanceof RejectWithValue) {
                    throw result;
                  }
                  if (result instanceof FulfillWithMeta) {
                    return fulfilled(result.payload, requestId, arg, result.meta);
                  }
                  return fulfilled(result, requestId, arg);
                })]);
              } catch (err) {
                finalAction = err instanceof RejectWithValue ? rejected(null, requestId, arg, err.payload, err.meta) : rejected(err, requestId, arg);
              } finally {
                if (abortHandler) {
                  abortController.signal.removeEventListener("abort", abortHandler);
                }
              }
              const skipDispatch = options && !options.dispatchConditionRejection && rejected.match(finalAction) && finalAction.meta.condition;
              if (!skipDispatch) {
                dispatch(finalAction);
              }
              return finalAction;
            });
          }();
          return Object.assign(promise, {
            abort,
            requestId,
            arg,
            unwrap() {
              return promise.then(unwrapResult);
            }
          });
        };
      }
      return Object.assign(actionCreator, {
        pending,
        rejected,
        fulfilled,
        settled: isAnyOf(rejected, fulfilled),
        typePrefix
      });
    }
    createAsyncThunk2.withTypes = () => createAsyncThunk2;
    return createAsyncThunk2;
  })();
  function unwrapResult(action) {
    if (action.meta && action.meta.rejectedWithValue) {
      throw action.payload;
    }
    if (action.error) {
      throw action.error;
    }
    return action.payload;
  }
  function isThenable(value) {
    return value !== null && typeof value === "object" && typeof value.then === "function";
  }
  var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
  var asyncThunkCreator = {
    [asyncThunkSymbol]: createAsyncThunk
  };
  function getType(slice, actionKey) {
    return `${slice}/${actionKey}`;
  }
  function buildCreateSlice({
    creators
  } = {}) {
    var _a;
    const cAT = (_a = creators == null ? void 0 : creators.asyncThunk) == null ? void 0 : _a[asyncThunkSymbol];
    return function createSlice2(options) {
      const {
        name,
        reducerPath = name
      } = options;
      if (!name) {
        throw new Error(false ? formatProdErrorMessage(11) : "`name` is a required option for createSlice");
      }
      if (typeof process !== "undefined" && true) {
        if (options.initialState === void 0) {
          console.error("You must provide an `initialState` value that is not `undefined`. You may have misspelled `initialState`");
        }
      }
      const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
      const reducerNames = Object.keys(reducers);
      const context = {
        sliceCaseReducersByName: {},
        sliceCaseReducersByType: {},
        actionCreators: {},
        sliceMatchers: []
      };
      const contextMethods = {
        addCase(typeOrActionCreator, reducer2) {
          const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
          if (!type) {
            throw new Error(false ? formatProdErrorMessage(12) : "`context.addCase` cannot be called with an empty action type");
          }
          if (type in context.sliceCaseReducersByType) {
            throw new Error(false ? formatProdErrorMessage(13) : "`context.addCase` cannot be called with two reducers for the same action type: " + type);
          }
          context.sliceCaseReducersByType[type] = reducer2;
          return contextMethods;
        },
        addMatcher(matcher, reducer2) {
          context.sliceMatchers.push({
            matcher,
            reducer: reducer2
          });
          return contextMethods;
        },
        exposeAction(name2, actionCreator) {
          context.actionCreators[name2] = actionCreator;
          return contextMethods;
        },
        exposeCaseReducer(name2, reducer2) {
          context.sliceCaseReducersByName[name2] = reducer2;
          return contextMethods;
        }
      };
      reducerNames.forEach((reducerName) => {
        const reducerDefinition = reducers[reducerName];
        const reducerDetails = {
          reducerName,
          type: getType(name, reducerName),
          createNotation: typeof options.reducers === "function"
        };
        if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) {
          handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
        } else {
          handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
        }
      });
      function buildReducer() {
        if (true) {
          if (typeof options.extraReducers === "object") {
            throw new Error(false ? formatProdErrorMessage(14) : "The object notation for `createSlice.extraReducers` has been removed. Please use the 'builder callback' notation instead: https://redux-toolkit.js.org/api/createSlice");
          }
        }
        const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
        const finalCaseReducers = __spreadValues(__spreadValues({}, extraReducers), context.sliceCaseReducersByType);
        return createReducer(options.initialState, (builder) => {
          for (let key in finalCaseReducers) {
            builder.addCase(key, finalCaseReducers[key]);
          }
          for (let sM of context.sliceMatchers) {
            builder.addMatcher(sM.matcher, sM.reducer);
          }
          for (let m of actionMatchers) {
            builder.addMatcher(m.matcher, m.reducer);
          }
          if (defaultCaseReducer) {
            builder.addDefaultCase(defaultCaseReducer);
          }
        });
      }
      const selectSelf = (state) => state;
      const injectedSelectorCache = /* @__PURE__ */ new Map();
      let _reducer;
      function reducer(state, action) {
        if (!_reducer) _reducer = buildReducer();
        return _reducer(state, action);
      }
      function getInitialState() {
        if (!_reducer) _reducer = buildReducer();
        return _reducer.getInitialState();
      }
      function makeSelectorProps(reducerPath2, injected = false) {
        function selectSlice(state) {
          let sliceState = state[reducerPath2];
          if (typeof sliceState === "undefined") {
            if (injected) {
              sliceState = getInitialState();
            } else if (true) {
              throw new Error(false ? formatProdErrorMessage(15) : "selectSlice returned undefined for an uninjected slice reducer");
            }
          }
          return sliceState;
        }
        function getSelectors(selectState = selectSelf) {
          const selectorCache = emplace(injectedSelectorCache, injected, {
            insert: () => /* @__PURE__ */ new WeakMap()
          });
          return emplace(selectorCache, selectState, {
            insert: () => {
              var _a2;
              const map = {};
              for (const [name2, selector] of Object.entries((_a2 = options.selectors) != null ? _a2 : {})) {
                map[name2] = wrapSelector(selector, selectState, getInitialState, injected);
              }
              return map;
            }
          });
        }
        return {
          reducerPath: reducerPath2,
          getSelectors,
          get selectors() {
            return getSelectors(selectSlice);
          },
          selectSlice
        };
      }
      const slice = __spreadProps(__spreadValues({
        name,
        reducer,
        actions: context.actionCreators,
        caseReducers: context.sliceCaseReducersByName,
        getInitialState
      }, makeSelectorProps(reducerPath)), {
        injectInto(injectable, _a2 = {}) {
          var _b = _a2, {
            reducerPath: pathOpt
          } = _b, config = __objRest(_b, [
            "reducerPath"
          ]);
          const newReducerPath = pathOpt != null ? pathOpt : reducerPath;
          injectable.inject({
            reducerPath: newReducerPath,
            reducer
          }, config);
          return __spreadValues(__spreadValues({}, slice), makeSelectorProps(newReducerPath, true));
        }
      });
      return slice;
    };
  }
  function wrapSelector(selector, selectState, getInitialState, injected) {
    function wrapper(rootState, ...args) {
      let sliceState = selectState(rootState);
      if (typeof sliceState === "undefined") {
        if (injected) {
          sliceState = getInitialState();
        } else if (true) {
          throw new Error(false ? formatProdErrorMessage(16) : "selectState returned undefined for an uninjected slice reducer");
        }
      }
      return selector(sliceState, ...args);
    }
    wrapper.unwrapped = selector;
    return wrapper;
  }
  var createSlice = /* @__PURE__ */ buildCreateSlice();
  function buildReducerCreators() {
    function asyncThunk(payloadCreator, config) {
      return __spreadValues({
        _reducerDefinitionType: "asyncThunk",
        payloadCreator
      }, config);
    }
    asyncThunk.withTypes = () => asyncThunk;
    return {
      reducer(caseReducer) {
        return Object.assign({
          // hack so the wrapping function has the same name as the original
          // we need to create a wrapper so the `reducerDefinitionType` is not assigned to the original
          [caseReducer.name](...args) {
            return caseReducer(...args);
          }
        }[caseReducer.name], {
          _reducerDefinitionType: "reducer"
          /* reducer */
        });
      },
      preparedReducer(prepare, reducer) {
        return {
          _reducerDefinitionType: "reducerWithPrepare",
          prepare,
          reducer
        };
      },
      asyncThunk
    };
  }
  function handleNormalReducerDefinition({
    type,
    reducerName,
    createNotation
  }, maybeReducerWithPrepare, context) {
    let caseReducer;
    let prepareCallback;
    if ("reducer" in maybeReducerWithPrepare) {
      if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) {
        throw new Error(false ? formatProdErrorMessage(17) : "Please use the `create.preparedReducer` notation for prepared action creators with the `create` notation.");
      }
      caseReducer = maybeReducerWithPrepare.reducer;
      prepareCallback = maybeReducerWithPrepare.prepare;
    } else {
      caseReducer = maybeReducerWithPrepare;
    }
    context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
  }
  function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
    return reducerDefinition._reducerDefinitionType === "asyncThunk";
  }
  function isCaseReducerWithPrepareDefinition(reducerDefinition) {
    return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
  }
  function handleThunkCaseReducerDefinition({
    type,
    reducerName
  }, reducerDefinition, context, cAT) {
    if (!cAT) {
      throw new Error(false ? formatProdErrorMessage(18) : "Cannot use `create.asyncThunk` in the built-in `createSlice`. Use `buildCreateSlice({ creators: { asyncThunk: asyncThunkCreator } })` to create a customised version of `createSlice`.");
    }
    const {
      payloadCreator,
      fulfilled,
      pending,
      rejected,
      settled,
      options
    } = reducerDefinition;
    const thunk2 = cAT(type, payloadCreator, options);
    context.exposeAction(reducerName, thunk2);
    if (fulfilled) {
      context.addCase(thunk2.fulfilled, fulfilled);
    }
    if (pending) {
      context.addCase(thunk2.pending, pending);
    }
    if (rejected) {
      context.addCase(thunk2.rejected, rejected);
    }
    if (settled) {
      context.addMatcher(thunk2.settled, settled);
    }
    context.exposeCaseReducer(reducerName, {
      fulfilled: fulfilled || noop,
      pending: pending || noop,
      rejected: rejected || noop,
      settled: settled || noop
    });
  }
  function noop() {
  }
  var listener = "listener";
  var completed = "completed";
  var cancelled = "cancelled";
  var taskCancelled = `task-${cancelled}`;
  var taskCompleted = `task-${completed}`;
  var listenerCancelled = `${listener}-${cancelled}`;
  var listenerCompleted = `${listener}-${completed}`;
  var {
    assign
  } = Object;
  var alm = "listenerMiddleware";
  var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), {
    withTypes: () => addListener
  });
  var clearAllListeners = /* @__PURE__ */ createAction(`${alm}/removeAll`);
  var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), {
    withTypes: () => removeListener
  });
  var ORIGINAL_STATE = Symbol.for("rtk-state-proxy-original");

  // src/redux/slices/challengeSlice.ts
  var initialState = {
    answers: [],
    currentAnswerIndex: 0
  };
  var challengeSlice = createSlice({
    name: "challengeAnswers",
    initialState,
    reducers: {
      addAnswer: (state, action) => {
        state.answers.push(action.payload);
      },
      clearAnswers: (state) => {
        state.answers = [];
      },
      incrementAnswerIndex: (state) => {
        state.currentAnswerIndex++;
      },
      resetAnswerIndex: (state) => {
        state.currentAnswerIndex = 0;
      },
      setFoundAtIndex: (state, action) => {
        const { index, found } = action.payload;
        if (index >= 0 && index < state.answers.length) {
          state.answers[index].found = found;
        } else {
          console.error("Index out of bounds");
        }
      }
    }
  });
  var { addAnswer, clearAnswers, incrementAnswerIndex, resetAnswerIndex, setFoundAtIndex } = challengeSlice.actions;
  var challengeSlice_default = challengeSlice.reducer;

  // src/redux/slices/persisted_mapSlice.ts
  var initialState2 = {
    elements: [
      { type: "form", id: "01", formBlocks: [
        {
          question: "combien fait 1+1",
          answer: "2",
          validated: false
        },
        {
          question: "combien fait 2+2",
          answer: "4",
          validated: false
        }
      ] },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd15c" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd17e" },
      { type: "form", id: "04", formBlocks: [
        {
          question: "combien fait 1+1",
          answer: "2",
          validated: false
        },
        {
          question: "combien fait 2+2",
          answer: "4",
          validated: false
        }
      ] },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd1a2" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd1c6" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd1ea" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd1fa" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd20a" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd21a" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd22a" },
      { type: "challenge", topScore: "D", id: "677e814577322467895fd23a" }
    ],
    elementsOnScreen: [],
    startIndex: 0,
    endIndex: 0,
    currentIndex: 1
  };
  var persistedMapSlice = createSlice({
    name: "map",
    initialState: initialState2,
    reducers: {
      setElements: (state, action) => {
        state.elements = action.payload.elements;
      },
      setEndIndex: (state, action) => {
        state.endIndex = action.payload;
      },
      increaseEndIndex: (state) => {
        state.endIndex++;
      },
      decreaseEndIndex: (state) => {
        state.endIndex--;
      },
      setStartIndex: (state, action) => {
        state.startIndex = action.payload;
      },
      increaseStartIndex: (state) => {
        state.startIndex++;
      },
      decreaseStartIndex: (state) => {
        state.startIndex--;
      },
      updateCurrentIndex: (state, action) => {
        state.currentIndex = action.payload;
      },
      addElementOnScreen: (state, action) => {
        const elementIndex = action.payload;
        if (elementIndex > state.elements.length - 1 || elementIndex < 0) {
          return;
        }
        state.elementsOnScreen.push(state.elements[elementIndex]);
      },
      removeElementFromElementsOnScreen: (state, action) => {
        const removedElementIndex = action.payload;
        if (removedElementIndex > state.elementsOnScreen.length - 1 || removedElementIndex < 0) {
          return;
        }
        state.elementsOnScreen.splice(removedElementIndex, 1);
      }
    }
  });
  var { setElements, increaseEndIndex, decreaseEndIndex, increaseStartIndex, decreaseStartIndex, updateCurrentIndex, addElementOnScreen, removeElementFromElementsOnScreen, setEndIndex, setStartIndex } = persistedMapSlice.actions;
  var persisted_mapSlice_default = persistedMapSlice.reducer;

  // src/redux/slices/userSlice.ts
  var initialState3 = {
    userId: null,
    name: null,
    token: null
  };
  var userSlice = createSlice({
    name: "user",
    initialState: initialState3,
    reducers: {
      setUser: (state, action) => {
        state.userId = action.payload.userId;
        state.name = action.payload.name;
        state.token = action.payload.token;
      },
      clearUser: (state) => {
        state.userId = null;
        state.name = null;
        state.token = null;
      }
    }
  });
  var { setUser, clearUser } = userSlice.actions;
  var userSlice_default = userSlice.reducer;

  // src/redux/slices/unpersisted_mapSlice.ts
  var initialState4 = {
    currentlyFinishingChallenge: false
  };
  var unpersistedMapSlice = createSlice({
    name: "map",
    initialState: initialState4,
    reducers: {
      setCurrentlyFinishingChallenge: (state, action) => {
        state.currentlyFinishingChallenge = action.payload;
      }
    }
  });
  var { setCurrentlyFinishingChallenge } = unpersistedMapSlice.actions;
  var unpersisted_mapSlice_default = unpersistedMapSlice.reducer;

  // node_modules/redux-persist/es/constants.js
  var KEY_PREFIX = "persist:";
  var FLUSH = "persist/FLUSH";
  var REHYDRATE = "persist/REHYDRATE";
  var PAUSE = "persist/PAUSE";
  var PERSIST = "persist/PERSIST";
  var PURGE = "persist/PURGE";
  var DEFAULT_VERSION = -1;

  // node_modules/redux-persist/es/stateReconciler/autoMergeLevel1.js
  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function _typeof2(obj2) {
        return typeof obj2;
      };
    } else {
      _typeof = function _typeof2(obj2) {
        return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
      };
    }
    return _typeof(obj);
  }
  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys(source, true).forEach(function(key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(source).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function autoMergeLevel1(inboundState, originalState, reducedState, _ref) {
    var debug = _ref.debug;
    var newState = _objectSpread({}, reducedState);
    if (inboundState && _typeof(inboundState) === "object") {
      Object.keys(inboundState).forEach(function(key) {
        if (key === "_persist") return;
        if (originalState[key] !== reducedState[key]) {
          if (debug) console.log("redux-persist/stateReconciler: sub state for key `%s` modified, skipping.", key);
          return;
        }
        newState[key] = inboundState[key];
      });
    }
    if (debug && inboundState && _typeof(inboundState) === "object") console.log("redux-persist/stateReconciler: rehydrated keys '".concat(Object.keys(inboundState).join(", "), "'"));
    return newState;
  }

  // node_modules/redux-persist/es/createPersistoid.js
  function createPersistoid(config) {
    var blacklist = config.blacklist || null;
    var whitelist = config.whitelist || null;
    var transforms = config.transforms || [];
    var throttle = config.throttle || 0;
    var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
    var storage2 = config.storage;
    var serialize;
    if (config.serialize === false) {
      serialize = function serialize2(x) {
        return x;
      };
    } else if (typeof config.serialize === "function") {
      serialize = config.serialize;
    } else {
      serialize = defaultSerialize;
    }
    var writeFailHandler = config.writeFailHandler || null;
    var lastState = {};
    var stagedState = {};
    var keysToProcess = [];
    var timeIterator = null;
    var writePromise = null;
    var update = function update2(state) {
      Object.keys(state).forEach(function(key) {
        if (!passWhitelistBlacklist(key)) return;
        if (lastState[key] === state[key]) return;
        if (keysToProcess.indexOf(key) !== -1) return;
        keysToProcess.push(key);
      });
      Object.keys(lastState).forEach(function(key) {
        if (state[key] === void 0 && passWhitelistBlacklist(key) && keysToProcess.indexOf(key) === -1 && lastState[key] !== void 0) {
          keysToProcess.push(key);
        }
      });
      if (timeIterator === null) {
        timeIterator = setInterval(processNextKey, throttle);
      }
      lastState = state;
    };
    function processNextKey() {
      if (keysToProcess.length === 0) {
        if (timeIterator) clearInterval(timeIterator);
        timeIterator = null;
        return;
      }
      var key = keysToProcess.shift();
      var endState = transforms.reduce(function(subState, transformer) {
        return transformer.in(subState, key, lastState);
      }, lastState[key]);
      if (endState !== void 0) {
        try {
          stagedState[key] = serialize(endState);
        } catch (err) {
          console.error("redux-persist/createPersistoid: error serializing state", err);
        }
      } else {
        delete stagedState[key];
      }
      if (keysToProcess.length === 0) {
        writeStagedState();
      }
    }
    function writeStagedState() {
      Object.keys(stagedState).forEach(function(key) {
        if (lastState[key] === void 0) {
          delete stagedState[key];
        }
      });
      writePromise = storage2.setItem(storageKey, serialize(stagedState)).catch(onWriteFail);
    }
    function passWhitelistBlacklist(key) {
      if (whitelist && whitelist.indexOf(key) === -1 && key !== "_persist") return false;
      if (blacklist && blacklist.indexOf(key) !== -1) return false;
      return true;
    }
    function onWriteFail(err) {
      if (writeFailHandler) writeFailHandler(err);
      if (err && true) {
        console.error("Error storing data", err);
      }
    }
    var flush = function flush2() {
      while (keysToProcess.length !== 0) {
        processNextKey();
      }
      return writePromise || Promise.resolve();
    };
    return {
      update,
      flush
    };
  }
  function defaultSerialize(data) {
    return JSON.stringify(data);
  }

  // node_modules/redux-persist/es/getStoredState.js
  function getStoredState(config) {
    var transforms = config.transforms || [];
    var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
    var storage2 = config.storage;
    var debug = config.debug;
    var deserialize;
    if (config.deserialize === false) {
      deserialize = function deserialize2(x) {
        return x;
      };
    } else if (typeof config.deserialize === "function") {
      deserialize = config.deserialize;
    } else {
      deserialize = defaultDeserialize;
    }
    return storage2.getItem(storageKey).then(function(serialized) {
      if (!serialized) return void 0;
      else {
        try {
          var state = {};
          var rawState = deserialize(serialized);
          Object.keys(rawState).forEach(function(key) {
            state[key] = transforms.reduceRight(function(subState, transformer) {
              return transformer.out(subState, key, rawState);
            }, deserialize(rawState[key]));
          });
          return state;
        } catch (err) {
          if (debug) console.log("redux-persist/getStoredState: Error restoring data ".concat(serialized), err);
          throw err;
        }
      }
    });
  }
  function defaultDeserialize(serial) {
    return JSON.parse(serial);
  }

  // node_modules/redux-persist/es/purgeStoredState.js
  function purgeStoredState(config) {
    var storage2 = config.storage;
    var storageKey = "".concat(config.keyPrefix !== void 0 ? config.keyPrefix : KEY_PREFIX).concat(config.key);
    return storage2.removeItem(storageKey, warnIfRemoveError);
  }
  function warnIfRemoveError(err) {
    if (err && true) {
      console.error("redux-persist/purgeStoredState: Error purging data stored state", err);
    }
  }

  // node_modules/redux-persist/es/persistReducer.js
  function ownKeys2(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function(sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }
    return keys;
  }
  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      if (i % 2) {
        ownKeys2(source, true).forEach(function(key) {
          _defineProperty2(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys2(source).forEach(function(key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }
    return target;
  }
  function _defineProperty2(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, { value, enumerable: true, configurable: true, writable: true });
    } else {
      obj[key] = value;
    }
    return obj;
  }
  function _objectWithoutProperties(source, excluded) {
    if (source == null) return {};
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
      var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
      for (i = 0; i < sourceSymbolKeys.length; i++) {
        key = sourceSymbolKeys[i];
        if (excluded.indexOf(key) >= 0) continue;
        if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
        target[key] = source[key];
      }
    }
    return target;
  }
  function _objectWithoutPropertiesLoose(source, excluded) {
    if (source == null) return {};
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
      key = sourceKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      target[key] = source[key];
    }
    return target;
  }
  var DEFAULT_TIMEOUT = 5e3;
  function persistReducer(config, baseReducer) {
    if (true) {
      if (!config) throw new Error("config is required for persistReducer");
      if (!config.key) throw new Error("key is required in persistor config");
      if (!config.storage) throw new Error("redux-persist: config.storage is required. Try using one of the provided storage engines `import storage from 'redux-persist/lib/storage'`");
    }
    var version = config.version !== void 0 ? config.version : DEFAULT_VERSION;
    var debug = config.debug || false;
    var stateReconciler = config.stateReconciler === void 0 ? autoMergeLevel1 : config.stateReconciler;
    var getStoredState2 = config.getStoredState || getStoredState;
    var timeout = config.timeout !== void 0 ? config.timeout : DEFAULT_TIMEOUT;
    var _persistoid = null;
    var _purge = false;
    var _paused = true;
    var conditionalUpdate = function conditionalUpdate2(state) {
      state._persist.rehydrated && _persistoid && !_paused && _persistoid.update(state);
      return state;
    };
    return function(state, action) {
      var _ref = state || {}, _persist = _ref._persist, rest = _objectWithoutProperties(_ref, ["_persist"]);
      var restState = rest;
      if (action.type === PERSIST) {
        var _sealed = false;
        var _rehydrate = function _rehydrate2(payload, err) {
          if (_sealed) console.error('redux-persist: rehydrate for "'.concat(config.key, '" called after timeout.'), payload, err);
          if (!_sealed) {
            action.rehydrate(config.key, payload, err);
            _sealed = true;
          }
        };
        timeout && setTimeout(function() {
          !_sealed && _rehydrate(void 0, new Error('redux-persist: persist timed out for persist key "'.concat(config.key, '"')));
        }, timeout);
        _paused = false;
        if (!_persistoid) _persistoid = createPersistoid(config);
        if (_persist) {
          return _objectSpread2({}, baseReducer(restState, action), {
            _persist
          });
        }
        if (typeof action.rehydrate !== "function" || typeof action.register !== "function") throw new Error("redux-persist: either rehydrate or register is not a function on the PERSIST action. This can happen if the action is being replayed. This is an unexplored use case, please open an issue and we will figure out a resolution.");
        action.register(config.key);
        getStoredState2(config).then(function(restoredState) {
          var migrate = config.migrate || function(s, v) {
            return Promise.resolve(s);
          };
          migrate(restoredState, version).then(function(migratedState) {
            _rehydrate(migratedState);
          }, function(migrateErr) {
            if (migrateErr) console.error("redux-persist: migration error", migrateErr);
            _rehydrate(void 0, migrateErr);
          });
        }, function(err) {
          _rehydrate(void 0, err);
        });
        return _objectSpread2({}, baseReducer(restState, action), {
          _persist: {
            version,
            rehydrated: false
          }
        });
      } else if (action.type === PURGE) {
        _purge = true;
        action.result(purgeStoredState(config));
        return _objectSpread2({}, baseReducer(restState, action), {
          _persist
        });
      } else if (action.type === FLUSH) {
        action.result(_persistoid && _persistoid.flush());
        return _objectSpread2({}, baseReducer(restState, action), {
          _persist
        });
      } else if (action.type === PAUSE) {
        _paused = true;
      } else if (action.type === REHYDRATE) {
        if (_purge) return _objectSpread2({}, restState, {
          _persist: _objectSpread2({}, _persist, {
            rehydrated: true
          })
          // @NOTE if key does not match, will continue to default else below
        });
        if (action.key === config.key) {
          var reducedState = baseReducer(restState, action);
          var inboundState = action.payload;
          var reconciledRest = stateReconciler !== false && inboundState !== void 0 ? stateReconciler(inboundState, state, reducedState, config) : reducedState;
          var _newState = _objectSpread2({}, reconciledRest, {
            _persist: _objectSpread2({}, _persist, {
              rehydrated: true
            })
          });
          return conditionalUpdate(_newState);
        }
      }
      if (!_persist) return baseReducer(state, action);
      var newState = baseReducer(restState, action);
      if (newState === restState) return state;
      return conditionalUpdate(_objectSpread2({}, newState, {
        _persist
      }));
    };
  }

  // src/redux/index.ts
  var import_storage = __toESM(require_storage(), 1);
  var persistConfig = {
    key: "root",
    storage: import_storage.default
  };
  var persistedUserReducer = persistReducer(persistConfig, userSlice_default);
  var persistedChallengeReducer = persistReducer(persistConfig, challengeSlice_default);
  var persistedMapReducer = persistReducer(persistConfig, persisted_mapSlice_default);
  var store = configureStore({
    reducer: {
      user: persistedUserReducer,
      challenge: persistedChallengeReducer,
      persistedMap: persistedMapReducer,
      unpersistedMapReducer: unpersisted_mapSlice_default
    }
  });

  // src/challenge.ts
  var gameMode = 0 /* discovery */;
  var windAudio = document.getElementById("wind_audio");
  var goBackToMountain = (event) => {
    window.location.href = `/discovery${hardMode ? "?started=true" : ""}`;
  };
  var getUrlParameter = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  };
  var MAP_SETS = [];
  var heroContainer = document.getElementById("hero_container");
  var heroImage = document.getElementById("heroImg");
  var deadInterfaceContainer = document.getElementById("interface_container");
  var swordSlashImg = document.getElementById(
    "sword_slash"
  );
  var scoreContainer = document.getElementById("score");
  var scoreValue = document.getElementById("score_value");
  var topScoreContainer = document.getElementById("top_score_value");
  var answerDataContainer = document.getElementById("answer_data_container");
  var answerDataValue = document.getElementById("answer_data_value");
  var scoreMalusContainer = document.getElementById("score_malus_container");
  var scoreMalusDetail = document.getElementById("score_malus_detail");
  var scoreRewardContainer = document.getElementById("score_reward_container");
  var scoreRewardDetail = document.getElementById("score_reward_detail");
  var specialMoveIndicator = document.getElementById("special_move_indicator");
  var ANIMATION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS = 80;
  var ANIMATION_HERO_RUN_SUPER_SPEED_DURATION_BETWEEN_FRAMES_IN_MS = 66;
  var CAMERA_SUPER_SPEED_MULTIPLICATOR = 4;
  var heroContactPointContainerRatio = 0.3;
  var heroInTheRedZone = false;
  var idleTimerValue = 5;
  var lastStopInMs = null;
  var heroRunning = false;
  var idleTimeoutContainer = document.getElementById("idle_timeout_container");
  var answers = null;
  var fetchChallengeById = (challengeId) => __async(void 0, null, function* () {
    try {
      const response = yield fetch(`http://localhost:3000/api/challenges/${challengeId}`);
      if (!response.ok) {
        throw new Error(`Error fetching challenge: ${response.statusText}`);
      }
      answers = response;
      const challengeData = yield response.json();
      sortAndStoreAnswers(challengeData.answers);
    } catch (error) {
      console.error("Error:", error);
    }
  });
  var initializeChallengePage = (challengeId) => __async(void 0, null, function* () {
    if (challengeId) {
      const challenge = yield fetchChallengeById(challengeId);
    } else {
      console.error("No challengeId provided in the URL.");
    }
  });
  var getHeroLeft = () => {
    if (!heroContainer) {
      console.log("we cant get the hero left, the hero container was not initialized yet");
    }
    return heroContainer.getBoundingClientRect().left * (1 + heroContactPointContainerRatio);
  };
  var enemyViewPoint = document.getElementsByClassName(
    "enemyViewPoint"
  )[0];
  var enemyViewPointLogo = document.getElementById(
    "enemyViewPointLogo"
  );
  var enemyViewPointTile1 = document.getElementById(
    "enemyViewPointTile1"
  );
  var enemyViewPointTile2 = document.getElementById(
    "enemyViewPointTile2"
  );
  var enemyViewPointTile3 = document.getElementById(
    "enemyViewPointTile3"
  );
  var enemyViewPointTile4 = document.getElementById(
    "enemyViewPointTile4"
  );
  var viewPointTiles = [
    enemyViewPointTile1,
    enemyViewPointTile2,
    enemyViewPointTile3,
    enemyViewPointTile4
  ];
  var updateEnemyViewPointDisplay = () => {
    viewPointTiles.forEach(
      (tile) => tile.style.background = heroInTheRedZone ? "rgba(204, 40, 40, 0.514)" : "rgba(40, 108, 204, 0.514)"
    );
    enemyViewPointLogo.src = `${heroInTheRedZone ? "assets/challenge/millescaneous/careful.png" : "assets/challenge/items/lightning/11.png"}`;
  };
  var runAudio = document.getElementById("run_audio");
  var stepsInSwow = document.getElementById(
    "snow_steps_audio"
  );
  stepsInSwow.volume = 0.7;
  stepsInSwow.playbackRate = 1.2;
  var swordAudio = document.getElementById("sword_audio");
  var laserdAudio = document.getElementById("laser_audio");
  var epicAudio = document.getElementById(
    getUrlParameter("mode") === "hard" ? "hard_epic_audio" : "epic_audio"
  );
  var bassAudio = document.getElementById("bass_audio");
  var fireBackgroundAudio = document.getElementById(
    "fire_background_audio"
  );
  var electricityAudio = document.getElementById(
    "electricity_audio"
  );
  var transformationScreamAudio = document.getElementById(
    "transformation_scream_audio"
  );
  var hurtAudio = document.getElementById(
    "hero_hurt_audio"
  );
  var transformedEpicAudio = document.getElementById(
    "transformed_epic_audio"
  );
  var transformationOffAudio = document.getElementById(
    "transformation_off_audio"
  );
  var progressBar = document.getElementsByClassName(
    "progress"
  )[0];
  var bombAudio = document.getElementById("bomb_audio");
  var setInitialGameVolume = () => {
    swordAudio.volume = 0.65;
    bombAudio.volume = 0.12;
    electricityAudio.volume = 0.7;
    transformationScreamAudio.volume = 0.25;
    hurtAudio.volume = 0.025;
    runAudio.volume = 0;
  };
  var currentSubject = null;
  var currentSubjectTotal = 0;
  var swordReach = window.innerWidth * 0.6;
  var gameLaunched = false;
  var TRANSFORMED_BONUS_RATIO = 1;
  var REWARD_UNIT = 1;
  var transformedAlready = false;
  var REWARD_TIMEOUT_DURATION = 5;
  var rewardStreak = 1;
  var hardMode = false;
  var TRANSFORMATION_THRESHOLD = hardMode ? 1e8 : 20;
  var preTransformed = false;
  var gameFinished = false;
  var runStopped = false;
  var score = 0;
  var heroHurt = false;
  var heroIsAlive = true;
  var lifePoints = { max: 4, value: 4 };
  var INVISIBILITY_DURATION_IN_MILLISECONDS = 2e3;
  var invisible = false;
  var ennemiesOnScreen = [];
  var enemiesComingTimeout = null;
  var transformed = false;
  var currentMalusContainerTimeout = null;
  var currentRewardContainerTimeout = null;
  var currentTransformationRewardContainerTimeout = null;
  var Answer = class {
    constructor(data, good) {
      this.data = data;
      this.good = good;
    }
  };
  var Enemy = class {
    constructor(character, answer) {
      this.collideable = true;
      this.character = character;
      this.answer = answer;
    }
  };
  var GAME_TIMEOUTS = {
    [0 /* HERO */]: [],
    [1 /* ENEMY */]: []
  };
  var MATHS_ARITHMETIC = {
    title: "Intermediate Arithmetic Challenge",
    good: [
      new Answer("12 + 8 = 20", true),
      new Answer("15 - 6 = 9", true),
      new Answer("9 + 7 = 16", true),
      new Answer("18 - 11 = 7", true),
      new Answer("14 + 6 = 20", true),
      new Answer("21 - 13 = 8", true),
      new Answer("16 + 5 = 21", true),
      new Answer("24 - 10 = 14", true),
      new Answer("13 + 8 = 21", true),
      new Answer("20 - 12 = 8", true)
    ],
    bad: [
      new Answer("12 + 8 = 22", false),
      new Answer("15 - 6 = 8", false),
      new Answer("9 + 7 = 15", false),
      new Answer("18 - 11 = 6", false),
      new Answer("14 + 6 = 22", false),
      new Answer("21 - 13 = 10", false),
      new Answer("16 + 5 = 22", false),
      new Answer("24 - 10 = 15", false),
      new Answer("13 + 8 = 20", false),
      new Answer("20 - 12 = 10", false)
    ]
  };
  var sortAndStoreAnswers = (challengeData) => {
    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [array[i], array[randomIndex]] = [array[randomIndex], array[i]];
      }
      return array;
    };
    let randomlySortedChallengeArray = shuffle(challengeData);
    randomlySortedChallengeArray.forEach(
      (challenge) => {
        store.dispatch(addAnswer({
          data: challenge,
          found: null
        }));
      }
    );
  };
  var findNextAnswer = () => {
    const challenge = store.getState().challenge;
    const currentAnswerIndex = challenge.currentAnswerIndex;
    const answers2 = challenge.answers;
    if (currentAnswerIndex >= answers2.length) {
      return "done";
    }
    if (currentAnswerIndex === answers2.length - 1) {
      endOfChallengeContainer.style.opacity = "1";
      endOfChallengeContainer.innerHTML = "Dernier ennemi...";
      setTimeout(() => {
        endOfChallengeContainer.style.opacity = "0";
        endOfChallengeContainer.innerHTML = "";
      }, 1e3);
    }
    if (currentAnswerIndex === answers2.length - 3) {
      endOfChallengeContainer.style.opacity = "1";
      endOfChallengeContainer.innerHTML = "3 derniers ennemis...";
      setTimeout(() => {
        endOfChallengeContainer.style.opacity = "0";
        endOfChallengeContainer.innerHTML = "";
      }, 1e3);
    }
    const data = answers2[store.getState().challenge.currentAnswerIndex].data;
    store.dispatch(incrementAnswerIndex());
    return data;
  };
  var Grades = {
    D: [0, 1, 2, 3, 4, 5],
    C: [6, 7, 8, 9, 10],
    B: [11, 12, 13, 14],
    A: [15, 16, 17],
    S: [18, 19, 20]
  };
  var getChallengeGrade = () => {
    if (!currentSubject) {
      return;
    }
    const grade = Math.round(score / currentSubjectTotal * 20);
    return Grades.D.includes(grade) ? "D" : Grades.C.includes(grade) ? "C" : Grades.B.includes(grade) ? "B" : Grades.A.includes(grade) ? "A" : "S";
  };
  var updateLifePointsDisplay = () => {
    for (let i = 1; i <= lifePoints.max; i++) {
      const lifePointOpacity = i <= lifePoints.value ? "1" : "0.3";
      document.getElementById(`lifePointContainer_${i}`).style.opacity = lifePointOpacity;
    }
  };
  var setHeroClass = () => {
    heroContainer.classList.add(
      hardMode ? "hero_container_hard" : "hero_container_easy"
    );
  };
  var lastEnemyIndex = 0;
  var buildEnemy = (answer) => {
    const enemyCreationCallbacks = [
      createGolemCharacter,
      createRedHammerCharacter,
      createWitchCharacter
    ];
    lastEnemyIndex++;
    if (lastEnemyIndex === enemyCreationCallbacks.length) {
      lastEnemyIndex = 0;
    }
    const enemyIndex = Math.floor(Math.random() * (enemyCreationCallbacks.length - 1));
    const enemyCharacter = enemyCreationCallbacks[lastEnemyIndex]();
    if (!enemyCharacter) {
      return;
    }
    document.getElementsByTagName("body")[0].append();
    const enemy = new Enemy(enemyCharacter, answer);
    ennemiesOnScreen.push(enemy);
    return enemy;
  };
  var initEnemyAnimations = (enemy) => {
    const enemyAnimations = enemy.character.animations;
    enemyAnimations.forEach(
      (animation) => {
        animation.animationsStatesBlocks.forEach(
          (animationBlock) => {
            ANIMATION_RUNNING_VALUES[animationBlock.animation.id] = 0;
          }
        );
      }
    );
    const appElementId = getAppIdByAnimationId(enemy.character.animations[0].animationsStatesBlocks[0].animation.id);
    if (!appElementId) {
      return;
    }
    APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation = null;
  };
  var buildAndLaunchEnemy = (answer) => {
    const enemy = buildEnemy(answer);
    initEnemyAnimations(enemy);
    if (!enemy) {
      return;
    }
    lightUpAnswerDataContainer();
    answerDataValue.innerHTML = enemy.answer.text;
    launchOpponent(enemy);
  };
  var triggerOpponentsApparition = () => {
    const newAnswer = findNextAnswer();
    enemiesComingTimeout = setTimeout(
      () => {
        if (newAnswer && newAnswer !== "done") {
          buildAndLaunchEnemy(newAnswer);
        } else {
          launchEndOfChallenge();
        }
      },
      Math.random() > 0.5 ? 10 : 50
    );
  };
  var endOfChallengeContainer = document.getElementById("end_of_challenge_container");
  var transitionAudio = document.getElementById("transition_audio");
  transitionAudio.volume = 0.15;
  var levelUpAudio = document.getElementById(
    "levelup_audio"
  );
  var breathAudio = document.getElementById("breath_audio");
  levelUpAudio.volume = 1;
  var tryAgain = () => {
    window.location.replace(window.location.href);
  };
  var launchEndOfChallenge = () => {
    endOfChallengeContainer.style.opacity = "1";
    endOfChallengeContainer.innerHTML = "Arriv\xE9e \xE0 la porte gel\xE9e...";
    hideChallengeDisplay();
    setTimeout(
      () => {
        endOfChallengeContainer.style.opacity = "0";
        store.dispatch(setCurrentlyFinishingChallenge(true));
        deadInterfaceContainer.style.display = "flex";
        if (heroIsAlive) {
          setTimeout(
            stopRun,
            3e3
          );
        }
      },
      3e3
    );
    runAudio.pause();
    stepsInSwow.pause();
    setTimeout(
      () => {
        transitionAudio.play();
        endOfChallengeContainer.style.opacity = "1";
        endOfChallengeContainer.innerHTML = "Note : D, acc\xE8se refus\xE9...";
      },
      4e3
    );
    return;
    gameFinished = true;
    document.getElementById("endOfGameInterface").style.display = "flex";
    clearGameTimeouts();
    initAllAnimations();
    heroImage.src = "assets/challenge/characters/hero/run/1.png";
    document.getElementById("transformation_background").style.display = "none";
    const grade = getChallengeGrade();
    const endOfChallengeButton = document.getElementById(
      "challengesuccessButton"
    );
    const displayEndOfGameButton = () => {
      if (grade === "A" || grade === "S") {
        endOfChallengeButton.style.display = "flex";
        levelUpAudio.play();
      }
    };
    setTimeout(() => {
      if (!grade) {
        return;
      }
      killAllAudios();
      document.getElementById("endOfGameInterfaceScore").innerHTML = grade;
      document.getElementById("endOfGameInterfaceScore").style.display = "flex";
      const stampAudio = document.getElementById(
        "stamp_audio"
      );
      stampAudio.play();
      setTimeout(() => {
        displayEndOfGameButton();
      }, 2e3);
    }, 1e3);
  };
  var ANIMATION_ID = /* @__PURE__ */ ((ANIMATION_ID2) => {
    ANIMATION_ID2[ANIMATION_ID2["hero_attack"] = 0] = "hero_attack";
    ANIMATION_ID2[ANIMATION_ID2["hero_run"] = 1] = "hero_run";
    ANIMATION_ID2[ANIMATION_ID2["hero_run_right"] = 2] = "hero_run_right";
    ANIMATION_ID2[ANIMATION_ID2["hero_run_left"] = 3] = "hero_run_left";
    ANIMATION_ID2[ANIMATION_ID2["hero_walk_right"] = 4] = "hero_walk_right";
    ANIMATION_ID2[ANIMATION_ID2["hero_walk_left"] = 5] = "hero_walk_left";
    ANIMATION_ID2[ANIMATION_ID2["hero_hurt"] = 6] = "hero_hurt";
    ANIMATION_ID2[ANIMATION_ID2["hero_death"] = 7] = "hero_death";
    ANIMATION_ID2[ANIMATION_ID2["hero_idle"] = 8] = "hero_idle";
    ANIMATION_ID2[ANIMATION_ID2["hero_second_idle"] = 9] = "hero_second_idle";
    ANIMATION_ID2[ANIMATION_ID2["hero_special_attack"] = 10] = "hero_special_attack";
    ANIMATION_ID2[ANIMATION_ID2["stop"] = 11] = "stop";
    ANIMATION_ID2[ANIMATION_ID2["stop_time"] = 12] = "stop_time";
    ANIMATION_ID2[ANIMATION_ID2["cancel_stop_time"] = 13] = "cancel_stop_time";
    ANIMATION_ID2[ANIMATION_ID2["ghost_opponent_idle"] = 14] = "ghost_opponent_idle";
    ANIMATION_ID2[ANIMATION_ID2["ghost_opponent_run"] = 15] = "ghost_opponent_run";
    ANIMATION_ID2[ANIMATION_ID2["ghost_opponent_attack"] = 16] = "ghost_opponent_attack";
    ANIMATION_ID2[ANIMATION_ID2["ghost_opponent_death"] = 17] = "ghost_opponent_death";
    ANIMATION_ID2[ANIMATION_ID2["ghost_opponent_move"] = 18] = "ghost_opponent_move";
    ANIMATION_ID2[ANIMATION_ID2["hammer_opponent_idle"] = 19] = "hammer_opponent_idle";
    ANIMATION_ID2[ANIMATION_ID2["hammer_opponent_run"] = 20] = "hammer_opponent_run";
    ANIMATION_ID2[ANIMATION_ID2["hammer_opponent_attack"] = 21] = "hammer_opponent_attack";
    ANIMATION_ID2[ANIMATION_ID2["hammer_opponent_death"] = 22] = "hammer_opponent_death";
    ANIMATION_ID2[ANIMATION_ID2["hammer_opponent_move"] = 23] = "hammer_opponent_move";
    ANIMATION_ID2[ANIMATION_ID2["golem_opponent_idle"] = 24] = "golem_opponent_idle";
    ANIMATION_ID2[ANIMATION_ID2["golem_opponent_run"] = 25] = "golem_opponent_run";
    ANIMATION_ID2[ANIMATION_ID2["golem_opponent_attack"] = 26] = "golem_opponent_attack";
    ANIMATION_ID2[ANIMATION_ID2["golem_opponent_death"] = 27] = "golem_opponent_death";
    ANIMATION_ID2[ANIMATION_ID2["golem_opponent_move"] = 28] = "golem_opponent_move";
    ANIMATION_ID2[ANIMATION_ID2["king_opponent_idle"] = 29] = "king_opponent_idle";
    ANIMATION_ID2[ANIMATION_ID2["king_opponent_run"] = 30] = "king_opponent_run";
    ANIMATION_ID2[ANIMATION_ID2["king_opponent_attack"] = 31] = "king_opponent_attack";
    ANIMATION_ID2[ANIMATION_ID2["king_opponent_death"] = 32] = "king_opponent_death";
    ANIMATION_ID2[ANIMATION_ID2["king_opponent_move"] = 33] = "king_opponent_move";
    ANIMATION_ID2[ANIMATION_ID2["witch_opponent_idle"] = 34] = "witch_opponent_idle";
    ANIMATION_ID2[ANIMATION_ID2["witch_opponent_run"] = 35] = "witch_opponent_run";
    ANIMATION_ID2[ANIMATION_ID2["witch_opponent_attack"] = 36] = "witch_opponent_attack";
    ANIMATION_ID2[ANIMATION_ID2["witch_opponent_death"] = 37] = "witch_opponent_death";
    ANIMATION_ID2[ANIMATION_ID2["witch_opponent_move"] = 38] = "witch_opponent_move";
    ANIMATION_ID2[ANIMATION_ID2["orc_opponent_idle"] = 39] = "orc_opponent_idle";
    ANIMATION_ID2[ANIMATION_ID2["orc_opponent_run"] = 40] = "orc_opponent_run";
    ANIMATION_ID2[ANIMATION_ID2["orc_opponent_attack"] = 41] = "orc_opponent_attack";
    ANIMATION_ID2[ANIMATION_ID2["orc_opponent_death"] = 42] = "orc_opponent_death";
    ANIMATION_ID2[ANIMATION_ID2["orc_opponent_move"] = 43] = "orc_opponent_move";
    ANIMATION_ID2[ANIMATION_ID2["dwarf_opponent_idle"] = 44] = "dwarf_opponent_idle";
    ANIMATION_ID2[ANIMATION_ID2["dwarf_opponent_run"] = 45] = "dwarf_opponent_run";
    ANIMATION_ID2[ANIMATION_ID2["dwarf_opponent_attack"] = 46] = "dwarf_opponent_attack";
    ANIMATION_ID2[ANIMATION_ID2["dwarf_opponent_death"] = 47] = "dwarf_opponent_death";
    ANIMATION_ID2[ANIMATION_ID2["dwarf_opponent_move"] = 48] = "dwarf_opponent_move";
    ANIMATION_ID2[ANIMATION_ID2["camera_left_to_right"] = 49] = "camera_left_to_right";
    ANIMATION_ID2[ANIMATION_ID2["camera_right_to_left"] = 50] = "camera_right_to_left";
    ANIMATION_ID2[ANIMATION_ID2["character_left_to_right_move"] = 51] = "character_left_to_right_move";
    ANIMATION_ID2[ANIMATION_ID2["hero_sword_slash"] = 52] = "hero_sword_slash";
    ANIMATION_ID2[ANIMATION_ID2["hero_transformation_pre_run"] = 53] = "hero_transformation_pre_run";
    ANIMATION_ID2[ANIMATION_ID2["hero_transformation_run"] = 54] = "hero_transformation_run";
    ANIMATION_ID2[ANIMATION_ID2["hero_transformation_hurt"] = 55] = "hero_transformation_hurt";
    ANIMATION_ID2[ANIMATION_ID2["hero_transformation_attack"] = 56] = "hero_transformation_attack";
    ANIMATION_ID2[ANIMATION_ID2["boss_idle"] = 57] = "boss_idle";
    ANIMATION_ID2[ANIMATION_ID2["boss_attack"] = 58] = "boss_attack";
    ANIMATION_ID2[ANIMATION_ID2["lightning"] = 59] = "lightning";
    return ANIMATION_ID2;
  })(ANIMATION_ID || {});
  var ANIMATION_RUNNING_VALUES = {
    [0 /* hero_attack */]: 0,
    [1 /* hero_run */]: 0,
    [2 /* hero_run_right */]: 0,
    [3 /* hero_run_left */]: 0,
    [5 /* hero_walk_left */]: 0,
    [4 /* hero_walk_right */]: 0,
    [7 /* hero_death */]: 0,
    [6 /* hero_hurt */]: 0,
    [8 /* hero_idle */]: 0,
    [9 /* hero_second_idle */]: 0,
    [10 /* hero_special_attack */]: 0,
    [12 /* stop_time */]: 0,
    [11 /* stop */]: 0,
    [13 /* cancel_stop_time */]: 0,
    [14 /* ghost_opponent_idle */]: 0,
    [15 /* ghost_opponent_run */]: 0,
    [16 /* ghost_opponent_attack */]: 0,
    [17 /* ghost_opponent_death */]: 0,
    [18 /* ghost_opponent_move */]: 0,
    [19 /* hammer_opponent_idle */]: 0,
    [20 /* hammer_opponent_run */]: 0,
    [21 /* hammer_opponent_attack */]: 0,
    [22 /* hammer_opponent_death */]: 0,
    [23 /* hammer_opponent_move */]: 0,
    [39 /* orc_opponent_idle */]: 0,
    [40 /* orc_opponent_run */]: 0,
    [41 /* orc_opponent_attack */]: 0,
    [42 /* orc_opponent_death */]: 0,
    [43 /* orc_opponent_move */]: 0,
    [44 /* dwarf_opponent_idle */]: 0,
    [45 /* dwarf_opponent_run */]: 0,
    [46 /* dwarf_opponent_attack */]: 0,
    [47 /* dwarf_opponent_death */]: 0,
    [48 /* dwarf_opponent_move */]: 0,
    [24 /* golem_opponent_idle */]: 0,
    [25 /* golem_opponent_run */]: 0,
    [26 /* golem_opponent_attack */]: 0,
    [27 /* golem_opponent_death */]: 0,
    [28 /* golem_opponent_move */]: 0,
    [29 /* king_opponent_idle */]: 0,
    [30 /* king_opponent_run */]: 0,
    [31 /* king_opponent_attack */]: 0,
    [32 /* king_opponent_death */]: 0,
    [33 /* king_opponent_move */]: 0,
    [34 /* witch_opponent_idle */]: 0,
    [35 /* witch_opponent_run */]: 0,
    [36 /* witch_opponent_attack */]: 0,
    [37 /* witch_opponent_death */]: 0,
    [38 /* witch_opponent_move */]: 0,
    [49 /* camera_left_to_right */]: 0,
    [50 /* camera_right_to_left */]: 0,
    [51 /* character_left_to_right_move */]: 0,
    [52 /* hero_sword_slash */]: 0,
    [53 /* hero_transformation_pre_run */]: 0,
    [54 /* hero_transformation_run */]: 0,
    [55 /* hero_transformation_hurt */]: 0,
    [56 /* hero_transformation_attack */]: 0,
    [57 /* boss_idle */]: 0,
    [58 /* boss_attack */]: 0,
    [59 /* lightning */]: 0
  };
  var AnimationRequest = class {
    constructor(animation, callBack) {
      this.animation = animation;
      this.callBack = callBack;
    }
  };
  var APP_ELEMENTS_ANIMATION_QUEUE = {
    hero: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        1 /* hero_run */,
        5 /* hero_walk_left */,
        4 /* hero_walk_right */,
        1 /* hero_run */,
        0 /* hero_attack */,
        6 /* hero_hurt */,
        7 /* hero_death */,
        10 /* hero_special_attack */,
        11 /* stop */,
        12 /* stop_time */,
        55 /* hero_transformation_hurt */,
        53 /* hero_transformation_pre_run */,
        54 /* hero_transformation_run */,
        56 /* hero_transformation_attack */,
        8 /* hero_idle */
      ]
    },
    enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        16 /* ghost_opponent_attack */,
        15 /* ghost_opponent_run */,
        17 /* ghost_opponent_death */,
        18 /* ghost_opponent_move */
      ]
    },
    red_hammer_enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        19 /* hammer_opponent_idle */,
        20 /* hammer_opponent_run */,
        21 /* hammer_opponent_attack */,
        22 /* hammer_opponent_death */
      ]
    },
    orc_enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        39 /* orc_opponent_idle */,
        40 /* orc_opponent_run */,
        41 /* orc_opponent_attack */,
        42 /* orc_opponent_death */
      ]
    },
    dwarf_enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        44 /* dwarf_opponent_idle */,
        45 /* dwarf_opponent_run */,
        46 /* dwarf_opponent_attack */,
        47 /* dwarf_opponent_death */
      ]
    },
    golem_enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        24 /* golem_opponent_idle */,
        25 /* golem_opponent_run */,
        26 /* golem_opponent_attack */,
        27 /* golem_opponent_death */
      ]
    },
    king_enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        29 /* king_opponent_idle */,
        30 /* king_opponent_run */,
        31 /* king_opponent_attack */,
        32 /* king_opponent_death */
      ]
    },
    witch_enemy: {
      request_queue: [],
      current_animation: null,
      associated_animations: [
        34 /* witch_opponent_idle */,
        36 /* witch_opponent_attack */,
        35 /* witch_opponent_run */,
        37 /* witch_opponent_death */
      ]
    }
  };
  var getAppIdByAnimationId = (animationId) => {
    for (const appId in APP_ELEMENTS_ANIMATION_QUEUE) {
      if (APP_ELEMENTS_ANIMATION_QUEUE.hasOwnProperty(appId)) {
        const element = APP_ELEMENTS_ANIMATION_QUEUE[appId];
        if (element.associated_animations.includes(animationId)) {
          return appId;
        }
      }
    }
    return false;
  };
  var fullScreen = false;
  var timeManipulationToggle = () => {
    if (!fullScreen) {
      document.getElementsByTagName("body")[0].requestFullscreen();
      fullScreen = true;
    }
    if (!gameLaunched || window.innerWidth > 1e3 || !hardMode) return;
    if (runStopped) {
      resumeRun();
    } else {
      stopRun();
    }
  };
  var MapSet = class {
    constructor(imagePath, velocity, zIndex, lastSet) {
      this.imagePath = imagePath;
      this.velocity = velocity;
      this.maps = [lastSet && gameMode === 0 /* discovery */ ? createElementMapBlockCenter(0, imagePath, zIndex) : createMapBlock(0, imagePath, zIndex)];
    }
  };
  var lastElementUpdated = null;
  var getElementIndexFromId = (elementId) => {
    const elements = store.getState().persistedMap.elements;
    for (let i = 0; i < elements.length; i++) {
      const loopedOnElement = elements[i];
      console.log(loopedOnElement);
      if (loopedOnElement.id === elementId) {
        return i;
      }
    }
    return null;
  };
  var checkForCurrentMapElementUpdate = () => {
    const heroLeft = getHeroLeft();
    const mapElementsOnScreen = store.getState().persistedMap.elementsOnScreen;
    mapElementsOnScreen.forEach(
      (element) => {
        const elementId = element.id;
        const foundElement = document.getElementById(`${elementId}`);
        if (foundElement) {
          const foundElementLeft = foundElement.getBoundingClientRect().left;
          if (foundElementLeft > heroLeft && foundElementLeft < heroLeft + window.innerWidth * 0.1 && element !== lastElementUpdated) {
            const elementIndex = getElementIndexFromId(foundElement.id);
            if (elementIndex) {
              store.dispatch(updateCurrentIndex(elementIndex));
            }
            lastElementUpdated = element;
          }
        }
      }
    );
    requestAnimationFrame(checkForCurrentMapElementUpdate);
  };
  var createMapSet = (imagePath, velocity, zIndex = "1", lastSet) => {
    MAP_SETS.push(new MapSet(imagePath, velocity, zIndex, lastSet));
  };
  var createElementMapBlockCenter = (left, imagePath, zIndex) => {
    const currentIndex = store.getState().persistedMap.currentIndex;
    store.dispatch(addElementOnScreen(currentIndex));
    const element = store.getState().persistedMap.elements[currentIndex];
    const elementDiv = createMapElement(element);
    return createMapBlock(0, imagePath, zIndex, elementDiv);
  };
  var createMapElement = (element) => {
    return element.type === "form" ? createFormElement(element) : createChallengPilar(element);
  };
  var createElementMapBlockStart = (left, imagePath, zIndex) => {
    store.dispatch(decreaseStartIndex());
    const startIndex = store.getState().persistedMap.startIndex;
    store.dispatch(addElementOnScreen(startIndex));
    const element = store.getState().persistedMap.elements[startIndex];
    const elementDiv = createMapElement(element);
    return createMapBlock(left, imagePath, zIndex, elementDiv);
  };
  var createElementMapBlockEnd = (left, imagePath, zIndex) => {
    store.dispatch(increaseEndIndex());
    const endIndex = store.getState().persistedMap.endIndex;
    store.dispatch(addElementOnScreen(endIndex));
    const element = store.getState().persistedMap.elements[endIndex];
    const elementDiv = createMapElement(element);
    return createMapBlock(left, imagePath, zIndex, elementDiv);
  };
  var lastBlockId = 0;
  var createMapBlock = (left, imagePath, zIndex = "1", element) => {
    lastBlockId++;
    const block = document.createElement("div");
    block.classList.add("mapBlock");
    block.style.zIndex = zIndex;
    const backgroundImage = document.createElement("img");
    backgroundImage.src = imagePath;
    block.append(backgroundImage);
    block.style.position = "absolute";
    block.style.left = `${left}px`;
    block.onclick = (event) => timeManipulationToggle();
    block.id = `${lastBlockId}`;
    document.getElementsByTagName("body")[0].append(block);
    if (element) {
      block.append(element);
    }
    return block;
  };
  var moveCamera = (direction, previousFrameTimestamp, mapSetIndex, cameraSpeed) => {
    const cameraAnimation = direction === 0 /* LEFT_TO_RIGHT */ ? 49 /* camera_left_to_right */ : 50 /* camera_right_to_left */;
    if (ANIMATION_RUNNING_VALUES[cameraAnimation] === 0 || ANIMATION_RUNNING_VALUES[cameraAnimation] > 1) {
      return;
    }
    const currentFrameTimeStamp = Date.now();
    const diff = currentFrameTimeStamp - previousFrameTimestamp;
    const mapSet = MAP_SETS[mapSetIndex];
    let multiplicator = mapSetIndex * 6;
    mapSet.maps.forEach(
      (map) => map.style.left = `${map.getBoundingClientRect().left + Math.floor((direction === 0 /* LEFT_TO_RIGHT */ ? -1 : 1) * cameraSpeed * multiplicator * diff * (mapSet.velocity / (heroRunning ? 400 : 500)) * (superSpeedOn ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 0.8)) / 3}px`
    );
    requestAnimationFrame(() => moveCamera(direction, currentFrameTimeStamp, mapSetIndex, cameraSpeed));
  };
  var ALGEBRA_INTRO_2 = {
    title: "Algebra Basics",
    good: [
      new Answer("A variable is a symbol for an unknown value", true),
      new Answer("The graph of a quadratic function is a parabola", true),
      new Answer("A constant is a number that doesn\u2019t change", true),
      new Answer("A coefficient is a number multiplying a variable", true),
      new Answer("An equation shows two expressions are equal", true),
      new Answer("A term is a part of an expression separated by + or -", true),
      new Answer("Like terms have the same variable and power", true),
      new Answer("A polynomial is made of terms combined by + or -", true),
      new Answer("A monomial has one term", true),
      new Answer("A binomial has two terms", true),
      new Answer("A trinomial has three terms", true),
      new Answer("The degree of a polynomial is the highest exponent", true),
      new Answer("Factoring is rewriting an expression as products", true),
      new Answer("Linear equations have the form ax + b = c", true),
      new Answer("A function relates each input to one output", true),
      new Answer("Quadratic equations have the form ax^2 + bx + c = 0", true),
      new Answer("Distributive property: a(b + c) = ab + ac", true),
      new Answer("The zero-product property: if ab = 0, then a = 0 or b = 0", true),
      new Answer("An inequality compares two expressions", true),
      new Answer("An exponent tells how many times to multiply a number by itself", true),
      new Answer("A solution is a value that makes an equation true", true),
      new Answer("A system of equations has more than one equation", true),
      new Answer("The slope of a line is rise over run", true),
      new Answer("Parallel lines have the same slope", true)
    ],
    bad: [
      new Answer("A variable is a constant number", false),
      new Answer("The graph of a linear expression is V shaped", false),
      new Answer("A constant can change", false),
      new Answer("A coefficient divides a variable", false),
      new Answer("An equation only has one side", false),
      new Answer("A term has to include two variables", false),
      new Answer("Like terms have different variables", false),
      new Answer("A polynomial has only one term", false),
      new Answer("A monomial has two terms", false),
      new Answer("A binomial has three terms", false),
      new Answer("A trinomial has four terms", false),
      new Answer("The degree of a polynomial is the number of terms", false),
      new Answer("Factoring adds terms together", false),
      new Answer("Linear equations always have a squared variable", false),
      new Answer("A function can have multiple outputs for one input", false),
      new Answer("Quadratic equations have no exponents", false),
      new Answer("Distributive property is about dividing terms", false),
      new Answer("Zero-product property applies to addition", false),
      new Answer("An inequality always has an equal sign", false),
      new Answer("An exponent decreases a number", false),
      new Answer("A solution is any random number", false),
      new Answer("A system of equations only has one equation", false),
      new Answer("The slope of a line is horizontal distance", false),
      new Answer("Parallel lines intersect at one point", false)
    ]
  };
  var launchAnimationAndDeclareItLaunched = (gameElement, throttleNum, extension, spriteBase, spriteIndex, max, min, loop, animationId, endOfAnimationCallback) => {
    if (ANIMATION_RUNNING_VALUES[animationId] >= 1) {
      return;
    }
    ANIMATION_RUNNING_VALUES[animationId]++;
    const animationCallback = () => {
      launchCharacterAnimation(
        gameElement,
        throttleNum,
        extension,
        spriteBase,
        spriteIndex,
        max,
        min,
        loop,
        animationId
      );
    };
    const elementAssociatedWithThisAnimation = getAppIdByAnimationId(animationId);
    if (elementAssociatedWithThisAnimation) {
      const animationRequestCallback = () => {
        if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation) {
          requestAnimationFrame(animationRequestCallback);
          return;
        }
        APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation = animationId;
        animationCallback();
      };
      if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation) {
        APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].request_queue.unshift(
          new AnimationRequest(animationId, animationRequestCallback)
        );
        return;
      }
      APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation = animationId;
    }
    animationCallback();
  };
  var launchCharacterAnimation = (characterElement, throttleNum, extension, spriteBase, spriteIndex, max, min, loop, animationId, endOfAnimationCallback, lastExecutionTimeStamp) => {
    if (gameFinished) {
      return;
    }
    if (!ANIMATION_RUNNING_VALUES[animationId] || ANIMATION_RUNNING_VALUES[animationId] > 1) {
      return;
    }
    const elementAssociatedWithThisAnimation = getAppIdByAnimationId(animationId);
    if (elementAssociatedWithThisAnimation) {
      if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation !== animationId) {
        return;
      }
      const requestQueue = APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].request_queue;
      if (requestQueue.length) {
        APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation].current_animation = null;
        initAnimation(animationId);
        const firstQueueElement = requestQueue.pop();
        firstQueueElement == null ? void 0 : firstQueueElement.callBack();
      }
    }
    const newExecutionTimeStamp = Date.now();
    if ((animationId === 1 /* hero_run */ || animationId === 5 /* hero_walk_left */ || animationId === 4 /* hero_walk_right */ || animationId === 8 /* hero_idle */ || animationId === 10 /* hero_special_attack */ || animationId === 9 /* hero_second_idle */ || animationId === 59 /* lightning */ || animationId === 19 /* hammer_opponent_idle */ || animationId === 22 /* hammer_opponent_death */ || animationId === 37 /* witch_opponent_death */ || animationId === 21 /* hammer_opponent_attack */ || animationId === 39 /* orc_opponent_idle */ || animationId === 41 /* orc_opponent_attack */ || animationId === 44 /* dwarf_opponent_idle */ || animationId === 46 /* dwarf_opponent_attack */ || animationId === 24 /* golem_opponent_idle */ || animationId === 26 /* golem_opponent_attack */ || animationId === 27 /* golem_opponent_death */ || animationId === 29 /* king_opponent_idle */ || animationId === 31 /* king_opponent_attack */ || animationId === 34 /* witch_opponent_idle */ || animationId === 36 /* witch_opponent_attack */) && lastExecutionTimeStamp) {
      const diff = newExecutionTimeStamp - lastExecutionTimeStamp;
      const minimumTimeInMsBetweenFrames = animationId === 1 /* hero_run */ && superSpeedOn ? ANIMATION_HERO_RUN_SUPER_SPEED_DURATION_BETWEEN_FRAMES_IN_MS : animationId === 5 /* hero_walk_left */ ? 150 : animationId === 59 /* lightning */ ? 125 : animationId === 4 /* hero_walk_right */ ? 150 : animationId === 8 /* hero_idle */ ? 225 : animationId === 10 /* hero_special_attack */ ? 30 : animationId === 9 /* hero_second_idle */ ? 400 : animationId === 22 /* hammer_opponent_death */ ? 60 : animationId === 27 /* golem_opponent_death */ ? 80 : animationId === 37 /* witch_opponent_death */ ? 60 : animationId === 19 /* hammer_opponent_idle */ ? 115 : animationId === 39 /* orc_opponent_idle */ ? 80 : animationId === 24 /* golem_opponent_idle */ ? 150 : animationId === 34 /* witch_opponent_idle */ ? 90 : animationId === 36 /* witch_opponent_attack */ ? 120 : animationId === 29 /* king_opponent_idle */ ? 115 : animationId === 31 /* king_opponent_attack */ ? 50 : animationId === 44 /* dwarf_opponent_idle */ ? 80 : animationId === 21 /* hammer_opponent_attack */ ? 100 : ANIMATION_HERO_RUN_DURATION_BETWEEN_FRAMES_IN_MS;
      if (diff < minimumTimeInMsBetweenFrames) {
        return requestAnimationFrame(
          () => launchCharacterAnimation(
            characterElement,
            throttleNum,
            extension,
            spriteBase,
            spriteIndex,
            max,
            min,
            loop,
            animationId,
            () => {
            },
            lastExecutionTimeStamp
          )
        );
      }
    }
    throttleNum = 0;
    if (spriteIndex === max) {
      if (loop === false) {
        ANIMATION_RUNNING_VALUES[animationId] = 0;
        const elementAssociatedWithThisAnimation2 = getAppIdByAnimationId(animationId);
        if (elementAssociatedWithThisAnimation2) {
          if (APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation2].current_animation !== animationId) {
            return;
          }
          APP_ELEMENTS_ANIMATION_QUEUE[elementAssociatedWithThisAnimation2].current_animation = null;
        }
        if (endOfAnimationCallback) {
          endOfAnimationCallback();
        }
        return;
      }
      spriteIndex = min;
    } else {
      spriteIndex++;
    }
    if (!characterElement) {
      return;
    }
    characterElement.src = `${spriteBase}/${spriteIndex}.${extension}`;
    requestAnimationFrame(
      () => launchCharacterAnimation(
        characterElement,
        throttleNum,
        extension,
        spriteBase,
        spriteIndex,
        max,
        min,
        loop,
        animationId,
        () => {
        },
        newExecutionTimeStamp
      )
    );
  };
  var initAnimation = (animationId) => {
    ANIMATION_RUNNING_VALUES[animationId] = 0;
  };
  var initAllAnimations = () => {
    ANIMATION_RUNNING_VALUES[0 /* hero_attack */] = 0;
    ANIMATION_RUNNING_VALUES[1 /* hero_run */] = 0;
    ANIMATION_RUNNING_VALUES[7 /* hero_death */] = 0;
    ANIMATION_RUNNING_VALUES[6 /* hero_hurt */] = 0;
    ANIMATION_RUNNING_VALUES[8 /* hero_idle */] = 0;
    ANIMATION_RUNNING_VALUES[15 /* ghost_opponent_run */] = 0;
    ANIMATION_RUNNING_VALUES[17 /* ghost_opponent_death */] = 0;
    ANIMATION_RUNNING_VALUES[18 /* ghost_opponent_move */] = 0;
    ANIMATION_RUNNING_VALUES[49 /* camera_left_to_right */] = 0;
    ANIMATION_RUNNING_VALUES[50 /* camera_right_to_left */] = 0;
    ANIMATION_RUNNING_VALUES[51 /* character_left_to_right_move */] = 0;
    ANIMATION_RUNNING_VALUES[53 /* hero_transformation_pre_run */] = 0;
    ANIMATION_RUNNING_VALUES[54 /* hero_transformation_run */] = 0;
    ANIMATION_RUNNING_VALUES[55 /* hero_transformation_hurt */] = 0;
    ANIMATION_RUNNING_VALUES[57 /* boss_idle */] = 0;
    ANIMATION_RUNNING_VALUES[58 /* boss_attack */] = 0;
  };
  var turnHeroTransformationOff = () => {
    transformed = false;
    runAudio.playbackRate = 1;
    transformationOffAudio.play();
    progressBar.style.display = "flex";
    transformedEpicAudio.pause();
    transformedEpicAudio.currentTime = 0;
    electricityAudio.currentTime = 0;
    epicAudio.currentTime = 0;
    setTimeout(() => {
      electricityAudio.volume = 0;
    }, 1e3);
    setTimeout(() => {
      epicAudio.play();
    }, 4e3);
    launchHeroRunAnimation();
  };
  var launchAttack = (special = false) => {
    if (invisible || !heroIsAlive || runStopped) {
      return;
    }
    if (transformed) {
      laserdAudio.play();
      laserdAudio.currentTime = 0;
    } else if (!special) {
      swordAudio.play();
      swordAudio.currentTime = 0;
    }
    if (!special) {
      launchSwordSlash();
      launchAnimation(heroCharacter, 0 /* attack */, false);
    } else {
      launchAnimation(heroCharacter, 1 /* specialAttack */, false);
      specialMoveIndicator.style.display = "none";
      lightningImg.style.opacity = "0.6";
      setTimeout(
        () => {
          lightningImg.style.opacity = "1";
        },
        660
      );
    }
    const enemyCanBeHit = (enemy) => {
      const enemyContainer = enemy.character.element.parentElement;
      const enemyLeft = hardMode ? getHardModeEnemyRealLeft(enemy) * 1.2 : enemyContainer.getBoundingClientRect().left;
      return enemyLeft > getHeroLeft() && enemyLeft < getHeroLeft() + swordReach;
    };
    ennemiesOnScreen.forEach((enemy) => {
      if (!enemyCanBeHit(enemy)) {
        return;
      }
      if (!enemy.answer.true) {
        killWrongEnemy(enemy);
      } else {
        killRightEnemyAndUpdateScore(enemy);
      }
    });
    if (preTransformed || !heroIsAlive) {
      return;
    }
    clearTimeoutAndLaunchNewOne(
      0 /* HERO */,
      setTimeout(() => {
        launchHeroRunAnimation();
      }, special ? 660 : 350)
    );
  };
  window.tryAgain = tryAgain;
  window.launchAttack = (event) => {
    if (!gameLaunched) {
      launchGame();
      return;
    }
    launchAttack();
  };
  var clearTimeoutAndLaunchNewOne = (timeoutId, timeout) => {
    GAME_TIMEOUTS[timeoutId].forEach((gameTimout) => clearTimeout(gameTimout));
    GAME_TIMEOUTS[timeoutId] = [timeout];
  };
  var interruptOpponentRun = (enemy) => {
    interruptAnimation(getCharacterAnimationAccordingToType(enemy.character, 10 /* idle */).id);
  };
  var launchOpponent = (enemy) => {
    APP_ELEMENTS_ANIMATION_QUEUE.enemy.current_animation = null;
    interruptOpponentRun(enemy);
    const enemyMovementAnimation = getCharacterAnimationAccordingToType(enemy.character, 12 /* movement */);
    ANIMATION_RUNNING_VALUES[enemyMovementAnimation.id]++;
    launchAnimation(enemy.character, 10 /* idle */);
    moveEnemy(enemy, 0, Date.now());
  };
  var currentHeroDirection = 0 /* LEFT_TO_RIGHT */;
  var heroMoving = false;
  var moveEnemy = (enemy, throttleNum = 0, previousTimeStamp) => {
    const enemyAnimation = getCharacterAnimationAccordingToType(enemy.character, 12 /* movement */);
    if (ANIMATION_RUNNING_VALUES[enemyAnimation.id] !== 1) {
      return;
    }
    const currentTimeStamp = Date.now();
    const diff = currentTimeStamp - previousTimeStamp;
    let hardEnemyMoveRatio = 1;
    throttleNum = 0;
    const enemyContainer = enemy.character.element.parentElement;
    enemyContainer.style.left = `${Math.round(
      enemyContainer.getBoundingClientRect().left - diff * (hardMode ? 0.45 * hardEnemyMoveRatio : 1.5) * (superSpeedOn ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1)
    )}px`;
    if (hardMode) {
      enemyViewPoint.style.left = `${Math.round(
        enemyViewPoint.getBoundingClientRect().left - diff * (hardMode ? 0.45 : 1) * (superSpeedOn ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1)
      )}px`;
    }
    requestAnimationFrame(() => moveEnemy(enemy, throttleNum, currentTimeStamp));
  };
  var transformIfRequired = () => {
    if (rewardStreak >= TRANSFORMATION_THRESHOLD && !transformed) {
      rewardStreak = 0;
      updateTransformationProgressBarDisplay();
      if (hardMode) {
        launchTransformation();
      }
    }
  };
  var killRightEnemyAndUpdateScore = (enemy) => {
    killEnemy(enemy);
    rewardHero();
    transformIfRequired();
  };
  var rewardHero = () => {
    const bonus_ratio = transformed ? TRANSFORMED_BONUS_RATIO : 1;
    store.dispatch(setFoundAtIndex({ index: store.getState().challenge.currentAnswerIndex - 1, found: true }));
    if (!transformed) {
      rewardStreak++;
      updateTransformationProgressBarDisplay();
      if (rewardStreak === 5 || rewardStreak === 10) {
        specialMoveIndicator.style.display = "flex";
      }
    }
    score += bonus_ratio * REWARD_UNIT;
    updateScoreDisplay();
    displayReward("Congrats! You destroyed a good answer!");
    if (transformed) {
      displayTransformationKillReward(
        `Transformation bonus reward! X${TRANSFORMED_BONUS_RATIO}`
      );
    }
  };
  var updateScoreDisplay = () => {
    const grade = getChallengeGrade();
    if (grade) {
      scoreValue.innerHTML = grade;
    }
  };
  var killWrongEnemy = (enemy) => {
    scoreMalusContainer.style.display = "flex";
    store.dispatch(setFoundAtIndex({ index: store.getState().challenge.currentAnswerIndex - 1, found: false }));
    lifePoints.value--;
    checkForHerosDeath();
    updateLifePointsDisplay();
    rewardStreak = 0;
    specialMoveIndicator.style.display = "none";
    updateTransformationProgressBarDisplay();
    killEnemy(enemy);
    displayMalus("MALUS! Wrong enemy killed!");
  };
  var displayMalus = (content) => {
    if (currentMalusContainerTimeout) {
      clearTimeout(currentMalusContainerTimeout);
      currentMalusContainerTimeout = null;
    }
    scoreMalusContainer.style.display = "flex";
    currentMalusContainerTimeout = setTimeout(() => {
      scoreMalusDetail.innerHTML = "";
      scoreMalusContainer.style.display = "none";
    }, 2e3);
  };
  var hideMalus = () => {
    hideReward();
    if (currentMalusContainerTimeout) {
      clearTimeout(currentMalusContainerTimeout);
      currentMalusContainerTimeout = null;
    }
    scoreMalusDetail.innerHTML = "";
    scoreMalusContainer.style.display = "none";
  };
  var displayReward = (content) => {
    hideMalus();
    if (currentRewardContainerTimeout) {
      clearTimeout(currentRewardContainerTimeout);
      currentRewardContainerTimeout = null;
    }
    scoreRewardContainer.style.display = "flex";
    displaySoundEffectImage();
    currentRewardContainerTimeout = setTimeout(() => {
      scoreRewardDetail.innerHTML = "";
      scoreRewardContainer.style.display = "none";
    }, 2e3);
  };
  var displayTransformationKillReward = (content) => {
    const transformationRewardContainer = document.getElementById(
      "transformed_hero_bonus_reward_container"
    );
    transformationRewardContainer.style.display = "flex";
    if (currentTransformationRewardContainerTimeout) {
      clearTimeout(currentTransformationRewardContainerTimeout);
      currentTransformationRewardContainerTimeout = null;
    }
    currentRewardContainerTimeout = setTimeout(() => {
      transformationRewardContainer.style.display = "none";
    }, REWARD_TIMEOUT_DURATION);
  };
  var hideReward = () => {
  };
  var killEnemy = (enemy) => {
    const launchExplosion = () => {
      bombAudio.play();
      bombAudio.currentTime = 0;
      const deathAnimation = getCharacterAnimationAccordingToType(enemy.character, 9 /* death */);
      launchAnimationAndDeclareItLaunched(
        enemy.character.element,
        0,
        "png",
        deathAnimation.sprite.path,
        1,
        deathAnimation.sprite.length,
        1,
        false,
        deathAnimation.id
      );
    };
    launchExplosion();
    destroyEnemyAndLaunchNewOne(enemy);
  };
  var getHardModeEnemyRealLeft = (enemy) => {
    const enemyContainer = enemy.character.element.parentElement;
    if (!enemyContainer) {
      console.log("sorry, we did not find the html container of your enemy");
      return;
    }
    return enemyContainer.getBoundingClientRect().left + enemyContainer.getBoundingClientRect().width * 0.3;
  };
  var clearEnemy = (enemy) => {
    interruptAnimation(15 /* ghost_opponent_run */);
    interruptAnimation(16 /* ghost_opponent_attack */);
    destroyEnemy(enemy, false);
  };
  var destroyEnemy = (enemy, delay = true) => {
    clearAndHideAnswerDataContainer();
    heroInTheRedZone = false;
    resetViewPoint();
    const enemyDestructionAndRevivalCallback = () => {
      enemy.character.element.remove();
      if (!preTransformed) {
        triggerOpponentsApparition();
      }
    };
    if (delay) {
      setTimeout(enemyDestructionAndRevivalCallback, Math.random() > 0.4 ? 2500 : 2500);
    } else {
      enemyDestructionAndRevivalCallback();
    }
    ennemiesOnScreen.forEach((enemyOnScreen, index) => {
      if (enemy === enemyOnScreen) {
        ennemiesOnScreen.splice(index, 1);
      }
    });
  };
  var destroyEnemyAndLaunchNewOne = (enemy) => {
    destroyEnemy(enemy);
  };
  var hurtHero = () => {
    if (!heroIsAlive) {
      return;
    }
    runAudio.volume = 0;
    rewardStreak = 0;
    updateTransformationProgressBarDisplay();
    heroHurt = true;
    lifePoints.value--;
    checkForHerosDeath();
    hurtAudio.currentTime = 0;
    updateLifePointsDisplay();
    launchHeroHurtAnimation();
    displayMalus("Malus! You were hurt!");
  };
  var checkForHerosDeath = () => {
    if (lifePoints.value === 0) {
      killHero();
    }
  };
  var killHero = () => {
    runAudio.volume = 0;
    heroIsAlive = false;
    launchDeathAnimation();
  };
  var viewPointOnScreen = false;
  var enemyViewPointThresholdCrossed = false;
  var detectCollision = () => {
    ennemiesOnScreen.forEach((enemyOnScreen) => {
      const enemyContainer = enemyOnScreen.character.element.parentElement;
      const enemyLeft = hardMode ? getHardModeEnemyRealLeft(enemyOnScreen) : enemyContainer.getBoundingClientRect().left;
      if (hardMode && !viewPointOnScreen && enemyLeft < window.innerWidth) {
        viewPointOnScreen = true;
        enemyViewPoint.style.display = "flex";
      }
      if (hardMode && !heroInTheRedZone && enemyViewPoint.getBoundingClientRect().left + enemyViewPoint.getBoundingClientRect().width < getHeroLeft()) {
        heroInTheRedZone = true;
        updateEnemyViewPointDisplay();
        launchAnimation(enemyOnScreen.character, 0 /* attack */);
      }
      if (hardMode && !enemyViewPointThresholdCrossed && enemyLeft < window.innerWidth) {
        enemyViewPointThresholdCrossed = true;
      }
      if (getHeroLeft() > enemyLeft && enemyOnScreen.collideable) {
        enemyOnScreen.collideable = false;
        if (!invisible || enemyOnScreen.answer.good) {
          hurtHero();
        } else if (invisible && !enemyOnScreen.answer.good) {
          rewardHero();
          transformIfRequired();
        }
      }
    });
    requestAnimationFrame(detectCollision);
  };
  var checkForScreenUpdateFromLeftToRight = (throttleNum) => {
    MAP_SETS.forEach(
      (mapSet, index) => {
        const firstMapDomElement = mapSet.maps[0];
        if (firstMapDomElement.getBoundingClientRect().left < -window.innerWidth) {
          if (index === 4 && gameMode === 0 /* discovery */) {
            store.dispatch(removeElementFromElementsOnScreen(store.getState().persistedMap.startIndex));
            store.dispatch(increaseStartIndex());
          }
          firstMapDomElement.remove();
          mapSet.maps.shift();
        }
        const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];
        const endIndex = store.getState().persistedMap.endIndex;
        const elements = store.getState().persistedMap.elements;
        if (lastMapDomElement && lastMapDomElement.getBoundingClientRect().left <= window.innerWidth / 10) {
          if (index === 4) {
            if (gameMode === 0 /* discovery */ && endIndex >= elements.length - 1) {
              interruptAnimation(4 /* hero_walk_right */);
              stopCameraMovingToRight();
              return;
            }
            if (store.getState().unpersistedMapReducer.currentlyFinishingChallenge) {
              store.dispatch(setCurrentlyFinishingChallenge(false));
            }
          }
          ;
          if (index === 4) {
            if (gameMode === 0 /* discovery */) {
              mapSet.maps.push(createElementMapBlockEnd(lastMapDomElement.getBoundingClientRect().left + lastMapDomElement.getBoundingClientRect().width - 10, mapSet.imagePath, `${index}`));
            } else {
              mapSet.maps.push(store.getState().unpersistedMapReducer.currentlyFinishingChallenge ? createEndOfChallengeMapBlock(lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10, mapSet.imagePath, `${index}`) : createMapBlock(
                lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10,
                mapSet.imagePath,
                `${index}`
              ));
            }
          } else {
            mapSet.maps.push(createMapBlock(
              lastMapDomElement.offsetLeft + lastMapDomElement.offsetWidth - 10,
              mapSet.imagePath,
              `${index}`
            ));
          }
        }
      }
    );
    requestAnimationFrame(() => checkForScreenUpdateFromLeftToRight(throttleNum));
  };
  var buildEndOfChallengeElement = () => {
    const endOfChallengeContainer2 = document.createElement("div");
    endOfChallengeContainer2.style.position = "absolute";
    endOfChallengeContainer2.style.zIndex = "1500";
    endOfChallengeContainer2.style.left = "40vw";
    endOfChallengeContainer2.style.top = "30vh";
    endOfChallengeContainer2.style.height = "30vh";
    endOfChallengeContainer2.style.width = "40vw";
    endOfChallengeContainer2.style.background = "blue";
    return endOfChallengeContainer2;
  };
  var createEndOfChallengeMapBlock = (left, imagePath, zIndex) => {
    alert("creating end of chal block");
    store.dispatch(setCurrentlyFinishingChallenge(false));
    const endOfChallengeElement = buildEndOfChallengeElement();
    return createMapBlock(left, imagePath, zIndex, endOfChallengeElement);
  };
  var checkForScreenUpdateFromRightToLeft = (throttleNum) => {
    if (gameMode === 1 /* challenge */) {
      return;
    }
    MAP_SETS.forEach(
      (mapSet, index) => {
        const startIndex = store.getState().persistedMap.startIndex;
        const firstMapDomElement = mapSet.maps[0];
        if (firstMapDomElement.getBoundingClientRect().left > 0 && firstMapDomElement.getBoundingClientRect().left <= window.innerWidth * 0.05) {
          if (index === 4 && gameMode === 0 /* discovery */) {
            if (startIndex === 0) {
              interruptAnimation(5 /* hero_walk_left */);
              stopCameraMovingToLeft();
              return;
            }
          }
          mapSet.maps.unshift(
            index === 4 && gameMode === 0 /* discovery */ ? createElementMapBlockStart(firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth, mapSet.imagePath, `${index}`) : createMapBlock(
              firstMapDomElement.offsetLeft - firstMapDomElement.offsetWidth,
              mapSet.imagePath,
              `${index}`
            )
          );
        }
        const lastMapDomElement = mapSet.maps[mapSet.maps.length - 1];
        if (lastMapDomElement && lastMapDomElement.getBoundingClientRect().left > window.innerWidth * 1.5) {
          if (index === 4 && gameMode === 0 /* discovery */) {
            store.dispatch(decreaseEndIndex());
          }
          lastMapDomElement.remove();
          mapSet.maps.pop();
        }
      }
    );
    requestAnimationFrame(() => checkForScreenUpdateFromRightToLeft(throttleNum));
  };
  var getCharacterAnimationAccordingToType = (character, animationType) => {
    for (let i = 0; i < character.animations.length; i++) {
      const characterAnimation = character.animations[i];
      if (characterAnimation.animationType !== animationType) {
        continue;
      }
      for (let animationBlockIndex = 0; animationBlockIndex < characterAnimation.animationsStatesBlocks.length; animationBlockIndex++) {
        const animationBlock = characterAnimation.animationsStatesBlocks[animationBlockIndex];
        for (let animationBlockStateIndex = 0; animationBlockStateIndex < animationBlock.states.length; animationBlockStateIndex++) {
          const animationStateBlock = animationBlock.states[animationBlockStateIndex];
          if (animationStateBlock === character.state) {
            return animationBlock.animation;
          }
        }
      }
    }
    return null;
  };
  var launchAnimation = (character, animationType, loop = true) => {
    const characterAnimation = getCharacterAnimationAccordingToType(character, animationType);
    if (!characterAnimation) {
      console.log("sorry, we could not find the path associated with the current character state");
      return;
    }
    launchAnimationAndDeclareItLaunched(
      character.element,
      0,
      "png",
      characterAnimation.sprite.path,
      1,
      characterAnimation.sprite.length,
      1,
      loop,
      characterAnimation.id
    );
  };
  var launchHeroWalkAnimation = (direction) => {
    if (!heroIsAlive) {
      return;
    }
    runAudio.volume = 0.7;
    launchAnimation(heroCharacter, direction === 5 /* hero_walk_left */ ? 7 /* walk_left */ : 3 /* run_right */);
  };
  var launchHeroRunAnimation = (direction = 0 /* LEFT_TO_RIGHT */) => {
    if (!heroIsAlive) {
      return;
    }
    runAudio.volume = 0.7;
    launchAnimation(heroCharacter, direction === 0 /* LEFT_TO_RIGHT */ ? 2 /* run */ : 7 /* walk_left */);
  };
  var DefaultCharacter = class {
    constructor(element, state, animations) {
      this.element = element;
      this.state = state;
      this.animations = animations;
    }
  };
  var ALL_HERO_STATES = [0 /* idle */, 2 /* attacking */, 3 /* dead */, 1 /* running */];
  var ALL_TRANSFORMED_HERO_STATES = [4 /* transformed_idle */, 6 /* transformed_attacking */, 5 /* transformed_running */, 7 /* transformed_dead */];
  var ALL_RED_HAMMER_ENEMY_STATES = [0 /* idle */, 1 /* running */, 2 /* attacking */, 3 /* dead */];
  var ALL_GOLEM_ENEMY_STATES = [0 /* idle */, 1 /* running */, 2 /* attacking */, 3 /* dead */];
  var ALL_WITCH_ENEMY_STATES = [0 /* idle */, 1 /* running */, 2 /* attacking */, 3 /* dead */];
  var heroAnimations = [
    {
      animationType: 10 /* idle */,
      animationsStatesBlocks: [
        {
          states: ALL_TRANSFORMED_HERO_STATES,
          animation: {
            id: 53 /* hero_transformation_pre_run */,
            sprite: {
              path: "assets/challenge/characters/transformed_hero/pre_run",
              length: 9
            }
          }
        },
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 8 /* hero_idle */,
            sprite: {
              path: "assets/challenge/characters/hero/idle",
              length: 7
            }
          }
        }
      ]
    },
    {
      animationType: 0 /* attack */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 0 /* hero_attack */,
            sprite: {
              path: "assets/challenge/characters/hero/attack",
              length: 4
            }
          }
        },
        {
          states: ALL_TRANSFORMED_HERO_STATES,
          animation: {
            id: 56 /* hero_transformation_attack */,
            sprite: {
              path: "assets/challenge/characters/transformed_hero/attack",
              length: 12
            }
          }
        }
      ]
    },
    {
      animationType: 1 /* specialAttack */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 10 /* hero_special_attack */,
            sprite: {
              path: "assets/challenge/characters/hero/flames",
              length: 14
            }
          }
        }
      ]
    },
    {
      animationType: 6 /* walk_right */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 4 /* hero_walk_right */,
            sprite: {
              path: "assets/challenge/characters/hero/walk",
              length: 6
            }
          }
        }
      ]
    },
    {
      animationType: 2 /* run */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 1 /* hero_run */,
            sprite: {
              path: "assets/challenge/characters/hero/run",
              length: 8
            }
          }
        },
        {
          states: ALL_TRANSFORMED_HERO_STATES,
          animation: {
            id: 54 /* hero_transformation_run */,
            sprite: {
              path: "assets/challenge/characters/transformed_hero/run",
              length: 6
            }
          }
        }
      ]
    },
    {
      animationType: 7 /* walk_left */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 5 /* hero_walk_left */,
            sprite: {
              path: "assets/challenge/characters/hero/walk_left",
              length: 6
            }
          }
        },
        {
          states: ALL_TRANSFORMED_HERO_STATES,
          animation: {
            id: 54 /* hero_transformation_run */,
            sprite: {
              path: "assets/challenge/characters/transformed_hero/run",
              length: 6
            }
          }
        }
      ]
    },
    {
      animationType: 4 /* run_left */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 3 /* hero_run_left */,
            sprite: {
              path: "assets/challenge/characters/hero/walk_left",
              length: 6
            }
          }
        },
        {
          states: ALL_TRANSFORMED_HERO_STATES,
          animation: {
            id: 54 /* hero_transformation_run */,
            sprite: {
              path: "assets/challenge/characters/transformed_hero/run",
              length: 6
            }
          }
        }
      ]
    },
    {
      animationType: 11 /* secondIdle */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 9 /* hero_second_idle */,
            sprite: {
              path: "assets/challenge/characters/hero/second_idle",
              length: 6
            }
          }
        }
      ]
    },
    {
      animationType: 9 /* death */,
      animationsStatesBlocks: [
        {
          states: ALL_HERO_STATES,
          animation: {
            id: 7 /* hero_death */,
            sprite: {
              path: "assets/challenge/characters/hero/death",
              length: 6
            }
          }
        }
      ]
    }
  ];
  var redHammerAnimations = [
    {
      animationType: 10 /* idle */,
      animationsStatesBlocks: [
        {
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: {
            id: 19 /* hammer_opponent_idle */,
            sprite: {
              path: "assets/challenge/characters/enemies/hard/idle",
              length: 16
            }
          }
        }
      ]
    },
    {
      animationType: 0 /* attack */,
      animationsStatesBlocks: [
        {
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: {
            id: 21 /* hammer_opponent_attack */,
            sprite: {
              path: "assets/challenge/characters/enemies/hard/attack",
              length: 30
            }
          }
        }
      ]
    },
    {
      animationType: 9 /* death */,
      animationsStatesBlocks: [
        {
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: {
            id: 22 /* hammer_opponent_death */,
            sprite: {
              path: "assets/challenge/characters/enemies/hard/death",
              length: 41
            }
          }
        }
      ]
    },
    {
      animationType: 12 /* movement */,
      animationsStatesBlocks: [
        {
          states: ALL_RED_HAMMER_ENEMY_STATES,
          animation: {
            id: 23 /* hammer_opponent_move */,
            sprite: {
              path: "",
              length: 0
            }
          }
        }
      ]
    }
  ];
  var witchAnimations = [
    {
      animationType: 10 /* idle */,
      animationsStatesBlocks: [
        {
          states: ALL_WITCH_ENEMY_STATES,
          animation: {
            id: 34 /* witch_opponent_idle */,
            sprite: {
              path: "assets/challenge/characters/enemies/witch/idle",
              length: 7
            }
          }
        }
      ]
    },
    {
      animationType: 0 /* attack */,
      animationsStatesBlocks: [
        {
          states: ALL_WITCH_ENEMY_STATES,
          animation: {
            id: 36 /* witch_opponent_attack */,
            sprite: {
              path: "assets/challenge/characters/enemies/witch/attack",
              length: 18
            }
          }
        }
      ]
    },
    {
      animationType: 9 /* death */,
      animationsStatesBlocks: [
        {
          states: ALL_WITCH_ENEMY_STATES,
          animation: {
            id: 37 /* witch_opponent_death */,
            sprite: {
              path: "assets/challenge/characters/enemies/witch/death",
              length: 12
            }
          }
        }
      ]
    },
    {
      animationType: 12 /* movement */,
      animationsStatesBlocks: [
        {
          states: ALL_WITCH_ENEMY_STATES,
          animation: {
            id: 36 /* witch_opponent_attack */,
            sprite: {
              path: "",
              length: 0
            }
          }
        }
      ]
    }
  ];
  var golemAnimations = [
    {
      animationType: 10 /* idle */,
      animationsStatesBlocks: [
        {
          states: ALL_GOLEM_ENEMY_STATES,
          animation: {
            id: 24 /* golem_opponent_idle */,
            sprite: {
              path: "assets/challenge/characters/enemies/golem/idle",
              length: 12
            }
          }
        }
      ]
    },
    {
      animationType: 0 /* attack */,
      animationsStatesBlocks: [
        {
          states: ALL_GOLEM_ENEMY_STATES,
          animation: {
            id: 26 /* golem_opponent_attack */,
            sprite: {
              path: "assets/challenge/characters/enemies/golem/attack",
              length: 16
            }
          }
        }
      ]
    },
    {
      animationType: 9 /* death */,
      animationsStatesBlocks: [
        {
          states: ALL_GOLEM_ENEMY_STATES,
          animation: {
            id: 27 /* golem_opponent_death */,
            sprite: {
              path: "assets/challenge/characters/enemies/golem/death",
              length: 28
            }
          }
        }
      ]
    },
    {
      animationType: 12 /* movement */,
      animationsStatesBlocks: [
        {
          states: ALL_GOLEM_ENEMY_STATES,
          animation: {
            id: 28 /* golem_opponent_move */,
            sprite: {
              path: "",
              length: 0
            }
          }
        }
      ]
    }
  ];
  var heroCharacter = new DefaultCharacter(heroImage, 0 /* idle */, heroAnimations);
  var resetViewPoint = () => {
    enemyViewPoint.style.left = "105vw";
    enemyViewPoint.style.display = "flex";
    updateEnemyViewPointDisplay();
  };
  var createRedHammerCharacter = () => {
    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add("hard_enemy_container");
    const newEnnemyImg = document.createElement("img");
    newEnnemyImg.src = "assets/challenge/characters/enemies/hard/idle/1.png";
    newOpponentContainer.append(newEnnemyImg);
    document.getElementsByTagName("body")[0].append(newOpponentContainer);
    resetViewPoint();
    return new DefaultCharacter(newEnnemyImg, 0 /* idle */, redHammerAnimations);
  };
  var createChallengPilar = (element) => {
    const pilarBackgroundContainer = document.createElement("div");
    pilarBackgroundContainer.style.position = "absolute";
    pilarBackgroundContainer.style.left = "0";
    pilarBackgroundContainer.style.top = "0";
    pilarBackgroundContainer.style.width = "100vw";
    pilarBackgroundContainer.style.height = "100vh";
    pilarBackgroundContainer.style.zIndex = "10";
    pilarBackgroundContainer.style.display = "flex";
    pilarBackgroundContainer.style.justifyContent = "center";
    pilarBackgroundContainer.style.alignItems = "center";
    const pillarcontainer = document.createElement("div");
    pillarcontainer.style.width = "5vw";
    pillarcontainer.style.height = "20vh";
    pillarcontainer.style.background = "grey";
    pillarcontainer.id = `${element.id}`;
    pillarcontainer.style.cursor = "pointer";
    pillarcontainer.onclick = (event) => {
      const response = confirm("voulez vous lancer le challenge?");
      if (response) {
        launchChallenge(element.id);
      }
    };
    pilarBackgroundContainer.append(pillarcontainer);
    return pilarBackgroundContainer;
  };
  var createFormElement = (formElement) => {
    const formBackgroundContainer = document.createElement("div");
    formBackgroundContainer.style.position = "absolute";
    formBackgroundContainer.style.left = "0";
    formBackgroundContainer.style.top = "0";
    formBackgroundContainer.style.width = "100vw";
    formBackgroundContainer.style.height = "100vh";
    formBackgroundContainer.style.zIndex = "10";
    formBackgroundContainer.style.display = "flex";
    formBackgroundContainer.style.justifyContent = "center";
    formBackgroundContainer.style.alignItems = "center";
    const formContainer = document.createElement("div");
    formContainer.style.width = "20vw";
    formContainer.style.height = "20vh";
    formContainer.style.background = "grey";
    formContainer.id = `${formElement.id}`;
    formBackgroundContainer.append(formContainer);
    return formBackgroundContainer;
  };
  var createGolemCharacter = () => {
    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add("hard_enemy_container");
    const newEnnemyImg = document.createElement("img");
    newEnnemyImg.src = "assets/challenge/characters/enemies/golem/idle/1.png";
    newOpponentContainer.append(newEnnemyImg);
    newOpponentContainer.style.bottom = "-4.5vh";
    document.getElementsByTagName("body")[0].append(newOpponentContainer);
    resetViewPoint();
    return new DefaultCharacter(newEnnemyImg, 0 /* idle */, golemAnimations);
  };
  var createWitchCharacter = () => {
    const newOpponentContainer = document.createElement("div");
    newOpponentContainer.classList.add("hard_enemy_container");
    const newEnnemyImg = document.createElement("img");
    newEnnemyImg.src = "assets/challenge/characters/enemies/witch/idle/1.png";
    newOpponentContainer.append(newEnnemyImg);
    newOpponentContainer.style.bottom = "-4vh";
    document.getElementsByTagName("body")[0].append(newOpponentContainer);
    resetViewPoint();
    return new DefaultCharacter(newEnnemyImg, 0 /* idle */, witchAnimations);
  };
  var moveBackground = (direction) => {
    if (ANIMATION_RUNNING_VALUES[direction === 0 /* LEFT_TO_RIGHT */ ? 49 /* camera_left_to_right */ : 50 /* camera_right_to_left */] === 0) {
      startCamera(direction);
      for (let i = 0; i < 5; i++) {
        moveCamera(direction, Date.now(), i, 1);
      }
    }
  };
  var launchHeroWalk = (direction = 0 /* LEFT_TO_RIGHT */) => {
    moveBackground(direction);
    launchHeroWalkAnimation(5 /* hero_walk_left */);
    if (gameMode === 0 /* discovery */) {
      stepsInSwow.play();
    }
  };
  var launchHeroRun = (direction = 0 /* LEFT_TO_RIGHT */) => {
    interuptIdleTimer();
    moveBackground(direction);
    launchHeroRunAnimation(direction);
  };
  var heroInitialTop = heroContainer.getBoundingClientRect().top;
  var superSpeedOn = false;
  var launchHeroWalk2 = (direction) => {
    moveHero(0 /* WALK */, direction);
    moveBackground(direction);
    stepsInSwow.play();
  };
  var moveHero = (type, direction) => {
    launchAnimation(heroCharacter, 6 /* walk_right */);
  };
  var executeSuperSpeedToggle = () => {
    superSpeedOn = !superSpeedOn;
  };
  document.addEventListener("keyup", (event) => {
    if (event.key === "a") {
      const response = confirm("voulez vous interrompre ce challenge?");
      if (response) {
        window.location.replace(window.location.href);
      }
    }
    if (event.key === "Shift") {
      heroRunning = false;
      if (heroMoving) {
        launchAnimation(heroCharacter, currentHeroDirection === 0 /* LEFT_TO_RIGHT */ ? 6 /* walk_right */ : 7 /* walk_left */);
      }
    }
    if (event.key === "d" && gameMode === 0 /* discovery */) {
      heroMoving = false;
      interruptAnimation(4 /* hero_walk_right */);
      stopCameraMovingToRight();
      stepsInSwow.pause();
    }
    if (event.key === "q") {
      heroMoving = false;
      interruptAnimation(5 /* hero_walk_left */);
      stopCameraMovingToLeft();
      if (gameMode === 0 /* discovery */) {
        stepsInSwow.pause();
      }
    }
  });
  var findMapElement = (elementId) => {
    return document.getElementById(`${elementId}`);
  };
  var hideChallengeDisplay = () => {
    lightningImg.style.opacity = "0";
    answerDataContainer.style.opacity = "0";
    scoreContainer.style.opacity = "0";
    topScoreContainer.style.opacity = "0";
  };
  var launchChallenge = (pillarId) => {
    store.getState().persistedMap.elementsOnScreen.forEach(
      (element) => {
        if (element.id !== pillarId) {
          const mapElement = findMapElement(element.id);
          if (!mapElement) {
            return;
          }
          mapElement.remove();
          store.dispatch(removeElementFromElementsOnScreen(parseInt(element.id)));
        }
      }
    );
    setupChallengeDisplay();
    breathAudio.play();
    gameMode = 1 /* challenge */;
    initializeChallengePage(pillarId);
  };
  var setupChallengeDisplay = () => {
    lightningImg.style.opacity = "1";
    answerDataContainer.style.opacity = "1";
    scoreContainer.style.opacity = "1";
    topScoreContainer.style.opacity = "1";
  };
  document.addEventListener("keydown", (event) => {
    if (event.key === "Shift") {
      heroRunning = true;
      if (heroMoving) {
        launchAnimation(heroCharacter, currentHeroDirection === 0 /* LEFT_TO_RIGHT */ ? 6 /* walk_right */ : 7 /* walk_left */);
      }
    }
    if (event.key === "p") {
      checkForScreenUpdateFromLeftToRight(0);
    }
    if (event.key === "r") {
      window.location.replace(window.location.href);
    }
    if (event.key === "d") {
      heroMoving = true;
      if (gameMode === 0 /* discovery */) {
        currentHeroDirection = 0 /* LEFT_TO_RIGHT */;
        launchHeroWalk2(0 /* LEFT_TO_RIGHT */);
        return;
      }
      if (!gameLaunched) {
        launchGame();
      } else if (ANIMATION_RUNNING_VALUES[1 /* hero_run */] === 0) {
        resumeRun();
      }
    }
    if (event.key === "q") {
      if (gameMode === 1 /* challenge */) {
        return;
      }
      heroMoving = true;
      gameLaunched = true;
      currentHeroDirection = 1 /* RIGHT_TO_LEFT */;
      launchHeroWalk(1 /* RIGHT_TO_LEFT */);
    }
    if (!gameLaunched || preTransformed || heroHurt) {
      return;
    }
    if (event.key === " " && !invisible) {
      if (rewardStreak === 5 || rewardStreak === 10) {
        launchHeroLightningSpeedAnimation();
        return;
      }
      launchInvisibilityToggle();
    }
    if (event.key === "m") {
      if (rewardStreak === 5 || rewardStreak === 10) {
        launchAttack(true);
        return;
      }
      launchAttack();
    }
    if (event.key === "y") {
      launchDeathAnimation();
    }
    if (event.key === "s" && hardMode) {
      if (runStopped) return;
      stopRun();
    }
    if (event.key === "z") {
      executeSuperSpeedToggle();
    }
  });
  var clearGameTimeouts = () => {
    GAME_TIMEOUTS[0 /* HERO */].forEach((timeout) => {
      clearTimeout(timeout);
    });
    GAME_TIMEOUTS[0 /* HERO */] = [];
    GAME_TIMEOUTS[1 /* ENEMY */].forEach((timeout) => clearTimeout(timeout));
    GAME_TIMEOUTS[1 /* ENEMY */] = [];
  };
  var stopSuperSpeed = () => {
    superSpeedOn = false;
  };
  var stopRun = (definitiveStop = true) => {
    if (heroInTheRedZone) {
      return;
    }
    const currentTime = Date.now();
    if (lastStopInMs && currentTime - lastStopInMs < 1e3) {
      return;
    }
    runStopped = true;
    if (!definitiveStop) {
      launchIdleTimeout();
    }
    runAudio.pause();
    lastStopInMs = currentTime;
    stopSuperSpeed();
    if (enemiesComingTimeout) {
      clearTimeout(enemiesComingTimeout);
      enemiesComingTimeout = null;
    }
    ennemiesOnScreen.forEach(
      (enemy) => {
        ANIMATION_RUNNING_VALUES[getCharacterAnimationAccordingToType(enemy.character, 12 /* movement */).id] = 0;
      }
    );
    interruptAnimation(49 /* camera_left_to_right */);
    interruptAnimation(50 /* camera_right_to_left */);
    heroImage.src = "assets/challenge/characters/hero/idle/1.png";
    addAnimationCallbackToQueue(11 /* stop */, launchIdleLoop);
  };
  var addAnimationCallbackToQueue = (animation, callBack) => {
    const appElementId = getAppIdByAnimationId(animation);
    if (!appElementId) {
      return;
    }
    APP_ELEMENTS_ANIMATION_QUEUE[appElementId].request_queue.unshift(
      new AnimationRequest(animation, callBack)
    );
  };
  var interruptAnimation = (animation) => {
    ANIMATION_RUNNING_VALUES[animation] = 0;
    const appElementId = getAppIdByAnimationId(animation);
    if (!appElementId) {
      return;
    }
    APP_ELEMENTS_ANIMATION_QUEUE[appElementId].current_animation = null;
  };
  var stopAndResetIdleTimer = () => {
    idleTimeoutContainer.style.display = "none";
    idleTimerValue = 5;
  };
  var resumeRun = () => {
    runStopped = false;
    stopAndResetIdleTimer();
    runAudio.play();
    launchHeroRun();
    ennemiesOnScreen.forEach((enemy) => {
      const enemyMovementAnimation = getCharacterAnimationAccordingToType(enemy.character, 12 /* movement */);
      ANIMATION_RUNNING_VALUES[enemyMovementAnimation.id]++;
      moveEnemy(enemy, 0, Date.now());
    });
    if (!ennemiesOnScreen.length) {
      triggerOpponentsApparition();
    }
  };
  var checkForOpponentsClearance = () => {
    ennemiesOnScreen.forEach((enemyOnScreen) => {
      const enemyLeft = hardMode ? getHardModeEnemyRealLeft(enemyOnScreen) : enemyOnScreen.character.element.getBoundingClientRect().left;
      if (enemyLeft < 0 - window.innerWidth * 0.05) {
        clearEnemy(enemyOnScreen);
      }
    });
    requestAnimationFrame(checkForOpponentsClearance);
  };
  var launchInvisibilityToggleFromDom = () => {
    launchInvisibilityToggle();
  };
  var launchInvisibilityToggle = (superSpeed = false) => {
    invisible = !invisible;
    heroContainer.style.opacity = invisible ? "0.3" : "1";
    heroContainer.style.zIndex = invisible ? "1000" : "3000";
    if (invisible) {
      const teleportAudio = document.getElementById(
        "teleport_audio"
      );
      teleportAudio.volume = 0.15;
      teleportAudio.play().then((val) => teleportAudio.currentTime = 0);
    }
    if (!invisible) {
      return;
    }
    setTimeout(launchInvisibilityToggle, INVISIBILITY_DURATION_IN_MILLISECONDS / (superSpeed ? CAMERA_SUPER_SPEED_MULTIPLICATOR : 1));
  };
  var openMap = (event) => {
    window.location.replace("http://localhost:3001/world");
  };
  window.launchInvisibilityToggle = launchInvisibilityToggleFromDom;
  window.openMap = openMap;
  var launchTransformation = () => {
    if (runStopped || hardMode) {
      return;
    }
    runAudio.volume = 0;
    swordAudio.volume = 0;
    bombAudio.volume = 0;
    epicAudio.pause();
    if (transformedAlready) {
      electricityAudio.volume = 0.7;
      transformationScreamAudio.volume = 0.1;
      transformationScreamAudio.play();
      setTimeout(() => transformedEpicAudio.play(), 1e3);
      setTimeout(() => electricityAudio.play(), 200);
      document.getElementById("transformation_background").style.display = "none";
      clearGameTimeouts();
      transformed = true;
      launchAnimationAndDeclareItLaunched(
        heroImage,
        0,
        "png",
        "assets/challenge/characters/transformed_hero/run",
        1,
        6,
        1,
        true,
        54 /* hero_transformation_run */
      );
      setTimeout(turnHeroTransformationOff, 2e4);
      return;
    }
    document.getElementById("transformation_background").style.display = "flex";
    preTransformed = true;
    clearEnemiesInstantly();
    bassAudio.play();
    setTimeout(() => electricityAudio.play(), 200);
    clearTimeoutAndLaunchNewOne(
      0 /* HERO */,
      setTimeout(() => {
        launchAnimationAndDeclareItLaunched(
          heroImage,
          0,
          "png",
          "assets/challenge/characters/transformed_hero/pre_run",
          1,
          9,
          1,
          true,
          53 /* hero_transformation_pre_run */
        );
        if (enemiesComingTimeout) {
          clearTimeout(enemiesComingTimeout);
        }
        clearTimeoutAndLaunchNewOne(
          0 /* HERO */,
          setTimeout(() => {
            triggerOpponentsApparition();
            document.getElementById("transformation_background").style.display = "none";
            transformationScreamAudio.play();
            setTimeout(() => transformedEpicAudio.play(), 1e3);
            electricityAudio.volume = 0.2;
            transformed = true;
            preTransformed = false;
            runAudio.volume = 0.7;
            swordAudio.volume = 0.65;
            bombAudio.volume = 0.12;
            progressBar.style.display = "none";
            launchAnimationAndDeclareItLaunched(
              heroImage,
              0,
              "png",
              "assets/challenge/characters/transformed_hero/run",
              1,
              6,
              1,
              true,
              54 /* hero_transformation_run */
            );
            setTimeout(turnHeroTransformationOff, 15e3);
          }, 5e3)
        );
      }, 500)
    );
  };
  var clearEnemiesInstantly = () => {
    ennemiesOnScreen.forEach((enemy, index) => {
      enemy.character.element.remove();
      ennemiesOnScreen.splice(index, 1);
      interruptAnimation(18 /* ghost_opponent_move */);
    });
  };
  var lightUpAnswerDataContainer = () => {
    answerDataValue.style.opacity = "1";
  };
  var clearAndHideAnswerDataContainer = () => {
    answerDataValue.style.opacity = "0";
  };
  var launchSwordSlash = () => {
    ANIMATION_RUNNING_VALUES[52 /* hero_sword_slash */]++;
    if (ANIMATION_RUNNING_VALUES[52 /* hero_sword_slash */] !== 1 || transformed) {
      return;
    }
    ANIMATION_RUNNING_VALUES[52 /* hero_sword_slash */]++;
    swordSlashImg.style.display = "flex";
    setTimeout(() => {
      swordSlashImg.style.display = "none";
      ANIMATION_RUNNING_VALUES[52 /* hero_sword_slash */] = 0;
    }, 75);
  };
  var updateIdleTimerInterface = () => {
    idleTimeoutContainer.innerHTML = idleTimerValue.toString();
  };
  var interuptIdleTimer = () => {
    idleTimerValue = 5;
    updateIdleTimerInterface();
    idleTimeoutContainer.style.display = "none";
  };
  var launchIdleTimeout = () => {
    idleTimeoutContainer.style.display = "flex";
    const tryToUpdateTimerValue = () => {
      if (!runStopped) {
        return;
      }
      if (idleTimerValue === 0) {
        resumeRun();
        return;
      }
      idleTimeoutContainer.innerHTML = idleTimerValue.toString();
      idleTimerValue--;
      setTimeout(
        tryToUpdateTimerValue,
        1e3
      );
    };
    tryToUpdateTimerValue();
  };
  var launchDeathAnimation = () => {
    initHeroAnimations();
    ANIMATION_RUNNING_VALUES[49 /* camera_left_to_right */] = 0;
    APP_ELEMENTS_ANIMATION_QUEUE.hero.current_animation = null;
    APP_ELEMENTS_ANIMATION_QUEUE.hero.request_queue = [];
    const killHero2 = () => {
      launchAnimationAndDeclareItLaunched(
        heroImage,
        0,
        "png",
        "assets/challenge/characters/hero/death",
        1,
        6,
        1,
        false,
        7 /* hero_death */
      );
      clearGameTimeouts();
      if (enemiesComingTimeout) {
        clearTimeout(enemiesComingTimeout);
        enemiesComingTimeout = null;
      }
      ennemiesOnScreen.forEach(
        (enemy) => {
          ANIMATION_RUNNING_VALUES[getCharacterAnimationAccordingToType(enemy.character, 12 /* movement */).id] = 0;
        }
      );
      setTimeout(
        launchEndOfChallenge
      );
    };
    if (transformed) {
      transformed = false;
    }
    heroImage.src = "assets/challenge/characters/hero/death/1.png";
    setTimeout(killHero2, 1e3);
  };
  var launchHeroHurtAnimation = () => {
    launchAnimationAndDeclareItLaunched(
      heroImage,
      0,
      "png",
      transformed ? "assets/challenge/characters/transformed_hero/hurt" : "assets/challenge/characters/hero/hurt",
      1,
      transformed ? 5 : 3,
      1,
      false,
      transformed ? 55 /* hero_transformation_hurt */ : 6 /* hero_hurt */
    );
    if (!hardMode) {
      stopCameraMovingToRight();
    }
    clearTimeoutAndLaunchNewOne(
      0 /* HERO */,
      setTimeout(() => {
        heroHurt = false;
        if (heroIsAlive && ANIMATION_RUNNING_VALUES[1 /* hero_run */] === 0) {
          launchHeroRun();
        }
      }, 500)
    );
  };
  var stopCameraMovingToRight = () => {
    ANIMATION_RUNNING_VALUES[49 /* camera_left_to_right */] = 0;
  };
  var stopCameraMovingToLeft = () => {
    ANIMATION_RUNNING_VALUES[50 /* camera_right_to_left */] = 0;
  };
  var startCamera = (direction) => {
    const cameraAnimation = direction === 0 /* LEFT_TO_RIGHT */ ? 49 /* camera_left_to_right */ : 50 /* camera_right_to_left */;
    if (ANIMATION_RUNNING_VALUES[cameraAnimation] > 0) {
      return;
    }
    ANIMATION_RUNNING_VALUES[cameraAnimation]++;
  };
  var initHeroAnimations = () => {
    ANIMATION_RUNNING_VALUES[1 /* hero_run */] = 0;
    ANIMATION_RUNNING_VALUES[53 /* hero_transformation_pre_run */] = 0;
    ANIMATION_RUNNING_VALUES[54 /* hero_transformation_run */] = 0;
    ANIMATION_RUNNING_VALUES[6 /* hero_hurt */] = 0;
  };
  var lightningImg = document.getElementById("lightning_img");
  var animateLightning = () => {
    lightningImg.style.display = "block";
    launchAnimationAndDeclareItLaunched(
      lightningImg,
      0,
      "png",
      `assets/challenge/items/lightning`,
      1,
      17,
      1,
      true,
      59 /* lightning */,
      () => {
        lightningImg.style.display = "none";
      }
    );
  };
  var launchIdleLoop = (loopIndex = 0) => {
    const MAX_LOOP = 0;
    if (ANIMATION_RUNNING_VALUES[1 /* hero_run */] !== 0) {
      return;
    }
    if (loopIndex > MAX_LOOP) {
      loopIndex = 0;
    }
    const loops = [
      () => launchAnimation(heroCharacter, 10 /* idle */, false)
    ];
    loops[loopIndex]();
    setTimeout(
      () => launchIdleLoop(loopIndex + 1),
      loopIndex === 0 ? 8e3 : 5e3
    );
  };
  var createMapSets = () => {
    for (let i = 1; i <= 5; i++) {
      const lastSet = i === 5 ? true : false;
      const velocity = i * i;
      createMapSet(`assets/challenge/maps/snow/${i}.png`, velocity, `${i}`, lastSet);
    }
  };
  var initElementsIndexes = () => {
    const currentIndex = store.getState().persistedMap.currentIndex;
    store.dispatch(setStartIndex(currentIndex));
    store.dispatch(setEndIndex(currentIndex));
  };
  window.onload = () => {
    epicAudio.volume = 0;
    windAudio.volume = 0.4;
    checkForCurrentMapElementUpdate();
    setupListeners();
    setInitialGameVolume();
    launchHardModeToggle();
    setHeroClass();
    initElementsIndexes();
    createMapSets();
    createGameAccordingToMode();
    updateLifePointsDisplay();
    updateScoreDisplay();
    detectCollision();
    checkForScreenUpdateFromLeftToRight(10);
    checkForScreenUpdateFromRightToLeft(10);
    checkForOpponentsClearance();
    defineCurrentSubject(hardMode ? MATHS_ARITHMETIC : MATHS_ARITHMETIC);
    defineSwordReach();
    updateTransformationProgressBarDisplay();
    animateLightning();
    if (hardMode) {
      epicAudio.play();
    } else {
      fireBackgroundAudio.play();
    }
  };
  var setupListeners = () => {
    var _a, _b;
    (_a = document.getElementById("playAgainLink")) == null ? void 0 : _a.addEventListener("click", (event) => window.location.reload());
    (_b = document.getElementById("backToStormGradButton")) == null ? void 0 : _b.addEventListener("click", goBackToMountain);
  };
  var createGameAccordingToMode = () => {
    progressBar.style.display = "flex";
    if (hardMode) {
      return;
    }
    epicAudio = document.getElementById(
      hardMode ? "hard_epic_audio" : "epic_audio"
    );
    epicAudio.volume = hardMode ? 1 : 1;
  };
  var launchHardModeToggle = () => {
    const modeParameter = getUrlParameter("mode");
    if (!modeParameter) {
      console.log("there is no mode parameter");
      return;
    }
    hardMode = modeParameter === "hard";
  };
  var getTransformationProgressValue = () => {
    return Math.floor(rewardStreak / TRANSFORMATION_THRESHOLD * 100);
  };
  var updateTransformationProgressBarDisplay = () => {
    const progress = document.querySelector(".progress");
    progress.style.setProperty(
      "--progress",
      `${getTransformationProgressValue()}%`
    );
  };
  var defineSwordReach = () => {
    swordReach = heroImage.getBoundingClientRect().height * 2;
  };
  var launchGame = () => {
    runAudio.play();
    epicAudio.play();
    heroRunning = true;
    gameLaunched = true;
    launchHeroRun();
    triggerOpponentsApparition();
  };
  var defineCurrentSubject = (subject) => {
    currentSubject = subject;
    currentSubjectTotal = currentSubject.good.length + currentSubject.bad.length;
  };
  var killAllAudios = () => {
    runAudio.pause();
    epicAudio.pause();
    transformedEpicAudio.pause();
  };
  var soundEffectImage = document.getElementById("sound_effect_img_container");
  var displaySoundEffectImage = () => {
    soundEffectImage.style.display = "flex";
    setTimeout(
      () => soundEffectImage.style.display = "none",
      1e3
    );
  };
  var launchHeroLightningSpeedAnimation = () => {
    superSpeedOn = true;
    animateLightning();
    heroImage.style.display = "none";
    specialMoveIndicator.style.display = "none";
    launchInvisibilityToggle(true);
    ANIMATION_RUNNING_VALUES[59 /* lightning */] = 0;
    lightningImg.style.opacity = "0";
    setTimeout(() => {
      superSpeedOn = false;
      lightningImg.style.opacity = "1";
      lightningImg.style.left = "10%";
      launchAnimationAndDeclareItLaunched(
        lightningImg,
        0,
        "png",
        `assets/challenge/items/purple_lightning`,
        1,
        8,
        1,
        true,
        59 /* lightning */
      );
      heroImage.style.display = "flex";
      setTimeout(
        () => {
          ANIMATION_RUNNING_VALUES[59 /* lightning */] = 0;
          lightningImg.style.opacity = "0";
          setTimeout(
            () => {
              lightningImg.style.opacity = "1";
              lightningImg.style.left = "10%";
              launchAnimationAndDeclareItLaunched(
                lightningImg,
                0,
                "png",
                `assets/challenge/items/sparks`,
                1,
                6,
                1,
                true,
                59 /* lightning */
              );
            },
            800
          );
        },
        800
      );
    }, INVISIBILITY_DURATION_IN_MILLISECONDS / CAMERA_SUPER_SPEED_MULTIPLICATOR);
  };
})();
//# sourceMappingURL=challenge.js.map
