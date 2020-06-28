import { environment } from "./../environments/environment";
import * as fromUi from "./shared/store/reducers/ui.reducer";
import * as fromMenu from "./shared/store/reducers/menu.reducer";
import { storageReducer } from "../app/shared/store/storage.metareducer";
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from "@ngrx/store";

export interface State {
  ui: fromUi.State;
  menu: fromMenu.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUi.uiReducer,
  menu: fromMenu.menuReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production
  ? [storageReducer]
  : [];

export const getUiState = createFeatureSelector<fromUi.State>("ui");
export const getMenuState = createFeatureSelector<fromMenu.State>("menu");
export const getIsLoading = createSelector(getUiState, fromUi.getIsLoading);
export const getMenu = createSelector(getMenuState, fromMenu.getMenu);
