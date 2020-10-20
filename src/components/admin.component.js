import React, { Component } from "react";
import axios from 'axios';
import API_URL from '../apicommon'

export default class Students extends Component{
    constructor(props){
    super(props);

    this.drawerState=this.drawerState.bind(this)
    this.switchModel=this.switchModel.bind(this)
    this.showForm=this.showForm.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    this.setFormValues=this.setFormValues.bind(this)
    this.returnRowValue=this.returnRowValue.bind(this)
    this.manDialog=this.manDialog.bind(this)
    this.delEntry=this.delEntry.bind(this)
   

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
            id:null,
            name:'',
            code:'',
            country:'',
            description:'',
            lesson_number:'',
            language_id:'',
            category_id:'',
            course_id:'',
            video_link:'',
            media_type:'video',
            files:'',
            media:'',
          },

        //colums for each model
        catCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Code",field:"code"},{id:2,label:"Created At",field:"created_at"}],

        langCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Country",field:"country"},{id:2,label:"Created At",field:"created_at"}],
        
        courseCols:[{id:0,label:"Name",field:"name"},
                    {id:1,label:"Description",field:"description"},
                    {id:2,label:"Created At",field:"created_at"}],

        lessCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Lesson Number",field:"lesson_number"},
                  {id:2,label:"Videos Links",field:'video_link'},{id:3,label:"Voices Links",field:'voice_link'},
                  {id:4,label:"Course",field:row=>row.course.name},{id:5,label:"Created At",field:"created_at"}],

        userCols:[{id:0,label:"Name",field:"name"},{id:1,label:"Email",field:"email"},{id:2,label:"Created At",field:"created_at"}],

        formState:true,
        dialogState:false,
        drawer:false,
        contWidth:'',
        mLeft:'',
        user:{},
        mediaLabel:'',
        btnLabel:'New Category',
        currentModel:0,
        cols:[],
        rows:[],
        formAPI:'',
        messageDialog:'',
        showUpdate:false
        
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

 delEntry(){
     //let conf=confirm("Are sure???")
    axios.post(API_URL+"man/delete", {table:this.state.formAPI,id:this.state.form.id}).then(({data})=>{
        console.log("succes message:",data.message)
        this.messageDialog=data.message
        this.manDialog()
        this.getData(false)
        }).catch(err=>{
          console.error("error from delete ",err);
          this.messageDialog="An error occured"
          this.manDialog()
        })
}

  onSubmit(e){
    e.preventDefault()
   /* if(this.state.form.media_type==='video') this.setState({form:{video_link:this.state.form.media}})
    else this.setState({form:{files:this.state.form.media}})*/
    
    axios.post(API_URL+"man/"+this.state.formAPI, (this.state.form)).then(({data})=>{

    console.log("succes message:",data.message)

    }).catch(err=>{
      console.error("error from submit ",err);
    })
  }
  
showForm(e){
    /*console.log(" formqt te before ",this.state.formState)
    this.setState({formState:!this.state.formState})
    document.getElementById("fillForm_"+this.currentModel).style.display=this.state.formState ? "block":"none"
    console.log(" formqt te after ",this.state.formState)*/
    this.showBloc("fillForm_"+this.currentModel)
  }

  showBloc(id,ex=true){
    let bl=document.getElementById(id).style.display
    if(ex)
         document.getElementById(id).style.display=bl==='none' ? 'block':'none'
    else document.getElementById(id).style.display='none'
  }

  manDialog(){ 
      /*console.log("man dialog state ",this.state.dialogState)
      this.setState({dialogState:!this.state.dialogState})
      document.getElementById("dialog").style.display=this.state.dialogState ? "block":"none"*/
      this.showBloc("dialog")
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
    this.showBloc("manEntry",false)
    this.currentModel=cases
    let btnAdd=document.getElementById("btnAdd")
    if(btnAdd!==null)
        btnAdd.style.display=cases<4 ? "block":"none"

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
   // console.log("rows",this.rows,"\ncols ",this.cols)
}

returnRowValue(col,row){
    if(typeof(col.field)!=='function')
         return row[col.field]
    else{ 
        return col.field(row)
    }
}

