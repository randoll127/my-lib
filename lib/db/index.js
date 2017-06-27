(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("mysql"));
	else if(typeof define === 'function' && define.amd)
		define(["mysql"], factory);
	else if(typeof exports === 'object')
		exports["my-lib"] = factory(require("mysql"));
	else
		root["my-lib"] = factory(root["mysql"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_8__) {
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

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _mysql = __webpack_require__(8);

	var _mysql2 = _interopRequireDefault(_mysql);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var pool = void 0;
	var initDB = function initDB(config) {
	    pool = _mysql2.default.createPool({
	        host: 'localhost',
	        user: 'root',
	        password: 'root',
	        database: 'lu_model'
	    });
	};

	var __getPool = function __getPool() {
	    if (!pool) initDB();
	    return pool;
	};

	var execute = function execute(sql, callback) {
	    __getPool().getConnection(function (err, conn) {
	        if (err) {
	            callback(err, null, null);
	        } else {
	            conn.query(sql, function (qerr, vals, fields) {
	                //释放连接
	                conn.release();
	                //事件驱动回调
	                callback(err, vals, fields);
	            });
	        }
	    });
	};

	/*
	 * format 1:
	 * connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function (error, results, fields) {
	 if (error) throw error;
	 // ...
	 });

	 format 2:
	 var post  = {id: 1, title: 'Hello MySQL'};
	 var query = connection.query('INSERT INTO posts SET ?', post, function (error, results, fields) {
	 if (error) throw error;
	 // Neat!
	 });
	 * */
	var executeBatch = function executeBatch(sqls, callback) {

	    if (arguments.length == 2) {
	        __executeBatch.apply(this, arguments);
	    } else if (arguments.length == 3) {
	        __executeBatch2.apply(this, arguments);
	    } else {}
	};

	var __executeBatch = function __executeBatch(sqls, callback) {
	    __getPool().getConnection(function (err, connection) {
	        connection.beginTransaction(function (err) {
	            if (err) {
	                callback(err);
	                return;
	            }
	            sqls.forEach(function (_sql) {

	                connection.query(_sql, function (error, results, fields) {
	                    if (error) {
	                        return connection.rollback(function () {
	                            callback(error);
	                        });
	                    }
	                });
	            });

	            connection.commit(function (err) {
	                if (err) {
	                    return connection.rollback(function () {
	                        connection.release();
	                        callback(err);
	                    });
	                } else {
	                    connection.release();
	                    callback('更新成功');
	                }
	            });
	        });
	    });
	};

	var __executeBatch2 = function __executeBatch2(sqls, params, callback) {
	    __getPool().getConnection(function (err, connection) {
	        connection.beginTransaction(function (err) {
	            if (err) {
	                callback(err);
	                return;
	            }
	            sqls.forEach(function (_sql, i) {

	                connection.query(_sql, params[i], function (error, results, fields) {
	                    if (error) {
	                        return connection.rollback(function () {
	                            callback(error);
	                        });
	                    }
	                });
	            });

	            connection.commit(function (err) {
	                if (err) {
	                    return connection.rollback(function () {
	                        connection.release();
	                        callback(err);
	                    });
	                } else {
	                    connection.release();
	                    callback('更新成功');
	                }
	            });
	        });
	    });
	};

	exports.default = {
	    initDB: initDB, execute: execute, executeBatch: executeBatch
	};

/***/ },

/***/ 8:
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ }

/******/ })
});
;