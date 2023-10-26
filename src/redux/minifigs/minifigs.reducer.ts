import { InitialStateProps } from '../../types/redux/minifigs/reducer.type';
import { MinifigsActionTypes } from './minifigs.types';
import { AnyAction } from '@reduxjs/toolkit';

const INITIAL_STATE : InitialStateProps = {
    currentMinifigs: null,
    currentMSelectedMinifig: null
}

const minifigsReducer = (state : InitialStateProps = INITIAL_STATE, action : AnyAction) => {
    switch (action.type) {
        case MinifigsActionTypes.SET_CURRENT_MINIFIGS:
            return {
                ...state,
                currentMinifigs: action.payload
            };
        case MinifigsActionTypes.SET_SELECTED_MINIFIG:
            return {
                ...state,
                currentMSelectedMinifig: action.payload
            };
        case MinifigsActionTypes.SET_RESET_ACTION:
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default minifigsReducer;
