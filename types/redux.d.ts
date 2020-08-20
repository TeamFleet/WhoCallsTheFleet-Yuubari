import { Action } from 'redux';
import { ThunkDispatch, ThunkAction } from 'redux-thunk';

declare global {
    export interface AppRootState {
        localeId: string;
    }

    export type AppThunkDispatch = ThunkDispatch<AppRootState, unknown, Action>;
    export type AppThunkAction = ThunkAction<
        void,
        AppRootState,
        unknown,
        Action
    >;
}
