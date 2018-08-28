declare var FBSDKAppEvents, FBSDKAppEventNameAchievedLevel, FBSDKAppEventNameAddedPaymentInfo, FBSDKAppEventNameAddedToCart, FBSDKAppEventNameAddedToWishlist, FBSDKAppEventNameCompletedRegistration, FBSDKAppEventNameCompletedTutorial, FBSDKAppEventNameInitiatedCheckout, FBSDKAppEventNameRated, FBSDKAppEventNameSearched, FBSDKAppEventNameSpentCredits, FBSDKAppEventNameUnlockedAchievement, FBSDKAppEventNameViewedContent, FBSDKAppEventParameterNameContentID, FBSDKAppEventParameterNameContent, FBSDKAppEventParameterNameContentType, FBSDKAppEventParameterNameCurrency, FBSDKAppEventParameterNameDescription, FBSDKAppEventParameterNameLevel, FBSDKAppEventParameterNameMaxRatingValue, FBSDKAppEventParameterNameNumItems, FBSDKAppEventParameterNamePaymentInfoAvailable, FBSDKAppEventParameterNameRegistrationMethod, FBSDKAppEventParameterNameSearchString, FBSDKAppEventParameterNameSuccess;


export function initializePixel() {}

export function logEvent(eventName, data = {}) {
  const key = eventName
  const params = getParams(data);
  FBSDKAppEvents.logEventParameters(key, params)
}

export function logPurchase(amount, currency, data = {}) {
  const params = getParams(data);
  FBSDKAppEvents.logPurchaseCurrencyParameters(amount, currency, params);
}

export enum EventNames {
  AchievedLevel = FBSDKAppEventNameAchievedLevel,
  AddedPaymentInfo = FBSDKAppEventNameAddedPaymentInfo,
  AddedToCart = FBSDKAppEventNameAddedToCart,
  AddedToWishlist = FBSDKAppEventNameAddedToWishlist,
  CompletedRegistration = FBSDKAppEventNameCompletedRegistration,
  CompletedTutorial = FBSDKAppEventNameCompletedTutorial,
  InitiatedCheckout = FBSDKAppEventNameInitiatedCheckout,
  Rated = FBSDKAppEventNameRated,
  Searched = FBSDKAppEventNameSearched,
  SpentCredits = FBSDKAppEventNameSpentCredits,
  UnlockedAchievement = FBSDKAppEventNameUnlockedAchievement,
  ViewedContent = FBSDKAppEventNameViewedContent,
}

export enum EventParamNames {
  ContentID = FBSDKAppEventParameterNameContentID,
  Content = FBSDKAppEventParameterNameContent,
  ContentType = FBSDKAppEventParameterNameContentType,
  Currency = FBSDKAppEventParameterNameCurrency,
  Description = FBSDKAppEventParameterNameDescription,
  Level = FBSDKAppEventParameterNameLevel,
  MaxRatingValue = FBSDKAppEventParameterNameMaxRatingValue,
  NumItems = FBSDKAppEventParameterNameNumItems,
  PaymentInfoAvailable = FBSDKAppEventParameterNamePaymentInfoAvailable,
  RegistrationMethod = FBSDKAppEventParameterNameRegistrationMethod,
  SearchString = FBSDKAppEventParameterNameSearchString,
  Success = FBSDKAppEventParameterNameSuccess,
}

function getParams(data) {
  let params = {};
  for (let key in data) {
    if (data.hasOwnProperty(key)) {
      let value = data[key];
      params[key] = value;
    }
  }
  return params
}