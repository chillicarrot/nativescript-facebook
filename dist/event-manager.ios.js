"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function initializePixel() { }
exports.initializePixel = initializePixel;
function logEvent(eventName, data) {
    if (data === void 0) { data = {}; }
    var key = eventName;
    var params = getParams(data);
    FBSDKAppEvents.logEventParameters(key, params);
}
exports.logEvent = logEvent;
function logPurchase(amount, currency, data) {
    if (data === void 0) { data = {}; }
    var params = getParams(data);
    FBSDKAppEvents.logPurchaseCurrencyParameters(amount, currency, params);
}
exports.logPurchase = logPurchase;
var EventNames;
(function (EventNames) {
    EventNames[EventNames["AchievedLevel"] = FBSDKAppEventNameAchievedLevel] = "AchievedLevel";
    EventNames[EventNames["AddedPaymentInfo"] = FBSDKAppEventNameAddedPaymentInfo] = "AddedPaymentInfo";
    EventNames[EventNames["AddedToCart"] = FBSDKAppEventNameAddedToCart] = "AddedToCart";
    EventNames[EventNames["AddedToWishlist"] = FBSDKAppEventNameAddedToWishlist] = "AddedToWishlist";
    EventNames[EventNames["CompletedRegistration"] = FBSDKAppEventNameCompletedRegistration] = "CompletedRegistration";
    EventNames[EventNames["CompletedTutorial"] = FBSDKAppEventNameCompletedTutorial] = "CompletedTutorial";
    EventNames[EventNames["InitiatedCheckout"] = FBSDKAppEventNameInitiatedCheckout] = "InitiatedCheckout";
    EventNames[EventNames["Rated"] = FBSDKAppEventNameRated] = "Rated";
    EventNames[EventNames["Searched"] = FBSDKAppEventNameSearched] = "Searched";
    EventNames[EventNames["SpentCredits"] = FBSDKAppEventNameSpentCredits] = "SpentCredits";
    EventNames[EventNames["UnlockedAchievement"] = FBSDKAppEventNameUnlockedAchievement] = "UnlockedAchievement";
    EventNames[EventNames["ViewedContent"] = FBSDKAppEventNameViewedContent] = "ViewedContent";
})(EventNames = exports.EventNames || (exports.EventNames = {}));
var EventParamNames;
(function (EventParamNames) {
    EventParamNames[EventParamNames["ContentID"] = FBSDKAppEventParameterNameContentID] = "ContentID";
    EventParamNames[EventParamNames["Content"] = FBSDKAppEventParameterNameContent] = "Content";
    EventParamNames[EventParamNames["ContentType"] = FBSDKAppEventParameterNameContentType] = "ContentType";
    EventParamNames[EventParamNames["Currency"] = FBSDKAppEventParameterNameCurrency] = "Currency";
    EventParamNames[EventParamNames["Description"] = FBSDKAppEventParameterNameDescription] = "Description";
    EventParamNames[EventParamNames["Level"] = FBSDKAppEventParameterNameLevel] = "Level";
    EventParamNames[EventParamNames["MaxRatingValue"] = FBSDKAppEventParameterNameMaxRatingValue] = "MaxRatingValue";
    EventParamNames[EventParamNames["NumItems"] = FBSDKAppEventParameterNameNumItems] = "NumItems";
    EventParamNames[EventParamNames["PaymentInfoAvailable"] = FBSDKAppEventParameterNamePaymentInfoAvailable] = "PaymentInfoAvailable";
    EventParamNames[EventParamNames["RegistrationMethod"] = FBSDKAppEventParameterNameRegistrationMethod] = "RegistrationMethod";
    EventParamNames[EventParamNames["SearchString"] = FBSDKAppEventParameterNameSearchString] = "SearchString";
    EventParamNames[EventParamNames["Success"] = FBSDKAppEventParameterNameSuccess] = "Success";
})(EventParamNames = exports.EventParamNames || (exports.EventParamNames = {}));
function getParams(data) {
    var params = {};
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            var value = data[key];
            params[key] = value;
        }
    }
    return params;
}
