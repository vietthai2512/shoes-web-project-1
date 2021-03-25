import { Product } from './interfaces.js';
import { allProductsUrl } from './utils.js';

export default async function fetchProducts()
{
    return fetch(allProductsUrl)
        .then(response =>
        {
            if (!response.ok)
            {
                throw new Error(response.statusText);
            }
            return response.json() as Promise<Product[]>;
        });
}