import React from "react";

import styles from "./NavItems.module.css";
import NavItem from "./NavItem.component";

const navItems = (props) => {
  return (
    <ul className={styles.NavItems}>
      <NavItem link="/" exact>
        Soma
      </NavItem>

      <NavItem link="/about">About Soma</NavItem>

      <NavItem link="/courses">Courses</NavItem>
      <NavItem link="/category">Category</NavItem>
      <NavItem link="/sign-in">Login</NavItem>
      <NavItem link="/sign-up">Sign up</NavItem>
    </ul>
  );
};

export default navItems;
