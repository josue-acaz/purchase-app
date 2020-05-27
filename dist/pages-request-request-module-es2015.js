(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-request-request-module"],{

/***/ "./node_modules/accounting-js/lib/formatMoney.js":
/*!*******************************************************!*\
  !*** ./node_modules/accounting-js/lib/formatMoney.js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _internal_checkCurrencyFormat__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/checkCurrencyFormat */ "./node_modules/accounting-js/lib/internal/checkCurrencyFormat.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./node_modules/accounting-js/lib/settings.js");
/* harmony import */ var _formatNumber__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./formatNumber */ "./node_modules/accounting-js/lib/formatNumber.js");






/**
 * Format a number into currency
 *
 * Usage: accounting.formatMoney(number, symbol, precision, thousandsSep, decimalSep, format)
 * defaults: (0, '$', 2, ',', '.', '%s%v')
 *
 * Localise by overriding the symbol, precision, thousand / decimal separators and format
 *
 * ```js
 * // Default usage:
 * accounting.formatMoney(12345678); // $12,345,678.00
 *
 * // European formatting (custom symbol and separators), can also use options object as second parameter:
 * accounting.formatMoney(4999.99, { symbol: "€", precision: 2, thousand: ".", decimal: "," }); // €4.999,99
 *
 * // Negative values can be formatted nicely:
 * accounting.formatMoney(-500000, { symbol: "£ ", precision: 0 }); // £ -500,000
 *
 * // Simple `format` string allows control of symbol position (%v = value, %s = symbol):
 * accounting.formatMoney(5318008, { symbol: "GBP",  format: "%v %s" }); // 5,318,008.00 GBP
 * ```
 *
 * @method formatMoney
 * @for accounting
 * @param {Number}        number Number to be formatted.
 * @param {Object}        [opts={}] Object containing all the options of the method.
 * @return {String} The given number properly formatted as money.
 */
function formatMoney(number, opts = {}) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map((val) => formatMoney(val, opts));
  }

  // Build options object from second param (if object) or all params, extending defaults:
  opts = object_assign__WEBPACK_IMPORTED_MODULE_0___default()({},
    _settings__WEBPACK_IMPORTED_MODULE_2__["default"],
    opts
  );

  // Check format (returns object with pos, neg and zero):
  const formats = Object(_internal_checkCurrencyFormat__WEBPACK_IMPORTED_MODULE_1__["default"])(opts.format);

  // Choose which format to use for this value:
  let useFormat;

  if (number > 0) {
    useFormat = formats.pos;
  } else if (number < 0) {
    useFormat = formats.neg;
  } else {
    useFormat = formats.zero;
  }

  // Return with currency symbol added:
  return useFormat
    .replace('%s', opts.symbol)
    .replace('%v', Object(_formatNumber__WEBPACK_IMPORTED_MODULE_3__["default"])(Math.abs(number), opts));
}

/* harmony default export */ __webpack_exports__["default"] = (formatMoney);


/***/ }),

/***/ "./node_modules/accounting-js/lib/formatNumber.js":
/*!********************************************************!*\
  !*** ./node_modules/accounting-js/lib/formatNumber.js ***!
  \********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
/* harmony import */ var object_assign__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(object_assign__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _internal_stripInsignificantZeros__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./internal/stripInsignificantZeros */ "./node_modules/accounting-js/lib/internal/stripInsignificantZeros.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ "./node_modules/accounting-js/lib/settings.js");
/* harmony import */ var _toFixed__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./toFixed */ "./node_modules/accounting-js/lib/toFixed.js");






/**
 * Format a number, with comma-separated thousands and custom precision/decimal places
 * Alias: `accounting.format()`
 *
 * Localise by overriding the precision and thousand / decimal separators
 *
 * ```js
 * accounting.formatNumber(5318008);              // 5,318,008
 * accounting.formatNumber(9876543.21, { precision: 3, thousand: " " }); // 9 876 543.210
 * ```
 *
 * @method formatNumber
 * @for accounting
 * @param {Number}        number The number to be formatted.
 * @param {Object}        [opts={}] Object containing all the options of the method.
 * @return {String} The given number properly formatted.
  */
function formatNumber(number, opts = {}) {
  // Resursively format arrays:
  if (Array.isArray(number)) {
    return number.map((val) => formatNumber(val, opts));
  }

  // Build options object from second param (if object) or all params, extending defaults:
  opts = object_assign__WEBPACK_IMPORTED_MODULE_0___default()({},
    _settings__WEBPACK_IMPORTED_MODULE_2__["default"],
    opts
  );

  // Do some calc:
  const negative = number < 0 ? '-' : '';
  const base = parseInt(Object(_toFixed__WEBPACK_IMPORTED_MODULE_3__["default"])(Math.abs(number), opts.precision), 10) + '';
  const mod = base.length > 3 ? base.length % 3 : 0;

  // Format the number:
  const formatted = negative +
    (mod ? base.substr(0, mod) + opts.thousand : '') +
      base.substr(mod).replace(/(\d{3})(?=\d)/g, '$1' + opts.thousand) +
        (opts.precision > 0 ? opts.decimal + Object(_toFixed__WEBPACK_IMPORTED_MODULE_3__["default"])(Math.abs(number), opts.precision).split('.')[1] : '');

  return opts.stripZeros ? Object(_internal_stripInsignificantZeros__WEBPACK_IMPORTED_MODULE_1__["default"])(formatted, opts.decimal) : formatted;
}

/* harmony default export */ __webpack_exports__["default"] = (formatNumber);


/***/ }),

/***/ "./node_modules/accounting-js/lib/internal/checkCurrencyFormat.js":
/*!************************************************************************!*\
  !*** ./node_modules/accounting-js/lib/internal/checkCurrencyFormat.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_string__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-string */ "./node_modules/is-string/index.js");
/* harmony import */ var is_string__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_string__WEBPACK_IMPORTED_MODULE_0__);


/**
 * Parses a format string or object and returns format obj for use in rendering
 *
 * `format` is either a string with the default (positive) format, or object
 * containing `pos` (required), `neg` and `zero` values
 *
 * Either string or format.pos must contain "%v" (value) to be valid
 *
 * @method _checkCurrencyFormat
 * @for accounting
 * @param {String}        [format="%s%v"] String with the format to apply, where %s is the currency symbol and %v is the value.
 * @return {Object} object represnting format (with pos, neg and zero attributes)
 */
function _checkCurrencyFormat(format) {
  // Format should be a string, in which case `value` ('%v') must be present:
  if (is_string__WEBPACK_IMPORTED_MODULE_0___default()(format) && format.match('%v')) {
    // Create and return positive, negative and zero formats:
    return {
      pos: format,
      neg: format.replace('-', '').replace('%v', '-%v'),
      zero: format
    };
  }

  // Otherwise, assume format was fine:
  return format;
}

/* harmony default export */ __webpack_exports__["default"] = (_checkCurrencyFormat);


/***/ }),

/***/ "./node_modules/accounting-js/lib/internal/checkPrecision.js":
/*!*******************************************************************!*\
  !*** ./node_modules/accounting-js/lib/internal/checkPrecision.js ***!
  \*******************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Check and normalise the value of precision (must be positive integer)
 */
function _checkPrecision(val, base) {
  val = Math.round(Math.abs(val));
  return isNaN(val) ? base : val;
}

/* harmony default export */ __webpack_exports__["default"] = (_checkPrecision);


/***/ }),

/***/ "./node_modules/accounting-js/lib/internal/stripInsignificantZeros.js":
/*!****************************************************************************!*\
  !*** ./node_modules/accounting-js/lib/internal/stripInsignificantZeros.js ***!
  \****************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

function _stripInsignificantZeros(str, decimal) {
  const parts = str.split(decimal);
  const integerPart = parts[0];
  const decimalPart = parts[1].replace(/0+$/, '');

  if (decimalPart.length > 0) {
    return integerPart + decimal + decimalPart;
  }

  return integerPart;
}

/* harmony default export */ __webpack_exports__["default"] = (_stripInsignificantZeros);


/***/ }),

/***/ "./node_modules/accounting-js/lib/settings.js":
/*!****************************************************!*\
  !*** ./node_modules/accounting-js/lib/settings.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * The library's settings configuration object.
 *
 * Contains default parameters for currency and number formatting
 */
const settings = {
  symbol: '$',        // default currency symbol is '$'
  format: '%s%v',     // controls output: %s = symbol, %v = value (can be object, see docs)
  decimal: '.',       // decimal point separator
  thousand: ',',      // thousands separator
  precision: 2,       // decimal places
  grouping: 3,        // digit grouping (not implemented yet)
  stripZeros: false,  // strip insignificant zeros from decimal part
  fallback: 0         // value returned on unformat() failure
};

/* harmony default export */ __webpack_exports__["default"] = (settings);


/***/ }),

/***/ "./node_modules/accounting-js/lib/toFixed.js":
/*!***************************************************!*\
  !*** ./node_modules/accounting-js/lib/toFixed.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _internal_checkPrecision__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./internal/checkPrecision */ "./node_modules/accounting-js/lib/internal/checkPrecision.js");
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ "./node_modules/accounting-js/lib/settings.js");



