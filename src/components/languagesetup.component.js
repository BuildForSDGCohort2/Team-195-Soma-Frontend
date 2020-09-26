import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Language from "./language/language.component";
import Languagedit from "./language/languagedit.component";


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
    <a class="selectedLink" aria-current="page" href="/language/language">Create New Language</a>
	</div>
	<br />
	<br />
	<div className="auth-inner">
    <a class="selectedLink" aria-current="page" href="/language/languagedit">Edit Your Languages</a>
	</div>
    </nav>
	<Switch>
	<Route
                    path="/language/language"
                    component={Language} 
                />
				<Route
                    path="/language/languagedit"
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