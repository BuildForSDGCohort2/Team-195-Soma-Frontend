import React, { Component } from "react";
import axios from 'axios';
import { Button} from 'react-bootstrap';


export default class Category extends Component {
  constructor(props){
    super(props);
    this.showForm=this.showForm.bind(this)
    this.onSubmit=this.onSubmit.bind(this)
    this.setFormValues=this.setFormValues.bind(this)
    //this.setCode=this.setCode.bind(this)
  this.state = {
    formState:true,
    persons: {},
    categories:[],
    form:{
      name:'',
      code:''
    },
    
  }
}
  componentDidMount() {
    this.getData()
    this.interval=setInterval(()=>this.getData(),3000)
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getData(){
    axios.get('http://soma.local:84/api/admin')
    .then(res => {
      const persons = res.data;
      this.setState({ persons:persons });

      let cat=res.data.categories;
      this.setState({ categories:cat });
    })
    .catch((error) => {
      console.warn(error);
    })
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

   
  deleteUser(userId) {  
    const { users } = this.state;     
   axios.delete('https://jsonplaceholder.typicode.com/users/' + userId).then(result=>{  
     alert(result.data);  
      this.setState({  
        response:result,  
        users:users.filter(user=>user.UserId !== userId)  
      });  
    });  
  }  

    render() {
        return (
          <div>
          <div className="content-wrapper">
          {/* Content Header (Page header) */}
          <div className="content-header">
            <div className="container-fluid">
              <div className="row mb-2">
                <div className="col-sm-6">
                  <h1 className="m-0 text-dark">Language Category</h1>
                </div>{/* /.col */}
                <div className="col-sm-6">
                  <ol className="breadcrumb float-sm-right">
                    <li className="breadcrumb-item"><a href="#">Soma</a></li>
                    <li className="breadcrumb-item active">Category</li>
                  </ol>
                </div>{/* /.col */}
              </div>{/* /.row */}
            </div>{/* /.container-fluid */}
    {/* /.row */}
    <div className="content">
    <div className="container-fluid">
<div className="row">
  <div className="col-12">
    <div className="card">
      <div className="card-header">
        <h3 className="card-title">Responsive Hover Table</h3><br/>
        <input type="button" className="btn btn-primary float-left" value="New Category" onClick={this.showForm}/>
        <div className="card-tools">
       
          <div className="input-group input-group-sm" style={{width: 150}}>
            <input type="text" name="table_search" className="form-control float-right" placeholder="Search" />
            <div className="input-group-append">
              <button type="submit" className="btn btn-default"><i className="fas fa-search" /></button>
            </div>
          </div>
        </div>
      </div>
      
      {/* /.card-header */}
      
      <div className="card-body table-responsive p-0">
        
        <table className="table table-hover text-nowrap">
          <thead>
            <tr>
              
              <th>Name</th>
              <th>Code</th>
              <th>Created At</th>
              
            </tr>
          </thead>
          <tbody >
          {this.state.categories.map(cat=>(
            <tr key={cat.id}>
              
          <td>{cat.name}</td>
          <td>{cat.code}</td>
          <td>{cat.created_at}</td>
          </tr>
          ))}
          {/* { this.state.Object.keys(persons).map(person =><tr>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td><span className="tag tag-success">{person.name}</span></td>
             
            </tr> )} */}
                     { /*<tr>
              <td>183</td>
              <td>John Doe</td>
              <td>11-7-2014</td>
              <td><span className="tag tag-success">Approved</span></td>
             
            </tr>
            <tr>
              <td>219</td>
              <td>Alexander Pierce</td>
              <td>11-7-2014</td>
              <td><span className="tag tag-warning">Pending</span></td>
              
            </tr>*/}
            
            
          </tbody>
        </table>
      </div>
      {/* /.card-body */}
    </div>
    {/* /.card */}
  </div>
</div>
{/* /.row */}
</div>
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
          </div>
        );
    }
}
