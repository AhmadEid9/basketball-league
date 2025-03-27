import jwt from 'jsonwebtoken';

const getRoleFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.role;
  } catch (error) {
    return null;
  }
};

export default getRoleFromToken;