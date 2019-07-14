import React, {Component} from 'react';
import axios from 'axios';

class EditStory extends Component {

 constructor(props){
 super(props);
 console.log("Inside update component");
 this.onChangeStoryDescription = this.onChangeStoryDescription.bind(this);
         this.onChangeStoryResponsible = this.onChangeStoryResponsible.bind(this);
         this.onChangeStoryStatus = this.onChangeStoryStatus.bind(this);
         this.onChangeStoryPoints = this.onChangeStoryPoints.bind(this);
         this.onChangeStoryPriority = this.onChangeStoryPriority.bind(this);
         this.onChangeStoryEstimatedTime = this.onChangeStoryEstimatedTime.bind(this);
         this.onChangeStoryLoggedHours = this.onChangeStoryLoggedHours.bind(this);
         this.onSubmit = this.onSubmit.bind(this);
       // this.updateStory = this.updateStory.bind(this);
        this.deleteStory = this.deleteStory.bind(this);

 this.state={
             story_description: '',
             story_responsible:'',
             story_priority:'',
             story_status:'',
             story_points: 0,
             story_estimatedTime:0,
             Story_timeConsumed:0,
             story_loggedHours: 0
         }
 }

 componentDidMount(){
 axios.get('http://localhost:3002/storyBoard/'+this.props.match.params.id)
 .then(response => {
        this.setState({
        story_description: response.data.story_description,
        story_responsible: response.data.story_responsible,
        story_priority: response.data.story_priority,
        story_status:response.data.story_status,
        story_points:response.data.story_points,
        story_estimatedTime: response.data.story_estimatedTime,
        story_timeConsumed: (typeof(response.data.story_timeConsumed) === 'undefined' || response.data.story_estimatedTime == null) ? 0: response.data.story_timeConsumed,
        story_loggedHours: 0
        });
        })
        .catch(function(error){
            console.log(error);
        })
 }

    onChangeStoryDescription=(event)=>{

    console.log("description updated");
        this.setState({
            story_description: event.target.value
        });
}

    onChangeStoryResponsible=(event)=>{
        this.setState({
            story_responsible: event.target.value
        });
    }

    onChangeStoryPriority=(event)=>{
        this.setState({
            story_priority: event.target.value
        });
    }

    onChangeStoryStatus=(event)=>{
        this.setState({
            story_status: event.target.value
        });
    }

    onChangeStoryPoints=(event)=>{
    console.log(event.target.value);
        this.setState({
            story_points: event.target.value
        });
    }
    onChangeStoryEstimatedTime =(event)=>{
    console.log(event.target.value);
        this.setState({
            story_estimatedTime: event.target.value
        });
    }
     onChangeStoryLoggedHours=(event)=>{
        console.log(event.target.value);
            this.setState({
                story_loggedHours: event.target.value
            });
        }
 onSubmit(event){
        event.preventDefault();

        let timeConsumed = parseInt(this.state.story_timeConsumed) + parseInt(this.state.story_loggedHours);
        if(parseInt(this.state.story_loggedHours) && this.state.story_status=="To Do"){this.state.story_status="In Progress";}
        const updatedStory = {
                    story_description: this.state.story_description,
                    story_responsible:this.state.story_responsible,
                    story_priority:this.state.story_priority,
                    story_status:this.state.story_status,
                    story_points: this.state.story_points,
                    story_estimatedTime: this.state.story_estimatedTime,
                    story_timeConsumed: timeConsumed

        }
                const url = 'http://localhost:3002/storyBoard/edit/'+this.props.match.params.id;
                console.log(url);
                axios.post(url,updatedStory)
                .then(res=>console.log("res.data"));

                    this.props.history.push('/');
        }


deleteStory(event)
{

 event.preventDefault();
            console.log("Inside Delete");
            const url = 'http://localhost:3002/storyboard/delete/'+ this.props.match.params.id;
            console.log("Inside Delete"+ url);
            axios.delete(url)
            .then(response => response.data)
            .catch(function(error){
            console.log(error);
            })

            this.props.history.push('/');
}

