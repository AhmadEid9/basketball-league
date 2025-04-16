import mongoose from "mongoose";
import dotenv from "dotenv";
import Club from "../models/club.model.js";
import { Admin, Player } from "../models/user.model.js";
import Game from "../models/game.model.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Database Connected"))
  .catch(err => console.error("DB Connection Error: ", err));

const seedDatabase = async () => {
    try {
        await Club.deleteMany();
        
        const owner = await Admin.findOne({ role: "admin" });
        const players = await Player.find().limit(10);
        const games = await Game.find().limit(5);

        const clubs = [
            {
                name: "Sagesse SC",
                location: "Beirut",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 2
            },
            {
                name: "Al Riyadi Beirut",
                location: "Beirut",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 1
            },
            {
                name: "Champville SC",
                location: "Dbayeh",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 3
            },
            {
                name: "Hoops Club",
                location: "Beirut",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 4
            },
            {
                name: "Atlas Ferzol",
                location: "Ferzol",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 5
            },
            {
                name: "Homenetmen Beirut",
                location: "Beirut",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 6
            },
            {
                name: "Byblos Club",
                location: "Byblos",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 7
            },
            {
                name: "Tadamon Zouk",
                location: "Zouk Mikael",
                owner: owner?._id,
                players: players.map(player => ({ _id: player._id, season: "2025" })),
                games: games.map(game => game._id),
                rank: 8
            }
        ];
        await Club.insertMany(clubs);
        console.log("✅ Lebanese Basketball League Clubs Seeded Successfully");

        mongoose.connection.close();
    } catch (error) {
        console.error("❌ Seeding Error:", error);
        mongoose.connection.close();
    }
};

seedDatabase();
