"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./share-manager.common"));
var share_manager_common_1 = require("./share-manager.common");
var frame_1 = require("tns-core-modules/ui/frame");
function currentViewController() {
    var topView = frame_1.topmost();
    return (topView.currentPage.modal || topView).viewController;
}
function attachAdditionalContent(content, addition) {
    if (addition) {
        if (addition.hashtag) {
            content.hashtag = FBSDKHashtag.hashtagWithString(addition.hashtag);
        }
    }
}
function createShareLinksContent(link, quote, addition) {
    var content = FBSDKShareLinkContent.new();
    content.contentURL = NSURL.URLWithString(link);
    if (quote) {
        content.quote = quote;
    }
    attachAdditionalContent(content, addition);
    return content;
}
exports.createShareLinksContent = createShareLinksContent;
function createSharePhotosContent(images, userGenerated, addition) {
    var nativeImages;
    if (typeof images[0] === 'string') {
        nativeImages = images.map(function (each) {
            return FBSDKSharePhoto.photoWithImageURLUserGenerated(NSURL.URLWithString(each), userGenerated);
        });
    }
    else {
        nativeImages = images.map(function (each) {
            return FBSDKSharePhoto.photoWithImageUserGenerated(each.ios, userGenerated);
        });
    }
    var content = FBSDKSharePhotoContent.new();
    content.photos = NSArray.arrayWithArray(nativeImages);
    attachAdditionalContent(content, addition);
    return content;
}
exports.createSharePhotosContent = createSharePhotosContent;
function createMessageActionButton(config) {
    if (config) {
        var button = FBSDKShareMessengerURLActionButton.new();
        button.title = config.title;
        button.url = NSURL.URLWithString(config.url);
        return button;
    }
    return null;
}
function createShareMessageGenericTemplateContent(contentConfig) {
    var elementConfig = contentConfig.element;
    var element = FBSDKShareMessengerGenericTemplateElement.new();
    element.title = elementConfig.title;
    element.subtitle = elementConfig.subtitle || null;
    element.imageURL = NSURL.URLWithString(elementConfig.imageUrl);
    if (elementConfig.button) {
        element.button = createMessageActionButton(elementConfig.button);
    }
    if (elementConfig.defaultAction) {
        element.defaultAction = createMessageActionButton(elementConfig.defaultAction);
    }
    var content = FBSDKShareMessengerGenericTemplateContent.new();
    content.element = element;
    if (contentConfig.hasOwnProperty('isSharable')) {
        content.isSharable = contentConfig.isSharable;
    }
    if (contentConfig.pageID) {
        content.pageID = contentConfig.pageID;
    }
    if (contentConfig.hasOwnProperty('imageAspectRatio')) {
        if (contentConfig.imageAspectRatio === share_manager_common_1.MessageGenericTemplateImageAspectRatio.Horizontal) {
            content.imageAspectRatio = 0;
        }
        else {
            content.imageAspectRatio = 1;
        }
    }
    return content;
}
exports.createShareMessageGenericTemplateContent = createShareMessageGenericTemplateContent;
function createShareMessageMediaTemplateContent(contentConfig) {
    var content;
    if (contentConfig.mediaUrl) {
        content = FBSDKShareMessengerMediaTemplateContent.alloc().initWithMediaURL(NSURL.URLWithString(contentConfig.mediaUrl));
    }
    else if (contentConfig.attachmentID) {
        content = FBSDKShareMessengerMediaTemplateContent.alloc().initWithAttachmentID(contentConfig.attachmentID);
    }
    else {
        throw new Error('To use MediaTemplateContent, you have to provide either mediaUrl or attachmentID, see https://developers.facebook.com/docs/sharing/messenger#share-types for more detail');
    }
    if (contentConfig.pageID) {
        content.pageID = contentConfig.pageID;
    }
    else {
        throw new Error('To use MediaTemplateContent, you have to provide a pageId, see https://developers.facebook.com/docs/sharing/messenger#app-page-id for more detail');
    }
    if (contentConfig.mediaType === share_manager_common_1.MessageMediaTemplateMediaType.Video) {
        content.mediaType = 1;
    }
    else {
        content.mediaType = 0;
    }
    if (contentConfig.button) {
        content.button = createMessageActionButton(contentConfig.button);
    }
    return content;
}
exports.createShareMessageMediaTemplateContent = createShareMessageMediaTemplateContent;
function getCallbackDelegate(callback) {
    var delegate;
    if (callback) {
        delegate = SharingDelegate.new().initWithCallback(function (error, result) {
            if (callback) {
                callback(error, result);
            }
            CFRelease(delegate);
            delegate = undefined;
        });
        CFRetain(delegate);
    }
    return delegate;
}
function showShareDialog(content, callback) {
    FBSDKShareDialog.showFromViewControllerWithContentDelegate(currentViewController(), content, getCallbackDelegate(callback));
}
exports.showShareDialog = showShareDialog;
function showMessageDialog(content, callback) {
    FBSDKMessageDialog.showWithContentDelegate(content, getCallbackDelegate(callback));
}
exports.showMessageDialog = showMessageDialog;
var _shareDialog;
function getShareDialog() {
    if (!_shareDialog) {
        _shareDialog = FBSDKShareDialog.new();
    }
    return _shareDialog;
}
function canShareDialogShow(content) {
    if (content) {
        var dialog = getShareDialog();
        getShareDialog().shareContent = content;
        return dialog.canShow;
    }
    return false;
}
exports.canShareDialogShow = canShareDialogShow;
var _messageDialog;
function getMessageDialog() {
    if (!_messageDialog) {
        _messageDialog = FBSDKMessageDialog.new();
    }
    return _messageDialog;
}
function canMessageDialogShow(content) {
    if (content) {
        var dialog = getMessageDialog();
        getMessageDialog().shareContent = content;
        return dialog.canShow;
    }
    return false;
}
exports.canMessageDialogShow = canMessageDialogShow;
var SharingDelegate = (function (_super) {
    __extends(SharingDelegate, _super);
    function SharingDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SharingDelegate.new = function () {
        if (SharingDelegate.ObjCProtocols.length === 0 && typeof (FBSDKSharingDelegate) !== 'undefined') {
            SharingDelegate.ObjCProtocols.push(FBSDKSharingDelegate);
        }
        return _super.new.call(this);
    };
    SharingDelegate.prototype.initWithCallback = function (callback) {
        this.callback = callback;
        return this;
    };
    SharingDelegate.prototype.sharerDidCancel = function (sharer) {
        this.callback(new Error('canceled'), null);
    };
    SharingDelegate.prototype.sharerDidCompleteWithResults = function (sharer, results) {
        this.callback(null, {
            ios: results
        });
    };
    SharingDelegate.prototype.sharerDidFailWithError = function (sharer, error) {
        this.callback(new Error(error.localizedDescription), null);
    };
    SharingDelegate.ObjCProtocols = [];
    return SharingDelegate;
}(NSObject));
