(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["events"] = factory();
	else
		root["events"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { throw err; };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.callFunc = callFunc;

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var idCounter = 0;
	function getID() {
	    return "" + ++idCounter;
	}
	function callFunc(fn) {
	    var args = arguments.length <= 1 || arguments[1] === undefined ? [] : arguments[1];

	    var l = fn.length,
	        i = -1,
	        a1 = args[0],
	        a2 = args[1],
	        a3 = args[2],
	        a4 = args[3];
	    switch (args.length) {
	        case 0:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx);
	            }return;
	        case 1:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1);
	            }return;
	        case 2:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1, a2);
	            }return;
	        case 3:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3);
	            }return;
	        case 4:
	            while (++i < l) {
	                fn[i].handler.call(fn[i].ctx, a1, a2, a3, a4);
	            }return;
	        default:
	            while (++i < l) {
	                fn[i].handler.apply(fn[i].ctx, args);
	            }return;
	    }
	}

	var EventEmitter = exports.EventEmitter = function () {
	    function EventEmitter() {
	        _classCallCheck(this, EventEmitter);
	    }

	    _createClass(EventEmitter, [{
	        key: 'on',
	        value: function on(event, fn, ctx) {
	            var once = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

	            var events = (this._listeners || (this._listeners = {}))[event] || (this._listeners[event] = []);
	            events.push({
	                name: event,
	                once: once,
	                handler: fn,
	                ctx: ctx || this
	            });
	            return this;
	        }
	    }, {
	        key: 'once',
	        value: function once(event, fn, ctx) {
	            return this.on(event, fn, ctx, true);
	        }
	    }, {
	        key: 'off',
	        value: function off(eventName, fn) {
	            this._listeners = this._listeners || {};
	            if (eventName == null) {
	                this._listeners = {};
	            } else if (this._listeners[eventName]) {
	                var events = this._listeners[eventName];
	                if (fn == null) {
	                    this._listeners[eventName] = [];
	                } else {
	                    for (var i = 0; i < events.length; i++) {
	                        var event = events[i];
	                        if (events[i].handler == fn) {
	                            this._listeners[eventName].splice(i, 1);
	                        }
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'trigger',
	        value: function trigger(eventName) {
	            var events = (this._listeners || (this._listeners = {}))[eventName] || (this._listeners[eventName] = []).concat(this._listeners['all'] || []);

	            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	                args[_key - 1] = arguments[_key];
	            }

	            if (EventEmitter.debugCallback) EventEmitter.debugCallback(this.constructor.name, this.name, eventName, args);
	            var event = undefined,
	                a = undefined,
	                len = events.length,
	                index = undefined,
	                i = undefined;
	            var calls = [];
	            for (i = 0; i < events.length; i++) {
	                event = events[i];
	                a = args;
	                if (event.name == 'all') {
	                    a = [eventName].concat(args);
	                    callFunc([event], a);
	                } else {
	                    calls.push(event);
	                }
	                if (event.once === true) {
	                    index = this._listeners[event.name].indexOf(event);
	                    this._listeners[event.name].splice(index, 1);
	                }
	            }
	            if (calls.length) this._executeListener(calls, args);
	            return this;
	        }
	    }, {
	        key: '_executeListener',
	        value: function _executeListener(func, args) {
	            var executor = callFunc;
	            if (this.constructor.executeListenerFunction) {
	                executor = this.constructor.executeListenerFunction;
	            }
	            executor(func, args);
	        }
	    }, {
	        key: 'listenTo',
	        value: function listenTo(obj, event, fn, ctx) {
	            var once = arguments.length <= 4 || arguments[4] === undefined ? false : arguments[4];

	            var listeningTo = undefined,
	                id = undefined,
	                meth = undefined;
	            listeningTo = this._listeningTo || (this._listeningTo = {});
	            id = obj.listenId || (obj.listenId = getID());
	            listeningTo[id] = obj;
	            meth = once ? 'once' : 'on';
	            obj[meth](event, fn, this);
	            return this;
	        }
	    }, {
	        key: 'listenToOnce',
	        value: function listenToOnce(obj, event, fn, ctx) {
	            return this.listenTo(obj, event, fn, ctx, true);
	        }
	    }, {
	        key: 'stopListening',
	        value: function stopListening(obj, event, callback) {
	            var listeningTo = this._listeningTo;
	            if (!listeningTo) return this;
	            var remove = !event && !callback;
	            if (!callback && (typeof event === 'undefined' ? 'undefined' : _typeof(event)) === 'object') callback = this;
	            if (obj) (listeningTo = {})[obj.listenId] = obj;
	            for (var id in listeningTo) {
	                obj = listeningTo[id];
	                obj.off(event, callback, this);
	                if (remove || !Object.keys(obj.listeners).length) delete this._listeningTo[id];
	            }
	            return this;
	        }
	    }, {
	        key: 'destroy',
	        value: function destroy() {
	            this.stopListening();
	            this.off();
	        }
	    }, {
	        key: 'listeners',
	        get: function get() {
	            return this._listeners;
	        }
	    }]);

	    return EventEmitter;
	}();

/***/ }
/******/ ])
});
;