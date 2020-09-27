import React from "react";

import styles from "./Toolbar.module.css";
import NavItems from "./NavItems.component";
import DrawerToggle from "./DrawerToggle.component";

const toolbar = (props) => (
  <header className={styles.Toolbar}>
    <div>
      <DrawerToggle clicked={props.drawerToggleClicked} />
    </div>

    <nav className={styles.DesktopOnly}>
      <NavItems isAuthenticated={props.isAuth} />
    </nav>
  </header>
);

export default toolbar;
