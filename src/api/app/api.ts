import { AppType } from '@types';
import { Dispatch, AnyAction, Action } from 'redux';
import { SET_INSTALL_PWA_EVENT, SET_APP_TYPE } from '@redux/action-types';

import * as actions from './actions';

export const updateAppReady =
    (ready: boolean): AppThunkAction =>
    (dispatch: Dispatch): Action =>
        dispatch(actions.updateAppReady(ready));

export const updateMainKey =
    (key: string) =>
    (dispatch: Dispatch): AnyAction =>
        dispatch(actions.updateMainKey(key));

export const setAppType =
    (appType: AppType) =>
    (dispatch: Dispatch): AnyAction =>
        dispatch({
            type: SET_APP_TYPE,
            appType,
        });

export const setInstallPWAEvent =
    (evtInstall: Event) =>
    (dispatch: Dispatch): AnyAction =>
        dispatch({
            type: SET_INSTALL_PWA_EVENT,
            event: evtInstall,
        });
