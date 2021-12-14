import React, { useState } from "react";
import Logo from "./Logo";
import SideDrawer from "./SideDrawer/SideDrawer";
import "./Header.scss";

import openMenu from "../../assets/openMenu.svg";
import Languages from "./Languages/Languages";
import NavigationItemsHeader from "./NavigationItemsHeader/NavigationItemsHeader";

const Header = () => {
  const [sideDrawerVisible, setSideDrawerVisible] = useState(false);

  return (
    <>
      <div className="header">
        <div className="languagesDiv">
          <Languages />
        </div>
        <div className="headerLogo">
          <Logo />
        </div>
        <div className="openMenuDiv">
          <img
            className="openMenu"
            alt="Open Menu"
            src={openMenu}
            onClick={() => setSideDrawerVisible(true)}
          />
        </div>
        <NavigationItemsHeader />
      </div>
      {sideDrawerVisible ? (
        <SideDrawer
          open={sideDrawerVisible}
          setSideDrawerVisible={setSideDrawerVisible}
        />
      ) : null}
    </>
  );
};

export default Header;
