const { Op } = require('sequelize');
const db = require('../../helpers/database');
const users = db.users;

/*
 *  Create User
 */
exports.createUser = async data => {
  const createInfo = await users.create(data, { raw: true });
  if (!!createInfo.dataValues) {
    return createInfo.toJSON();
  }
  return false;
};

/*
 *  User already exist.
 */
exports.getUserByEmail = async email => {
  return await users.findOne({
    where: { email: email },
    raw: true
  });
}