import Game from "../db/models/game.model.js";
import extractPlayersStatsFromExcel from "../utils/extractPlayersStatsFromExcel.js";
import isValidDateTime from "../utils/validateDate.js";

const getGame = async (req, res) => {
    const {id} = req.params

    try{
        const game = await Game.findById(id);
        
        return res.status(201).json(game);
    } catch (error){
        return res.status(404).json({ message: 'Game not found' });
    }

}

const getGames = async (req, res) => {
    try{
        const games = await Game.find();
        return res.status(201).json(games)
    } catch (error){
        return res.status(404).json({ message: 'No game has been played yet' });
    }

}

const getGamesAtDate = async (req, res) => {
    const {date} = req.params

    if (!date) {
        return res.status(400).json({ message: 'Date is required' });
    }

    if (isValidDateTime(date)){
        try{
            const gams = await Game.find({date})
            return res.status(201).json(games)
        } catch (error){
            return res.status(404).json({ message: 'No game has been played in that date' });
        }

    }

    return res.status(400).json({ message: 'Invalid date format' });
}

const getSeasonGames = async (req, res) => {
    const {season} = req.params

    if (!season) {
        return res.status(400).json({ message: 'Season is required' });
    }

    try{
        const games = await Game.find({season})
        
        return res.status(201).json(games)
    } catch (error) {
        return res.status(404).json({ message: 'No game has been played in that season' });
    }

}

const createGame = async (req, res) => {
    try{
        const {homeTeam, awayTeam, date, season} = req.body

        if (!homeTeam || !awayTeam || !date || !season) {
            return res.status(400).json({ message: 'All fields are required' });        
        }

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const {homeTeamScore, awayTeamScore, homePlayers, awayPlayers} = extractPlayersStatsFromExcel(req, res);

        try{
            const hostTeam = await Club.findOne({ name: homeTeam });
            const guestTeam = await Club.findOne({ name: awayTeam });
            const gameInfo = {homeTeam: hostTeam._id, awayTeam: guestTeam._id, date, season, homePlayers, awayPlayers, homeTeamScore, awayTeamScore}
            
            try{
                const game = await Game.create(gameInfo)
                
                return res.status(201).json(game)
            } catch (error) {
                return res.status(400).json({ message: 'Error creating game' });
            }
        } catch (error) {
            return res.status(404).json({ message: 'At least one was Club not found' });
        }
    } catch (error) {
        return res.status(400).json({message: "General creation error"});
    }
}

const updateGamePlayersStatsByExcel = async (req, res) => {
    try{

        const {id} = req.params

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const {homeTeamScore, awayTeamScore, homePlayers, awayPlayers} = extractPlayersStatsFromExcel(req, res);
        
        const game = await Game.findOne({ _id: id })
        if (!game) {
            return res.status(404).json({ message: 'Game not found' });
        }
        
        try{
            await game.updateOne({homePlayers, awayPlayers, homeTeamScore, awayTeamScore})
        } catch (error) {
            return res.status(400).json({ message: 'Error updating game' });
        }
        return res.status(201).json(game)
    }catch(error){
        return res.status(400).json({message: "General update error"});
    }

}

export { getGame, getGames, getGamesAtDate, getSeasonGames, createGame, updateGamePlayersStatsByExcel }