const apiPath = '/api/v1';

export const routes = {
    loginPath: () => [apiPath, 'login'].join('/'),
    signupPath: () => [apiPath, 'signup'].join('/'),
    dataPath: () => [apiPath, 'data'].join('/'),
    mainPage: () => '/',
    loginPage: () => '/login',
    signupPage: () => '/signup',
    notFoundPage: () => '*',
};