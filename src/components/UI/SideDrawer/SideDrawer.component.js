import React from "react";

import NavItems from "./NavItems.component";
import styles from "./SideDrawer.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Auxillary from "../../../hoc/Auxillary/Auxillary.component";

const sideDrawer = (props) => {
  let attachedStyles = [styles.SideDrawer, styles.Close];
  if (props.open) {
    attachedStyles = [styles.SideDrawer, styles.open];
  }

  return (
    <div>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedStyles.join(" ")} onClick={props.closed}>
        <div className={styles.Logo}></div>
        <nav>
          <NavItems isAuthenticated={props.isAuth} />
        </nav>
      </div>
    </div>
  );
};

export default sideDrawer;
