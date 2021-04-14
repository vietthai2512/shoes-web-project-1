import { getElement, throttled } from './utils.js';

let prevScrollPos = window.pageYOffset;
const navCenterWrapper = getElement('.nav-center-wrapper') as HTMLElement;

window.addEventListener('scroll', throttled(() =>
{
    const currScrollPos = window.pageYOffset;
    if (prevScrollPos > currScrollPos)
    {
        navCenterWrapper.style.top = '0';
    }
    else 
    {
        navCenterWrapper.style.top = '-4rem';
    }
    prevScrollPos = currScrollPos;
}));