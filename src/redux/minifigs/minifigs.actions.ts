import { MinifigsActionTypes } from './minifigs.types';

export const setCurrentMinifigs = ( minifigs : object[] ) => ({
    type: MinifigsActionTypes.SET_CURRENT_MINIFIGS,
    payload: minifigs
});

export const setSelectedMinifig = ( minifig : string ) => ({
    type: MinifigsActionTypes.SET_SELECTED_MINIFIG,
    payload: minifig
});

export const setResetAction = () => ({
    type: MinifigsActionTypes.SET_RESET_ACTION
});