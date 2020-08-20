import md5 from 'md5';

const getValue = (key: string): string => `__FLEET::${md5(key)}`;
// const getValue = (key: string): string => `__FLEET::${key}__`;

export const didCritical = getValue('didCritical');
export const clientCompatible = getValue('clientCompatible');
export const appReady = '__FLEET::appReady__';

declare global {
    interface Window {
        [appReady]: boolean;
        logHr(): void;
    }
}
