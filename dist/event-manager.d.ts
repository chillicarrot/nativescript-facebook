/**
* Initializes logger for android/ no action on ios
*/
export declare function initializePixel(): void;


/**
* Logs predefined and custom events
* @param {string} eventName event name
* @param {object} params optional params
*/
export declare function logEvent(eventName: string, params?: any): void;

/**
* Logs purchase
* @param {number} amount amount
* @param {string} currency currency
* @param {object} params optional params
*/
export declare function logPurchase(amount: number, currency: string, params?: any): void;

export declare enum EventNames {
  AchievedLevel,
  ActivatedApp,
  AddedPaymentInfo,
  AddedToCart,
  AddedToWishlist,
  CompletedRegistration,
  CompletedTutorial,
  InitiatedCheckout,
  Rated,
  Searched,
  SpentCredits,
  UnlockedAchievement,
  ViewedContent,
}

export declare enum EventParamNames {
  ContentID,
  Content,
  ContentType,
  Currency,
  Description,
  Level,
  MaxRatingValue,
  NumItems,
  PaymentInfoAvailable,
  RegistrationMethod,
  SearchString,
  Success,
}