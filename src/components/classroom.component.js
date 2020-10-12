import React, { Component } from "react";
import ReactPlayer from "react-player";


export default class Classroom extends Component {
    render() {
        return (
          <div className="myConatiner">
          <section>
              <div id="drawer" className="myDrawer" style={{display:"block"}}>
                  <div className="user-profile" style={{backgroundImage:"url('/img/wall.jpg')",backgroundSize:"cover"}}>
                      <img src="/img/me.jpg" width="80" height="80" alt="profile" style={{borderRadius:"80%"}}/><br/>
                      <span style={{color:"white",fontSize:"medium",fontWeight:"bold",float:"left"}}></span>
                      <span style={{color:"white",fontSize:"small",fontWeight:"italic",float:"left",marginTop:"2px"}}></span>
                  </div>
                  <div className="menu-list">
                      <div className="list-menu-item clickable">
                          <div className="myMenu">
                              <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                          </div>
                          <span>My Profile</span>
                      </div>
                      <div className="list-menu-item clickable">
                          <div className="myMenu">
                              <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                          </div>
                          <span>My lessons</span>
                      </div>
                      <div className="list-menu-item clickable">
                          <div className="myMenu">
                              <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                          </div>
                          <span>My Tests</span>
                      </div>
                  </div>
              </div>
              <div id="container" className="container-page" style={{width: "calc(100% - 200px)",marginLeft:"200px"}}>
          <div className="myToolbar">
              <div className="myMenu clickable">
                  <img src="/img/icons/menu.png" alt="menu icon" className="myIcon" onClick={this.drawerState}/>
              </div>
              <h3>Courses and Lessons</h3>
          </div>
          <div id="topic">
          
          </div>
          <div className="content-wrapper">
          <section className="colorlib-experience" data-section="timeline">
              <div className="colorlib-narrow-content">
                <div className="row">
                  <div className="col-md-6 col-md-offset-3 col-md-pull-3 animate-box" data-animate-effect="fadeInLeft">
                    <span className="heading-meta">highlights</span>
                    <h2 className="colorlib-heading animate-box">Courses</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="timeline-centered">
                      <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                        <div className="timeline-entry-inner">
                          <div className="timeline-icon color-3">
                            <i className="icon-pen2" />
                          </div>
                          <div className="timeline-label">
                            <h2 > English Alphabet </h2>
                            <p> <ReactPlayer
        url="https://youtu.be/C7iIRpzM8Bg"
      /></p>
                          </div>
                        </div>
                      </article>
                      <article className="timeline-entry animate-box" data-animate-effect="fadeInTop">
                        <div className="timeline-entry-inner">
                          <div className="timeline-icon color-4">
                            <i className="icon-pen2" />
                          </div>
                          <div className="timeline-label">
                            <h2>Basic Maths</h2>
                            <p> is simply dummy text of the printing and typesetting industry</p>
                          </div>
                        </div>
                      </article>
                      <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                        <div className="timeline-entry-inner">
                          <div className="timeline-icon color-5">
                            <i className="icon-pen2" />
                          </div>
                          <div className="timeline-label">
                            <h2>Basic Reading</h2>
                            <p>is simply dummy text of the printing and typesetting industry</p> 
                          </div>
                        </div>
                      </article>
                      <article className="timeline-entry begin animate-box" data-animate-effect="fadeInBottom">
                        <div className="timeline-entry-inner">
                          <div className="timeline-icon color-none">
                          </div>
                        </div>
                      </article>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          </div>
          
      </section> 
      </div>
            
            
        );
    }
}