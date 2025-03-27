const createClub = (req, res) => {
    const {name, location, owner} = req.body

    const newClub = new Club({
        name,
        location,
        owner
    })

    newClub.save()
        .then(club => res.status(201).json(club))
        .catch(err => res.status(400).json('Error: ' + err))
}

export {createClub};