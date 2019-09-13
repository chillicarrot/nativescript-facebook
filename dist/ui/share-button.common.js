"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var view_1 = require("tns-core-modules/ui/core/view");
var FacebookShareButtonBase = (function (_super) {
    __extends(FacebookShareButtonBase, _super);
    function FacebookShareButtonBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return FacebookShareButtonBase;
}(view_1.View));
exports.FacebookShareButtonBase = FacebookShareButtonBase;
exports.contentProperty = new view_1.Property({
    name: 'content',
    defaultValue: null,
    valueChanged: function (target, oldValue, newValue) {
        target.onContentChanged(oldValue, newValue);
    }
});
exports.contentProperty.register(FacebookShareButtonBase);
