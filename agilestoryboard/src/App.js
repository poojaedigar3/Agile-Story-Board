import React, {Component} from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import CreateStory from "./components/create-story.component";
import EditStory from "./components/edit-story.component";
import Stories from "./components/stories.component";
import logo from "./logo.png";

class App extends Component {


    render(){
    return (
      <Router>
        <div className="container mw-100">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="https://www.linkedin.com/in/pooja-edigar/">
                <img src={logo} width="70" height="60" alt="StoryBoard"/>
            </a>
                <Link to="/" className="navbar-brand">Agile Story Board</Link>
                <div className="collpase nav-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            <Link to="/create" className="nav-link">Create Story</Link>
                        </li>

                    </ul>
                </div>
            </nav>
        </div>
         <Route path="/" exact component={Stories} />
         <Route path="/edit/:id" component={EditStory} />
         <Route path="/create" component={CreateStory} />
      </Router>

  );
}}

export default App;
