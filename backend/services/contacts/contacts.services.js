const db = require('../../helpers/database');
const contacts = db.contacts;

/*
 * Create new contact
 */
exports.createContact = async data => {
    const createInfo = await contacts.create(data, { raw: true });
    if (!!createInfo.dataValues) {
        return createInfo.toJSON();
    }
    return false;
};

/*
 *  Get All Contacts Details
 */
exports.getContacts = async(userId) => {
    return await contacts.findAll({
        where: {
            userId: userId
        },
        raw: true,
        paranoid: true
    });
};

exports.contactById = async(contactId, userId) => {
    return await contacts.findOne({
        where:{
            userId: userId,
            id: contactId
        }
    })
}

/*
 *  Delete Contact
 */
exports.delete = async id => {
    return await contacts.destroy({
        where: { id: id }
    });
};

/*
 * Update Contact
 */
exports.update = async(data, id) => {
    const updateInfo = await contacts.update(data, {
        where: {
            id
        },
        plain: true,
        returning: true,
        paranoid: true
    });

    if (updateInfo && typeof(updateInfo) != 'undefined' && updateInfo != null && updateInfo.length > 0) {
        return updateInfo[1];
    } else {
        return false;
    }
};