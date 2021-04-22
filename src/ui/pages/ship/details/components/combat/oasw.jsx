import checkShipCapability from '@api/check-ship-capability';
import Bullet from '@ui/components/bullet';
import Requirements from './_requirements';

export default ({ ship }) => {
    const requirements = checkShipCapability(ship, 'OASW');
    const title = __('combat_phases.day.oasw');

    if (requirements === false) return <Bullet title={title} level={0} />;
    if (requirements === 'unknown')
        return <Bullet title={title} level="unknown" />;
    if (requirements === 'always')
        return <Bullet title={title} level="always" />;

    return (
        <Bullet title={title} level="indeterminate">
            <Requirements requirements={requirements} ship={ship} />
        </Bullet>
    );
};
