import React from 'react';
import classNames from 'classnames';
import { IndexLink } from 'react-router';

import logoYuubari from '@assets/logos/yuubari/128.png';

const NavLogo = ({ className, showBackButton, onBackButtonClick }) => (
    <div className={classNames([className, 'logo'])}>
        {__SPA__ && (
            <button
                type="button"
                className="btn-back"
                disabled={!showBackButton}
                onClick={onBackButtonClick}
            />
        )}
        <IndexLink
            to="/"
            className="btn-home-logo"
            activeClassName="on"
            style={
                __CHANNEL__ === 'yuubari'
                    ? {
                          backgroundImage: `url(${logoYuubari})`
                      }
                    : {}
            }
        >
            <span className="title">{__('title')}</span>
            {__CHANNEL__ === 'yuubari' && (
                <span className="channel channel-yuubari">Yuubari</span>
            )}
        </IndexLink>
    </div>
);

export default NavLogo;
