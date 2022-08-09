module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contacts", {
        id: {
            type: Sequelize.INTEGER(),
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,
            unique: true
        },
        phone: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER()
        }
    });

    return Contact;
};
