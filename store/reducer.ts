// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';

// project imports
import themeConfigReducer from '@/store/slices/themeConfigSlice';
import authReducer from '@/store/slices/auth';
import coinReducer from '@/store/slices/coin';
import userReducer from '@/store/slices/user';
import menuReducer from '@/store/slices/menu';
import appConfigReducer from '@/store/slices/appConfig';

import createWebStorage from 'redux-persist/lib/storage/createWebStorage';

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window === 'undefined' ? createNoopStorage() : createWebStorage('local');

// export default storage;

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    themeConfig: persistReducer(
        {
            key: 'themeConfig',
            storage,
            keyPrefix: 'hypecoin-',
        },
        themeConfigReducer
    ),
    appConfig: persistReducer(
        {
            key: 'appConfig',
            storage,
            keyPrefix: 'hype3-',
        },
        appConfigReducer
    ),
    auth: persistReducer(
        {
          key: 'auth',
          storage,
          keyPrefix: 'hype3-',
        },
        authReducer
    ),
    menu: menuReducer,
    coin: coinReducer,
    user: userReducer,
});

export default reducer;
