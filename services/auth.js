const jwt = require('jsonwebtoken');

const {
  findByEmail,
  findByToken,
  create,
  updateToken,
  verificationUser } = require('../repository/user');
const { HTTP_STATUS_CODE } = require('../libs/constants');
const { CustomError } = require('../middlewares/errorHandler');
const EmailService = require('./email/service');
const SenderSendGrid = require('./email/sendgridSender');

const SECRET_KEY = process.env.JWT_SECRET_KEY;

class AuthService {
  async create(body) {
    const user = await findByEmail(body.email);
    if (user) {
      throw new CustomError(HTTP_STATUS_CODE.CONFLICT, `User with ${body.email} already exist`);
    }
  
    const newUser = await create(body);

    const sender = new SenderSendGrid();
    const emailService = new EmailService(sender);
    try {
      await emailService.sendEmail(
        newUser.email,
        newUser.name,
        newUser.verificationEmailToken,
      );
    } catch (error) {
      console.log(error);
    }

    return {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      subscription: newUser.subscription,
      avatarURL: newUser.avatarURL
    }
  }

  async login({ email, password }) {
    const user = await this.getUser(email, password);
    const token = this.generateToken(user);
    await updateToken(user.id, token);

    return {
      token,
      user: {
        email: user.email,
        subscription: user.subscription
      }
    };
  }

  async logout(id) {
    await updateToken(id, null);
  }

  async getUser(email, password) {
    const user = await findByEmail(email);

    if (!user) {
      throw new CustomError(HTTP_STATUS_CODE.NOT_FOUND, 'User not found');
    }

    if (!(await user?.isValidPassword(password))) {
      throw new CustomError(
        HTTP_STATUS_CODE.UNAUTHORIZED,
        'Invalid credentials',
      );
    }

    if (!user?.verify) {
      throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, 'User not verified');
    }

    return user;
  }

  generateToken(user) {
    const payload = { id: user.id, name: user.name, email: user.email, subscription: user.subscription };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });
    return token;
  }

  async verifyUser(token) {
   const user = await findByToken(token);
    if (!user) {
      throw new CustomError(HTTP_STATUS_CODE.BAD_REQUEST, 'Invalid token');
    }

    if (user && user.verify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        'User already verified',
      );
    }

   await verificationUser(user.id);
   return user;
  }

  async reverifyEmail(email) {
    const user = await findByEmail(email);
    if (!user) {
      throw new CustomError(
        HTTP_STATUS_CODE.NOT_FOUND,
        `User with ${email} not found`,
      );
    }

    if (user && user.verify) {
      throw new CustomError(
        HTTP_STATUS_CODE.BAD_REQUEST,
        'User already verified',
      );
    }
  }
}

module.exports = new AuthService();