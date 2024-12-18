import { User } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';

import { INITIAL_STATUS } from 'constants/constants';
import { StatusType } from '@/types/types';
import { AppConfigService } from '@/services/appConfig.service';

export interface AppConfigStateProps {
    getAppConfigStatus: StatusType;
    appConfig: any;
}

const initialState: AppConfigStateProps = {
    getAppConfigStatus: INITIAL_STATUS,
    appConfig: null,
};

const slice = createSlice({
    name: 'appConfig',
    initialState,
    reducers: {
        getAppConfigStart(state) {
            state.getAppConfigStatus = 'loading';
            state.appConfig = null;
        },
        getAppConfigSuccess(state, action) {
            state.getAppConfigStatus = 'success';
            state.appConfig = action.payload;
        },
        getAppConfigFailure(state) {
            state.getAppConfigStatus = 'failure';
        },
        getAppConfigReset(state) {
            state.getAppConfigStatus = 'idle';
        },
    },
});

export default slice.reducer;
export const { getAppConfigReset } = slice.actions;

// ACTIONS ----------------------------------------------------------------------
export function getAppConfig() {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.getAppConfigStart());
        try {
            const res = await new AppConfigService().get();           // get all config

            if (res) {
                dispatch(slice.actions.getAppConfigSuccess(res));
            }
        } catch (error) {
            dispatch(slice.actions.getAppConfigFailure());
        }
    };
}