/**
 * Implementation of toFixed() that treats floats more like decimals
 *
 * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
 * problems for accounting- and finance-related software.
 *
 * ```js
 *  (0.615).toFixed(2);           // "0.61" (native toFixed has rounding issues)
 *  accounting.toFixed(0.615, 2); // "0.62"
 * ```
 *
 * @method toFixed
 * @for accounting
 * @param {Float}   value         The float to be treated as a decimal number.
 * @param {Number} [precision=2] The number of decimal digits to keep.
 * @return {String} The given number transformed into a string with the given precission
 */
function toFixed(value, precision) {
  precision = Object(_internal_checkPrecision__WEBPACK_IMPORTED_MODULE_0__["default"])(precision, _settings__WEBPACK_IMPORTED_MODULE_1__["default"].precision);
  const power = Math.pow(10, precision);

  // Multiply up by precision, round accurately, then divide and use native toFixed():
  return (Math.round((value + 1e-8) * power) / power).toFixed(precision);
}

/* harmony default export */ __webpack_exports__["default"] = (toFixed);


/***/ }),

/***/ "./node_modules/is-string/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-string/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var strValue = String.prototype.valueOf;
var tryStringObject = function tryStringObject(value) {
	try {
		strValue.call(value);
		return true;
	} catch (e) {
		return false;
	}
};
var toStr = Object.prototype.toString;
var strClass = '[object String]';
var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

module.exports = function isString(value) {
	if (typeof value === 'string') { return true; }
	if (typeof value !== 'object') { return false; }
	return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
};


