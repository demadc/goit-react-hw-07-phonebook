import {useEffect} from 'react';
import { List, ListItem, ItemText, Btn } from './ContactsList.styled';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { fetchContacts, deleteContact } from 'redux/contacts/operations';
import {
  selectIsLoading,
  selectError,
  selectFilteredContacts,
  selectFilter,
} from 'redux/selector';


export const ContactsList = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const filter = useSelector(selectFilter);
  const result = useSelector(selectFilteredContacts);

  const handleDeleteContact = id => {
    dispatch(deleteContact(id));
  };

    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);
  
      if (filter.toLowerCase() && !result.length) {
        toast.warn(`No contacts matching your request`);
    };


  return (

    <>
      {!error && !isLoading && result?.length > 0 && (
     <List>
      {result.map(({ id, name, number }) => (
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
      )}
    </>
   
  );
};








 

 
