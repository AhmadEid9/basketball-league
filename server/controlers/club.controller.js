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

const getClubs = (req, res) => {
    Club.find()
        .then(clubs => res.json(clubs))
        .catch(err => res.status(400).json('Error: ' + err))
}

const getClub = (req, res) => {
    Club.findById(req.params.id)
        .then(club => res.json(club))
        .catch(err => res.status(400).json('Error: ' + err))
}

const deleteClub = async (req, res) => {
    const {id} = req.params
    try {
        const deletedClub = await Club.findByIdAndDelete(id);
        if (!deletedClub) {
            return res.status(404).json({ message: 'Club not found' });
        }
        return res.status(200).json({ message: 'Club deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting club' });
    }
}

export {createClub, getClubs, getClub, deleteClub};