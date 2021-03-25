import { Product } from './interfaces.js';
import { getStorageItem, setStorageItem } from './utils.js';

export let store = getStorageItem('store');

export const setupStore = (products: Product[]) => 
{
    store = products.map((product) =>
    {
        const {
            id,
            fields: {
                featured,
                name,
                price,
                company,
                colors,
                image: img }
        } = product;

        const image = img[0].thumbnails.large.url;

        return { id, featured, name, price, company, colors, image };
    });

    setStorageItem('store', store);
};