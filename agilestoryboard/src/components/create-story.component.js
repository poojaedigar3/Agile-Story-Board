import React, {Component} from 'react';
import axios from 'axios';

class CreateStory extends Component {
    constructor(props){
        super(props);

        this.onChangeStoryDescription = this.onChangeStoryDescription.bind(this);
        this.onChangeStoryResponsible = this.onChangeStoryResponsible.bind(this);
        this.onChangeStoryStatus = this.onChangeStoryStatus.bind(this);
        this.onChangeStoryPoints = this.onChangeStoryPoints.bind(this);
        this.onChangeStoryPriority = this.onChangeStoryPriority.bind(this);
        this.onChangeStoryEstimatedTime = this.onChangeStoryEstimatedTime.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state={
            story_description: '',
            story_responsible:'',
            story_priority:'',
            story_status:'To Do',
            story_points: 0,
            story_estimatedTime: 0
        }
    }

    onChangeStoryDescription=(event)=>{
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
    onChangeStoryEstimatedTime=(event)=>{
        console.log(event.target.value);
            this.setState({
                story_estimatedTime: event.target.value
            });
        }

    onSubmit(event){
        event.preventDefault();

        console.log("Create Story!");
        const newStory = {
                    story_description: this.state.story_description,
                    story_responsible:this.state.story_responsible,
                    story_priority:this.state.story_priority,
                    story_status:this.state.story_status,
                    story_points: this.state.story_points,
                    story_estimatedTime: this.state.story_estimatedTime,


        }

        axios.post('http://localhost:3002/storyboard/create',newStory)
        .then(res=>console.log("res.data"));

        this.setState({story_description: '',
            story_responsible:'',
            story_priority:'',
            story_status: 'To Do',
            story_points: 0,
            story_estimatedTime:0})

            this.props.history.push('/');
    }
    render(){
        return(
            <div style={{marginTop:30}} className="container">
              <h2>Create New Story</h2>
              <form onSubmit={this.onSubmit}>
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
                      <label> Estimation in Hours </label>
                      <input type="Number" className="form-control" value={this.state.story_estimatedTime} onChange={this.onChangeStoryEstimatedTime}/>
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
                      <input type="submit" value="Create Story" className="btn btn-primary"/>
                  </div>
              </form>
            </div>

        );
    }
}

export default CreateStory;