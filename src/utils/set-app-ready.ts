import { appReady } from '@const/client-globals';
import { updateAppReady } from '@api/app/api';

/**
 * 标记 App 已准备就绪，这表示
 * - 已通过兼容性检测
 * - **Critical** 流程已运行
 * - _React_ 根层组件已渲染
 */
function setAppReady(dispatch: AppThunkDispatch, delay = 10): Promise<void> {
    return new Promise((resolve) => {
        if (__DEV__) window.logHr();
        // eslint-disable-next-line no-console
        if (__DEV__) console.log('🚀 App ready');
        if (__DEV__) window.logHr();

        // eslint-disable-next-line no-console
        console.log(`
 _____ _           ______ _           _
|_   _| |          |  ___| |         | |
  | | | |__   ___  | |_  | | ___  ___| |_
  | | | '_ \\ / _ \\ |  _| | |/ _ \\/ _ \\ __|
  | | | | | |  __/ | |   | |  __/  __/ |_
  \\_/ |_| |_|\\___| \\_|   |_|\\___|\\___|\\__|

`);

        document.body.classList.add('is-ready');

        setTimeout(() => {
            dispatch(updateAppReady(true));
            setTimeout(() => {
                window[appReady] = true;
                resolve();
            }, Math.max(0, 1000 - delay));
        }, delay);
    });
}

export default setAppReady;
