
import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Home extends Component {
    render() {
      const token=localStorage.getItem('token');
        if (token){
        const user=localStorage.getItem("user")
        console.log("logged user ",user)
        if(user.role_id===1)
             return <Redirect to='/course'/>;
        else return <Redirect to='/student'/>;
        }else{
          console.log("no logged user ");
          return <Redirect to='/sign-in' />;

            }
            
        return (
          <div>
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
                            <h2>Basic Reading and Writting </h2>
                            <p>is simply dummy text of the printing and typesetting industry</p>
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
            
            
        );
    }
}