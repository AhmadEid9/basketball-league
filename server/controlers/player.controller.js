const moveToClub =  async(req, res) => {
    const {player_id, club} = req.body

    const player = awaitPlayer.findById(player_id)
}

export {moveToClub};