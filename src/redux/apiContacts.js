import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://651c0a68194f77f2a5af4938.mockapi.io/contacts',
});

export const getAllContacts = () => contactsInstance.get('/');

export const deleteContact = id => {
  return contactsInstance.delete(`/${id}`);
};

export const addContact = data => {
  return contactsInstance.post('/', data);
};

export const editContact = data => {
  return contactsInstance.put(`/${data.id}`, {
    name: data.name,
    phone: data.phone,
  });
};