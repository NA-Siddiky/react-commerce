import React from 'react';
import logo from '../../images/logo.png';
import './Header.css';

const Header = () => {
    return (
        <div className="header">
            <img src={logo} alt=""></img>
            <nav id="nav-bar">
                <a href="/shop">Shop</a>
                <a href="/reviews">Review</a>
                <a href="/manage">Manage</a>
            </nav>
        </div>
    );
};

export default Header;