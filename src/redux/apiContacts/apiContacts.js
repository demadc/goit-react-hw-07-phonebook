import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: 'https://651d6e2844e393af2d59c707.mockapi.io/contacts/tag/user',
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