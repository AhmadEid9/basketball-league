import mongoose from "mongoose";

const gameSchema = new mongoose.Schema({
    homeTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true},
    awayTeam: {type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true},
    homeTeamScore: {type: Number, required: true, default: 0},
    awayTeamScore: {type: Number, required: true, default: 0},
    date: {type: Date, required: true},
    season: {type: String, required: true},
    homePlayers: [{
        player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
        stats: {
            fieldPoints: {
                attempts: { type: Number, default: 0 },
                made: { type: Number, default: 0 }
            },
            threePoints: {
                attempts: { type: Number, default: 0 },
                made: { type: Number, default: 0 }
            },
            freeThrows: {
                attempts: { type: Number, default: 0 },
                made: { type: Number, default: 0 }
            },
            rebounds: {
                offensive: { type: Number, default: 0 },
                defensive: { type: Number, default: 0 }
            },
            assists: { type: Number, default: 0 },
            steals: { type: Number, default: 0 },
            blocks: { type: Number, default: 0 }
        }
    }],
    awayPlayers: [{
        player: { type: mongoose.Schema.Types.ObjectId, ref: 'Player', required: true },
        stats: {
            fieldPoints: {
                attempts: { type: Number, default: 0 },
                made: { type: Number, default: 0 }
            },
            threePoints: {
                attempts: { type: Number, default: 0 },
                made: { type: Number, default: 0 }
            },
            freeThrows: {
                attempts: { type: Number, default: 0 },
                made: { type: Number, default: 0 }
            },
            rebounds: {
                offensive: { type: Number, default: 0 },
                defensive: { type: Number, default: 0 }
            },
            assists: { type: Number, default: 0 },
            steals: { type: Number, default: 0 },
            blocks: { type: Number, default: 0 }
        }
    }]
});

const Game = mongoose.model('Game', gameSchema);

export default Game;