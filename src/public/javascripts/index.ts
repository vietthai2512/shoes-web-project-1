import './toggleSidebar.js';
import './cart/toggleCart.js';
import './hideShowNavbar.js';
import './detectOutsideClick.js';
import fetchProducts from './fetchProducts.js';
import { setupStore, store } from './store.js';
import displayProducts from './displayProducts.js';
import { getElement } from './utils.js';

const init = async () =>
{
    const products = await fetchProducts();
    if (products)
    {
        setupStore(products);
        const featured = store.filter((product) => product.featured === true);
        displayProducts(featured, getElement('.featured-center'));
    }
};

window.addEventListener('DOMContentLoaded', init);