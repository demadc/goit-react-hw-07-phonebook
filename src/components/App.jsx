import { ContactForm } from './Form/Form';
import { ContactsList } from './ContactList/ContactsList';
import { Filter } from './Filter/Filter';


export function App() {
  
  
  return (
    <div style={{ width: 500, marginLeft: 400, marginRight: 400 }}>
      <h2>Phonebook</h2>
      <ContactForm />
      <h2>Contacts</h2>
      <Filter />
      <ContactsList  />

     
    </div>
  );
}
