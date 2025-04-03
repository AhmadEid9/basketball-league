import { Player } from "../db/models/user.model";

const extractPlayersStatsFromExcel = async (req, res) => {
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
        const sheetName = workbook.SheetNames[0];
        const sheet = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        
        const homePlayers = [];
        const awayPlayers = [];

        let homeTeamScore = 0;
        let awayTeamScore = 0;

        for (const row of sheet) {
            const {
                team, season, playerCode,
                fieldPointsAttempts, fieldPointsMade,
                threePointsAttempts, threePointsMade,
                freeThrowsAttempts, freeThrowsMade,
                reboundsOffensive, reboundsDefensive,
                assists, steals, blocks
            } = row;

            let player = await Player.findOne({ code: playerCode });

            if (!player) {
                return res.status(404).json({ message: 'Player not found' });
            }

            let seasonStats = player.stats.find(s => s.season === season);
            
            if (!seasonStats) {
                seasonStats = {
                    season,
                    totalPoints: {
                        fieldPoints: { attempts: 0, made: 0 },
                        threePoints: { attempts: 0, made: 0 },
                        freeThrows: { attempts: 0, made: 0 }
                    },
                    rebounds: { offensive: 0, deffensive: 0 },
                    assists: 0,
                    steals: 0,
                    blocks: 0
                };
                player.stats.push(seasonStats);
            }

            seasonStats.totalPoints.fieldPoints.attempts += fieldPointsAttempts;
            seasonStats.totalPoints.fieldPoints.made += fieldPointsMade;
            seasonStats.totalPoints.threePoints.attempts += threePointsAttempts;
            seasonStats.totalPoints.threePoints.made += threePointsMade;
            seasonStats.totalPoints.freeThrows.attempts += freeThrowsAttempts;
            seasonStats.totalPoints.freeThrows.made += freeThrowsMade;
            seasonStats.rebounds.offensive += reboundsOffensive;
            seasonStats.rebounds.deffensive += reboundsDefensive;
            seasonStats.assists += assists;
            seasonStats.steals += steals;
            seasonStats.blocks += blocks;

            await player.save();

            const playerScore =
                fieldPointsMade * 2 +
                threePointsMade * 3 +
                freeThrowsMade * 1;

            if (team === "home") {
                homePlayers.push(player._id);
                homeTeamScore += playerScore;
            } else if (team === "away") {
                awayPlayers.push(player._id);
                awayTeamScore += playerScore;
            }
        }

        return {
            homePlayers,
            awayPlayers,
            homeTeamScore,
            awayTeamScore
        };
}

export default extractPlayersStatsFromExcel