/***/ }),

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/request/request-edit/request-edit.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/request/request-edit/request-edit.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-12\">\n  <div class=\"card\">\n    <div class=\"card-body\">\n      <form [formGroup]=\"requestForm\">\n        <div class=\"form-row\">\n          <!--APLICAÇÃO-->\n          <div class=\"form-group col-sm-6\">\n            <label for=\"req_application\">Aplicação</label>\n            <input [readonly]=\"isReadOnly\" type=\"text\" formControlName=\"req_application\" class=\"form-control\">\n            <div class=\"small\" *ngIf=\"!requestForm.controls['req_application'].valid && requestForm.controls['req_application'].touched\" style=\"color: red\">Esse campo não pode ficar em branco!</div>\n          </div>\n          <!--PRIORIDADE-->\n          <div class=\"form-group col-sm-3\">\n            <label for=\"req_priority\">Prioridade</label>\n            <select formControlName=\"req_priority\" class=\"form-control\">\n              <option *ngFor='let rp of request_priority' [value]=\"rp.value\">{{ rp.value }}</option>\n            </select>\n          </div>\n          <!--DATA LIMITE-->\n          <div class=\"form-group col-sm-3\">\n            <label for=\"req_deadline\">Data limite</label>\n            <input [readonly]=\"isReadOnly\" type=\"text\" #input_focus formControlName=\"req_deadline\" [textMask]=\"{ mask: dateMask }\" class=\"form-control\">\n            <div *ngIf=\"(requestForm.controls['req_deadline'].valid || requestForm.controls['req_deadline'].invalid) && requestForm.controls['req_deadline'].touched\">\n              <div class=\"small\" *ngIf=\"!fluent.isValidDate(requestForm.controls['req_deadline'].value)\" style=\"color: red\">\n                Data inválida!\n                <div *ngIf=\"requestForm.controls['req_deadline'].setErrors({'invalid': true})\"></div>\n              </div>\n            </div>\n          </div>\n          <!--TAREFA-->\n          <div class=\"form-group col-sm-12\">\n            <label for=\"req_description\">Tarefa</label>\n            <input [readonly]=\"isReadOnly\" type=\"text\" formControlName=\"req_description\" class=\"form-control\">\n            <div class=\"small\" *ngIf=\"!requestForm.controls['req_description'].valid && requestForm.controls['req_description'].touched\" style=\"color: red\">Esse campo não pode ficar em branco!</div>\n          </div>\n        </div>\n        <div *ngIf=\"errors.length > 0\"  class=\"alert alert-danger\"><p *ngFor=\"let erro of errors\">{{ erro }}</p></div>\n        <div class=\"form-row\">\n          <div class=\"form-group col-sm-2\" *ngIf=\"(requestForm.value.req_status=='E' && requestForm.value.req_id!=0) || data_edit.req_status=='E'\"><button type=\"button\" class=\"btn btn-outline-primary  btn-block\" [disabled]=\"processing\" [disabled]=\"requestForm.invalid\" (click)=\"OnSubmitRequest()\">Salvar</button></div>\n          <div class=\"form-group col-sm-2\" *ngIf=\"requestForm.value.req_status=='E' && requestForm.value.req_id!=0\"><button type=\"button\" class=\"btn btn-outline-primary  btn-block\" [disabled]=\"processing\" (click)=\"modalService.open('confirm-finish-modal-request');\">Efetivar</button></div>\n          <div class=\"form-group col-sm-2\" *ngIf=\"requestForm.value.req_status=='A' && requestForm.value.req_id!=0\"><button type=\"button\" class=\"btn btn-outline-danger  btn-block\" [disabled]=\"processing\" (click)=\"modalService.open('confirm-reopen-modal-request');\">Reabrir</button></div>\n          <div class=\"form-group col-sm-2\" *ngIf=\"requestForm.value.req_status=='E' && requestForm.value.req_id!=0\"><button type=\"button\" class=\"btn btn-outline-danger  btn-block\" [disabled]=\"processing\" (click)=\"modalService.open('confirm-delete-modal-request');\">Excluir</button></div>\n          <div class=\"form-group col-sm-2\"><button type=\"button\" class=\"btn btn-outline-primary  btn-block\" [disabled]=\"processing\" (click)=\"list()\">Voltar</button></div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n<!--Passar o id da requisição atual como master-->\n<div class=\"form-row\" *ngIf=\"this.requestForm.value.req_id != 0\">\n  <div class=\"form-group col-sm-12\">\n    <app-request-item [master_id]=\"this.requestForm.value.req_id\" [master_status]=\"this.requestForm.value.req_status\"></app-request-item>\n  </div>\n</div>\n\n<!--Modal de efetivar a requisição atual-->\n<jw-modal id=\"confirm-finish-modal-request\" number_modal=\"1\">\n  <div class=\"content-modal\">\n    <p>Deseja EFETIVAR a requisição atual?</p>\n    <div class=\"form-row\">\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-danger btn-block\" (click)=\"finish()\">SIM</button></div>\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"modalService.close('confirm-finish-modal-request');\">NÃO</button></div>\n    </div>\n  </div>\n</jw-modal>\n<!--Modal de reabrir a requisição atual-->\n<jw-modal id=\"confirm-reopen-modal-request\" number_modal=\"1\">\n  <div class=\"content-modal\">\n    <p>Deseja REABRIR a transação atual?</p>\n    <div class=\"form-row\">\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-danger btn-block\" (click)=\"reopen()\">SIM</button></div>\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"modalService.close('confirm-reopen-modal-request');\">NÃO</button></div>\n    </div>\n  </div>\n</jw-modal>\n<!--Moda de excluir a requisição atual-->\n<jw-modal id=\"confirm-delete-modal-request\" number_modal=\"1\">\n  <div class=\"content-modal\">\n    <p>Deseja EXCLUIR o registro atual?</p>\n    <div class=\"form-row\">\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-danger btn-block\" (click)=\"delete()\">SIM</button></div>\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"modalService.close('confirm-delete-modal-request');\">NÃO</button></div>\n    </div>\n  </div>\n</jw-modal>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/request/request-edit/request-item/request-item-edit/request-item-edit.component.html":
/*!**************************************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/request/request-edit/request-item/request-item-edit/request-item-edit.component.html ***!
  \**************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-12\">\n  <div class=\"card\">\n    <div class=\"card-body\">\n      <form [formGroup]=\"mainForm\" novalidate>\n        <div class=\"form-row\">\n          <div class=\"form-group col-sm-5\"><label for=\"itm_pn\">Item</label>\n            <div class=\"input-group\">\n              <input [readonly]=\"isReadOnly\" #input_focus\n              [typeahead]=\"states\" formControlName=\"itm_pn\"\n              (typeaheadLoading)=\"item_change_typeahead_loading($event)\"\n              (typeaheadOnSelect)=\"item_typeahead_onselect($event)\"\n              [typeaheadScrollable]=\"true\"\n              [typeaheadOptionsInScrollableView]=\"5\"\n              typeaheadOptionField=\"itm_pn\"\n              [class.inputLoading]=item_typeahead_loading\n              class=\"form-control\">\n              <span class=\"input-group-append\"><button tabindex=\"-1\" type=\"button\" class=\"btn btn-primary\"><i class=\"fa fa-search\"></i></button></span>\n            </div>\n            <div class=\"small\" *ngIf=\"!mainForm.controls['itm_pn'].valid && mainForm.controls['itm_pn'].touched\" style=\"color: red\">Esse campo não pode ficar em branco!</div>\n          </div>\n\n          <!--QUANTIDADE-->\n          <div class=\"form-group col-sm-2\">\n            <label for=\"itm_quantity\">Quantidade</label>\n            <input [readonly]=\"isReadOnly\" min=\"1\" type=\"number\" formControlName=\"itm_quantity\" class=\"form-control\">\n          </div>\n          <!--PRIORIDADE-->\n          <div class=\"form-group col-sm-2\">\n            <label for=\"itm_priority\">Prioridade</label>\n            <select formControlName=\"itm_priority\" tabindex=\"-1\" class=\"form-control\">\n              <option [value]=\"priority\" *ngFor=\"let priority of item_priority\">{{ priority }}</option>\n            </select>\n          </div>\n          <!--DATA LIMITE-->\n          <div class=\"form-group col-sm-3\">\n            <label for=\"itm_deadline\">Data limite</label>\n            <input [readonly]=\"isReadOnly\" type=\"text\" #input_focus tabindex=\"-1\" formControlName=\"itm_deadline\" [textMask]=\"{ mask: dateMask }\" class=\"form-control\">\n            <div *ngIf=\"(mainForm.controls['itm_deadline'].valid || mainForm.controls['itm_deadline'].invalid) && mainForm.controls['itm_deadline'].touched\">\n              <div class=\"small\" *ngIf=\"!fluent.isValidDate(mainForm.controls['itm_deadline'].value)\" style=\"color: red\">\n                Data inválida!\n                <div *ngIf=\"mainForm.controls['itm_deadline'].setErrors({'invalid': true})\"></div>\n              </div>\n            </div>\n          </div>\n          <!--APLICAÇÃO-->\n          <div class=\"form-group col-sm-3\">\n            <label for=\"itm_application\">Aplicação</label>\n            <input [readonly]=\"isReadOnly\" type=\"text\" tabindex=\"-1\" formControlName=\"itm_application\" class=\"form-control\">\n            <div class=\"small\" *ngIf=\"!mainForm.controls['itm_application'].valid && mainForm.controls['itm_application'].touched\" style=\"color: red\">Esse campo não pode ficar em branco!</div>\n          </div>\n          <!--DESCRIÇÃO-->\n          <div class=\"form-group col-sm-12\">\n            <label for=\"itm_description\">Descrição</label>\n            <textarea [readonly]=\"isReadOnly\" formControlName=\"itm_description\" class=\"form-control\" rows=\"3\"></textarea>\n          </div>\n        </div>\n\n        <div *ngIf=\"errors.length > 0\"  class=\"alert alert-danger\"><p *ngFor=\"let erro of errors\">{{ erro }}</p></div>\n        <div class=\"form-row\">\n          <div class=\"form-group col-sm-3\" *ngIf=\"service.master_status == 'E'\"><button type=\"button\" class=\"btn btn-primary  btn-block\" (click)=\"save('new')\" [disabled]=\"!mainForm.valid || processing\">Salvar & Novo</button></div>\n          <div class=\"form-group col-sm-3\" *ngIf=\"service.master_status == 'E'\"><button type=\"button\" class=\"btn btn-primary  btn-block\" (click)=\"save('list')\" [disabled]=\"!mainForm.valid || processing\">Salvar & Voltar</button></div>\n          <div class=\"form-group col-sm-3\" *ngIf=\"service.master_status == 'E' && mainForm.value.itm_id!=0\"><button type=\"button\" class=\"btn btn-primary  btn-block\" [disabled]=\"processing\" (click)=\"modalService.open('confirm-delete-modal-movprod-item');\">Excluir</button></div>\n          <div class=\"form-group col-sm-3\"><button type=\"button\" class=\"btn btn-primary  btn-block\" [disabled]=\"processing\" (click)=\"list()\">Voltar</button></div>\n        </div>\n      </form>\n    </div>\n  </div>\n</div>\n\n<jw-modal id=\"confirm-delete-modal-movprod-item\" number_modal=\"1\">\n  <div class=\"content-modal\">\n    <p>Deseja excluir o registro atual?</p>\n    <div class=\"form-row\">\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-danger btn-block\" (click)=\"delete()\">SIM</button></div>\n      <div class=\"form-group col-sm-6\"><button type=\"button\" class=\"btn btn-primary btn-block\" (click)=\"modalService.close('confirm-delete-modal-movprod-item');\">NÃO</button></div>\n    </div>\n  </div>\n</jw-modal>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/request/request-edit/request-item/request-item.component.html":
/*!***************************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/request/request-edit/request-item/request-item.component.html ***!
  \***************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"col-sm-12 text-center\" *ngIf=\"processing\"><img src=\"assets/img/loading2.gif\" class=\"img\" width=\"50px\"></div>\n\n<div *ngIf=\"errors.length > 0\"  class=\"alert alert-danger\"><div *ngFor=\"let erro of errors\">{{ erro }}</div></div>\n\n<div  [style.display]=\"service.action=='listing'?'inherit':'none'\">\n  <div class=\"col-sm-12\">\n    <div class=\"card\">\n\n    <div class=\"card-header\">\n      Itens\n      <div class=\"float-right\" *ngIf=\"service.master_status == 'E'\">\n        <a href=\"javascript:void(0);\" class=\"btn-setting\" (click)=\"edit(0);\"><span class=\"fa fa-plus\"></span> Adicionar </a>\n      </div>\n    </div>\n      <div class=\"card-body\">\n        <div class=\"list-group-item\"  *ngFor=\"let obj of data_list\">\n          <div class=\"d-flex align-items-center py-3\">\n            <div class=\"col-sm-12 row\">\n\n              <div class=\"col-sm-6\">\n                <p class=\"m-0 lead\">PN: <strong>{{ obj.itm_pn }}</strong></p>\n                <p class=\"m-0 lead\">Descrição: <strong>{{ obj.itm_description }}</strong></p>\n              </div>\n\n              <div class=\"col-sm-2 text-right\">\n                <p class=\"m-0 lead\"><small>Qtde:</small><br/><strong>{{ obj.itm_quantity }}</strong></p>\n              </div>\n\n              <div class=\"col-sm-2 text-right\">\n                <p class=\"m-0 lead\"><small>Aplicação:</small><br/><strong>{{  obj.itm_application }}</strong></p>\n              </div>\n\n              <div class=\"col-sm-2 text-right\">\n                <p class=\"m-0 lead\"><small>Prioridade:</small><br/><strong>{{  obj.itm_priority }}</strong></p>\n                <br/>\n                <p class=\"m-0\" *ngIf=\"service.master_status == 'E'\"><a href=\"javascript:void(0);\" (click)=\"edit(obj.itm_id);\"> Editar </a></p>\n                <p class=\"m-0\" *ngIf=\"service.master_status == 'A'\"><a href=\"javascript:void(0);\" (click)=\"edit(obj.itm_id);\"> Ver </a></p>\n              </div>\n\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  </div>\n</div>\n\n<div  [style.display]=\"service.action=='editing'?'inherit':'none'\">\n  <app-request-item-edit></app-request-item-edit>\n</div>\n"

/***/ }),

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/request/request.component.html":
/*!********************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/request/request.component.html ***!
  \********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<form [formGroup]=\"searchForm\" novalidate (ngSubmit)=\"first_page()\">\n  <div class=\"content-heading breadcrumb\">\n\n    <div class=\"col-sm-4\"><h3>Requisições de compra</h3></div>\n    <div class=\"col-sm-8\">\n      <div class=\"input-group\">\n        <input type=\"text\" formControlName=\"text_search\" #textsearch class=\"form-control\" (focus)=\"advance_search=true;\" placeholder=\"Pesquisar por...\">\n        <span class=\"input-group-append\">\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"first_page()\"><i class=\"fa fa-search\"></i></button>\n          <button type=\"button\" class=\"btn btn-primary\" (click)=\"edit(0)\"><i class=\"fa fa-plus-square\"></i> Adicionar</button>\n        </span>\n      </div>\n\n      <!--BUSCA AVANÇADA-->\n      <div class=\"dropdown-jr-content\" [style.display]=\"advance_search==true ? 'inherit' : 'none'\">\n        <button type=\"button\" class=\"close\" (click)=\"advance_search=false;\"><span>&times;</span></button>\n        <div class=\"form-row\">\n          <div class=\"form-check mb-2 mr-sm-2\">\n              <div class=\"checkbox c-checkbox\">\n                  <label><input type=\"checkbox\" formControlName=\"list_open\" /><span class=\"fa fa-check\"></span>Mostrar Em aberto</label>\n              </div>\n          </div>\n          <div class=\"form-check mb-2 mr-sm-2\">\n              <div class=\"checkbox c-checkbox\">\n                  <label><input type=\"checkbox\" formControlName=\"list_finished\" /><span class=\"fa fa-check\"></span>Mostrar Efetivados</label>\n              </div>\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n</form>\n\n<div [style.display]=\"service.action=='editing'?'inherit':'none'\">\n  <app-request-edit></app-request-edit>\n</div>\n\n<div  [style.display]=\"service.action=='listing'?'inherit':'none'\">\n  <div class=\"col-sm-12\">\n    <div class=\"list-group mb-3\">\n\n      <div class=\"list-group-item\"  *ngFor=\"let obj of data_list\">\n        <div class=\"d-flex align-items-center py-3\">\n          <div class=\"col-sm-12 row\">\n\n            <div class=\"col-sm-3 text-left\">\n              <p class=\"m-0\"><strong>{{ obj.req_application }}</strong></p>\n              <p class=\"m-0\"> Prioridade: {{ obj.req_priority }} </p>\n              <p class=\"m-0\"> Terefa: {{ obj.req_description }} </p>\n              <p class=\"m-0\"> Data limite: {{ toolsService.format_data_sql_br(obj.req_deadline) }} </p>\n\n            </div>\n\n            <!--\n              <div class=\"col-sm-8\">\n              <p class=\"m-0\">Os itens x, y e z forma solicitados!</p>\n              <p class=\"m-0\">Tarefa XZ</p>\n              <p class=\"m-0\">Movimentação de produto</p>\n              <br/>\n            </div>\n            -->\n\n            <div class=\"col-sm-1\">\n                <div class=\"float-right\" *ngIf=\"obj.req_status=='A'\"><a href=\"javascript:void(0);\" (click)=\"edit(obj.req_id);\"> Ver </a></div>\n                <div class=\"float-right\" *ngIf=\"obj.req_status=='E'\"><a href=\"javascript:void(0);\" (click)=\"edit(obj.req_id);\"> Editar </a></div>\n              <br/><br/>\n              <div class=\"float-right\">\n                <p class=\"mb-1\" *ngIf=\"obj.req_status=='E'\"><a class=\"text-warning m-0\" href=\"javascript:void(0);\" (click)=\"edit(obj.req_id);\">EM ABERTO</a></p>\n                <p class=\"mb-1\" *ngIf=\"obj.req_status=='A'\"><a class=\"text-info m-0\" href=\"javascript:void(0);\" (click)=\"edit(obj.req_id);\">EFETIVADO</a></p>\n              </div>\n            </div>\n\n          </div>\n        </div>\n      </div>\n\n    </div>\n  </div>\n\n  <div class=\"row\" style=\"padding:10px;\" *ngIf=\"data_list.length > 0\">\n    <div class=\"col-sm-4\">Registros: <strong> {{ total_records }} </strong></div>\n    <div class=\"col-sm-4\">\n      <div class=\"btn-toolbar\" role=\"toolbar\">\n        <div class=\"btn-group mr-2\" role=\"group\">\n          <button type=\"button\" class=\"btn btn-light\" (click)=\"first_page()\"> << </button>\n          <button type=\"button\" class=\"btn btn-light\" (click)=\"previous_page()\"> < </button>\n\n          <button type=\"button\" class=\"btn btn-light\"><strong>{{ query_params.current_page }} of {{ total_pages }} </strong></button>\n\n          <button type=\"button\" class=\"btn btn-light\" (click)=\"next_page()\"> > </button>\n          <button type=\"button\" class=\"btn btn-light\" (click)=\"last_page()\"> >> </button>\n        </div>\n      </div>\n    </div>\n    <div class=\"col-sm-4\"><input type=\"text\" mask=\"0000\" [(ngModel)]=\"query_params.row_per_page\" (change)=\"change_row_per_page()\" size=\"3\"> Linhas por Página</div>\n  </div>\n\n</div>\n"

/***/ }),

