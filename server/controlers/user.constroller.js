import bcrypt from 'bcrypt';

const changePassword = async (req, res) => {
    const { email, oldPassword, newPassword, confirmPassword } = req.body;

    try{
        if (!email || !oldPassword || !newPassword || !confirmPassword ) {
            return res.status(400).json('All fields are required');
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json('Invalid email format');
        }

        if (newPassword !== confirmPassword) {
            return res.status(400).json('Passwords do not match');
        }

        if (newPassword.length < 8) {
            return res.status(400).json('Password must be at least 8 characters long');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json('User not found');
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        return res.status(200).json('Password changed successfully');
    } catch(error){
        return res.status(400).json({ message: 'Error changing password' });
    }



}