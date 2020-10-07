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
    this.modelClicked=this.modelClicked.bind(this)

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
            code:'',
            country:'',
            description:'',
            lesson_number:'',
            language:'',
            category:'',
            course:'',
            media_type:'',
            media:'',
          },

        //colums for each model
        catCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Code",field:"code"},{id:2,label:"Created At",field:"created_at"}],
        langCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Country",field:"country"},{id:2,label:"Created At",field:"created_at"}],
        courseCols:[{id:0,label:"Name",field:"name"},
                    {id:1,label:"Description",field:"description"},
                    {id:2,label:"Created At",field:"created_at"}],
        lessCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Lesson Number",field:"lesson_number"},
                  {id:2,label:"Created At",field:"created_at"}],
        userCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Email",field:"email"},{id:2,label:"Created At",field:"created_at"}],

        drawer:false,
        contWidth:'',
        mLeft:'',
        user:{},
        
    }
    this.mediaLabel=''
    this.btnLabel='New Category';
    this.currentModel=0;
    this.cols=[];
    this.rows=[];
    this.formAPI=''
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
    axios.post("http://soma.local:84/api/man/"+this.formAPI, (this.state.form)).then(({data})=>{

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
modelClicked(e){
    //let m=e.name
    console.log("model cases ",e)
    //this.switchModel(m)
}
switchModel(cases){
    //let cases=e.target.case
    //console.log("model cases ",cases)
    this.currentModel=cases
    let btnAdd=document.getElementById("btnAdd")
    if(btnAdd!==null)
        btnAdd.style.display=cases<4 ? "block":"none"

    switch (cases) {
        case 0:
            
                this.rows=typeof(this.state.categories)!=='undefined'?this.state.categories:[]
                this.cols=this.state.catCols
                this.btnLabel='New Category'
                this.formAPI='category'
            
            break;

        case 1:
            
                this.rows=typeof(this.state.langs)!=='undefined'?this.state.langs:[]
                this.cols=this.state.langCols
                this.btnLabel='New Language'
                this.formAPI='language'
            break;

        case 2:
            
                this.rows=typeof(this.state.courses)!=='undefined'?this.state.courses:[]
                this.cols=this.state.courseCols
                this.btnLabel='New Course'
                this.formAPI='course'
            break;

        case 3:
            
                this.rows=typeof(this.state.lessons)!=='undefined'?this.state.lessons:[]
                this.cols=this.state.lessCols
                this.btnLabel='New Lesson'
                this.formAPI='lesson'
            break;

        case 4:
            
                this.rows=typeof(this.state.users)!=='undefined'?this.state.users:[]
                this.cols=this.state.userCols
            
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

        def===true? this.switchModel(0):this.switchModel(this.currentModel)

        //console.log("admin data ",data)
      
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
                        <div className="list-menu-item clickable" onClick={()=>this.switchModel(0)}>
                            <div className="myMenu">
                                <img src="/img/icons/category.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Categories</span>
                        </div>
                        <div className="list-menu-item clickable" onClick={()=>this.switchModel(1)}>
                            <div className="myMenu">
                                <img src="/img/icons/lang.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Languages</span>
                        </div>
                        <div className="list-menu-item clickable" onClick={()=>this.switchModel(2)}>
                            <div className="myMenu">
                                <img src="/img/icons/course.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Courses</span>
                        </div>
                        <div className="list-menu-item clickable" onClick={()=>this.switchModel(3)}>
                            <div className="myMenu">
                                <img src="/img/icons/lesson.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Lessons</span>
                        </div>
                        <div className="list-menu-item clickable" onClick={()=>this.switchModel(4)}>
                            <div className="myMenu">
                                <img src="/img/icons/people.svg" alt="menu icon" className="myIcon"/>
                            </div>
                            <span>Registered Users</span>
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
        
        <table className="table table-hover text-nowrap" style={{border:"1px solid black"}}>
          <thead>
              <tr>
                    <td style={{width:"70%"}}><input id="btnAdd" type="button" className="btn btn-primary float-left" value={this.btnLabel} onClick={this.showForm} style={{display:"block"}}/></td>
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
              {this.cols.map(col=>(
              <td key={col.id}>{row[col.field]}</td>
              ))}
          {/*<td>{row.name}</td>
          <td>{row.code}</td>
          <td>{row.created_at}</td>*/}
          </tr>
          ))}
        
          </tbody>
        </table>
      </div>
     </div>
    
          <div id="fillForm_0" className="fill-parent" style={ {display:"none"} }>
          <div className="fill-form">
           <button type="button" onClick={this.showForm} className="close">&times;</button>
            <h3>Category Management</h3>
            <form className="entry-form" onSubmit={this.onSubmit}>
            <label htmlFor="name">Name:</label><input id="name" name="name" className="form-control" value={this.state.form.name}  onChange={this.setFormValues} type="text" required/><br/>
            <label htmlFor="code">Code:</label><input id="code" name="code" className="form-control" type="text" value={this.state.form.code} onChange={this.setFormValues} required/><br/>
            <div className="actions">
            <button type="reset" className="btn btn-danger">Reset</button>
            <button type="submit" className="btn btn-success">Submit</button>
            </div>
            </form>
          </div>
          </div>

          <div id="fillForm_1" className="fill-parent" style={ {display:"none"} }>
          <div className="fill-form">
           <button type="button" onClick={this.showForm} className="close">&times;</button>
            <h3>Language Management</h3>
            <form className="entry-form" onSubmit={this.onSubmit}>
            <label htmlFor="name">Name:</label><input id="name" name="name" className="form-control" value={this.state.form.name}  onChange={this.setFormValues} type="text" required/><br/>
            <label htmlFor="code">Country:</label><input id="country" name="country" className="form-control" type="text" value={this.state.form.country} onChange={this.setFormValues} required/><br/>
            <div className="actions">
            <button type="reset" className="btn btn-danger">Reset</button>
            <button type="submit" className="btn btn-success">Submit</button>
            </div>
            </form>
          </div>
          </div>

          <div id="fillForm_2" className="fill-parent" style={ {display:"none"} }>
          <div className="fill-form">
           <button type="button" onClick={this.showForm} className="close">&times;</button>
            <h3>Course Management</h3>
            <form className="entry-form" onSubmit={this.onSubmit}>
            <label htmlFor="name">Name:</label><input id="name" name="name" className="form-control" value={this.state.form.name}  onChange={this.setFormValues} type="text" required/><br/>
            <label htmlFor="description">Description:</label><textarea id="description" name="description" className="form-control" value={this.state.form.description} onChange={this.setFormValues} required/><br/>
            <label htmlFor="lang">Name:</label>
            <select id="lang" name="language" className="form-control" value={this.state.form.category} onChange={this.setFormValues} required>
                {this.state.langs.map(lang=>(
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
            </select>
                <br/>
            <label htmlFor="cat">Category:</label>
            <select id="cat" name="category" className="form-control" type="text" value={this.state.form.category} onChange={this.setFormValues} required>
            {this.state.categories.map(cat=>(
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
            </select>
                <br/>
            <div className="actions">
            <button type="reset" className="btn btn-danger">Reset</button>
            <button type="submit" className="btn btn-success">Submit</button>
            </div>
            </form>
          </div>
          </div>

          <div id="fillForm_3" className="fill-parent" style={ {display:"none"} }>
          <div className="fill-form">
           <button type="button" onClick={this.showForm} className="close">&times;</button>
            <h3>Lesson Management</h3>
            <form className="entry-form" onSubmit={this.onSubmit}>
            <label htmlFor="course">Course:</label>
            <select id="course" name="course" className="form-control" type="text" value={this.state.form.description} onChange={this.setFormValues} required>
            {this.state.courses.map(course=>(
                    <option key={course.id} value={course.id}>{course.name}</option>
            ))}
            </select>
                <br/>
            <label htmlFor="name">Name:</label><input id="name" name="name" className="form-control" value={this.state.form.name}  onChange={this.setFormValues} type="text" required/><br/>
            <label htmlFor="lnumber">Lesson Number:</label><input id="lnumber" name="lesson_number" className="form-control" type="text" value={this.state.form.lesson_number} onChange={this.setFormValues} required/><br/>
            <label htmlFor="media">Course:</label>
            <select id="media" name="media_type" className="form-control" type="text" value={this.state.form.media_type} onChange={this.setFormValues}>
            
                    <option  value='video'>Video</option>
                    <option  value='voice'>Voice</option>
            
            </select>
                <br/>
            <label htmlFor="name">{this.state.form.media_type==='voice'?'Voices File':'Media Link'}</label>
            <input id="name" name="name" className="form-control" value={this.state.form.media} multiple={this.state.form.media_type==='voice'} onChange={this.setFormValues} type={this.state.form.media_type==='voice'?"file":"text"} required/><br/>
            <div className="actions">
            <button type="reset" className="btn btn-danger">Reset</button>
            <button type="submit" className="btn btn-success">Submit</button>
            </div>
            </form>
          </div>
          </div>

          </div>
          </div>

       
    )
}

}

