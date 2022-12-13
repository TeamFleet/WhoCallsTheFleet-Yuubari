import { useCallback, useState, useEffect } from 'react';

import pref from '@api/preferences';

function watchId(equipmentId, improvementIndex) {
    if (
        typeof equipmentId !== 'undefined' &&
        typeof improvementIndex === 'undefined'
    )
        return equipmentId;
    return `${equipmentId}-${improvementIndex}`;
}

const useImprovementWatch = () => {
    const [list, setList] = useState(pref.arsenalWatchList);

    const add = useCallback(function (equipmentId, improvementIndex) {
        // console.log('WatchList: add', equipmentId, improvementIndex);
        const value = watchId(equipmentId, improvementIndex);
        setList(
            Array.isArray(pref.arsenalWatchList)
                ? [...pref.arsenalWatchList, value]
                : [value]
        );
    }, []);
    const remove = useCallback(function (equipmentId, improvementIndex) {
        if (!Array.isArray(pref.arsenalWatchList)) return;
        const value = watchId(equipmentId, improvementIndex);
        const index = pref.arsenalWatchList.indexOf(value);
        if (index < 0) return;
        if (pref.arsenalWatchList.length === 1) return setList(false);

        pref.arsenalWatchList.splice(index, 1);
        setList([...pref.arsenalWatchList]);
    }, []);

    useEffect(() => {
        console.log(1111, list);
        pref.arsenalWatchList = list;
    }, [list]);

    return {
        list,
        add,
        remove,
    };
};

export default useImprovementWatch;
