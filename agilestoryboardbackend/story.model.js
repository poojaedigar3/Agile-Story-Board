const mongoose = require('mongoose');
const Schema = mongoose.Schema;
autoIncrement = require('mongoose-auto-increment');

let Story = new Schema({

    story_Id: Number,
    story_description: String,
    story_responsible: String,
    story_priority: String,
    story_status: String,
    story_points: Number,
    story_estimatedTime: Number,
    story_timeConsumed: Number,

},
{ timestamps: true });


autoIncrement.initialize(mongoose.connection);
//Story.plugin(autoIncrement.plugin, { model: 'Story', field: 'StoryId' });
Story.plugin(autoIncrement.plugin, {
    model: 'Story.',
    field: 'story_Id',
    startAt: 100,
    incrementBy: 1
});
module.exports = mongoose.model('Story',Story);