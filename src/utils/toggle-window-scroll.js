import { AppRef } from '@ui/app';
import { MainRef } from '@ui/layout/main';
import getScrollTop from './get-scroll-top';

const lastScroll = {
    left: 0,
    top: 0,
};

export const lock = () => {
    lastScroll.top = getScrollTop();
    document.documentElement.style.overflow = 'hidden';
    if (AppRef && AppRef.current)
        AppRef.current.classList.add('mod-scroll-locking');
    if (MainRef && MainRef.current)
        MainRef.current.style.marginTop = `${0 - lastScroll.top}px`;
};

export const restore = (toX = lastScroll.left, toY = lastScroll.top) => {
    document.documentElement.style.overflow = '';
    if (AppRef && AppRef.current)
        AppRef.current.classList.remove('mod-scroll-locking');
    if (MainRef && MainRef.current) MainRef.current.style.marginTop = ``;
    window.scrollTo(toX, toY);
};
