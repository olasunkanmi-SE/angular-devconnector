import { Action } from "@ngrx/store";
export const LOGGED_OUT = "[MENU] Logged Out";
export const ONBOARDING = "[MENU] Onboarding";
export const LOGGED_IN = "[MENU] Logged In";

export class LoggedOut implements Action {
  readonly type = LOGGED_OUT;
}

export class OnBoarding implements Action {
  readonly type = ONBOARDING;
}

export class LoggedIn implements Action {
  readonly type = LOGGED_IN;
}

export type MenuActions = LoggedOut | OnBoarding | LoggedIn;
