const applicationModule = require("tns-core-modules/application");
declare var com;

export function initializePixel() {
  if (getLogger()) {
    return;
  }
  global['fbEventLogger'] = com.facebook.appevents.AppEventsLogger.newLogger(applicationModule.android.context.getApplicationContext());
}

export function logPurchase(amountNumber, currencyString, data = {}) {
  const currency = java.util.Currency.getInstance(currencyString);
  const amount = java.math.BigDecimal.valueOf(parseFloat(amountNumber))
  const params = getParams(data);
  getLogger().logPurchase(amount, currency, params);
}

export function logEvent(event, data) {
  const params = getParams(data);
  getLogger().logEvent(event, params);
}

export enum EventNames {
  'AchievedLevel' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ACHIEVED_LEVEL,
  'ActivatedApp' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ACTIVATED_APP,
  'AddedPaymentInfo' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_PAYMENT_INFO,
  'AddedToCart' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_TO_CART,
  'AddedToWishlist' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_ADDED_TO_WISHLIST,
  'CompletedRegistration' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_COMPLETED_REGISTRATION,
  'CompletedTutorial' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_COMPETED_TUTORIAL,
  'InitiatedCheckout' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_INITIATED_CHECKOUT,
  'Rated' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_RATED,
  'Searched' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SEARCHED,
  'SpentCredits' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_SPENT_CREDITS,
  'UnlockedAchievement' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_UNLOCKED_ACHIEVEMENT,
  'ViewedContent' = com.facebook.appevents.AppEventsConstants.EVENT_NAME_VIEWED_CONTENT,
}

export enum EventParamNames {
  'ContentID' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CONTENT_ID,
  'Content' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CONTENT,
  'ContentType' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CONTENT_TYPE,
  'Currency' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_CURRENCY,
  'Description' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_DESCRIPTION,
  'Level' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_LEVEL,
  'MaxRatingValue' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_MAX_RATING_VALUE,
  'NumItems' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_NUM_ITEMS,
  'PaymentInfoAvailable' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_PAYMENT_INFO_AVAILABLE,
  'RegistrationMethod' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_REGISTRATION_METHOD,
  'SearchString' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_SEARCH_STRING,
  'Success' = com.facebook.appevents.AppEventsConstants.EVENT_PARAM_SUCCESS,
}

function getLogger() {
  return global['fbEventLogger'];
}

function getParams(data) {
  let params = new android.os.Bundle();
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];
      let type = typeof value
      if (type === 'string') {
        params.putString(key, value);
      } else if (type === 'number') {
        if (value % 1 === 0) {
          params.putInt(key, value);
        } else {
          params.putDouble(key, value);
        }
      } else if (type == 'boolean') {
        params.putBoolean(key, value);
      }
    }
  }
  return params;
}
