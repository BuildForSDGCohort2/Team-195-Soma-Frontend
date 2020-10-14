import React, { Component } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import API_URL from "../apicommon"


export default class Classroom extends Component {

  constructor(props){
    super(props);

    this.state={
      lessons:[],
      tests:[],
      grades:[],
      practice:[],
      user:{},
      video_link:'',
      lesson_title:''
    }
    this.currentLesson=0
  }

  componentDidMount(){
    const token=localStorage.getItem("token");
        
    if (token){
      const user=JSON.parse(localStorage.getItem("user"))
      console.log("logged user ",user)
     // this.setState({user:user})
      this.getData(user)
      
      setTimeout(() => {
        console.log("lessons ",this.state.lessons)
        this.getLesson(0)
      }, 3000);
      }else this.props.history.push('/sign-in');
  }

  getLesson(nb){
    this.currentLesson+=nb
    const link=this.state.lessons[this.currentLesson].video_link
    const title=this.state.lessons[this.currentLesson].name
    this.setState({video_link:link,lesson_title:title})
  }


getData(user){
        
    axios.post(API_URL+'user-data',{case:1},{
      headers:{
          Authorization:"Bearer   "+localStorage.getItem('token')
      }
  })
    .then(({data}) => {
      console.log("data lessons ",data)
      this.setState({ 
        user:user,
        lessons:data.lessons,
        tests:data.tests,
        grades:data.grades,
        practice:data.practice 
      });
       
    })
    .catch((error) => {
      console.warn(error);
    })
  }

    render() {
        return (
          <div className="myConatiner">
          {/*
              <div id="drawer" className="myDrawer" style={{display:"block"}}>
                  <div className="user-profile" style={{backgroundImage:"url('/img/wall.jpg')",backgroundSize:"cover"}}>
                      <img src="/img/me.jpg" width="80" height="80" alt="profile" style={{borderRadius:"80%"}}/><br/>
                      <span style={{color:"white",fontSize:"medium",fontWeight:"bold",float:"left"}}>{this.state.user.name}</span>
                      <span style={{color:"white",fontSize:"small",fontWeight:"italic",float:"left",marginTop:"2px"}}>{this.state.user.email}</span>
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
              </div>*/}

              <div id="container" className="container-page" style={{width: "100%",marginLeft:"2px"}}>
          <div className="myToolbar">
              <div className="myMenu clickable">
                  <img src="/img/icons/go_back.svg" alt="menu icon" className="myIcon" onClick={()=>this.props.history.go(-1)}/>
              </div>
              <h3>Enrolled Lessons</h3>
          </div>
          
          <div className="content-wrapper">
            <div style={{backgroundColor:"white",marginTop:"85px",marginLeft:"30%"}}>
            <h2 style={{textAlign:"left"}}> {this.state.lesson_title} </h2>
             <ReactPlayer
                  url={this.state.video_link}
                />
             </div>
            <button type="button" className="btn btn-success" style={{float:"left",marginTop:"10px",marginLeft:"10px",display:"block"}} onClick={()=>this.getLesson(-1)}>
                Previous <span className="glyphicon glyphicon-backward"></span>
            </button>

            <button type="button" className="btn btn-success" style={{float:"right",marginTop:"10px",display:"block",marginRight:"10px"}} onClick={()=>this.getLesson(1)}>
                Next <span className="glyphicon glyphicon-forward"></span>
            </button>
            {/*
          <section className="colorlib-experience" data-section="timeline">
              <div className="colorlib-narrow-content">
                
                <div className="row">
                  <div className="col-md-12">
                    <div className="timeline-centered">
                      <article className="timeline-entry animate-box" data-animate-effect="fadeInLeft">
                        <div className="timeline-entry-inner">
                          <div className="timeline-icon color-3">
                            <i className="icon-pen2" />
                          </div>
                          <div className="timeline-label">
                            
                          </div>
                        </div>
                      </article>
                      
                    </div>
                  </div>
                </div>
              </div>
            </section>*/}
          </div>
          </div>
      </div>
            
            
        );
    }
}