getSelectedRow(row){
    let frm=this.state.form
    for (const key of Object.entries(row)) {
        frm[key[0]]=row[key[0]]
        this.setState({form:frm})
    }
    console.log("selected row ",row)
    /*let bl=document.getElementById("manEntry").style.display
    document.getElementById("manEntry").style.display=bl==='none' ? 'block':'none'*/
    this.showBloc("manEntry")
    //this.showForm()
}

getData(def){
       
    axios.get('http://soma.local:84/api/admin')
    .then(({data}) => {
      
      this.setState({ 
          courses:data.course,
          users:data.users,
          categories:data.categories,
          langs:data.langs,
          lessons:data.lessons
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
                        <div className="profile-photo" style={{background:"url('/img/me.jpg')",backgroundSize:"cover"}}></div>
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
          {this.state.rows.map(row=>(
            <tr key={row.id} onClick={()=>this.getSelectedRow(row)} style={{cursor:"pointer"}}>
              {this.state.cols.map(col=>(
              <td key={col.id}>
                  {
                      this.returnRowValue(col,row)
                  }
                  </td>
              ))}
          <td>{row.name}</td>
          <td>{row.code}</td>
          <td>{row.created_at}</td>
          </tr>
          ))}
        
          </tbody>
        </table>
        <div id="manEntry" style={{marginLeft:"20%",marginTop:"20px",width:"20%",display:"none"}}>
            <button type="button" className="btn btn-danger" onClick={this.delEntry} style={{marginRight:"20px"}}>Delete Entry</button>
            <button type="button" className="btn btn-success" onClick={this.showForm}>Update Entry</button>
        </div>
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
            <label htmlFor="lang">Language:</label>
            <select id="lang" name="language_id" className="form-control" value={this.state.form.language} onChange={this.setFormValues} required>
            <option value="0">--Select here--</option>
                {this.state.langs.map(lang=>(
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
            </select>
                <br/>
            <label htmlFor="cat">Category:</label>
            <select id="cat" name="category_id" className="form-control" type="text" value={this.state.form.category} onChange={this.setFormValues} required>
            <option value="0">--Select here--</option>
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
            <select id="course" name="course_id" className="form-control" type="text" value={this.state.form.description} onChange={this.setFormValues} required>
            {this.state.courses.map(course=>(
                    <option key={course.id} value={course.id}>{course.name}</option>
            ))}
            </select>
                <br/>
            <label htmlFor="name">Name:</label><input id="name" name="name" className="form-control" value={this.state.form.name}  onChange={this.setFormValues} type="text" required/><br/>
            <label htmlFor="lnumber">Lesson Number:</label><input id="lnumber" name="lesson_number" className="form-control" type="text" value={this.state.form.lesson_number} onChange={this.setFormValues} required/><br/>
            <label htmlFor="media">Media Type:</label>
            <select id="media" name="media_type" className="form-control" type="text" value={this.state.form.media_type} onChange={this.setFormValues}>
            
                    <option  value='video'>Video</option>
                    <option  value='voice'>Voice</option>
            
            </select>
                <br/>
            <label htmlFor="name">{this.state.form.media_type==='voice'?'Voices File':'Media Link'}</label>
            <input id="name" name="media" className="form-control" value={this.state.form.media} multiple={this.state.form.media_type==='voice'} onChange={this.setFormValues} type={this.state.form.media_type==='voice'?"file":"text"} required/><br/>
            <div className="actions">
            <button type="reset" className="btn btn-danger">Reset</button>
            <button type="submit" className="btn btn-success">Submit</button>
            </div>
            </form>
          </div>
          </div>

          <div className="dialogParent" id="dialog"  style={ {display:"none"} }>
              <div className="myDialog"> 
                <div className="myMenu">
                    <img src="/img/icons/message.svg" alt="menu icon" className="myIcon"/>
                </div><span>Information</span>
            <p>{this.messageDialog}</p><br/>
            <button type="submit" className="btn btn-success" onClick={this.manDialog}>Ok</button>
          </div>
          </div>
          </div>
          </div>

       
    )
}

}

