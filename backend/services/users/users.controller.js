const services = require('./users.services');
const guards = require('../../helpers/guard');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/*
 * Create new User
*/
exports.register = async (req, res) => {
	try {
		let email = req.body.email;
		if (email) {
			let UserInfo = await services.getUserByEmail(email);
			if (UserInfo) {
				return res.status(401).send("User exists");
			}
		}

		if (req.body.password) {
			// Password encryption
			req.body.password = bcrypt.hashSync(req.body.password, 8);
		} else {
			return res.status(401).send("No password entered");
		}

		let user = await services.createUser(req.body);
		if (user) {
			return res.status(200).send("User created");
		}
		return res.status(401).send("Default error");
	} catch (err) {
		console.log('Error in register as ', err);
		return res.status(500).send("Unexpected error at creating user");

	}
};


/*
 *  Login User
 */
exports.login = async (req, res, next) => {
	try {
		let user = await services.getUserByEmail(req.body.email);
		if (user) {
			var passwordIsValid = bcrypt.compareSync(
				req.body.password,
				user.password
			);

			if (!passwordIsValid) {
				return res.status(401).send({
					accessToken: null,
					message: "Invalid Password!"
				});
			}

			var token = jwt.sign({ id: user.id }, process.env.jwt_secret, {
				expiresIn: 86400 // 24 hours
			});

			return res.status(200).send({
				id: user.id,
				username: user.username,
				email: user.email,
				accessToken: token
			});
		} else {
			return res.status(404).send("No such user exists");
		}

	} catch (error) {
		console.log("Login User -> ", error);
		return res.status(500).send("Unexpected error")
	}

};