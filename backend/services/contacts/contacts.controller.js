const services = require('./contacts.services');

/*
 * Create new contact
 */
exports.create = async(req, res) => {
    try {
        req.body.userId = req.userId;
        let response = await services.createContact(req.body);
        if (response) {
            return res.status(200).send("Contact created successfully");
        } else {
            return res.status(400).send("Error in contact creation");
        }
    } catch (err) {
        console.log('Error in contact creation as ', err);
        return res.status(500).send("Unexpected server error in contact creation");
    }
};

/*
 *  Get All Contact Details
 */
exports.getContacts = async(req, res) => {
    try {
        let Contacts = await services.getContacts(req.userId);
        if (Contacts) {
            return res.status(200).send(Contacts);
        } else {
            return res.status(400).send("Default Error");
        }
    } catch (err) {
        return res.status(500).send("Unexpected Server Error");
    }
};

/*
 *  Delete Contact
 */
exports.delete = async(req, res) => {
    try {
        let contactId;
        if (!!req.params['id']) {
            contactId = parseInt(req.params.id.trim());
        } else {
            return res.status(400).send("Invalid request.! Please pass id of contact to be deleted");
        }
        let contactExists = await services.contactById(contactId, req.userId);

        if(contactExists){
            let response = await services.delete(contactId);
            if (response) {
                return res.status(200).send("Contact deleted")
            } else {
                return res.status(500).send("Default server error");
            }
        } else {
            return res.status(404).send("No such contact exists");
        }
        
    } catch (err) {
        return res.status(500).send("Unexpected error in server");
    }
};

/*
 *  Update Contact Details
 */
exports.update = async(req, res) => {
    try {
        let contactId;
        if (!!req.params['id']) {
            contactId = parseInt(req.params.id.trim());
        } else {
            return res.status(400).send("Invalid request");
        }

        let contactExists = await services.contactById(contactId, req.userId);

        if(contactExists){
            let Contact = await services.update(req.body, contactId);
            if (Contact) {
                return res.status(200).send("Contact updated");
            } else {
                return res.status(400).send("Default error");
            }
        } else {
            return res.status(400).send("No such contact exists with id:"+contactId);
        }
        
    } catch (err) {
        console.log('Error in update contact as ', err);
        return res.status(500).send("Unexpected error");
    }
};