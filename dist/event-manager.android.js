"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var applicationModule = require("tns-core-modules/application");
function initializePixel() {
    if (getLogger()) {
        return;
    }
    global['fbEventLogger'] = com.facebook.appevents.AppEventsLogger.newLogger(applicationModule.android.context.getApplicationContext());
}
exports.initializePixel = initializePixel;
function logPurchase(amountNumber, currencyString, data) {
    if (data === void 0) { data = {}; }
    var currency = java.util.Currency.getInstance(currencyString);
    var amount = java.math.BigDecimal.valueOf(parseFloat(amountNumber));
    var params = getParams(data);
    getLogger().logPurchase(amount, currency, params);
}
exports.logPurchase = logPurchase;
function logEvent(event, data) {
    var params = getParams(data);
    getLogger().logEvent(event, params);
}
exports.logEvent = logEvent;
var EventNames;
(function (EventNames) {
    EventNames[EventNames["AchievedLevel"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ACHIEVED_LEVEL] = "AchievedLevel";
    EventNames[EventNames["ActivatedApp"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ACTIVATED_APP] = "ActivatedApp";
    EventNames[EventNames["AddedPaymentInfo"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_PAYMENT_INFO] = "AddedPaymentInfo";
    EventNames[EventNames["AddedToCart"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_TO_CART] = "AddedToCart";
    EventNames[EventNames["AddedToWishlist"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_TO_WISHLIST] = "AddedToWishlist";
    EventNames[EventNames["CompletedRegistration"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_COMPLETED_REGISTRATION] = "CompletedRegistration";
    EventNames[EventNames["CompletedTutorial"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_COMPETED_TUTORIAL] = "CompletedTutorial";
    EventNames[EventNames["InitiatedCheckout"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_INITIATED_CHECKOUT] = "InitiatedCheckout";
    EventNames[EventNames["Rated"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_RATED] = "Rated";
    EventNames[EventNames["Searched"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SEARCHED] = "Searched";
    EventNames[EventNames["SpentCredits"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SPENT_CREDITS] = "SpentCredits";
    EventNames[EventNames["UnlockedAchievement"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_UNLOCKED_ACHIEVEMENT] = "UnlockedAchievement";
    EventNames[EventNames["ViewedContent"] = com.facebook.appevents.AppEventsConstants.EVENT_NAME_VIEWED_CONTENT] = "ViewedContent";
})(EventNames = exports.EventNames || (exports.EventNames = {}));
var EventParamNames;
(function (EventParamNames) {
    EventParamNames[EventParamNames["ContentID"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CONTENT_ID] = "ContentID";
    EventParamNames[EventParamNames["Content"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CONTENT] = "Content";
    EventParamNames[EventParamNames["ContentType"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CONTENT_TYPE] = "ContentType";
    EventParamNames[EventParamNames["Currency"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CURRENCY] = "Currency";
    EventParamNames[EventParamNames["Description"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_DESCRIPTION] = "Description";
    EventParamNames[EventParamNames["Level"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_LEVEL] = "Level";
    EventParamNames[EventParamNames["MaxRatingValue"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_MAX_RATING_VALUE] = "MaxRatingValue";
    EventParamNames[EventParamNames["NumItems"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_NUM_ITEMS] = "NumItems";
    EventParamNames[EventParamNames["PaymentInfoAvailable"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_PAYMENT_INFO_AVAILABLE] = "PaymentInfoAvailable";
    EventParamNames[EventParamNames["RegistrationMethod"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_REGISTRATION_METHOD] = "RegistrationMethod";
    EventParamNames[EventParamNames["SearchString"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_SEARCH_STRING] = "SearchString";
    EventParamNames[EventParamNames["Success"] = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_SUCCESS] = "Success";
})(EventParamNames = exports.EventParamNames || (exports.EventParamNames = {}));
function getLogger() {
    return global['fbEventLogger'];
}
function getParams(data) {
    var params = new android.os.Bundle();
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var value = data[key];
            var type = typeof value;
            if (type === 'string') {
                params.putString(key, value);
            }
            else if (type === 'number') {
                if (value % 1 === 0) {
                    params.putInt(key, value);
                }
                else {
                    params.putDouble(key, value);
                }
            }
            else if (type == 'boolean') {
                params.putBoolean(key, value);
            }
        }
    }
    return params;
}
