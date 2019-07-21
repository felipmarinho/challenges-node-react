import React from 'react';
import './Header.css';

import facebook from '../../assets/facebook.png';

function Header() {
    return (
        <header id="main-heard">
            <img src={facebook} ></img>
        </header>
    );
}

export default Header;