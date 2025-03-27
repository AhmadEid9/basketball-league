const getTokenFromHeader = (req) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }

    return authHeader.split(' ')[1];
}

export default getTokenFromHeader;