import React from "react";

import "./NavigationItemsDrawer.scss";
import closeMenu from "../../../assets/closeMenu.png";

const NavigationItems = ({ setSideDrawerVisible }) => {
  return (
    <div className="navItems">
      <img
        alt="X"
        src={closeMenu}
        onClick={() => setSideDrawerVisible(false)}
      />
      <ul className="navList">
        <li>NASLOVNICA</li>
        <li>MAPA</li>
        <li>ZANIMLJIVOSTI</li>
        <li>O PROJEKTU</li>
        <li>PRESS</li>
      </ul>
    </div>
  );
};

export default NavigationItems;
