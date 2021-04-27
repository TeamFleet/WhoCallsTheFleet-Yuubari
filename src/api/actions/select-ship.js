import { getHistory } from 'koot';

export default () => {
    if (__SERVER__) return;

    console.log(getHistory());

    // TODO:
};
