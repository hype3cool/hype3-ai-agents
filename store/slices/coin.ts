// third-party
import { createSlice } from '@reduxjs/toolkit';

import { INITIAL_STATUS } from 'constants/constants';
import { StatusType, Coin } from '@/types/types';
import { CoinService } from '@/services/coin.service';
import { TransactionLogService } from '@/services/transactionLog.service';

export interface CoinStateProps {
    createCoinStatus: StatusType;
    getAllCoinsStatus: StatusType;
    getCoinByMintAddressStatus: StatusType;
    createPresaleTransactionStatus: StatusType;

    coins: Coin[];
    totalPages: number;
    currentCoin: Coin | null;
    getPresaleListStatus: StatusType;
    presaleHolders: any[];
}

const initialState: CoinStateProps = {
    createCoinStatus: INITIAL_STATUS,
    getAllCoinsStatus: INITIAL_STATUS,
    getCoinByMintAddressStatus: INITIAL_STATUS,
    createPresaleTransactionStatus: INITIAL_STATUS,

    coins: [],
    totalPages: -1,
    currentCoin: null,
    getPresaleListStatus: INITIAL_STATUS,
    presaleHolders: [],
};

const slice = createSlice({
    name: 'coin',
    initialState,
    reducers: {
        createCoinStart(state) {
            state.createCoinStatus = 'loading';
        },
        createCoinSuccess(state, action) {
            state.createCoinStatus = 'success';
        },
        createCoinFailure(state) {
            state.createCoinStatus = 'failure';
        },
        createCoinReset(state) {
            state.createCoinStatus = 'idle';
        },

        // get tokens in database
        getAllCoinsStart(state) {
            state.getAllCoinsStatus = 'loading';
        },
        getAllCoinsSuccess(state, action) {
            state.getAllCoinsStatus = 'success';

            if (action.payload.pagination.page > 1) {
                state.coins = [...state.coins, ...action.payload.data];
            } else {
                if (action.payload.pagination.totalPages == 0) {
                    state.coins = [];
                } else {
                    state.coins = action.payload.data;
                }
            }

            state.totalPages = action.payload.pagination.totalPages;
        },
        getAllCoinsFailure(state) {
            state.getAllCoinsStatus = 'failure';
        },
        getAllCoinsReset(state) {
            state.getAllCoinsStatus = 'idle';
        },

        getCoinByMintAddressStart(state) {
            state.getCoinByMintAddressStatus = 'loading';
        },
        getCoinByMintAddressSuccess(state, action) {
            state.getCoinByMintAddressStatus = 'success';
            state.currentCoin = action.payload;
        },
        getCoinByMintAddressFailure(state) {
            state.getCoinByMintAddressStatus = 'failure';
        },
        getCoinByMintAddressReset(state) {
            state.getCoinByMintAddressStatus = 'idle';
            state.currentCoin = null;
        },
        setCurrentCoin(state, action) {
            state.currentCoin = action.payload;
        },

        createPresaleTransactionStart(state) {
            state.createPresaleTransactionStatus = 'loading';
        },
        createPresaleTransactionSuccess(state) {
            state.createPresaleTransactionStatus = 'success';
        },
        createPresaleTransactionFailure(state) {
            state.createPresaleTransactionStatus = 'failure';
        },
        createPresaleTransactionReset(state) {
            state.createPresaleTransactionStatus = 'idle';
        },

        getPresaleListStart(state) {
            state.getPresaleListStatus = 'loading';
        },
        getPresaleListSuccess(state, action) {
            state.getPresaleListStatus = 'success';
            state.presaleHolders = action.payload;
        },
        getPresaleListFailure(state) {
            state.getPresaleListStatus = 'failure';
        },
        getPresaleListReset(state) {
            state.getPresaleListStatus = 'idle';
        },
        updatePresaleHolders(state, action) {
            state.presaleHolders = action.payload;
        },
    },
});

export default slice.reducer;
export const {
    createCoinReset,
    getAllCoinsReset,
    setCurrentCoin,
    createPresaleTransactionStart,
    createPresaleTransactionSuccess,
    createPresaleTransactionFailure,
    createPresaleTransactionReset,
    getPresaleListReset,
    updatePresaleHolders,
} = slice.actions;

// ACTIONS ----------------------------------------------------------------------

export function createCoin(data: any) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.createCoinStart());
        try {
            const res = await new CoinService().createCoin(data);
            if (res && res.data) {
                dispatch(slice.actions.createCoinSuccess(res.data));
            }
        } catch (error) {
            dispatch(slice.actions.createCoinFailure());
            // handleError(error);
        }
    };
}

export function getAllCoins(data: { type?: string, sortBy?: string; page?: number; limit?: number; sortDirection?: string }) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.getAllCoinsStart());
        try {
            const res = await new CoinService().list(data);

            if (res && res.data) {
                dispatch(slice.actions.getAllCoinsSuccess(res));
            }
        } catch (error) {
            dispatch(slice.actions.getAllCoinsFailure());
            // handleError(error);
        }
    };
}

export function getCoinByMintAddress(mint: string) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.getCoinByMintAddressStart());
        try {
            const res = await new CoinService().getCoinByMintAddress(mint);
            if (res && res.data) {
                dispatch(slice.actions.getCoinByMintAddressSuccess(res.data));
            }
        } catch (error) {
            dispatch(slice.actions.getCoinByMintAddressFailure());
            // handleError(error);
        }
    };
}

// export function createPresaleTransaction(data: any) {
//     return async (dispatch: any, getState: any) => {
//         dispatch(slice.actions.createPresaleTransactionStart());
//         try {
//             const res = await new TransactionService().create(data);
//             if (res && res.data) {
//                 dispatch(slice.actions.createPresaleTransactionSuccess(res.data));
//             }
//         } catch (error) {
//             dispatch(slice.actions.createPresaleTransactionFailure());
//             // handleError(error);
//         }
//     };
// }

export function getPresaleList(address: string) {
    return async (dispatch: any, getState: any) => {
        dispatch(slice.actions.getPresaleListStart());
        try {
            const res = await new TransactionLogService().presaleList(address);
            if (res && res.data) {
                dispatch(slice.actions.getPresaleListSuccess(res.data));
            }
        } catch (error) {
            dispatch(slice.actions.getPresaleListFailure());
            // handleError(error);
        }
    };
}
