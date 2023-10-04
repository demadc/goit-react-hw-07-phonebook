import {useEffect} from 'react';
import { List, ListItem, ItemText, Btn } from './ContactsList.styled';

import { useDispatch, useSelector } from 'react-redux';

import { toast } from 'react-toastify';
import { fetchContacts } from 'redux/contacts/operations';
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


  const handleDeleteContact = id => {
    dispatch(handleDeleteContact(id));
  };

    useEffect(() => {
      dispatch(fetchContacts());
    }, [dispatch]);
  
    const result = useSelector(selectFilteredContacts);
  
    const getFilteredContacts = data => {
      if (filter.toLowerCase() && !data.length) {
        toast.warn(`No contacts matching your request`);
      }
      return data;
    };

  const filteredContacts = getFilteredContacts(result);

  return (

    <>
      {!error && !isLoading && filteredContacts?.length > 0 && (
     <List>
      {filteredContacts.map(({ id, name, number }) => (
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








 

 
