export let boatLoader: HTMLDivElement;
export const setBoatLoader = (el?: HTMLDivElement): HTMLDivElement => {
    if (typeof el === 'undefined')
        el = document.querySelector('#boat-loader') as HTMLDivElement;
    boatLoader = el;
    return boatLoader;
};
