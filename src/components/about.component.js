import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect,Link } from "react-router-dom";


export default class About extends Component {
render() {
return (
<div>

< div id="container" className="container-main-page" >
<div className="myToolbar">
<nav className="main-header navbar navbar-expand " style={{color:"#fff"}} >
  {/* Left navbar links */}
  <ul className="navbar-nav">
  
  <li className="nav-item">
                    <Link className="nav-link" to={"/about"}>
                      About Soma
                    </Link>
                  </li>
                 
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-in"}>
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to={"/sign-up"}>
                      Sign up
                    </Link>
                  </li>
  </ul>
  </nav>

</div>
<div id="topic">

</div>
<div className="content-wrapper">

<div className="course-body" >
<section className="section-padding">
<div className="container">
<div className="row">
<div className="col-md-8 col-lg-8 col-md-offset-2 col-lg-offset-2 col-sm-12 col-xs-12">
<div className="text-center wow fadeIn">
<h2 className="xs-font20">Welcome to Soma</h2>
<p>Our application provides first step to self and continuous learning process. It gives entry point to illiterate people. With latest challenges in the world like corona Virus everything is going online, but illiterate people can’t improve their lives or find resource to face the challenges. The app will allow people to learn on their own and reduce the chances of being looked down at. The app provides voice and video lessons and writing illustration. The app will connect learners and teachers in future.</p>
</div>
</div>
</div>
</div>
</section>
<section className="features-top-area" id="features">
<div className="container">
<div className="row promo-content">
<div className="col-md-4 col-lg-4 col-sm-6 col-xs-12">
<div className="text-icon-box mb20 xs-mb0 wow fadeInUp padding30" data-wow-delay="0.1s">
<div className="box-icon features-box-icon">
<i className="fa fa-graduation-cap" />
</div>
<h3 className="box-title">Learn the Basics</h3>
<p>We provides our learnes with basics literacy materials.Learners will learn alphabetical letters and numbers .</p>
</div>
</div>
<div className="col-md-4 col-lg-4 col-sm-6 col-xs-12">
<div className="text-icon-box relative mb20 xs-mb0 wow fadeInUp padding30" data-wow-delay="0.2s">
<div className="box-icon features-box-icon">
<i className="icofont icofont-business-man-alt-1" />
</div>
<h3 className="box-title">Connect with Expert Instructors</h3>
<p>We will connect studest with teachers and avail personal and one on one lessons to learners who need it</p>
</div>
</div>
<div className="col-md-4 col-lg-4 col-sm-6 col-xs-12">
<div className="text-icon-box relative mb20 xs-mb0 wow fadeInUp padding30" data-wow-delay="0.3s">
<div className="box-icon features-box-icon">
<i className="fa fa-rocket" />
</div>
<h3 className="box-title">Learn from anywhere</h3>
<p> Students can learn from the application or takeclasses remotely </p>
</div>
</div>

</div>
</div>
</section>


<div>

{/*ABOUT TOP CONTENT AREA END*/}


</div>


</div>

</div>
</div>
</div>



);
}
}