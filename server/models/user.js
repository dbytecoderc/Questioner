/* eslint-disable eol-last */
import pool from '../db/index';

class UserModel {
  constructor(user) {
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.phonenumber = user.phonenumber;
  }

  async newUserSignUp() {
    const queryPlaceholder = `INSERT INTO users (first_name, last_name,
      user_name, email, password,  phone_number)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, first_name, last_name, user_name, email, phone_number, admin`;
    const values = [this.firstname, this.lastname, this.username,
      this.email, this.password, this.phonenumber,
    ];
    const {
      rows,
    } = await pool.query(queryPlaceholder, values);
    return rows[0];
  }

  static async findUserByEmail(email) {
    const queryPlaceholder = 'SELECT * FROM users WHERE email = $1';
    const values = [email];
    const {
      rows,
    } = await pool.query(queryPlaceholder, values);
    return rows[0];
  }

  static async findUserByUsername(username) {
    const queryPlaceholder = 'SELECT * FROM users WHERE user_name = $1';
    const values = [username];
    const {
      rows,
    } = await pool.query(queryPlaceholder, values);
    return rows[0];
  }

  static async logIn(email) {
    const queryPlaceholder = 'SELECT id, first_name, last_name, user_name, email, phone_number, admin FROM users WHERE email = $1';
    const values = [email];
    const {
      rows,
    } = await pool.query(queryPlaceholder, values);
    return rows[0];
  }
}

export default UserModel;