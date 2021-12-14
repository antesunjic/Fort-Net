import React from "react";

import NavigationItems from "../NavigationItemsDrawer/NavigationItemsDrawer";

const SideDrawer = ({ setSideDrawerVisible }) => {
  return <NavigationItems setSideDrawerVisible={setSideDrawerVisible} />;
};

export default SideDrawer;
