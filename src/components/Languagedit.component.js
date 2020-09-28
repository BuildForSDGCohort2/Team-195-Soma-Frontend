import React,{Component} from "react";
import Button from 'react-bootstrap/Button'

export default class Languagedit extends Component{
	render(){
		return(
		<div className="auth-wrapper">
        <div className="auth-inner">
		<h3>Recent Languages </h3>
		<ol>
		<li>
		<p>ENGLISH <ul><li> Last edited on 19/08/2020 AT 19:13 EAT </li> 
		 <li><Button variant="outline-dark"> EDIT</Button> </li></ul>
		 </p>
		</li>
		<li>
		<p>SWAHILI<ul><li> Last edited on 19/03/2020 AT 20:13 EAT </li> 
		 <li><Button variant="outline-dark"> EDIT</Button> </li></ul>
		 </p>
		</li>
		<li>
		<p>IGBO <ul><li> Last edited on 01/01/2020 00:10 WAT </li> 
		 <li><Button variant="outline-dark"> EDIT</Button> </li></ul>
		 </p>
		</li>
		
		
		</ol>
		
		</div>
		</div>
);		
	}
}