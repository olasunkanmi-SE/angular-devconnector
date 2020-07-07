import {
  MenuActions,
  LOGGED_OUT,
  ONBOARDING,
  LOGGED_IN,
} from "./../action/menu.actions";
export interface State {
  isAuth: boolean;
  hasHandle: boolean;
}

const initialState: State = {
  isAuth: false,
  hasHandle: false,
};

export function menuReducer(state = initialState, action: MenuActions): State {
  switch (action.type) {
    case LOGGED_OUT:
      return { ...state, isAuth: false, hasHandle: false };
    case ONBOARDING:
      return { ...state, isAuth: true, hasHandle: false };
    case LOGGED_IN:
      return { ...state, isAuth: true, hasHandle: true };
    default:
      return state;
  }
}

export const getMenu = (menuState: State): State => {
  return {
    isAuth: menuState.isAuth,
    hasHandle: menuState.hasHandle,
  };
};
