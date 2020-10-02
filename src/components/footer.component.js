import React, { Component } from "react";
import styles from "./footer.module.css";
import NavItems from "./UI/SideDrawer/NavItems.component";

export default class Footer extends Component {
  render() {
    return (
      <nav class="navbar fixed-bottom navbar-expand-lg navbar-light default-color">
        <a class="navbar-brand" href="#">
          Soma
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
              <NavItems className={styles.NavItem} class="nav-link" />
            </li>
          </ul>
          <form class="form-inline">
            <div class="md-form my-0">
              <input
                class="form-control mr-sm-2"
                type="text"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
          </form>
        </div>
      </nav>
    );
  }
}
