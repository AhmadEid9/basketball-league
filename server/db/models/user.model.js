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
        values: [{type: String, required: true, enum: ['create', 'read', 'update', 'delete']}],
        default: ['create', 'read', 'update']
    }
}));
const Coach = User.discriminator('coach', new mongoose.Schema({
    speciality: {type: String, required: true, default: 'General'},
    experience: {
        clubs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Club', startedAt: Date, endedAt: Date, default: null}],
        years: {type: Number, default: 0},
    }
}));
const Player = User.discriminator('player', new mongoose.Schema({
    position: {type: String, required: true, default: 'General'},
    clubs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Club', startedAt: Date, endedAt: Date, jersyNumber: Number, default: null}],
    stats: [
        {
            season: {type: String, required: true, default: null},
            totalPoints: {
                fieldPoints: {
                    attempts: {type: Number, default: 0},
                    made: {type: Number, default: 0},
                },
                threePoints: {
                    attempts: {type: Number, default: 0},
                    made: {type: Number, default: 0}
                },
                freeThrows: {
                    attempts: {type: Number, default: 0},
                    made: {type: Number, default: 0}
                }
            },
            rebounds: {
                offensive: {type: Number, default: 0},
                deffensive: {type: Number, default: 0},
            },
            assists: {type: Number, default: 0},
            steals: {type: Number, default: 0},
            blocks: {type: Number, default: 0},
        }
    ]
}));

export {User, Admin, Coach, Player};