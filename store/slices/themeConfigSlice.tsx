import { createSlice } from '@reduxjs/toolkit';
import themeConfig from '@/theme.config';
import Cookies from 'js-cookie';

const initialState = {
    isDarkMode: false,
    sidebar: false,
    theme: themeConfig.theme,
    menu: themeConfig.menu,
    layout: themeConfig.layout,
    rtlClass: themeConfig.rtlClass,
    animation: themeConfig.animation,
    navbar: themeConfig.navbar,
    locale: themeConfig.locale,
    semidark: themeConfig.semidark,
    topAlertBar: false,
    howToHype: Cookies.get('howToHype') === 'false' ? false : themeConfig.howToHype,
    walletSelectDialog: false,
    languageList: [
        { code: 'en', name: 'English' },
    ],
};

const themeConfigSlice = createSlice({
    name: 'themeConfig',
    initialState: initialState,
    reducers: {
        toggleTheme(state, { payload }) {
            payload = payload || state.theme; // light | dark | system
            localStorage.setItem('theme', payload);
            state.theme = payload;
            if (payload === 'light') {
                state.isDarkMode = false;
            } else if (payload === 'dark') {
                state.isDarkMode = true;
            } else if (payload === 'system') {
                if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                    state.isDarkMode = true;
                } else {
                    state.isDarkMode = false;
                }
            }

            document.querySelector('body')?.classList.add('dark');
            // if (state.isDarkMode) {
            //     document.querySelector('body')?.classList.add('dark');
            // } else {
            //     document.querySelector('body')?.classList.remove('dark');
            // }
        },
        toggleMenu(state, { payload }) {
            payload = payload || state.menu; // vertical, collapsible-vertical, horizontal
            localStorage.setItem('menu', payload);
            state.menu = payload;
        },
        toggleLayout(state, { payload }) {
            payload = payload || state.layout; // full, boxed-layout
            localStorage.setItem('layout', payload);
            state.layout = payload;
        },
        toggleRTL(state, { payload }) {
            payload = payload || state.rtlClass; // rtl, ltr
            localStorage.setItem('rtlClass', payload);
            state.rtlClass = payload;
            document.querySelector('html')?.setAttribute('dir', state.rtlClass || 'ltr');
        },
        toggleAnimation(state, { payload }) {
            payload = payload || state.animation; // animate__fadeIn, animate__fadeInDown, animate__fadeInUp, animate__fadeInLeft, animate__fadeInRight, animate__slideInDown, animate__slideInLeft, animate__slideInRight, animate__zoomIn
            payload = payload?.trim();
            localStorage.setItem('animation', payload);
            state.animation = payload;
        },
        toggleNavbar(state, { payload }) {
            payload = payload || state.navbar; // navbar-sticky, navbar-floating, navbar-static
            localStorage.setItem('navbar', payload);
            state.navbar = payload;
        },
        toggleSemidark(state, { payload }) {
            payload = payload === true || payload === 'true' ? true : false;
            localStorage.setItem('semidark', payload);
            state.semidark = payload;
        },
        toggleSidebar(state) {
            state.sidebar = !state.sidebar;
        },
        toggleTopAlertBar(state) {
            state.topAlertBar = !state.topAlertBar;
        },
        closeHowToHype(state) {
            Cookies.set('howToHype', 'false', { expires: 7 }); // Set cookie with expiration
            state.howToHype = false; // Set howToHype to false
        },
        // openWalletSelectDialog(state) {
        //     state.walletSelectDialog = true;
        // },
        // closeWalletSelectDialog(state) {
        //     state.walletSelectDialog = false;
        // },

    },
});

export const { toggleTheme, toggleMenu, toggleLayout, toggleRTL, toggleAnimation, toggleNavbar, toggleSemidark, toggleSidebar, toggleTopAlertBar, closeHowToHype,
    // openWalletSelectDialog, closeWalletSelectDialog
} = themeConfigSlice.actions;

export default themeConfigSlice.reducer;
