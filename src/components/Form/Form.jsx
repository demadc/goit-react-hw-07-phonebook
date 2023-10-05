import React from 'react';
import { Formik, Field, Form } from 'formik';
import { nanoid } from 'nanoid/non-secure';
import { Label, Button } from './Form.styled';

import { useDispatch, useSelector } from 'react-redux';

import { contactsData } from 'redux/selector';


const idName = nanoid();
const idNum = nanoid();

export const ContactForm = () => {
  const dispatch = useDispatch();
  const currentContacts = useSelector(contactsData);

  const handleAddContact = (value, { resetForm }) => {
    
    const isDuplicateContact = currentContacts.some(
      contact => contact.name.toLowerCase() === value.name.toLowerCase()
    );

    if (isDuplicateContact) {
      alert(`${value.name} is already in contacts.`);
      
    } else {
      dispatch(handleAddContact({...value})); 

      resetForm(); 
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        number: '',
      }}
      onSubmit={handleAddContact}
    >
      <Form>
        <Label htmlFor={idName}>
          Name
          <Field
            id={idName}
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <Field
            id={idNum}
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[ .\-\s]?\(?\d{1,3}?\)?[ .\-\\s]?\d{1,4}[ .\-\s]?\d{1,4}[ .\-\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            placeholder="0XX-123-45-67"
          />
        </Label>

        <Button type="submit">Add contact</Button>
      </Form>
    </Formik>
  );
};

