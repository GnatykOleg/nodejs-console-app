const fs = require('fs/promises');
const path = require('path');
const { nanoid } = require('nanoid');

const contactsPath = path.join(__dirname, './db/contacts.json');

const updateContacts = async contacts =>
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
};

const getContactById = async contactId => {
    const contacts = await listContacts();
    const contactsId = String(contactId);
    const result = contacts.find(el => el.id === contactsId);
    return result || null;
};

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone,
    };
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
};

const updateContact = async (contactId, data) => {
    const contacts = await listContacts();
    const contactsId = String(contactId);
    const index = contacts.findIndex(el => el.id === contactsId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { contactId, ...data };
    await updateContacts(contacts);
    return books[index];
};

const removeContact = async contactId => {
    const contacts = await listContacts();
    const contactsId = String(contactId);
    const index = contacts.findIndex(el => el.id === contactsId);
    if (index === -1) {
        return null;
    }
    const [result] = contacts.splice(index, 1);
    await updateContacts(contacts);
    return result;
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    updateContact,
};
