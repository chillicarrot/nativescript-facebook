"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var FacebookLoginButtonDirective = (function () {
    function FacebookLoginButtonDirective() {
    }
    FacebookLoginButtonDirective = __decorate([
        core_1.Directive({
            selector: "FacebookLoginButton"
        })
    ], FacebookLoginButtonDirective);
    return FacebookLoginButtonDirective;
}());
exports.FacebookLoginButtonDirective = FacebookLoginButtonDirective;
var FacebookShareButtonDirective = (function () {
    function FacebookShareButtonDirective() {
    }
    FacebookShareButtonDirective = __decorate([
        core_1.Directive({
            selector: "FacebookShareButton"
        })
    ], FacebookShareButtonDirective);
    return FacebookShareButtonDirective;
}());
exports.FacebookShareButtonDirective = FacebookShareButtonDirective;
var FacebookSendButtonDirective = (function () {
    function FacebookSendButtonDirective() {
    }
    FacebookSendButtonDirective = __decorate([
        core_1.Directive({
            selector: "FacebookSendButton"
        })
    ], FacebookSendButtonDirective);
    return FacebookSendButtonDirective;
}());
exports.FacebookSendButtonDirective = FacebookSendButtonDirective;
exports.DIRECTIVES = [FacebookLoginButtonDirective, FacebookShareButtonDirective, FacebookSendButtonDirective];
