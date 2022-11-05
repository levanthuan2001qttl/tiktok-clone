export const statusSignInSelector = (state) => state.auth.status;
export const userDetailSelector = (state) => state.auth.user;
export const getCurrentUserSelector = (state) => state.auth.currentUser;
export const successAuthSelector = (state) => state.auth.successAuth;
export const errorAuthSelector = (state) => state.auth.errorAuth;
