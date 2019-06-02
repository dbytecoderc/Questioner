/* eslint-disable eol-last */
import jwt from '../utilities/jwt';
import bcrypt from '../utilities/bcrypt';
import UserModel from '../models/user';
import {
  successResponse,
  errorResponse,
  successfullLogin,
} from '../utilities/responseformat';


const UserController = {
  async createNewUser(req, res) {
    if (req.body.password !== req.body.confirmPassword) {
      return errorResponse(res, 400, 'Passwords do not match');
    }

    const newUser = new UserModel(req.body);
    const isExistingUserMail = await UserModel.findUserByEmail(newUser.email);
    if (isExistingUserMail) {
      return errorResponse(res, 409, 'This email address is not available');
    }

    const isExistingUsername = await UserModel.findUserByUsername(newUser.username);
    if (isExistingUsername) {
      return errorResponse(res, 409, 'This username is not available');
    }

    newUser.password = bcrypt.hashPassword(newUser.password);

    const createdUser = await newUser.newUserSignUp();

    const tokenData = {
      id: createdUser.id,
      username: createdUser.username,
      admin: createdUser.admin,
    };

    const token = await jwt.generateToken(tokenData);
    const data = createdUser;
    data.token = token;

    return successResponse(res, 201, 'You have created an account', data);
  },

  async loginUser(req, res) {
    const {
      email,
      password,
    } = req.body;

    const isExistingUserMail = await UserModel.findUserByEmail(email);

    if (!isExistingUserMail) {
      return errorResponse(res, 404, 'The credentials you provided is incorrect');
    }

    if (!bcrypt.comparePassword(isExistingUserMail.password, password)) {
      return errorResponse(res, 401, 'The credentials you provided is incorrect');
    }

    const tokenData = {
      id: isExistingUserMail.id,
      username: isExistingUserMail.username,
      admin: isExistingUserMail.admin,
    };

    const token = await jwt.generateToken(tokenData);
    const loginData = await UserModel.logIn(email);

    const data = loginData;
    data.token = token;

    const {
      admin,
    } = isExistingUserMail;
    return successfullLogin(res, 200, admin ? 'You are logged in as an admin' : 'You are logged in', data);
  },
};

export default UserController;