import { ProductWeb } from "./interfaces";

export const allProductsUrl = 'https://course-api.com/javascript-store-products';

export const getElement = (selection: string) =>
{
    const element = document.querySelector(selection);
    if (element) return element;
    throw new Error(`Please check "${selection}" selector, no such element exist`);
};

export const throttled = (fn: Function, delay = 200) =>
{
    let last = 0;
    return function (...args: any)
    {
        const now = (new Date).getTime();
        if (now - last < delay) { return; }
        last = now;
        return fn(...args);
    };
};

export const formatPrice = (price: number) =>
{
    let formattedPrice = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format((price / 100).toFixed(2) as unknown as number);

    return formattedPrice;
};

export const getStorageItem = (item: string) =>
{
    let storeageItem = localStorage.getItem(item);
    let storeageItemObj: ProductWeb[] = [];

    if (storeageItem)
    {
        storeageItemObj = JSON.parse(storeageItem);
    }

    return storeageItemObj;
};

export const setStorageItem = (name: string, item: ProductWeb[]) =>
{
    localStorage.setItem(name, JSON.stringify(item));
};