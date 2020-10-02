import React, { Component } from "react";
import axios from 'axios';

export default class Students extends Component{
    constructor(props){
    super(props);
    this.drawerState=this.drawerState.bind(this)
    
    this.state={
        course:[],
        lesson:[],
        drawer:true,
    }
}

componentDidMount(){
    this.getData()
}

drawerState(e){
    console.log(" formqt te before ",this.state.drawer)
    document.getElementById("drawer").style.display=this.state.drawer ? "block":"none"
    this.setState({drawer:!this.state.drawer})
}

getData(){
    axios.post('http://soma.local:84/api/user-data',{case:0})
    .then(({data}) => {
      let c = data.courses;
      this.setState({ course:c });
        console.log("course ",this.state.course)
      
    })
    .catch((error) => {
      console.warn(error);
    })
  }

render(){
    return(
        <div className="myConatiner">
            <section>
                <div id="drawer" className="myDrawer" style={{display:"block"}}>
                    <div className="user-profile" style={{backgroundImage:"url('/img/wall.jpg')",backgroundSize:"cover"}}>
                        <img src="/img/me.jpg" width="80" height="80" alt="profile" style={{borderRadius:"80%"}}/><br/>
                        <span style={{color:"white",fontSize:"medium",fontWeight:"bold",float:"left"}}>Mamadou Hady Diallo</span>
                        <span style={{color:"white",fontSize:"small",fontWeight:"italic",float:"left",marginTop:"2px"}}>mhadysydney@gmail.com<br/>664-504-690</span>
                    </div>
                    <div className="menu-list">
                        <div className="list-menu-item">
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>My Profile</span>
                        </div>
                        <div className="list-menu-item">
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>My Courses</span>
                        </div>
                        <div className="list-menu-item">
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>My Tests</span>
                        </div>
                    </div>
                </div>
                <div className="container-page">
            <div className="myToolbar">
                <div className="myMenu">
                    <img src="/img/icons/menu.png" alt="menu icon" className="myIcon" onClick={this.drawerState}/>
                </div>
                <h3>Courses and Lessons</h3>
            </div>
            <div id="topic">
            
            </div>
            <div className="content-wrapper">
                {this.state.course.map(course=>(
                    <div className="course-card" key={course.id}>
                        <div className="bg-light-blue-14">
                            <div className="myAvatar bg-light-blue-10" style={{marginTop:"5%",marginLeft:"35%"}}>
                                <img src="/img/icons/person.png" alt="avatar icon" className="myIcon"/>
                            </div>
                            <h6 style={{color:"white",textAlign:"center"}}>{course.name}</h6>
                            <p style={{color:"#1d1d1d",textAlign:"justify",backgroundColor:"#e0f7fa",padding:"5px"}}>{course.description}</p>
                            <input type="button" className="btn btn-success" value="Enroll"/>
                        </div>
                    </div>
                ))}
            </div>
            </div>
        </section> 
        </div>

       
    )
}

}

