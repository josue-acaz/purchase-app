(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["pages-pending-requests-pending-requests-module"],{

/***/ "./node_modules/raw-loader/index.js!./src/app/pages/pending-requests/pending-requests.component.html":
/*!**************************************************************************************************!*\
  !*** ./node_modules/raw-loader!./src/app/pages/pending-requests/pending-requests.component.html ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  pending-requests works!\n</p>\n"

/***/ }),

/***/ "./src/app/pages/pending-requests/pending-requests.component.scss":
/*!************************************************************************!*\
  !*** ./src/app/pages/pending-requests/pending-requests.component.scss ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwZW5kaW5nLXJlcXVlc3RzL3BlbmRpbmctcmVxdWVzdHMuY29tcG9uZW50LnNjc3MifQ== */"

/***/ }),

/***/ "./src/app/pages/pending-requests/pending-requests.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/pages/pending-requests/pending-requests.component.ts ***!
  \**********************************************************************/
/*! exports provided: PendingRequestsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingRequestsComponent", function() { return PendingRequestsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var PendingRequestsComponent = /** @class */ (function () {
    function PendingRequestsComponent() {
    }
    PendingRequestsComponent.prototype.ngOnInit = function () {
    };
    PendingRequestsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-pending-requests',
            template: __webpack_require__(/*! raw-loader!./pending-requests.component.html */ "./node_modules/raw-loader/index.js!./src/app/pages/pending-requests/pending-requests.component.html"),
            styles: [__webpack_require__(/*! ./pending-requests.component.scss */ "./src/app/pages/pending-requests/pending-requests.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], PendingRequestsComponent);
    return PendingRequestsComponent;
}());



/***/ }),

/***/ "./src/app/pages/pending-requests/pending-requests.module.ts":
/*!*******************************************************************!*\
  !*** ./src/app/pages/pending-requests/pending-requests.module.ts ***!
  \*******************************************************************/
/*! exports provided: PendingRequestsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PendingRequestsModule", function() { return PendingRequestsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_bootstrap__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ngx-bootstrap */ "./node_modules/ngx-bootstrap/esm5/ngx-bootstrap.js");
/* harmony import */ var _shared_shared_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../shared/shared.module */ "./src/app/shared/shared.module.ts");
/* harmony import */ var _pending_requests_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./pending-requests.component */ "./src/app/pages/pending-requests/pending-requests.component.ts");








var ROUTES = [{ path: '', component: _pending_requests_component__WEBPACK_IMPORTED_MODULE_7__["PendingRequestsComponent"] }];
var PendingRequestsModule = /** @class */ (function () {
    function PendingRequestsModule() {
    }
    PendingRequestsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
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
            declarations: [_pending_requests_component__WEBPACK_IMPORTED_MODULE_7__["PendingRequestsComponent"]]
        })
    ], PendingRequestsModule);
    return PendingRequestsModule;
}());



/***/ })

}]);
//# sourceMappingURL=pages-pending-requests-pending-requests-module-es5.js.map