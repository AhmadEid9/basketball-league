import mongoose from "mongoose";

const clubSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    location: {type: String, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    players: [{type: mongoose.Schema.Types.ObjectId, ref: 'Player', season : String}],
    coaches: [{type: mongoose.Schema.Types.ObjectId, ref: 'Coach', season : String}],
    games: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game'}],
    rank: Number
});