import { getElement } from './utils.js';

const sideBar = getElement('.sidebar');
const sidebarOverlay = getElement('.sidebar-overlay');
const toggleNav = getElement('.toggle-nav');

const cart = getElement('.cart');
const cartOverlay = getElement('.cart-overlay');
const toggleCartBtn = getElement('.toggle-cart');

const login = getElement('.login');
const loginOverlay = getElement('.login-overlay');
const toggleLogin = getElement('.toggle-login');

document.addEventListener('click', (e) => 
{
    if (sidebarOverlay.classList.contains('show') && !sideBar.contains(e.target as Element) && !toggleNav.contains(e.target as Element))
    {
        sidebarOverlay.classList.remove('show');
    }
    else if (cartOverlay.classList.contains('show') && !cart.contains(e.target as Element) && !toggleCartBtn.contains(e.target as Element))
    {
        cartOverlay.classList.remove('show');
    }
    else if (loginOverlay.classList.contains('show') && !login.contains(e.target as Element) && !toggleLogin.contains(e.target as  Element))
    {
        loginOverlay.classList.remove('show');
    }
});
