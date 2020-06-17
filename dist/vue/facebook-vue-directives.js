"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var FacebookPlugin = {
    install: function (Vue, options) {
        Vue.registerElement("FacebookLoginButton", function () { return require("../").LoginButton; });
        Vue.registerElement("FacebookShareButton", function () { return require('../').ShareButton; });
        Vue.registerElement("FacebookSendButton", function () { return require('../').SendButton; });
    }
};
exports.default = FacebookPlugin;
