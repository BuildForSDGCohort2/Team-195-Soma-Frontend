import React, { Component } from "react";
import { BrowserRouter as  Link } from "react-router-dom";


export default class Footer extends Component {
  render() {
      return (
        <div className="footer">
        <nav className="navbar navbar-expand-lg  navbar-light">
          <ul className="navbar-nav">
          <li className="nav-item">
                <Link className="nav-link" to={"/about"}>About Soma</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/courses"}>Courses</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/courses"}>Students</Link>
              </li>
            
          </ul>
        </nav>
        {/* <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
         
           
            <Route path="/about" component={About} />
            <Route path="/courses" component={Courses} />
          </Switch>
        </div>
      </div> */}
      </div>
      );
  }
}