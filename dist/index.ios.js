"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
var applicationModule = require("tns-core-modules/application");
__export(require("./ui/login-button"));
__export(require("./login-manager"));
__export(require("./share-manager"));
__export(require("./ui/share-button"));
__export(require("./event-manager"));
var BaseDelegate = (function (_super) {
    __extends(BaseDelegate, _super);
    function BaseDelegate() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BaseDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
        return FBSDKApplicationDelegate.sharedInstance.applicationDidFinishLaunchingWithOptions(application, launchOptions);
    };
    BaseDelegate.prototype.applicationOpenURLSourceApplicationAnnotation = function (application, url, sourceApplication, annotation) {
        return FBSDKApplicationDelegate.sharedInstance.applicationOpenURLSourceApplicationAnnotation(application, url, sourceApplication, annotation);
    };
    BaseDelegate.prototype.applicationDidBecomeActive = function (application) {
        FBSDKAppEvents.activateApp();
    };
    BaseDelegate.ObjCProtocols = [UIApplicationDelegate];
    return BaseDelegate;
}(UIResponder));
applicationModule.ios.delegate = BaseDelegate;
