import { getElement } from './utils.js';

let sideBar = getElement('.sidebar');
let sidebarOverlay = getElement('.sidebar-overlay');
let toggleNav = getElement('.toggle-nav');

let cart = getElement('.cart');
let cartOverlay = getElement('.cart-overlay');
let toggleCartBtn = getElement('.toggle-cart');

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
});
