import { Action, ActionReducer } from "@ngrx/store";
import { merge, pick } from "lodash-es";
import { State } from "./reducers/menu.reducer";

let menu: State;
function setSavedState(state: any, localStorageKey: string) {
  localStorage.setItem(localStorageKey, JSON.stringify(state));
}

function getSavedState(localStorageKey: string) {
  return JSON.parse(localStorage.getItem(localStorageKey));
}

//The keys from the state that we will like to retrieve
const stateKeys = ["menu.hasHandle", "menu.isAuth"];

//the key for localstorage
const localStorageKey = "menuState";

//Define the Meta Reducer like so

export function storageReducer<State, A extends Action = Action>(
  reducer: ActionReducer<State, A>
) {
  let onInit = true;
  return function (state: State, action: A): State {
    const nextState = reducer(state, action);
    if (onInit) {
      onInit = false;
      const savedState = getSavedState(localStorageKey);
      // return { ...savedState, nextState };

      return merge(nextState, savedState);
    }
    const stateToSave = pick(nextState, stateKeys);
    setSavedState(stateToSave, localStorageKey);
    return nextState;
  };
}