    render(){
        return(
            <div style={{marginTop:30}} className="container">
                <h3> Update Story </h3>
                <form onSubmit= {this.onSubmit}>

                <div className="form-group">
                  <label> Description: </label>
                  <input className="form-control" type="text"  value={this.state.story_description} onChange={this.onChangeStoryDescription}/>
                  </div>
                  <div className="form-group">
                  <label> Responsible: </label>
                  <input type="text" className="form-control" value={this.state.story_responsible} onChange={this.onChangeStoryResponsible}/>
                  </div>
                  <div className="form-group">
                      <label> Points: </label>
                      <input type="Number" className="form-control" value={this.state.story_points} onChange={this.onChangeStoryPoints}/>
                  </div>
                  <div className="form-group">
                       <label> Estimated Time in Hours: </label>
                       <input type="Number" className="form-control" value={this.state.story_estimatedTime} onChange={this.onChangeStoryEstimatedTime}/>
                  </div>
                  <div className="form-group"><label> Time Consumed: {this.state.story_timeConsumed}h</label></div>
                  <div className="form-group">
                       <label> Log Time: </label>
                       <input type="Number" className="form-control" value={this.state.story_loggedHours} onChange={this.onChangeStoryLoggedHours}/>
                  </div>
                  <div className="form-group">
                      <label> Priority : </label>
                      <div style={{marginLeft:20}}className="form-check form-check-inline">
                          <input className="form-check-input"
                                 type="radio"
                                 name="priorityOptions"
                                 id="priorityLow"
                                 value="Low"
                                 checked={this.state.story_priority === 'Low'}
                                 onChange={this.onChangeStoryPriority}/>
                          <label className="form-check-label">Low</label>
                      </div>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input"
                                 type="radio"
                                 name="priorityOptions"
                                 id="priorityMedium"
                                 value="Medium"
                                 checked={this.state.story_priority === 'Medium'}
                                 onChange={this.onChangeStoryPriority}/>
                          <label className="form-check-label">Medium</label>
                      </div>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input"
                                 type="radio"
                                 name="priorityOptions"
                                 id="priorityHigh"
                                 value="High"
                                 checked={this.state.story_priority === 'High'}
                                 onChange={this.onChangeStoryPriority}/>
                          <label className="form-check-label">High</label>
                      </div>

                  </div>
                  <div className="form-group">
                      <label> Status : </label>
                      <div style={{marginLeft:20}} className="form-check form-check-inline">
                          <input className="form-check-input"
                                 type="radio"
                                 name="statusOptions"
                                 id="todo"
                                 value="To Do"
                                 checked={this.state.story_status === 'To Do'}
                                 onChange={this.onChangeStoryStatus}/>
                          <label className="form-check-label">To Do</label>
                      </div>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input"
                                 type="radio"
                                 name="statusOptions"
                                 id="inprogress"
                                 value="In Progress"
                                 checked={this.state.story_status === 'In Progress'}
                                 onChange={this.onChangeStoryStatus}/>
                          <label className="form-check-label">In Progress</label>
                      </div>
                      <div className="form-check form-check-inline">
                          <input className="form-check-input"
                                 type="radio"
                                 name="statusOptions"
                                 id="complete"
                                 value="Completed"
                                 checked={this.state.story_status === 'Completed'}
                                 onChange={this.onChangeStoryStatus}/>
                          <label className="form-check-label">Complete</label>
                      </div>

                  </div>

                  <div className="form-group">

                  <input type="submit" name="action" value="update"  className="btn btn-primary"/>
                  <input style={{marginLeft:20}} type="submit" name="action" value="delete" onClick={this.deleteStory.bind(this)} className="btn btn-primary"/>


                  </div>

              </form>

            </div>

        );
    }
}

export default EditStory;