/***/ "./src/app/pages/request/request-edit/request-edit.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/request/request-edit/request-edit.component.ts ***!
  \**********************************************************************/
/*! exports provided: RequestEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestEditComponent", function() { return RequestEditComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var _shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../shared/tools/tools.service */ "./src/app/shared/tools/tools.service.ts");
/* harmony import */ var _shared_validators_fluent__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../shared/validators/fluent */ "./src/app/shared/validators/fluent.ts");
/* harmony import */ var _request_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../request.service */ "./src/app/pages/request/request.service.ts");
/* harmony import */ var _shared_jwmodal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../shared/jwmodal */ "./src/app/shared/jwmodal/index.ts");
/* harmony import */ var _request_model__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../request.model */ "./src/app/pages/request/request.model.ts");
/* harmony import */ var _core_platform_detector_platform_detector_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../core/platform-detector/platform-detector.service */ "./src/app/core/platform-detector/platform-detector.service.ts");
/* harmony import */ var _shared_services_message_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../shared/services/message.service */ "./src/app/shared/services/message.service.ts");











let RequestEditComponent = class RequestEditComponent {
    constructor(formBuilder, toolsService, service, toastr, modalService, platformDetectorService, fluent, messageService) {
        this.formBuilder = formBuilder;
        this.toolsService = toolsService;
        this.service = service;
        this.toastr = toastr;
        this.modalService = modalService;
        this.platformDetectorService = platformDetectorService;
        this.fluent = fluent;
        this.messageService = messageService;
        this.data_edit = new _request_model__WEBPACK_IMPORTED_MODULE_8__["Request"](); // Modelo de dados da requisição
        this.request_priority = [{ value: "Baixa" }, { value: "Média" }, { value: "Alta" }]; // Níveis de prioridade da requisição
        // Variáveis de controle
        this.dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // Máscara para o campo Data Limite
        this.processing = false;
        this.errors = [];
        this.isReadOnly = false; // Bloqueia os campos de input se a requisição tiver sido efetivada
    }
    ngOnInit() {
        // --> Inicializa a lista de erros ocmo sendo vazia
        this.errors = [];
        // --> Chama o criador do formulário
        this.createForm();
        // --> Subscreve a ação de monitoramento para verificar se o usuário está editando ou listando
        this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
            if (action == 'editing')
                this.edit();
        });
    }
    // Cria o formulário
    createForm() {
        this.requestForm = this.formBuilder.group({
            req_id: '',
            req_user_id: '',
            req_sent_date_hour: '',
            req_application: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(3), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(40)])],
            req_priority: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            req_description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].minLength(5), _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(500)])],
            req_deadline: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            req_status: '',
            req_active: true,
            req_excluded: false
        });
    }
    // Decide se a requisição vai ser criada ou atualizada
    OnSubmitRequest() {
        if (this.service.edit_id != 0) {
            this.update();
        }
        else {
            this.save();
        }
    }
    // Salva a requisição
    save() {
        this.errors = [];
        this.processing = true;
        this.data_edit = JSON.parse(JSON.stringify(this.requestForm.value));
        this.data_edit.req_deadline = this.toolsService.format_data_br_sql(this.data_edit.req_deadline);
        this.data_edit.req_sent_date_hour = this.toolsService.GetCurrentDateHour();
        this.service.save(this.data_edit).subscribe(response => {
            this.processing = false;
            if (response.resultStatus == 'success') {
                this.toastr.success('Registro salvo com sucesso!', 'OK!');
                this.service.edit_id = JSON.parse(JSON.stringify(response.data));
                this.list();
            }
        });
    }
    // Atualiza a requisição
    update() {
        this.errors = [];
        this.processing = true;
        this.data_edit = JSON.parse(JSON.stringify(this.requestForm.value));
        this.data_edit.req_deadline = this.toolsService.format_data_br_sql(this.data_edit.req_deadline);
        this.service.update(this.service.edit_id, this.data_edit).subscribe(response => {
            this.processing = false;
            if (response.resultStatus == 'success') {
                this.toastr.success('Registro atualizado com sucesso!', 'Ok!');
                this.service.edit_id = JSON.parse(JSON.stringify(response.data));
            }
        });
    }
    // Sai do modo de edição da requisição e retorna a listagem
    list() {
        this.service.changeAction('listing');
    }
    // Entra no modo de edição da requisição
    edit() {
        this.errors = [];
        this.requestForm.setValue(new _request_model__WEBPACK_IMPORTED_MODULE_8__["Request"]());
        setTimeout(() => {
            this.platformDetectorService.isPlatformBrowser() && this.input_focus.nativeElement.focus();
        }, 300);
        // Se for uma nova requisição, retornar daqui mesmo para impedir que os dados sejam buscados no banco de dados
        if (this.service.edit_id == 0) {
            this.isReadOnly = false;
            return false;
        }
        this.processing = true;
        this.service.getById(this.service.edit_id).subscribe(response => {
            this.processing = false;
            if (response.resultStatus == 'success') {
                this.data_edit = JSON.parse(JSON.stringify(response.data));
                if (this.data_edit.req_status == 'A') {
                    this.isReadOnly = true; // Bloquear inputs
                }
                else {
                    this.isReadOnly = false; // Liberar inputs
                }
                console.log("Status da requisição é --> " + this.data_edit.req_application);
                this.data_edit.req_deadline = this.toolsService.format_data_sql_br(this.data_edit.req_deadline);
                this.requestForm.setValue(this.data_edit);
                console.log(this.requestForm.value);
            }
            else {
                for (let i = 0; i < response.resultMessages.length; i++) {
                    this.errors.push(response.resultMessages[i]);
                }
            }
        }, error => {
            this.processing = false;
            this.errors.push(error);
        });
    }
    // Finaliza a requisição atual
    finish() {
        this.errors = [];
        this.processing = true;
        this.modalService.close('confirm-finish-modal-request');
        var obj = JSON.parse(JSON.stringify(this.requestForm.value));
        // Gera a mensagem para o aprovador e finaliza a requisição
        this.service.finish(obj.req_id, this.messageService.generateMsg('request', obj.req_id, 1, 2)).subscribe(result => {
            this.processing = false;
            if (result.resultStatus == 'success') {
                this.toastr.success('Registro Efetivado com sucesso!', 'OK!');
                this.list();
            }
            else {
                for (let i = 0; i < result.resultMessages.length; i++) {
                    this.errors.push(result.resultMessages[i]);
                }
                this.toastr.error('Erro ao Efetivar!', 'ERRO!');
            }
        }, error => {
            this.processing = false;
            this.errors.push(error);
            this.toastr.error('Erro ao Efetivar!', 'ERRO!');
        });
    }
    // Exclui a requisição
    delete() {
        this.errors = [];
        this.processing = true;
        this.modalService.close('confirm-delete-modal-request');
        var obj = JSON.parse(JSON.stringify(this.requestForm.value));
        this.service.delete(obj.req_id).subscribe(response => {
            this.processing = false;
            if (response.resultStatus == 'success') {
                this.toastr.success('Registro excluído com sucesso!', 'OK!');
                this.list();
            }
            else {
                for (let i = 0; i < response.resultMessages.length; i++) {
                    this.errors.push(response.resultMessages[i]);
                }
                this.toastr.error('Erro ao excluir!', 'ERRO!');
            }
        }, error => {
            this.processing = false;
            this.errors.push(error);
            this.toastr.error('Erro ao excluir!', 'ERRO!');
        });
    }
    // Reabre a requisição, mesmo depois de efetivada
    reopen() {
        this.errors = [];
        this.processing = true;
        this.modalService.close('confirm-reopen-modal-request');
        var obj = JSON.parse(JSON.stringify(this.requestForm.value));
        this.service.reopen(obj.req_id).subscribe(result => {
            this.processing = false;
            if (result.resultStatus == 'success') {
                this.toastr.success('Requisição Estornada com sucesso!', 'OK!');
                this.edit();
            }
            else {
                for (let i = 0; i < result.resultMessages.length; i++) {
                    this.errors.push(result.resultMessages[i]);
                }
                this.toastr.error('Erro ao Estornar!', 'ERRO!');
            }
        }, error => {
            this.processing = false;
            this.errors.push(error);
            this.toastr.error('Erro ao Estornar!', 'ERRO!');
        });
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('input_focus', { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], RequestEditComponent.prototype, "input_focus", void 0);
RequestEditComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-request-edit',
        template: __webpack_require__(/*! raw-loader!./request-edit.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/request/request-edit/request-edit.component.html")
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        _shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_4__["ToolsService"],
        _request_service__WEBPACK_IMPORTED_MODULE_6__["RequestService"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
        _shared_jwmodal__WEBPACK_IMPORTED_MODULE_7__["JWModalService"],
        _core_platform_detector_platform_detector_service__WEBPACK_IMPORTED_MODULE_9__["PlatformDetectorService"],
        _shared_validators_fluent__WEBPACK_IMPORTED_MODULE_5__["Fluent"],
        _shared_services_message_service__WEBPACK_IMPORTED_MODULE_10__["MessageService"]])
], RequestEditComponent);



/***/ }),

