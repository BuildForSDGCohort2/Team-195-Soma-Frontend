import React, { Component } from "react";
import axios from 'axios';
import { Button} from 'react-bootstrap';


export default class Category extends Component {
  state = {
    persons: []
  }
  componentDidMount() {
    axios.get('http://localhost:8000/api/admin')
    .then(res => {
      const persons = res.data;
      this.setState({ persons });
      console.log(persons)
    })
    .catch((error) => {
      console.warn(error);
    })
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
        <h3 className="card-title">Responsive Hover Table</h3>
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
              <th>ID</th>
              <th>Name</th>
              <th>Code</th>
              <th>Action</th>
              
            </tr>
          </thead>
          <tbody>
            
          {/* { this.state.Object.keys(persons).map(person =><tr>
              <td>{person.id}</td>
              <td>{person.name}</td>
              <td>{person.email}</td>
              <td><span className="tag tag-success">{person.name}</span></td>
             
            </tr> )} */}
                      <tr>
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
              
            </tr>
            
            
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
            
            
        );
    }
}
