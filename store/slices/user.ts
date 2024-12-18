// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import { User } from 'types/types';

import { INITIAL_STATUS } from 'constants/constants';
import { StatusType } from '@/types/types';
import { UserService } from '@/services/user.service';

export interface UserStateProps {
    user: User | null;
    getUserStatus: StatusType;

    searchUsersStatus: StatusType;
    searchedUsers: User[];
}

const initialState: UserStateProps = {
    user: null,
    getUserStatus: INITIAL_STATUS,
    searchUsersStatus: INITIAL_STATUS,
    searchedUsers: [],
};

const slice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        getUserStart(state) {
            state.getUserStatus = 'loading';
        },
        getUserSuccess(state, action) {
            state.getUserStatus = 'success';
            state.user = action.payload;
        },
        getUserFailure(state) {
            state.getUserStatus = 'failure';
        },
        getUserReset(state) {
            state.getUserStatus = 'idle';
            state.user = null;
        },

        searchUsersStart(state) {
            state.searchUsersStatus = 'loading';
            state.searchedUsers = [];
        },
        searchUsersSuccess(state, action) {
            state.searchUsersStatus = 'success';
            state.searchedUsers = action.payload;
        },
        searchUsersFailure(state) {
            state.searchUsersStatus = 'failure';
            state.searchedUsers = [];
        },
        searchUsersReset(state) {
            state.searchUsersStatus = 'idle';
            state.searchedUsers = [];
        },
    },
});

export default slice.reducer;
export const {} = slice.actions;

// ACTIONS ----------------------------------------------------------------------

export function getUser(id: string) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.getUserStart());
        try {
            const res = await new UserService().get(id);
            if (res && res.data) {
                dispatch(slice.actions.getUserSuccess(res.data));
            }
        } catch (error) {
            dispatch(slice.actions.getUserFailure());
            // handleError(error);
        }
    };
}


export function searchUsers(text: string) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.searchUsersStart());
        try {
            const res = await new UserService().findByTwitterUsername(text);
            if (res) {
                dispatch(slice.actions.searchUsersSuccess(res));
            }
        } catch (error) {
            dispatch(slice.actions.searchUsersFailure());
            // handleError(error);
        }
    };
}