/***/ "./src/app/pages/request/request-edit/request-item/request-item-edit/request-item-edit.component.ts":
/*!**********************************************************************************************************!*\
  !*** ./src/app/pages/request/request-edit/request-item/request-item-edit/request-item-edit.component.ts ***!
  \**********************************************************************************************************/
/*! exports provided: RequestItemEditComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestItemEditComponent", function() { return RequestItemEditComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_toastr__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ngx-toastr */ "./node_modules/ngx-toastr/fesm2015/ngx-toastr.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "./node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");
/* harmony import */ var _core_platform_detector_platform_detector_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../core/platform-detector/platform-detector.service */ "./src/app/core/platform-detector/platform-detector.service.ts");
/* harmony import */ var _shared_jwmodal__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../shared/jwmodal */ "./src/app/shared/jwmodal/index.ts");
/* harmony import */ var _shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../shared/tools/tools.service */ "./src/app/shared/tools/tools.service.ts");
/* harmony import */ var _request_item_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../request-item.service */ "./src/app/pages/request/request-edit/request-item/request-item.service.ts");
/* harmony import */ var _request_item_model__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../request-item.model */ "./src/app/pages/request/request-edit/request-item/request-item.model.ts");
/* harmony import */ var _shared_validators_fluent__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../shared/validators/fluent */ "./src/app/shared/validators/fluent.ts");












let RequestItemEditComponent = class RequestItemEditComponent {
    constructor(toolsService, toastr, service, formBuilder, modalService, platformDetectorService, fluent) {
        this.toolsService = toolsService;
        this.toastr = toastr;
        this.service = service;
        this.formBuilder = formBuilder;
        this.modalService = modalService;
        this.platformDetectorService = platformDetectorService;
        this.fluent = fluent;
        this.errors = [];
        this.processing = false;
        // Variáveis de controle
        this.dateMask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];
        // Dados do item que está sendo editado no formulário
        this.data_edit = new _request_item_model__WEBPACK_IMPORTED_MODULE_10__["RequestItem"]();
        // Bloqueia os inputs se a requisição tiver sido efetivada
        this.isReadOnly = false;
        // Faixa de prioridade dos itens
        this.item_priority = ['Baixa', 'Média', 'Alta'];
    }
    ngOnInit() {
        this.errors = [];
        this.createForm();
        // Se o status da requisição for 'Em digitação', será permitido ao usuário alterar os inputs
        if (this.service.master_status == 'E') {
            this.isReadOnly = false;
        }
        // Se o status da requisição for 'Requisição Ativa', será bloqueado os inputs para alteração
        if (this.service.master_status == 'A') {
            this.isReadOnly = true;
        }
        // Verifica se a ação de editar um item é a que será executada
        this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
            if (action == 'editing')
                this.edit();
        });
        // Monitora a barra de pesquisa por pn do item
        this.states = rxjs__WEBPACK_IMPORTED_MODULE_4__["Observable"].create((observer) => { observer.next(this.mainForm.value.itm_pn); })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["mergeMap"])((token) => this.service.filterResults(token)));
    }
    ngOnDestroy() {
        this.subscription_change_action.unsubscribe();
    }
    // Cria o formulário reativo da requisição com algumas validações
    createForm() {
        this.mainForm = this.formBuilder.group({
            itm_id: 0,
            itm_request_id: 0,
            itm_status_id: 0,
            itm_pn: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            itm_quantity: [0, _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            itm_description: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].maxLength(500)])],
            itm_application: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            itm_priority: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            itm_deadline: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].compose([_angular_forms__WEBPACK_IMPORTED_MODULE_2__["Validators"].required])],
            itm_active: true,
            itm_excluded: false
        });
    }
    list() {
        this.service.change_action('listing');
    }
    // Cria um novo item
    save(next_action) {
        this.errors = [];
        this.processing = true;
        this.data_edit = JSON.parse(JSON.stringify(this.mainForm.value));
        this.data_edit.itm_deadline = this.toolsService.format_data_br_sql(this.data_edit.itm_deadline);
        this.data_edit.itm_request_id = this.service.master_id;
        if (this.data_edit.itm_description == "") {
            this.data_edit.itm_description = "Nenhuma";
        }
        // Cria um novo item
        if (this.data_edit.itm_id == 0) {
            console.log("Criando um novo item...");
            this.service.save(this.data_edit).subscribe(response => {
                this.processing = false;
                if (response.resultStatus == 'success') {
                    this.toastr.success('Registro salvo com sucesso!', 'OK!');
                    if (next_action == 'list') {
                        this.service.edit_id = JSON.parse(JSON.stringify(response.data));
                        this.list();
                    }
                    else {
                        this.service.edit_id = 0;
                        this.edit();
                    }
                }
                else {
                    for (let i = 0; i < response.resultMessages.length; i++) {
                        this.errors.push(response.resultMessages[i]);
                    }
                    this.toastr.error('Erro ao salvar!', 'ERRO!');
                }
            }, error => {
                if (typeof error.InvalidModelState === "undefined") {
                    this.errors.push(error);
                }
                else {
                    for (let i = 0; i < error.InvalidModelState.length; i++) {
                        this.errors.push(error.InvalidModelState[i]);
                    }
                }
                this.processing = false;
                this.toastr.error('Não foi possível salvar o registro!', 'ERRO!');
            });
        }
        // Atualiza um item existente
        else {
            console.log("Atualizando um item...");
            this.service.update(this.service.edit_id, this.data_edit).subscribe(response => {
                this.processing = false;
                if (response.resultStatus == 'success') {
                    this.toastr.success('Registro atualizado com sucesso!', 'OK!');
                    if (next_action == 'list') {
                        this.service.edit_id = JSON.parse(JSON.stringify(response.data));
                        this.list();
                    }
                    else {
                        this.service.edit_id = 0;
                        this.edit();
                    }
                }
                else {
                    for (let i = 0; i < response.resultMessages.length; i++) {
                        this.errors.push(response.resultMessages[i]);
                    }
                    this.toastr.error('Erro ao salvar!', 'ERRO!');
                }
            }, error => {
                if (typeof error.InvalidModelState === "undefined") {
                    this.errors.push(error);
                }
                else {
                    for (let i = 0; i < error.InvalidModelState.length; i++) {
                        this.errors.push(error.InvalidModelState[i]);
                    }
                }
                this.processing = false;
                this.toastr.error('Não foi possível salvar o registro!', 'ERRO!');
            });
        }
    }
    // Edita um determinado item
    edit() {
        this.errors = [];
        this.mainForm.setValue(new _request_item_model__WEBPACK_IMPORTED_MODULE_10__["RequestItem"]());
        setTimeout(() => { this.platformDetectorService.isPlatformBrowser() && this.input_focus.nativeElement.focus(); }, 300);
        this.processing = true;
        console.log("Mater ID --> " + this.service.master_id);
        console.log("Edit ID --> " + this.service.edit_id);
        // Se for um novo item, então pegar os dados da requisição e setar como valores padrões
        if (this.service.edit_id == 0) {
            console.log("É um novo item!");
            this.service.getRequestDependencies(this.service.master_id).subscribe(response => {
                this.processing = false;
                if (response.resultStatus == 'success') {
                    var data = JSON.parse(JSON.stringify(response.data));
                    this.data_edit.itm_application = data.req_application;
                    this.data_edit.itm_quantity = 1;
                    this.data_edit.itm_deadline = this.toolsService.format_data_sql_br(data.req_deadline);
                    this.mainForm.setValue(this.data_edit);
                    // Configura como default o valor da prioridade obtida da requisição
                    this.mainForm.patchValue({
                        itm_priority: data.req_priority
                    });
                }
                else {
                    for (let i = 0; i < response.resultMessages.length; i++) {
                        this.errors.push(response.resultMessages[i]);
                    }
                }
            }, error => {
                this.processing = false;
                this.errors.push(error);
            });
        }
        // Se não for, então buscar os dados do item existente
        else {
            console.log("É um item existente!");
            this.service.getById(this.service.edit_id).subscribe(response => {
                this.processing = false;
                if (response.resultStatus == 'success') {
                    this.data_edit = JSON.parse(JSON.stringify(response.data));
                    this.data_edit.itm_deadline = this.toolsService.format_data_sql_br(this.data_edit.itm_deadline);
                    this.mainForm.setValue(this.data_edit);
                }
                else {
                    for (let i = 0; i < response.resultMessages.length; i++) {
                        this.errors.push(response.resultMessages[i]);
                    }
                }
            }, error => {
                this.processing = false;
                this.errors.push(error);
            });
        }
    }
    // Exclui um determinado item
    delete() {
        this.errors = [];
        this.processing = true;
        this.modalService.close('confirm-delete-modal-movprod-item');
        var obj = JSON.parse(JSON.stringify(this.mainForm.value));
        this.service.delete(obj.itm_id).subscribe(result => {
            this.processing = false;
            if (result.resultStatus == 'success') {
                this.toastr.success('Registro excluido com sucesso!', 'OK!');
                this.list();
            }
            else {
                for (let i = 0; i < result.resultMessages.length; i++) {
                    this.errors.push(result.resultMessages[i]);
                }
                this.toastr.error('Erro ao excluir!', 'ERRO!');
            }
        }, error => {
            this.processing = false;
            this.errors.push(error);
            this.toastr.error('Erro ao excluir!', 'ERRO!');
        });
    }
    item_change_typeahead_loading(e) {
        this.item_typeahead_loading = e;
    }
    item_typeahead_onselect(e) {
        console.log(e);
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('input_focus', { static: true }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"])
], RequestItemEditComponent.prototype, "input_focus", void 0);
RequestItemEditComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-request-item-edit',
        template: __webpack_require__(/*! raw-loader!./request-item-edit.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/request/request-edit/request-item/request-item-edit/request-item-edit.component.html")
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_8__["ToolsService"],
        ngx_toastr__WEBPACK_IMPORTED_MODULE_3__["ToastrService"],
        _request_item_service__WEBPACK_IMPORTED_MODULE_9__["RequestItemService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        _shared_jwmodal__WEBPACK_IMPORTED_MODULE_7__["JWModalService"],
        _core_platform_detector_platform_detector_service__WEBPACK_IMPORTED_MODULE_6__["PlatformDetectorService"],
        _shared_validators_fluent__WEBPACK_IMPORTED_MODULE_11__["Fluent"]])
], RequestItemEditComponent);



/***/ }),

