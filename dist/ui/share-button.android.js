"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var share_button_common_1 = require("./share-button.common");
var ShareButton = (function (_super) {
    __extends(ShareButton, _super);
    function ShareButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShareButton.prototype.createNativeView = function () {
        this.nativeView = new com.facebook.share.widget.ShareButton(this._context);
        if (this.content) {
            this.nativeView.setShareContent(this.content);
        }
        return this.nativeView;
    };
    ShareButton.prototype.onContentChanged = function (oldValue, newValue) {
        if (this.nativeView) {
            this.nativeView.setShareContent(newValue);
        }
    };
    return ShareButton;
}(share_button_common_1.FacebookShareButtonBase));
exports.ShareButton = ShareButton;
var SendButton = (function (_super) {
    __extends(SendButton, _super);
    function SendButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SendButton.prototype.createNativeView = function () {
        this.nativeView = new com.facebook.share.widget.SendButton(this._context);
        if (this.content) {
            this.nativeView.setShareContent(this.content);
        }
        return this.nativeView;
    };
    SendButton.prototype.onContentChanged = function (oldValue, newValue) {
        if (this.nativeView) {
            this.nativeView.setShareContent(newValue);
        }
    };
    return SendButton;
}(share_button_common_1.FacebookShareButtonBase));
exports.SendButton = SendButton;
