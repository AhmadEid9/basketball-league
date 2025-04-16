import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    location: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'Admin', required: true},
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player', season : String}],
    games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
    rank: Number
});

const Club = mongoose.model('Club', clubSchema);

export default Club