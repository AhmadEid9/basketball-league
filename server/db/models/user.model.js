import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fname: {type: String, required: true},
    lname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true, minLength: 8},
    role: {type: String, required: true, enum: ['user', 'admin', 'coach', 'player'], default: 'user'}
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

const Admin = User.discriminator('admin', new mongoose.Schema({
    permissions: {
        type: [{ type: String, enum: ['create', 'read', 'update', 'delete'], required: true }],
        default: ['create', 'read', 'update', 'delete']
    }
}));

const SuperUser = User.discriminator('superuser', new mongoose.Schema({
    club: {type: mongoose.Schema.Types.ObjectId, ref: 'Club', required: true}

}));

const Coach = User.discriminator('coach', new mongoose.Schema({
    clubs: {type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Club'}], default: []},
    stats: {
        totalGamesPlayed: {
            gamesWon: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game', default: []}],
            gamesLost: [{type: mongoose.Schema.Types.ObjectId, ref: 'Game', default: []}]
        },
    }
}))

const Player = User.discriminator('player', new mongoose.Schema({
    code : {type: String, required: true, unique: true, match: [/^[A-Z]{2}-\d{5}$/, 'Invalid player code format. Must be in the format two uppercase letters followed by a space and a five-digit number.']},
    position: {type: String, required: true, default: 'General'},
    clubs: {
        type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Club', startedAt: Date, endedAt: Date, jersyNumber: Number}],
        default: []
    },
    stats: {
        totalGamesPlayed: { type: Number, default: 0 },
        totalPoints: {
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
            }
        },
        rebounds: {
            offensive: { type: Number, default: 0 },
            defensive: { type: Number, default: 0 }
        },
        assists: { type: Number, default: 0 },
        steals: { type: Number, default: 0 },
        blocks: { type: Number, default: 0 }
    },
    games: {type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Game' }], default: []}
}
));

export {User, Admin, SuperUser, Coach, Player};