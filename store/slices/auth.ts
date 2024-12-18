// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { User } from 'types/types';

import { EmptyUser, INITIAL_STATUS } from 'constants/constants';
import { StatusType } from '@/types/types';
import { UserService } from '@/services/user.service';
import { AuthService } from '@/services/auth.service';
import { showMessage } from '@/utils/toast';
import { Axios, AxiosError } from 'axios';

export interface AuthStateProps {
    authUser: User;
    getMeStatus: StatusType;
    newUserUpdateProfileStatus: StatusType;
    updateUsernameStatus: StatusType;
    updateProfileStatus: StatusType;
    removeUserTwitterStatus: StatusType;
    skipTwitterNotificationStatus: StatusType;
    prevPublicKey: string | null;
}

const initialState: AuthStateProps = {
    authUser: EmptyUser,
    getMeStatus: INITIAL_STATUS,
    newUserUpdateProfileStatus: INITIAL_STATUS,
    updateUsernameStatus: INITIAL_STATUS,
    updateProfileStatus: INITIAL_STATUS,
    removeUserTwitterStatus: INITIAL_STATUS,
    skipTwitterNotificationStatus: INITIAL_STATUS,
    prevPublicKey: null,
};

const slice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        getMeStart(state) {
            state.getMeStatus = 'loading';
        },
        getMeSuccess(state, action) {
            state.getMeStatus = 'success';
            state.authUser = action.payload;
        },
        getMeFailure(state) {
            state.getMeStatus = 'failure';
        },
        getMeReset(state) {
            state.getMeStatus = 'idle';
        },

        updateProfileStart(state) {
            state.updateProfileStatus = 'loading';
        },
        updateProfileSuccess(state, action) {
            state.updateProfileStatus = 'success';
            state.authUser = action.payload;
        },
        updateProfileFailure(state) {
            state.updateProfileStatus = 'failure';
        },
        updateProfileReset(state) {
            state.updateProfileStatus = 'idle';
        },

        newUserUpdateProfileStart(state) {
            state.newUserUpdateProfileStatus = 'loading';
        },
        newUserUpdateProfileSuccess(state, action) {
            state.newUserUpdateProfileStatus = 'success';
            state.authUser = action.payload;
        },
        newUserUpdateProfileFailure(state) {
            state.newUserUpdateProfileStatus = 'failure';
        },
        newUserUpdateProfileReset(state) {
            state.newUserUpdateProfileStatus = 'idle';
        },

        updateUsernameStart(state) {
            state.updateUsernameStatus = 'loading';
        },
        updateUsernameSuccess(state, action) {
            state.updateUsernameStatus = 'success';
            state.authUser = action.payload;
        },
        updateUsernameFailure(state) {
            state.updateUsernameStatus = 'failure';
        },
        updateUsernameReset(state) {
            state.updateUsernameStatus = 'idle';
        },

        removeUserTwitterStart(state) {
            state.removeUserTwitterStatus = 'idle';
        },
        removeUserTwitterSuccess(state, action) {
            state.removeUserTwitterStatus = 'success';
            state.authUser = action.payload;
        },
        removeUserTwitterFailure(state) {
            state.removeUserTwitterStatus = 'failure';
        },
        removeUserTwitterReset(state) {
            state.removeUserTwitterStatus = 'idle';
        },

        skipTwitterNotificationStart(state) {
            state.skipTwitterNotificationStatus = 'loading';
        },
        skipTwitterNotificationSuccess(state) {
            state.skipTwitterNotificationStatus = 'success';
        },
        skipTwitterNotificationFailure(state) {
            state.skipTwitterNotificationStatus = 'failure';
        },
        skipTwitterNotificationReset(state) {
            state.skipTwitterNotificationStatus = 'idle';
        },

        resetAuthState(state) {
            // state.authUser = EmptyUser;
        },

        setPrevPublicKey: (state, action) => {
            state.prevPublicKey = action.payload;
        },
        clearUser: (state) => {
            state.authUser = EmptyUser;
            state.getMeStatus = INITIAL_STATUS;
            state.prevPublicKey = null;
        },
    },
});

export default slice.reducer;
export const { getMeReset, updateProfileReset, newUserUpdateProfileReset, removeUserTwitterReset, updateUsernameReset, resetAuthState, skipTwitterNotificationReset, setPrevPublicKey, clearUser } =
    slice.actions;

// ACTIONS ----------------------------------------------------------------------

export function getMe() {
    return async (dispatch: any) => {
        dispatch(slice.actions.getMeStart());
        try {
            const res = await new AuthService().getMe();
            dispatch(slice.actions.getMeSuccess(res.data));
        } catch (error) {
            dispatch(slice.actions.getMeFailure());
            // dispatch(slice.actions.hasError(error));
        }
    };
}

/**
 * Update authenticated user profile
 * @param id | user id
 * @param data | user data
 * @returns
 */
export function updateProfile(id: string, data: Partial<User>) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateProfileStart());
        try {
            const res = await new UserService().update(id, data);
            if (res && res.data) {
                dispatch(slice.actions.updateProfileSuccess(res.data));
                dispatch(getMe());
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                showMessage(error.response?.data.message, 'error');
            }
            dispatch(slice.actions.updateProfileFailure());
        }
    };
}

export function newUserUpdateProfile(id: string, data: Partial<User>) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.newUserUpdateProfileStart());

        const { username, isCreator } = data; // only username and isCreator can be updated

        try {
            const res = await new UserService().update(id, { username, isCreator });
            if (res && res.data) {
                dispatch(slice.actions.newUserUpdateProfileSuccess(res.data));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                showMessage(error.response?.data.message, 'error');
            }
            dispatch(slice.actions.newUserUpdateProfileFailure());
        }
    };
}

export function updateUsername(id: string, data: Partial<User>) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.updateUsernameStart());
        const { username } = data; // only username and isCreator can be updated
        try {
            const res = await new UserService().update(id, { username });
            if (res && res.data) {
                dispatch(slice.actions.updateUsernameSuccess(res.data));
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                showMessage(error.response?.data.message, 'error');
            }
            dispatch(slice.actions.updateUsernameFailure());
        }
    };
}

export function removeUserTwitter(id: string) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.removeUserTwitterStart());
        try {
            const res = await new AuthService().removeTwitter(id);
            if (res && res.data) {
                dispatch(slice.actions.removeUserTwitterSuccess(res.data));
            }
        } catch (error) {
            dispatch(slice.actions.removeUserTwitterFailure());
            // handleError(error);
        }
    };
}

export function skipTwitterNotification(id: string) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.skipTwitterNotificationStart());
        try {
            const res = await new AuthService().skipTwitterNotification(id);
            if (res && res.data) {
                dispatch(slice.actions.skipTwitterNotificationSuccess());
                dispatch(getMe());
            }
        } catch (error) {
            dispatch(slice.actions.skipTwitterNotificationFailure());
            // handleError(error);
        }
    };
}
