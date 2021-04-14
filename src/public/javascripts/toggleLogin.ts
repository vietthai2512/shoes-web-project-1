import {getElement} from './utils.js';

const toggleLogin = getElement('.toggle-login');
const loginOverlay = getElement('.login-overlay');
const closeBtn = getElement('.login-close');

toggleLogin.addEventListener('click', () =>
{
    loginOverlay.classList.add('show');
});

closeBtn.addEventListener('click', () =>
{
    loginOverlay.classList.remove('show');
});