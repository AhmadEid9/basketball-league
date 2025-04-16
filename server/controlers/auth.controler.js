import { User } from "../db/models/user.model.js";
import bcrypt from 'bcrypt';
import generateToken from "../utils/generateToken.js";

const signup = async (req, res) => {
    const {fname, lname, email, password} = req.body
    
    if (!fname || !lname || !email || !password) {
        return res.status(400).json('All fields are required')
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({message:'Invalid email format'});
    }

    const hasSpecialChars = /[@#$%^&*()+=":{}|<>]/;
    if (hasSpecialChars.test(password)) {
        return res.status(400).json('Password must not contain special characters');
    }

    if (password.length < 8) {
        return res.status(400).json('Password must be at least 8 characters long');
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'This email is taken' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);
    const userData = { fname, lname, email, password: hashedPassword};
    const newUser = new User(userData);
    await newUser.save();

    return res.status(201).json({
        success: true,
        message: 'User created successfully'
    });
}

const login = async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        return res.status(400).json({message: 'All fields are required'})
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
        return res.status(400).json({message: 'Invalid email format'});
    }

    if (password.length < 8) {
        return res.status(400).json({message: 'Password must be at least 8 characters long'});
    }

    const user = await User.findOne({ email });
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

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user' });
    }
}

const deleteSelf = async (req, res) => {
    const { id } = req.user.id;

    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        return res.status(500).json({ message: 'Error deleting user' });
    }
}
export {signup, login, deleteUser, deleteSelf};