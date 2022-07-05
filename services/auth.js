const jwt = require('jsonwebtoken');
const {
    // findById,
    findByEmail,
    create,
    updateToken} = require('../repository/user');
const HTTP_STATUS_CODE = require('../libs/constants');
const { CustomError } = require('../middlewares/errorHandler');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
      const user = await findByEmail(body.email);
    if (user) {
        throw new CustomError(HTTP_STATUS_CODE.CONFLICT, `User with ${body.email} already exist`);
    }
      const newUser = await create(body);

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
    }
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password)
    if (!user) {
        throw new CustomError(
            HTTP_STATUS_CODE.UNAUTHORIZED,
            'Invalid credentials',
        );
    }
      const token = this.generateToken(user);
      await updateToken(user.id, token);
    return { token, user: { email: user.email, subscription: user.subscription } };
  }

  async logout(id) {
    await updateToken(id, null);
  }

  async getUser(email, password) {
    const user = await findByEmail(email);

    if (!user) {
      return null;
    }

    if (!(await user?.isValidPassword(password))) {
      return null
    }

    return user
  }

  generateToken(user) {
      const payload = { id: user.id, name: user.name, email: user.email, subscription: user.subscription };
      const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    return token;
  }
}

module.exports = new AuthService();