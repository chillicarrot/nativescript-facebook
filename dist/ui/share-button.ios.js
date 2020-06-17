"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var share_button_common_1 = require("./share-button.common");
var ShareButton = (function (_super) {
    __extends(ShareButton, _super);
    function ShareButton() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShareButton.prototype.createNativeView = function () {
        var button = FBSDKShareButton.new();
        this.nativeView = button;
        if (this.content) {
            this.nativeView.shareContent = this.content;
        }
        return button;
    };
    ShareButton.prototype.onContentChanged = function (oldValue, newValue) {
        if (this.nativeView) {
            this.nativeView.shareContent = newValue;
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
        var button = FBSDKSendButton.new();
        this.nativeView = button;
        if (this.content) {
            this.nativeView.shareContent = this.content;
        }
        return button;
    };
    SendButton.prototype.onContentChanged = function (oldValue, newValue) {
        if (this.nativeView) {
            this.nativeView.shareContent = newValue;
        }
    };
    return SendButton;
}(share_button_common_1.FacebookShareButtonBase));
exports.SendButton = SendButton;
