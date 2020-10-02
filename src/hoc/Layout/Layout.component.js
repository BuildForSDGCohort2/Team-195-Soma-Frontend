import React, { Component } from "react";
// import { connect } from "react-redux";

import styles from "./Layout.module.css";
import Toolbar from "../../components/UI/SideDrawer/Toolbar.component";
import SideDrawer from "../../components/UI/SideDrawer/SideDrawer.component";
import Footer from "../../components/footer.component";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <div>
        <Toolbar
          // isAuth={this.props.isAuthenticated}
          drawerToggleClicked={this.sideDrawerToggleHandler}
        />
        <SideDrawer
          //   isAuth={this.props.isAuthenticated}
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
        />
        <main className={styles.Content}>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

// const mapStateToProps = (state) => {
//   return {
//     isAuthenticated: state.auth.token !== null,
//   };
// };

export default Layout;
