import { extend } from 'koot';

import Title from '@ui/components/title';
import ListShips from '@ui/components/list/ships';

const list = [394, 395, 396, 397, 398, 399, 400, 401, 402, 403, 404];

const DevListShips = extend({})(() => {
    return (
        <div>
            <Title component="h2">list / ships</Title>
            <ListShips list={list} empty="EMPTY" />
            <Title component="h4">unsort</Title>
            <ListShips list={list} empty="EMPTY" sort={false} />
            <Title component="h4">without navy, with min-level</Title>
            <ListShips
                list={list}
                empty="EMPTY"
                navy={false}
                min-level={true}
            />
            <Title component="h4">without type</Title>
            <ListShips list={list} empty="EMPTY" type={false} />
            <Title component="h4">size: mini</Title>
            <ListShips list={list} empty="EMPTY" size="mini" />
            <Title component="h4">size: mini, no grid</Title>
            <ListShips list={list} empty="EMPTY" size="mini" grid={false} />
        </div>
    );
});

export default DevListShips;
