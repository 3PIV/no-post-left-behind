// models/posts.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// What the schema for the history of a post should look like
const HistorySchema = new Schema({
    content:  String,
    anon: String,
    created: String,
    uid: String,
    subject: String,
    content: String
});

// What the Feedback schema should look like
const FeedbackSchema = new Schema({
    uid: String,
    created: String,
    type: String,
    id: String,
    subject: String
});

// What the schema for a feedback/followup looks like
const FollowUpSchema = new Schema({
    uid: String,
    created: String,
    type: String,
    no_answer: Number,
    id: String,
    children: [FeedbackSchema],
    subject: String,
});

// What the schema for the child of a post should look like.
const ChildSchema = new Schema({
        folders: [String],
        is_tag_endorse: Boolean,
        created: String,
        type: String,
        id: String,
        children: [FollowUpSchema],
        history: [HistorySchema]
});

// What a modification notification should look like
const ChangeSchema = new Schema({
    uid: String,
    type: String,
    when: String,
    data: String
})

// What an actual Post should look like
const PostSchema = new Schema({
    _id: {
        $oid: String
    },
    unique_views: Number,
    change_log: [ChangeSchema],
    id: String,
    no_answer: Number,
    children: [ChildSchema],
    nr: Number,
    type: String,
    folders: [
        String
    ],
    no_answer_followup: Number,
    tags: [
        String
    ],
    created: String,
    is_tag_good: Boolean,
    t: Number,
    history: [HistorySchema]
})

//export default mongoose.model('Post', PostSchema);
module.exports = Post = mongoose.model('Post', PostSchema);
