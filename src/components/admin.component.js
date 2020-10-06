import React, { Component } from "react";
import axios from 'axios';

export default class Students extends Component{
    constructor(props){
    super(props);

    this.drawerState=this.drawerState.bind(this)
    this.switchModel=this.switchModel.bind(this)
    this.showForm=this.showForm.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    this.setFormValues=this.setFormValues.bind(this)

    this.state={
        //data from api
        courses:[],
        lessons:[],
        categories:[],
        users:[],
        langs:[],

        //data for table(columns and rows)
        

        //categories form
        form:{
            name:'',
            code:''
          },

        //colums for each model
        catCols:[{id:0,label:"Name"},{id:1,label:"Code"},{id:2,label:"Created At"}],

        drawer:false,
        contWidth:'',
        mLeft:'',
        user:{},
        
    }

    this.btnLabel='New Category';
    this.currentModel=0;
    this.cols=[];
    this.rows=[];
}

componentDidMount(){

    const token=localStorage.getItem("token");
        
        if (token){
          const user=JSON.parse(localStorage.getItem("user"))
          console.log("logged user ",user)
          this.setState({user:user})
          this.getData(true)
          this.interval=setInterval(() => {
              this.getData(false)
          }, 4000);

          }else this.props.history.push('/sign-in');

}

componentWillUnmount(){
    clearInterval(this.interval)
}

setFormValues(e){
    let frm=this.state.form
    frm[e.target.name]=e.target.value
    this.setState({form:frm})
  }


  onSubmit(e){
    e.preventDefault()
    axios.post("http://soma.local:84/api/man/category", (this.state.form)).then(({data})=>{

    console.log("succes message:",data.message)

    }).catch(err=>{
      console.error("error from submit ",err);
    })
  }
  
showForm(e){
    console.log(" formqt te before ",this.state.formState)
    this.setState({formState:!this.state.formState})
    document.getElementById("fillForm").style.display=this.state.formState ? "block":"none"
    console.log(" formqt te after ",this.state.formState)
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

switchModel(cases){
    console.log("model cases ",cases)
    switch (cases) {
        case 0:
            
                this.rows=this.state.categories
                this.cols=this.state.catCols
                this.btnLabel='New Category'
                this.currentModel=cases
            
            break;
    
        default:
            break;
    }
}

getData(def){
       
    axios.get('http://soma.local:84/api/admin')
    .then(({data}) => {
      
      this.setState({ 
          courses:data.course,
          users:data.users,
          categories:data.categories,
          langs:data.langs,
          lessons:data.course.lessons
        });

        def ? this.switchModel(0):this.switchModel(this.state.currentModel)

        console.log("admin data ",data)
      
    })
    .catch((error) => {
      console.warn(error);
    })
  }

render(){
    return(
        <div className="myConatiner">
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
                        <div className="list-menu-item clickable" onClick={this.switchModel(0)}>
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Categories</span>
                        </div>
                        <div className="list-menu-item clickable">
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Languages</span>
                        </div>
                        <div className="list-menu-item clickable">
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Courses</span>
                        </div>
                        <div className="list-menu-item clickable">
                            <div className="myMenu">
                                <img src="/img/icons/person.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Lessons</span>
                        </div>
                    </div>
                </div>
                <div id="container" className="container-page" style={{width: "calc(100% - 200px)",marginLeft:"200px"}}>
            <div className="myToolbar">
                <div className="myMenu clickable">
                    <img src="/img/icons/menu.png" alt="menu icon" className="myIcon" onClick={this.drawerState}/>
                </div>
                <h3>Administration Page</h3>
            </div>
            
            <div className="content-wrapper" style={{backgroundColor:"white",marginTop:"65px"}}>
            <div className="card-body table-responsive p-0">
        
        <table className="table table-hover text-nowrap">
          <thead>
              <tr>
                    <td style={{width:"70%"}}><input type="button" className="btn btn-primary float-left" value={this.btnLabel} onClick={this.showForm}/></td>
                    <td style={{width:"50%"}}><input type="text" name="table_search" className="form-control float-right" placeholder="Search" style={{width:"60%"}}/></td>
              </tr>
              <tr></tr>
            <tr>
              {this.cols.map(col=>(
              <th key={col.id}>{col.label}</th>
              ))}
            </tr>
          </thead>
          <tbody >
          {this.rows.map(row=>(
            <tr key={row.id}>
              
          <td>{row.name}</td>
          <td>{row.code}</td>
          <td>{row.created_at}</td>
          </tr>
          ))}
        
          </tbody>
        </table>
      </div>
     </div>
    
          <div id="fillForm" className="fill-parent" style={ {display:"none"} }>
          <div className="fill-form">
           <button type="button" onClick={this.showForm} className="close">&times;</button>
            <h3>Category Management</h3>
            <form className="entry-form" onSubmit={this.onSubmit}>
            <label htmlFor="name">Name:</label><input id="name" name="name" value={this.state.form.name}  onChange={this.setFormValues} type="text"/><br/>
            <label htmlFor="code">Code:</label><input id="code" name="code" type="text" value={this.state.form.code} onChange={this.setFormValues}/><br/>
            <div className="actions">
            <input type="reset" className="btn btn-danger" value="Reset" />
            <input type="submit" className="btn btn-success" value="Submit"/>
            </div>
            </form>
          </div>
          </div>
          </div>
          </div>

       
    )
}

}