/***/ "./src/app/pages/request/request-edit/request-item/request-item.component.ts":
/*!***********************************************************************************!*\
  !*** ./src/app/pages/request/request-edit/request-item/request-item.component.ts ***!
  \***********************************************************************************/
/*! exports provided: RequestItemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestItemComponent", function() { return RequestItemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shared/tools/tools.service */ "./src/app/shared/tools/tools.service.ts");
/* harmony import */ var _request_item_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./request-item.service */ "./src/app/pages/request/request-edit/request-item/request-item.service.ts");
/* harmony import */ var _request_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../request.service */ "./src/app/pages/request/request.service.ts");






let RequestItemComponent = class RequestItemComponent {
    constructor(req_service, service, formBuilderSearch, toolsService) {
        this.req_service = req_service;
        this.service = service;
        this.formBuilderSearch = formBuilderSearch;
        this.toolsService = toolsService;
        this.total_pages = 0;
        this.total_records = 0;
        this.query_param = { list_inactive: false, current_page: 1, row_per_page: 1000, itm_request_id: 0 };
        this.processing = false;
    }
    ngOnInit() {
        this.service.master_id = this.master_id;
        this.service.master_status = this.master_status;
        this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
            if (action == 'listing')
                this.list();
        });
        this.createSearchForm();
        this.list();
    }
    ngOnDestroy() {
        this.subscription_change_action.unsubscribe();
    }
    createSearchForm() {
        this.searchForm = this.formBuilderSearch.group({
            text_search: this.formBuilderSearch.control('')
        });
    }
    list() {
        this.processing = true;
        this.errors = [];
        this.data_list = [];
        this.query_param = Object.assign({}, this.query_param, this.searchForm.value);
        this.query_param.itm_request_id = this.service.master_id;
        this.service.list(this.query_param).subscribe(result => {
            console.log('Itens da requisição --> ' + result.data);
            this.processing = false;
            if (result.resultStatus == 'success') {
                this.total_records = parseInt(result.totalRecords);
                this.total_pages = parseInt(result.totalPages);
                this.data_list = JSON.parse(JSON.stringify(result.data));
                this.resume = JSON.parse(JSON.stringify(result.resume));
                this.service.action = 'listing';
            }
            else {
                for (let i = 0; i < result.resultMessages.length; i++) {
                    this.service.action = '';
                    this.errors.push(result.resultMessages[i]);
                }
            }
        }, error => {
            this.processing = false;
            this.errors.push(error);
        });
    }
    edit(id) {
        this.service.edit_id = id;
        this.service.change_action('editing');
    }
};
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
], RequestItemComponent.prototype, "master_id", void 0);
tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
], RequestItemComponent.prototype, "master_status", void 0);
RequestItemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-request-item',
        template: __webpack_require__(/*! raw-loader!./request-item.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/request/request-edit/request-item/request-item.component.html"),
        styles: ["\n    @media only screen and (min-width: 800px) {\n      .tbl-col1 { text-align:left; width: 40%; }\n      .tbl-col2 { text-align:left; width: 30%; }\n      .tbl-col3 { text-align:left; width: 30%; }\n      .tbl-col-last { text-align:center; width: 10%;}\n    }\n  "]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_request_service__WEBPACK_IMPORTED_MODULE_5__["RequestService"],
        _request_item_service__WEBPACK_IMPORTED_MODULE_4__["RequestItemService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        _shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_3__["ToolsService"]])
], RequestItemComponent);



/***/ }),

/***/ "./src/app/pages/request/request-edit/request-item/request-item.model.ts":
/*!*******************************************************************************!*\
  !*** ./src/app/pages/request/request-edit/request-item/request-item.model.ts ***!
  \*******************************************************************************/
/*! exports provided: RequestItem */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestItem", function() { return RequestItem; });
class RequestItem {
    constructor() {
        this.itm_id = 0;
        this.itm_request_id = 0;
        this.itm_status_id = 1; // Começa com o status de 'AAT'
        this.itm_pn = '';
        this.itm_quantity = 0;
        this.itm_description = '';
        this.itm_application = '';
        this.itm_priority = '';
        this.itm_deadline = '';
        this.itm_active = true;
        this.itm_excluded = false;
    }
}


/***/ }),

/***/ "./src/app/pages/request/request-edit/request-item/request-item.service.ts":
/*!*********************************************************************************!*\
  !*** ./src/app/pages/request/request-edit/request-item/request-item.service.ts ***!
  \*********************************************************************************/
/*! exports provided: RequestItemService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestItemService", function() { return RequestItemService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _core_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../core/api */ "./src/app/core/api.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "./node_modules/rxjs/_esm2015/operators/index.js");





let RequestItemService = class RequestItemService {
    constructor(http) {
        this.http = http;
        this.url = _core_api__WEBPACK_IMPORTED_MODULE_3__["API_URL"] + '/RequestItem';
        this.edit_id = 0;
        this.master_id = 0;
        this.master_status = '';
        this.change_action_emitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    change_action(action) {
        this.action = action;
        this.change_action_emitter.emit(action);
    }
    // Faz a listagem dos itens de uma requisição
    list(query_params) {
        return this.http.get(this.url + '?param=' + JSON.stringify(query_params));
    }
    getById(id) {
        return this.http.get(this.url + '/' + id);
    }
    save(requestItem) {
        console.log(requestItem);
        return this.http.post(this.url, requestItem);
    }
    update(id, request_item) {
        return this.http.put(this.url + '/' + id, request_item);
    }
    // Exclui um determinado item da requisição
    delete(id) {
        return this.http.delete(this.url + '/' + id);
    }
    // Fornecer o id da requisição para obeter os seguintes dados: prioridade, data limite e aplicação
    getRequestDependencies(id) {
        return this.http.get(this.url + '/' + id + '/requestDependencies');
    }
    // Filtra os resultados de busca de um determinado item
    filterResults(token) {
        return this.http.get(this.url + '/autocomplete?search=' + token)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((results) => results.filter(res => res.itm_pn.toLowerCase().indexOf(token.toLowerCase()) > -1)));
    }
};
RequestItemService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], RequestItemService);



