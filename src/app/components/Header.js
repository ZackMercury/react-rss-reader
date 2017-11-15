import React from 'react';
import logo from './img/rss-logo.svg';
import menuBtn from './img/menuBtn.svg';

const Header = (props) => {
    return (
        <header className="Header">
            <div className="menuBtnContainer">
                <img className="menuBtn" src={menuBtn} onClick={props.onMenuButtonClick}></img>
            </div>

            <div className="title">RSS Reader</div>
            <div className="iconContainer">
                <img className="icon" src={logo} alt="Oups, there's a problem loading logo..."></img>
            </div>
        </header>
    )
};

export default Header;