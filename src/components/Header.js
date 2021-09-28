import React from "react";
import {
    NavLink,
    useLocation
} from "react-router-dom";

import { NAV_ITEMS } from "../constants";

const Header = () => {
    const { pathname } = useLocation();
    return (
        <div className="header">
            <div className="header__container">
                <div className="header__logo"></div>
                <div className="header__nav">
                    {
                        NAV_ITEMS.map((item, index) =>
                        <NavLink
                            key={index}
                            className="header__nav-item"
                            to={item.route}
                            activeClassName={pathname === `/${item.route}` ? 'header__nav-item--active' : ''}
                        >
                            {item.displayName}
                        </NavLink>)
                    }
                </div>
            </div>
        </div>
    )
};

export default Header;