/***/ }),

/***/ "./src/app/pages/request/request.component.ts":
/*!****************************************************!*\
  !*** ./src/app/pages/request/request.component.ts ***!
  \****************************************************/
/*! exports provided: RequestComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestComponent", function() { return RequestComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var _shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../shared/tools/tools.service */ "./src/app/shared/tools/tools.service.ts");
/* harmony import */ var _request_request_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../request/request.service */ "./src/app/pages/request/request.service.ts");





let RequestComponent = class RequestComponent {
    constructor(service, formBuilderSearch, toolsService) {
        this.service = service;
        this.formBuilderSearch = formBuilderSearch;
        this.toolsService = toolsService;
        this.advance_search = false;
        this.total_pages = 0;
        this.total_records = 0;
        this.query_params = { order: '', current_page: 1, row_per_page: 10 };
        this.processing = false;
    }
    ngOnInit() {
        this.subscription_change_action = this.service.change_action_emitter.subscribe(action => {
            if (action == 'listing')
                this.list();
        });
        this.createSearchForm();
        this.list();
    }
    // Cria o formulário
    createSearchForm() {
        this.searchForm = this.formBuilderSearch.group({
            text_search: this.formBuilderSearch.control(''),
            list_open: this.formBuilderSearch.control(true),
            list_finished: this.formBuilderSearch.control(true)
        });
    }
    // Listar requisições
    list() {
        this.advance_search = false;
        this.processing = true;
        this.erros = [];
        this.data_list = [];
        this.query_params = Object.assign({}, this.query_params, this.searchForm.value);
        this.service.list(this.query_params).subscribe(result => {
            this.processing = false;
            // Se a solicitação for concluída com sucesso, então liste as requisições
            if (result.resultStatus == 'success') {
                this.total_records = parseInt(result.totalRecords);
                this.total_pages = parseInt(result.totalPages);
                this.data_list = JSON.parse(JSON.stringify(result.data));
                this.service.action = 'listing';
            }
            else // Caso não, mostre os erros gerados
             {
                for (let i = 0; i < result.resultMessages.length; i++) {
                    this.service.action = '';
                    this.erros.push(result.resultMessages[i]);
                }
            }
        }, error => {
            this.processing = false;
            this.erros.push(error);
        });
    }
    // Adicionar requisição
    edit(id) {
        this.advance_search = false;
        this.service.edit_id = id;
        this.service.changeAction('editing');
    }
    // PAGINAÇÃO
    // Altera a ordem de exibição dos registros
    change_order(order) {
        if (!this.query_params.order.includes(' Asc')) {
            this.query_params.order = order + ' Asc';
        }
        else {
            this.query_params.order = order + ' Desc';
        }
        this.list();
    }
    // Altera a o número de registros por página
    change_row_per_page() {
        let n = this.query_params.row_per_page;
        if (n < 1)
            this.query_params.row_per_page = 10;
        this.query_params.current_page = 1;
        this.list();
    }
    // Vai para a próxima página
    next_page() {
        if (this.query_params.current_page < this.total_pages) {
            this.query_params.current_page++;
            this.list();
        }
    }
    // Volta à página anterior
    previous_page() {
        if (this.query_params.current_page > 1) {
            this.query_params.current_page--;
            this.list();
        }
    }
    // Retorna a primeira página
    first_page() {
        this.query_params.current_page = 1;
        this.list();
    }
    // Retorna a última página
    last_page() {
        this.query_params.current_page = this.total_pages;
        this.list();
    }
};
RequestComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-request',
        template: __webpack_require__(/*! raw-loader!./request.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/request/request.component.html"),
        styles: ["\n    @media only screen and (min-width: 800px) {\n      .tbl-col1 { text-align:left; width: 15%; }\n      .tbl-col2 { text-align:left; width: 30%; }\n      .tbl-col3 { text-align:left; width: 30%; }\n      .tbl-col4 { text-align:right; width: 15%; }\n      .tbl-col-last { text-align:center; width: 10%;}\n    }\n  "]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_request_request_service__WEBPACK_IMPORTED_MODULE_4__["RequestService"],
        _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormBuilder"],
        _shared_tools_tools_service__WEBPACK_IMPORTED_MODULE_3__["ToolsService"]])
], RequestComponent);



/***/ }),

/***/ "./src/app/pages/request/request.model.ts":
/*!************************************************!*\
  !*** ./src/app/pages/request/request.model.ts ***!
  \************************************************/
/*! exports provided: Request */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Request", function() { return Request; });
class Request {
    constructor() {
        this.req_id = 0;
        this.req_user_id = 1;
        this.req_sent_date_hour = '';
        this.req_description = '';
        this.req_application = '';
        this.req_priority = '';
        this.req_deadline = '';
        this.req_status = 'E';
        this.req_active = true;
        this.req_excluded = false;
    }
}


/***/ }),

/***/ "./src/app/pages/request/request.module.ts":
/*!*************************************************!*\
  !*** ./src/app/pages/request/request.module.ts ***!
  \*************************************************/
/*! exports provided: RequestModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestModule", function() { return RequestModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm2015/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _request_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./request.component */ "./src/app/pages/request/request.component.ts");
/* harmony import */ var _request_edit_request_edit_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./request-edit/request-edit.component */ "./src/app/pages/request/request-edit/request-edit.component.ts");
/* harmony import */ var _request_edit_request_item_request_item_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./request-edit/request-item/request-item.component */ "./src/app/pages/request/request-edit/request-item/request-item.component.ts");
/* harmony import */ var _request_edit_request_item_request_item_edit_request_item_edit_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./request-edit/request-item/request-item-edit/request-item-edit.component */ "./src/app/pages/request/request-edit/request-item/request-item-edit/request-item-edit.component.ts");











const ROUTES = [{ path: '', component: _request_component__WEBPACK_IMPORTED_MODULE_7__["RequestComponent"] }];
let RequestModule = class RequestModule {
};
RequestModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormsModule"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["ReactiveFormsModule"],
            ngx_bootstrap__WEBPACK_IMPORTED_MODULE_5__["TypeaheadModule"],
            _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__["SharedModule"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(ROUTES)
        ],
        providers: [],
        declarations: [_request_component__WEBPACK_IMPORTED_MODULE_7__["RequestComponent"], _request_edit_request_edit_component__WEBPACK_IMPORTED_MODULE_8__["RequestEditComponent"], _request_edit_request_item_request_item_component__WEBPACK_IMPORTED_MODULE_9__["RequestItemComponent"], _request_edit_request_item_request_item_edit_request_item_edit_component__WEBPACK_IMPORTED_MODULE_10__["RequestItemEditComponent"]]
    })
], RequestModule);



/***/ }),

/***/ "./src/app/pages/request/request.service.ts":
/*!**************************************************!*\
  !*** ./src/app/pages/request/request.service.ts ***!
  \**************************************************/
/*! exports provided: RequestService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestService", function() { return RequestService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm2015/http.js");
/* harmony import */ var _core_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../core/api */ "./src/app/core/api.ts");




let RequestService = class RequestService {
    constructor(http) {
        this.http = http;
        this.url = _core_api__WEBPACK_IMPORTED_MODULE_3__["API_URL"] + '/Request';
        this.change_action_emitter = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        // Essa variável guarda o registro que está sendo editado no momento
        this.edit_id = 0;
        this.master_id = 0;
    }
    // Modifica a ação atual
    changeAction(action) {
        this.action = action;
        this.change_action_emitter.emit(action);
    }
    // Lista as requisições
    list(query_params) {
        return this.http.get(this.url + '?param=' + JSON.stringify(query_params));
    }
    // Retorna uma requisição pelo id
    getById(id) {
        console.log(this.url + '/' + id);
        return this.http.get(this.url + '/' + id);
    }
    // Cria uma nova requisição de compra
    save(request) {
        console.log(request);
        return this.http.post(this.url, request);
    }
    // Atualiza uma determinada requisição
    update(id, request) {
        return this.http.put(this.url + '/' + id, request);
    }
    // Finaliza e envia para aprovação a requisição atual
    finish(id, message) {
        return this.http.post(this.url + '/' + id + '/send', message);
    }
    // Exclui uma determinada requisição
    delete(id) {
        return this.http.delete(this.url + '/' + id);
    }
    // Reabre uma requisição
    reopen(id) {
        return this.http.put(this.url + '/' + id + '/reopen', "");
    }
};
RequestService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_2__["HttpClient"]])
], RequestService);



/***/ }),

/***/ "./src/app/shared/services/message.model.ts":
/*!**************************************************!*\
  !*** ./src/app/shared/services/message.model.ts ***!
  \**************************************************/
