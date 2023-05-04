import { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App = () => {
  // state = {
  //   contacts: [
  //     // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  //     // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  //     // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  //     // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  //   ],
  //   filter: '',
  // };
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
  // const componentDidMount() {
  //   const savedContacts = JSON.parse(localStorage.getItem('contacts'));
  //   setContacts( savedContacts ? savedContacts : [] );
  // }
  // const componentDidUpdate(prevState) {
  //   if (prevState.contacts !== this.state.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //     // console.log(this.state);
  //   }
  // }
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
