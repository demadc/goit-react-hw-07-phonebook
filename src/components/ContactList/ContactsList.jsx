import React from 'react';
import { List, ListItem, ItemText, Btn } from './ContactsList.styled';

import { useDispatch, useSelector } from 'react-redux';
import { deleteContact } from 'redux/contacts/contactSlice';
import { selectFilteredContacts } from 'redux/selector';


export const ContactsList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectFilteredContacts);


  const handleDeleteContact = id => {
    dispatch(deleteContact(id));

  };

  return (
    <List>
      {contacts.map(({ id, name, number }) => (
        <ListItem key={id}>
          <ItemText>
            {name}: {number}
          </ItemText> 
          <Btn type="button" onClick={() => handleDeleteContact(id)}>
            Delete
          </Btn>
        </ListItem>
      ))}
    </List>
  );
};








 

 