/*! exports provided: Message */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Message", function() { return Message; });
class Message {
    constructor() {
        this.msg_id = 0;
        this.msg_user_from = 0;
        this.msg_user_to = 0;
        this.msg_source_type = '';
        this.msg_source_key = 0;
        this.msg_text = '';
        this.msg_sent_date_hour = '';
        this.msg_read = false;
        this.msg_important = false;
        this.msg_excluded = false;
    }
}


/***/ }),

/***/ "./src/app/shared/services/message.service.ts":
/*!****************************************************!*\
  !*** ./src/app/shared/services/message.service.ts ***!
  \****************************************************/
/*! exports provided: MessageService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageService", function() { return MessageService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _message_model__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./message.model */ "./src/app/shared/services/message.model.ts");
/* harmony import */ var _tools_tools_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../tools/tools.service */ "./src/app/shared/tools/tools.service.ts");




let MessageService = class MessageService {
    constructor(toolsService) {
        this.toolsService = toolsService;
        // Cria mensagem
        this.message = new _message_model__WEBPACK_IMPORTED_MODULE_2__["Message"]();
    }
    // Cria a mensagem
    generateMsg(msg_source_type, msg_source_key, msg_from, msg_to) {
        console.log("Msg_user_from: " + msg_from);
        if (msg_source_type == 'request') {
            this.msg_type = 'requisição';
        }
        this.message.msg_user_from = msg_from;
        console.log("Passei :)");
        this.message.msg_user_to = msg_to;
        this.message.msg_source_type = msg_source_type;
        this.message.msg_source_key = msg_source_key;
        this.message.msg_sent_date_hour = this.toolsService.GetCurrentDateHour();
        this.message.msg_text = 'Você possui uma nova ' + this.msg_type + ' de compra!\nSolicitado por: ' + msg_from;
        return this.message;
    }
};
MessageService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
        providedIn: 'root'
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_tools_tools_service__WEBPACK_IMPORTED_MODULE_3__["ToolsService"]])
], MessageService);



/***/ }),

/***/ "./src/app/shared/tools/tools.service.ts":
/*!***********************************************!*\
  !*** ./src/app/shared/tools/tools.service.ts ***!
  \***********************************************/
/*! exports provided: ToolsService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ToolsService", function() { return ToolsService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var accounting_js_lib_formatNumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! accounting-js/lib/formatNumber.js */ "./node_modules/accounting-js/lib/formatNumber.js");
/* harmony import */ var accounting_js_lib_formatMoney_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! accounting-js/lib/formatMoney.js */ "./node_modules/accounting-js/lib/formatMoney.js");




let ToolsService = class ToolsService {
    calcHour(hour1, hour2) {
        if (hour1 == '' || hour1 == null)
            return '';
        if (hour2 == '' || hour2 == null)
            return '';
        var h1 = hour1.split(':');
        var h2 = hour2.split(':');
        var hours = parseInt(h2[0]) - parseInt(h1[0]);
        if (hours < 0)
            hours += 24;
        var minutes = parseInt(h2[1]) - parseInt(h1[1]);
        if (minutes < 0) {
            hours--;
            minutes += 60;
        }
        return this.zeroPad(hours, 2) + ':' + this.zeroPad(minutes, 2);
    }
    convertHourToDecimal(hour) {
        if (hour == null) {
            return 0;
        }
        var hr = hour.split(":");
        var h = parseInt(hr[0]);
        var m = parseInt(hr[1]);
        var mresult = 0;
        if (m > 3 && m <= 9)
            mresult = 0.1;
        if (m > 9 && m <= 15)
            mresult = 0.2;
        if (m > 15 && m <= 21)
            mresult = 0.3;
        if (m > 21 && m <= 27)
            mresult = 0.4;
        if (m > 27 && m <= 33)
            mresult = 0.5;
        if (m > 33 && m <= 39)
            mresult = 0.6;
        if (m > 39 && m <= 45)
            mresult = 0.7;
        if (m > 45 && m <= 51)
            mresult = 0.8;
        if (m > 51 && m <= 57)
            mresult = 0.9;
        if (m > 57)
            mresult = 1.0;
        return h + mresult;
    }
    zeroPad(num, places) {
        var zero = places - num.toString().length + 1;
        return Array(+(zero > 0 && zero)).join("0") + num;
    }
    convertDatePickerToBr(data) {
        var data_retorno = new Date(data);
        return this.format_data_sql_br(data_retorno.toJSON());
    }
    convertDatePickerToSql(data) {
        if (data == '') {
            return '';
        }
        if (data == null) {
            return '';
        }
        return data.split('T')[0];
    }
    format_data_br_sql(data) {
        console.log(data);
        if (!data) {
            return "";
        }
        if (data.indexOf("/") != -1) {
            var data_split = data.split("/");
            return data_split[2] + "-" + data_split[1] + "-" + data_split[0];
        }
        else {
            return data;
        }
    }
    // Retorna a data e hora atual
    GetCurrentDateHour() {
        return (new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0]);
    }
    getDateToDatetime(data) {
        if (!data)
            return '';
        var data_split = data.split("T");
        return this.format_data_sql_br(data_split[0]);
    }
    getHourToDatetime(data) {
        if (!data)
            return '';
        var data_split = data.split("T");
        return data_split[1].substring(0, 5);
        ;
    }
    format_data_sql_br(data) {
        if (!data) {
            return '';
        }
        var data_split = data.split("-");
        return data_split[2].substring(0, 2) + "/" + data_split[1] + "/" + data_split[0];
    }
    format_data_dia(data) {
        if (!data) {
            return "";
        }
        var data_split = data.split("-");
        return data_split[2].substring(0, 2);
    }
    show_message_erro(messages) {
        let text = "";
        let i;
        if (Array.isArray(messages)) {
            for (i = 0; i < messages.length; i++) {
                text += messages[i] + "<br>";
            }
        }
        else {
            text = messages;
        }
        return text;
    }
    numberFormat(number, decimal, hideZero) {
        if (hideZero && parseFloat(number) == 0)
            return '';
        return Object(accounting_js_lib_formatNumber_js__WEBPACK_IMPORTED_MODULE_2__["default"])(number, { precision: decimal, thousand: ".", decimal: "," });
    }
    realFormat(price, blank_zero = false) {
        if (blank_zero) {
            if (parseFloat(price) == 0) {
                return "";
            }
        }
        return Object(accounting_js_lib_formatMoney_js__WEBPACK_IMPORTED_MODULE_3__["default"])(price, { symbol: "", precision: 2, thousand: ".", decimal: "," });
    }
    dollarFormat(price, blank_zero = false) {
        if (blank_zero) {
            if (parseFloat(price) == 0) {
                return "";
            }
        }
        return Object(accounting_js_lib_formatMoney_js__WEBPACK_IMPORTED_MODULE_3__["default"])(price, { symbol: "", precision: 2, thousand: ",", decimal: "." });
    }
    moneyBrToSql(numero) {
        if (numero == '')
            return '0';
        var res = numero.toString().replace(".", "");
        res = res.replace(".", "");
        res = res.replace(".", "");
        res = res.replace(".", "");
        res = res.replace(",", ".");
        return res;
    }
    numberToSql(numero) {
        if (numero == '')
            return '0';
        var res = numero.toString().replace(",", ".");
        return res;
    }
    sqlToNumber(numero) {
        if (numero == '')
            return '0';
        var res = numero.toString().replace(".", ",");
        return res;
    }
};
ToolsService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' })
], ToolsService);



/***/ }),

/***/ "./src/app/shared/validators/fluent.ts":
/*!*********************************************!*\
  !*** ./src/app/shared/validators/fluent.ts ***!
  \*********************************************/
/*! exports provided: Fluent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Fluent", function() { return Fluent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm2015/core.js");


let Fluent = class Fluent {
    // Valida uma determinada data
    isValidDate(date) {
        var notValid = false;
        var ardt = new Array;
        var expReg = new RegExp("(0[1-9]|[12][0-9]|3[01])/(0[1-9]|1[012])/[12][0-9]{3}");
        ardt = date.split("/");
        var new_date = new Date(ardt[2], ardt[1] - 1, ardt[0]);
        if (date.search(expReg) == -1) {
            notValid = true;
        }
        else if (((ardt[1] == 4) || (ardt[1] == 6) || (ardt[1] == 9) || (ardt[1] == 11)) && (ardt[0] > 30)) {
            notValid = true;
        }
        else if (ardt[1] == 2) {
            if ((ardt[0] > 28) && ((ardt[2] % 4) != 0)) {
                notValid = true;
            }
            if ((ardt[0] > 29) && ((ardt[2] % 4) == 0)) {
                notValid = true;
            }
        }
        // Verifica se a data é igual à data atual ou superior
        else if (new_date < new Date()) {
            notValid = true;
        }
        // Verifica se a data não excede o limite de 1 ano
        var future_date = new Date();
        future_date.setFullYear(future_date.getFullYear() + 1);
        if (new_date > future_date) {
            notValid = true;
        }
        if (notValid) {
            return false;
        }
        return true;
    }
};
Fluent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({ providedIn: 'root' })
], Fluent);



/***/ })

}]);
//# sourceMappingURL=pages-request-request-module-es2015.js.map