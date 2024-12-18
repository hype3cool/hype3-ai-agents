// third-party
import { EmptyUser } from '@/constants/constants';
import { User } from '@/types/types';
import { createSlice } from '@reduxjs/toolkit';
import { set } from 'lodash';

export interface MenuStateProps {
    isUploadProfilePic: boolean;
    isSidePanelOpen: boolean;
    sidePanelType?: string; // profile | settings | notifications | member |  token | online-user
    sidePanelData: any | User[];
    mainDialog: {
        open: boolean;
        type: string;
        data: any;
    };
}

const initialState: MenuStateProps = {
    isUploadProfilePic: false,
    isSidePanelOpen: false,
    sidePanelType: '',
    sidePanelData: null,
    mainDialog: {
        open: false,
        type: '',
        data: null,
    },
};

const slice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        openUploadProfilePic(state) {
            state.isUploadProfilePic = true;
        },
        closeUploadProfilePic(state) {
            state.isUploadProfilePic = false;
        },

        openSidePanel(state, action) {
            state.isSidePanelOpen = true;
            state.sidePanelType = action.payload.type;
            state.sidePanelData = action.payload.data;
        },
        closeSidePanel(state) {
            state.isSidePanelOpen = false;
            state.sidePanelType = '';
        },

        setMainDialog(state, action) {
            state.mainDialog.open = true;
            state.mainDialog.type = action.payload.type;
            state.mainDialog.data = action.payload.data;
        },
        closeMainDialog(state) {
            state.mainDialog.open = false;
            state.mainDialog.type = '';
            state.mainDialog.data = null;
        },
    },
});

export default slice.reducer;
export const { openUploadProfilePic, closeUploadProfilePic, openSidePanel, closeSidePanel, setMainDialog, closeMainDialog } = slice.actions;

// ACTIONS ----------------------------------------------------------------------
