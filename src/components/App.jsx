import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
 
  const [contacts, setContacts] = useState(() =>
    JSON.parse(localStorage.getItem('contacts') ?? [])
  );
  const [filter, setFilter] = useState('');

  const createContactData = ({ name, number }) => {
    checkContactName(name.value)
      ? alert(`${name.value} is alredy in contacts`)
      : addContact({
          id: nanoid(),
          name: name.value,
          number: number.value,
        });
  };
  const addContact = newContact => {
    setContacts([...contacts, newContact]);
  };
  const checkContactName = name => contacts.some(el => el.name === name);
  const handleFilterName = evt => {
    setFilter(evt.target.value.trim().toLowerCase());
  };
  const filterContacts = () =>
    contacts.filter(el => el.name.toLowerCase().includes(filter));

  const removeContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
 
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  return (
    <div
      style={{
        height: '100vh',
        fontSize: 24,
        color: '#010101',
      }}
    >
      <h1>Phonebook</h1>
      <ContactForm createContactData={createContactData} />
      <h2>Contacts</h2>
      <Filter handleFilterName={handleFilterName} />

      <ContactList
        contList={filter ? filterContacts() : contacts}
        removeContact={removeContact}
      />
    </div>
  );
};
