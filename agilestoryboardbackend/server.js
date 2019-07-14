const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const storyBoardRoutes = express.Router();
const PORT = 3002 || process.env.port;
autoIncrement = require('mongoose-auto-increment');

let Story = require('./story.model');

app.use(cors());
app.use(bodyParser.json());
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);


storyBoardRoutes.route('/').get(function(req,res){
    Story.find(function(error,stories){
        if(error){console.log(error);}
        else{
            res.json(stories);
        }
    });
});

storyBoardRoutes.route('/:id').get(function(req,res){
    let id = req.params.id;
    Story.findById(id, function(err,story){
        res.json(story);

    })
        .catch(error => {
            res.status(400).send('Cannot find the story!')
            //try doing this with json
        })
});

storyBoardRoutes.route('/create').post(function(req,res){
    let story = new Story(req.body);
    story.save()
        .then(story => {
            res.status(200).json({'story': 'Story created successfully!'})
        })
        .catch(error => {
            res.status(400).send('Story creation failed!')
            //try doing this with json
        });

});

storyBoardRoutes.route('/delete/:id').delete(function(req,res){
let id = req.params.id;
Story.findOneAndDelete(id, function(error, data){
        if(error) return res.send(err);
        return res.json({success:true, message:"Story successfully deleted!"})
        });

});

storyBoardRoutes.route('/edit/:id').post(function(req,res){
    Story.findById(req.params.id, function(err,story){
        if(!story)
            res.status(404).send('data not found');
        else
            story.story_description = req.body.story_description;
            story.story_responsible = req.body.story_responsible;
            story.story_points = req.body.story_points;
            story.story_priority = req.body.story_priority;
            story.story_status = req.body.story_status;
            story.story_estimatedTime = req.body.story_estimatedTime;
            story.story_timeConsumed = req.body.story_timeConsumed

            story.save().then(story=> {
                res.json('Story updated successfully!');
            })
                .catch(err=>{
                    res.status(400).send('Update Failed');
                })
    });
});

app.use('/storyBoard', storyBoardRoutes );
app.listen(PORT, function(){
    console.log("Server is running on port " + PORT);
});

//for connecting to mongoDb local instance
//mongoose.connect('mongodb://<ip>:<port>/<dbname>);

//WebConnection
const dbRoute = 'mongodb+srv://<username>:<password>@cluster0-geckb.mongodb.net/test?retryWrites=true&w=majority';
mongoose.connect(dbRoute,{useNewUrlParser:true});
const connection = mongoose.connection;

connection.once('open',function(){
    console.log("Connected to MongoDB!");
});