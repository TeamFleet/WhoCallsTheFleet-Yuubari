import { extend } from 'koot';

import Title from '@ui/components/title';
import MainHeader from '@ui/components/main-header';

const DevHeader = extend({
    styles: require('./header.less'),
})(({ className }) => (
    <MainHeader>
        <div className={className}>
            <Title component="h2">@ui/components/main-header</Title>
        </div>
    </MainHeader>
));
export default DevHeader;
