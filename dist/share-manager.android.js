"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(require("./share-manager.common"));
var application_1 = require("tns-core-modules/application");
var share_manager_common_1 = require("./share-manager.common");
function attachAdditionalContent(content, addition) {
    if (addition) {
        if (addition.hashtag) {
            content.setShareHashtag(new com.facebook.share.model.ShareHashtag.Builder()
                .setHashtag(addition.hashtag)
                .build());
        }
    }
}
function createShareLinksContent(link, quote, addition) {
    var content = new com.facebook.share.model.ShareLinkContent
        .Builder()
        .setContentUrl(android.net.Uri.parse(link));
    if (quote) {
        content.setQuote(quote);
    }
    attachAdditionalContent(content, addition);
    return content.build();
}
exports.createShareLinksContent = createShareLinksContent;
function createSharePhotosContent(images, userGenerated, addition) {
    var nativeImages;
    if (typeof images[0] === 'string') {
        nativeImages = images.map(function (each) {
            return new com.facebook.share.model.SharePhoto.Builder()
                .setImageUrl(android.net.Uri.parse(each))
                .build();
        });
    }
    else {
        nativeImages = images.map(function (each) {
            return new com.facebook.share.model.SharePhoto.Builder()
                .setBitmap(each.android)
                .build();
        });
    }
    var content = new com.facebook.share.model.SharePhotoContent
        .Builder();
    nativeImages.forEach(function (each) {
        content.addPhoto(each);
    });
    attachAdditionalContent(content, addition);
    return content.build();
}
exports.createSharePhotosContent = createSharePhotosContent;
function canShareDialogShow(content) {
    if (content) {
        return com.facebook.share.widget.ShareDialog.canShow(content.getClass());
    }
    return false;
}
exports.canShareDialogShow = canShareDialogShow;
function canMessageDialogShow(content) {
    if (content) {
        return com.facebook.share.widget.MessageDialog.canShow(content.getClass());
    }
    return false;
}
exports.canMessageDialogShow = canMessageDialogShow;
function createMessageActionButton(config) {
    if (config) {
        var builder = new com.facebook.share.model.ShareMessengerURLActionButton.Builder();
        return builder
            .setTitle(config.title)
            .setUrl(android.net.Uri.parse(config.url))
            .build();
    }
    return null;
}
function createShareMessageGenericTemplateContent(contentConfig) {
    var elementConfig = contentConfig.element;
    var elementBuilder = new com.facebook.share.model.ShareMessengerGenericTemplateElement
        .Builder()
        .setTitle(elementConfig.title)
        .setSubtitle(elementConfig.subtitle || null)
        .setImageUrl(android.net.Uri.parse(elementConfig.imageUrl));
    if (elementConfig.button) {
        elementBuilder.setButton(createMessageActionButton(elementConfig.button));
    }
    if (elementConfig.defaultAction) {
        elementBuilder.setDefaultAction(createMessageActionButton(elementConfig.defaultAction));
    }
    var element = elementBuilder.build();
    var contentBuilder = new com.facebook.share.model.ShareMessengerGenericTemplateContent.Builder();
    contentBuilder.setGenericTemplateElement(element);
    if (contentConfig.hasOwnProperty('isSharable')) {
        contentBuilder.setIsSharable(contentConfig.isSharable);
    }
    if (contentConfig.pageID) {
        contentBuilder.setPageId(contentConfig.pageID);
    }
    if (contentConfig.hasOwnProperty('imageAspectRatio')) {
        if (contentConfig.imageAspectRatio === share_manager_common_1.MessageGenericTemplateImageAspectRatio.Horizontal) {
            contentBuilder.setImageAspectRatio(com.facebook.share.model.ShareMessengerGenericTemplateContent.ImageAspectRatio.HORIZONTAL);
        }
        else {
            contentBuilder.setImageAspectRatio(com.facebook.share.model.ShareMessengerGenericTemplateContent.ImageAspectRatio.SQUARE);
        }
    }
    return contentBuilder.build();
}
exports.createShareMessageGenericTemplateContent = createShareMessageGenericTemplateContent;
function createShareMessageMediaTemplateContent(contentConfig) {
    var contentBuilder = new com.facebook.share.model.ShareMessengerMediaTemplateContent.Builder();
    if (contentConfig.mediaUrl) {
        contentBuilder.setMediaUrl(android.net.Uri.parse(contentConfig.mediaUrl));
    }
    else if (contentConfig.attachmentID) {
        contentBuilder.setAttachmentId(contentConfig.attachmentID);
    }
    else {
        throw new Error('To use MediaTemplateContent, you have to provide either mediaUrl or attachmentID, see https://developers.facebook.com/docs/sharing/messenger#share-types for more detail');
    }
    if (contentConfig.pageID) {
        contentBuilder.setPageId(contentConfig.pageID);
    }
    else {
        throw new Error('To use MediaTemplateContent, you have to provide a pageId, see https://developers.facebook.com/docs/sharing/messenger#app-page-id for more detail');
    }
    if (contentConfig.mediaType === share_manager_common_1.MessageMediaTemplateMediaType.Video) {
        contentBuilder.setMediaType(com.facebook.share.model.ShareMessengerMediaTemplateContent.MediaType.VIDEO);
    }
    else {
        contentBuilder.setMediaType(com.facebook.share.model.ShareMessengerMediaTemplateContent.MediaType.IMAGE);
    }
    if (contentConfig.button) {
        contentBuilder.setButton(createMessageActionButton(contentConfig.button));
    }
    return contentBuilder.build();
}
exports.createShareMessageMediaTemplateContent = createShareMessageMediaTemplateContent;
function showShareDialog(content, callback) {
    var dialog = new com.facebook.share.widget.ShareDialog(application_1.android.startActivity || application_1.android.foregroundActivity);
    if (callback) {
        registerShareCallback(dialog, callback);
    }
    dialog.show(content);
}
exports.showShareDialog = showShareDialog;
function showMessageDialog(content, callback) {
    var dialog = new com.facebook.share.widget.MessageDialog(application_1.android.startActivity || application_1.android.foregroundActivity);
    if (callback) {
        registerShareCallback(dialog, callback);
    }
    dialog.show(content);
}
exports.showMessageDialog = showMessageDialog;
function registerShareCallback(dialog, callback) {
    var callbackManager = com.facebook.CallbackManager.Factory.create();
    dialog.registerCallback(callbackManager, new com.facebook.FacebookCallback({
        onSuccess: function (result) {
            callback(null, {
                android: result
            });
        },
        onCancel: function () {
            callback(new Error('canceled'), null);
        },
        onError: function (e) {
            var errorMessage = 'Error with Facebook';
            if (e['getErrorMessage']) {
                errorMessage += ': ' + e['getErrorMessage']();
            }
            else if (e['getErrorCode']) {
                errorMessage += ': Code ' + e['getErrorCode']();
            }
            else {
                errorMessage += ': ' + e;
            }
            callback(new Error(errorMessage), null);
        }
    }));
    var onActivityResult = function (args) {
        if (callbackManager.onActivityResult(args.requestCode, args.resultCode, args.intent)) {
            unsubscribe();
        }
    };
    var unsubscribe = function () {
        application_1.android.off(application_1.AndroidApplication.activityResultEvent, onActivityResult);
    };
    application_1.android.on(application_1.AndroidApplication.activityResultEvent, onActivityResult);
}
