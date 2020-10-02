import React from "react";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import About from "./components/about.component";
import Courses from "./components/courses.component";
import Home from "./components/home.component";
import Languagesetup from "./components/languagesetup.component";
import Language from "./components/language.component";
import Languagedit from "./components/Languagedit.component";
import Category from "./components/category.component";

import Menu from "./components/menu.component";
import Navbar from "./components/navbar.component";

import Layout from "./hoc/Layout/Layout.component";

function App() {
  return (
    <Router>
      <Layout>
        <div>
          <div className="main">
            <div className="page">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/sign-in" component={Login} />
                <Route path="/sign-up" component={SignUp} />
                <Route path="/about" component={About} />
                <Route path="/courses" component={Courses} />
                <Route path="/category" component={Category} />
              </Switch>
            </div>
          </div>
          {/* <Hero/> */}
        </div>
      </Layout>
    </Router>
  );
}

export default App;
