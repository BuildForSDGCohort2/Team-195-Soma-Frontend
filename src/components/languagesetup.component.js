import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Language from "./language.component";
import Languagedit from "./Languagedit.component";


export default class Languagesetup extends Component {
    render() {
		return(
		<Router>
		 <form>
		 <div className="auth-wrapper">
		 <h3> Language Setup </h3>
        <div >
	<nav>
	<div className="auth-inner">
    <a class="selectedLink" aria-current="page" href="/language">Create New Language</a>
	</div>
	<br />
	<br />
	<div className="auth-inner">
    <a class="selectedLink" aria-current="page" href="/Languagedit">Edit Your Languages</a>
	</div>
    </nav>
	<Switch>
	<Route
                    path="/language"
                    component={Language} 
                />
				<Route
                    path="/language"
                    component={Languagedit} 
                />
	</ Switch>
	 </div>
			</div>
			</ form>
			</ Router>
		);
	}
}