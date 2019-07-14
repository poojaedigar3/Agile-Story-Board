import React, {Component} from 'react';
//import * as React  from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import ProgressBar from 'react-bootstrap/ProgressBar'
//import 'moment-timezone';
import axios from 'axios';

const Story = props => (
    <tr className={(props.story.story_status==='Completed') ? 'completed' : ''}>
    <td>{props.story.story_Id}</td>
    <td>{props.story.story_description}</td>
    <td>{props.story.story_responsible}</td>
    <td>{props.story.story_points}</td>
    <td>{props.story.story_priority}</td>
    <td>{props.story.story_status}</td>
    <td><Moment format="D MMM YYYY">{props.story.createdAt}</Moment></td>
    <td><Moment format="D MMM YYYY">{props.story.updatedAt}</Moment></td>
    <td style={{width:100}}>
          <ProgressBar variant= {(props.story.story_status==='Completed') ? 'success' : ((props.story.story_status==='To Do') ? 'info' : '')} style={{width:100}} animated min={0} max={props.story.story_estimatedTime} now={props.story.story_timeConsumed} label={`${props.story.percentComplete}%`} /></td>

    <td> <Link to={"/edit/"+props.story._id}>Edit/Delete/Log</Link> </td>

    </tr>
)

class Stories extends Component {

constructor(props){
super(props);
this.state = {stories: []};
}
componentDidMount(){
console.log("Component Mounted");
    axios.get('http://localhost:3002/storyboard/')
    .then(response => { this.setState({ stories: response.data}); })
    .catch(function(error){
    console.log(error);
    })
}


componentDidUpdate(){
console.log("Component Updated");

    axios.get('http://localhost:3002/storyboard/')
    .then( response => { if(this.state.stories!=response.data) {this.setState({ stories: response.data}); }
    })
    .catch(function(error){
    console.log(error);
    })
}
stories()
{
    return this.state.stories.map(function(currentStory, iterator){
        let percentComplete = parseInt((parseInt(currentStory.story_timeConsumed)/parseInt(currentStory.story_estimatedTime))*100);
        currentStory.percentComplete = (((typeof(percentComplete)) == 'undefined' )|| isNaN(percentComplete) || percentComplete==null) ? 0 : percentComplete;
        return <Story story={currentStory} key={iterator} />;
    });
}


    render(){
        return(
            <div className="container mw-100" style={{"fontSize" : "15"}}>
               <h3 style={{marginTop:30}}>Stories</h3>

                <table className="table table-striped" style={{marginTop:30}}>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Description</th>
                        <th>Responsible</th>
                        <th>Points</th>
                        <th>Priority</th>
                        <th>Status</th>
                        <th>Created On</th>
                        <th>Last Updated On</th>
                        <th style={{width:60}}>Progress</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                        {this.stories()}
                    </tbody>

                </table>
            </div>

        );
    }
}

export default Stories;