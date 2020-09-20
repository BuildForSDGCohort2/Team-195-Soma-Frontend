import React,{Component} from 'react';
//import DropdownButton from 'react-bootstrap/DropdownButton'
//import Dropdown from 'react-bootstrap/Dropdown'



export default class Language extends Component {
render(){
	return(
	<form>
	<div className="auth-wrapper">
        <div className="auth-inner">
                <h3>SELECT LANGUAGE</h3>
				 <div className="form-group">
                    <label>NAME</label>
                    <input type="Name" className="form-control" placeholder="Enter Your Name" />
                </div>

                <div className="form-group">
                    <label>COUNTRY</label>
                    <input type="COUNTRY" className="form-control" placeholder="Enter Your country" />
                </div>
				 <button type="submit" className="btn btn-primary btn-block">Submit</button>
	    </ div>
	</ div>
	</form>				
);
}
}