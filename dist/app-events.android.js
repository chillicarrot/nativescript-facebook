"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("tns-core-modules/application");
var androidApplication;
var appEventsLogger;
function initAnalytics() {
    androidApplication = application.android;
    appEventsLogger = com.facebook.appevents.AppEventsLogger.newLogger(androidApplication.context.getApplicationContext());
}
exports.initAnalytics = initAnalytics;
function logEvent(name, parameters) {
    if (name === undefined) {
        throw ("Argument 'name' is missing");
    }
    var bundle = new android.os.Bundle();
    if (parameters !== undefined) {
        for (var p in parameters) {
            var param = parameters[p];
            if (param.value !== undefined) {
                bundle.putString(param.key, param.value);
            }
        }
    }
    appEventsLogger.logEvent(name, bundle);
}
exports.logEvent = logEvent;
