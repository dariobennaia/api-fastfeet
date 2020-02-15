const { JWT_SECRET } = process.env;

export default {
  secrets: JWT_SECRET,
  expiresIn: '1h',
};
