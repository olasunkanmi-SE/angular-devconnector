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

export function menuReducer(state = initialState, action: MenuActions) {
  switch (action.type) {
    case LOGGED_OUT:
      return {
        isAuth: false,
        hasHandle: false,
      };
    case ONBOARDING:
      return {
        isAuth: true,
        hasHandle: false,
      };
    case LOGGED_IN:
      return {
        isAuth: true,
        hasHandle: true,
      };
    default:
      return state;
  }
}

export const getMenu = (state: State) => {
  return {
    isAuth: state.isAuth,
    hasHandle: state.hasHandle,
  };
};
