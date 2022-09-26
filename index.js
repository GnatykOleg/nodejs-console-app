const {
    listContacts,
    updateContact,
    getContactById,
    removeContact,
    addContact,
} = require('./contacts');

const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');

const invokeAction = async ({ action, id, name, email, phone }) => {
    switch (action) {
        case 'list':
            const allContacts = await listContacts();
            console.table(allContacts);
            break;
        case 'get':
            const contactById = await getContactById(id);
            console.table(contactById);
            break;
        case 'add':
            const addNewContact = await addContact(name, email, phone);
            console.table(addNewContact);
            break;
        case 'update':
            const changeContact = await updateContact(id, {
                name,
                email,
                phone,
            });
            console.table(changeContact);
            break;
        case 'remove':
            const deleteContact = await removeContact(id);
            console.table(deleteContact);
            break;

        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};

const arr = hideBin(process.argv);
const { argv } = yargs(arr);
invokeAction(argv);
