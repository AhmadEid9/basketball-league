import { Admin, Coach, Player, User } from "../db/models/user.model.js";

const getUserModel = (role) => {
    switch (role) {
        case 'admin':
            return Admin;
        case 'coach':
            return Coach;
        case 'player':
            return Player;
        default:
            return User;
    }
}
const signup = async (req, res) => {
    const {fname, lname, email, password, role, ...extraFields} = req.body
    
    if (!fname || !lname || !email || !password || !role) {
        return res.status(400).json('All fields are required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json('Invalid email format');
    }

    const SpecialCharsRegex = /[@#$%^&*()+=":{}|<>]/;
    if (hasSpecialChars.test(password)) {
        return res.status(400).json('Password must not contain special characters');
    }

    if (password.length < 8) {
        return res.status(400).json('Password must be at least 8 characters long');
    }

    const Collection = getUserModel(role);

    if (!['user', 'admin', 'coach', 'player'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    const existingUser = await Collection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { fname, lname, email, password: hashedPassword, role, ...extraFields };
    const newUser = new Collection(userData);
    await newUser.save();

    return res.status(201).json({
        message: 'User created successfully',
        token: generateToken(newUser),
    });
}

const login = async (req, res) => {
    const {email, password, role} = req.body``

    if (!email || !password) {
        return res.status(400).json('All fields are required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return res.status(400).json('Invalid email format');
    }

    if (password.length < 8) {
        return res.status(400).json('Password must be at least 8 characters long');
    }

    if (!['user', 'admin', 'coach', 'player'].includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
    }

    const Model = getUserModel(role);

    const user = await Model.findOne({ email });
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.status(200).json({
        message: 'Login successful',
        token: generateToken(user),
    });

}
export {signup, login};