export let boatLoader: HTMLDivElement;
export const setBoatLoader = (el?: HTMLDivElement): HTMLDivElement => {
    if (!el) el = document.querySelector('#boat-loader');
    boatLoader = el;
    return boatLoader;
};
