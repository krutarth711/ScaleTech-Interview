const { usersRoutes } = require('../services/users');
const { contactRoutes } = require('../services/contacts')


exports.initialize = app => {
    console.log("initializing the application")
    app.use('/api/users', usersRoutes);
    app.use('/api/contacts', contactRoutes);
    app.use('/', (req, res, next) => {
        return res.status(200).send("Connected.!");
    })
};