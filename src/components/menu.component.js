import React from 'react'
import { BrowserRouter as Router, Switch, Route,  Link } from "react-router-dom";
import Courses from "../components/courses.component";
import Home from "../components/home.component";
import Category from '../components/category.component';
import Dashboard1 from '../components/dashboard.component';
import AddLanguage from '../components/language/AddLanguage.component';

import Language from "../components/language/language.component";
import LanguageList from "../components/language/LanguageList.component";
export default function menu() {
    return (
        <div>
           {/* Main Sidebar Container */}
<aside className="main-sidebar sidebar-dark-primary elevation-4">
  {/* Brand Logo */}
  <a href="index3.html" className="brand-link">
    <img src="dist/img/AdminLTELogo.png" alt="AdminLTE Logo" className="brand-image img-circle elevation-3" style={{opacity: '.8'}} />
    <span className="brand-text font-weight-light">Soma</span>
  </a>
  {/* Sidebar */}
  <div className="sidebar">
    {/* Sidebar user panel (optional) */}
    <div className="user-panel mt-3 pb-3 mb-3 d-flex">
      <div className="image">
        <img src="dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
      </div>
      <div className="info">
        <a href="#" className="d-block">Jane Doe</a>
      </div>
    </div>
    {/* Sidebar Menu */}
    <nav className="mt-2">
      <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
        {/* Add icons to the links using the .nav-icon class
         with font-awesome or any other icon font library */}
<li className="nav-item">
            <Link className="nav-link" to={"/dashbord"}> <i className="nav-icon fas fa-th" /> Dashboard</Link>
            </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/category"}> <i className="nav-icon fas fa-th" /> Category</Link>
            </li>
            <li className="nav-item">
            <Link className="nav-link" to={"/languages"}> <i className="nav-icon fas fa-th" /> Languages</Link>
            </li>
        <li className="nav-item">
            <Link className="nav-link" to={"/courses"}> <i className="nav-icon fas fa-th" />Courses</Link>
            </li>
        <li className="nav-item">
          <a href="pages/widgets.html" className="nav-link">
            <i className="nav-icon fas fa-th" />
            <p>
            Lessons
              <span className="right badge badge-danger">New</span>
            </p>
          </a>
        </li>
        
       
        
        
           
        
        
        
         
            
           
           
           
           
            
           
           
           
     
       
        
        
        
       
       
        
       
        
        
      </ul>
    </nav>
    {/* /.sidebar-menu */}
  </div>
  {/* /.sidebar */}
</aside>

<div className="auth-wrapper1">
        <div className="auth-inner1">
          <Switch>
         
          <Route path="/dashbord" component={Dashboard1} />
            <Route path="/category" component={Category} />
            <Route path="/courses" component={Courses} />
            <Route exact path={["/", "/languages"]} component={LanguageList} />
          <Route exact path="/addlanguage" component={AddLanguage} />
          <Route path="/languages/:id" component={Language} />
          </Switch>
        </div>
      </div>

        </div>
    )
}