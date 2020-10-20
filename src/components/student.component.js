import React, { Component } from "react";
import axios from 'axios';
import API_URL from "../apicommon";

export default class Students extends Component{
    constructor(props){
    super(props);
    this.drawerState=this.drawerState.bind(this)
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.goToMenu=this.goToMenu.bind(this)
    this.logout=this.logout.bind(this)
    

    this.state={
        
        course:[],
        lesson:[],
        drawer:false,
        contWidth:'',
        mLeft:'',
        user:{},

    }
}

handleChange =(e) =>{
    //const name= e.target.name;
    

    
}

handleSubmit=(e)=>{
    //e.preventDefault();
    let val =e.target.id;
    val=parseInt(val)
    let course=this.state.course
    
    let enroledCourse=course.filter(c=>(c.id===val))[0]
    
    let firstLess=enroledCourse.lessons[0]
    
    console.log('enroled course ',enroledCourse,'\n enroled first less ',firstLess)
    
    
    
    if(typeof(firstLess)!=='undefined'){
        const data= firstLess.id;
    axios
    .post(API_URL+'students', {lesson:data},{
        headers:{
            Authorization:"Bearer   "+localStorage.getItem('token')
        }
    })
    .then(res => {
      
       console.log("succes message:",data.message)
       this.props.history.push('/classroom');
     })
    .catch((err)=>{
      console.log("Enrollement error ",err)
    })

    }else console.log("Sorry No Lessons for this course choose another one. ")


}

componentDidMount(){
    const token=localStorage.getItem("token");
        
        if (token){
          const user=JSON.parse(localStorage.getItem("user"))
          console.log("logged user ",user)
          this.setState({user:user})
          this.getData()
          }else this.props.history.push('/sign-in');
}

drawerState(e){
    let w='',ml=''
    let bloc=document.getElementById("container")
    console.log(" formqt te before ",this.state.drawer)

    w=this.state.drawer ? "calc(100% - 200px)":"100%"
    ml=this.state.drawer ? "200px":"0"

    document.getElementById("drawer").style.display=this.state.drawer ? "block":"none"
    bloc.style.width=w
    bloc.style.marginLeft=ml
    this.setState({drawer:!this.state.drawer})
    
}

goToMenu(e){
    
    const link=e.target.id
    console.log('link ',link)
    this.props.history.push("/"+link)
}

logout(){
    let config={
        method: 'post',
        url: API_URL+'logout',
        headers:{
            Authorization:"Bearer   "+localStorage.getItem('token')
        }
    }
    axios(config)
    .then(({data}) => {
        localStorage.removeItem('token')
        console.log(data.message)
        this.props.history.push("/")
    }).catch((err)=>{
        console.log("error log out ",err.message)
    })
}

getData(){
        
    axios.post(API_URL+'user-data',{case:0},{
        headers:{
            Authorization:"Bearer   "+localStorage.getItem('token')
        }
    })
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
                        <div id="classroom" className="list-menu-item clickable" onClick={this.goToMenu}>
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>My Courses</span>
                        </div>
                        <div className="list-menu-item clickable">
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>My Tests</span>
                        </div>
                        <div className="list-menu-item clickable" onClick={this.logout}>
                            <div className="myMenu">
                                <img src="/img/icons/exit_app.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Log out</span>
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
                {this.state.course.map(course=>(
                    <div className="course-card" key={course.id}>
                        <div className="bg-light-blue-14">
                            <div className="myAvatar bg-light-blue-10" style={{marginTop:"5%",marginLeft:"35%"}}>
                                <img src="/img/icons/person.png" alt="avatar icon" className="myIcon"/>
                            </div>
                            <h6 style={{color:"white",textAlign:"center"}}>{course.name}</h6>
                            <p style={{color:"#1d1d1d",textAlign:"justify",backgroundColor:"#e0f7fa",padding:"5px"}}>{course.description}</p>
                           
                            <button type="button" id={course.id} className="btn btn-success" onClick={this.handleSubmit}>Enroll</button>
                            
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

