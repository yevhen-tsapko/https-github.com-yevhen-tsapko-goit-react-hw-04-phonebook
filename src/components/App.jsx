import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export class App extends Component {
  state = {
    contacts: [
      // { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      // { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      // { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      // { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };
  createContactData = ({ name, number }) => {
    this.checkContactName(name.value)
      ? alert(`${name.value} is alredy in contacts`)
      : this.addContact({
          id: nanoid(),
          name: name.value,
          number: number.value,
        });
  };
  addContact(newContact) {
    this.setState({ contacts: [...this.state.contacts, newContact] });
  }
  checkContactName = name => this.state.contacts.some(el => el.name === name);
  handleFilterName = evt => {
    this.setState({ filter: evt.target.value.trim().toLowerCase() });
  };
  filterContacts = () =>
    this.state.contacts.filter(el =>
      el.name.toLowerCase().includes(this.state.filter)
    );

  removeContact = id => {
    this.setState({
      contacts: this.state.contacts.filter(contact => contact.id !== id),
    });
  };
  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));
    this.setState({ contacts: savedContacts ? savedContacts : [] });
  }
  componentDidUpdate(prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
      // console.log(this.state);
    }
  }
  render() {
    return (
      <div
        style={{
          height: '100vh',
          fontSize: 24,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm createContactData={this.createContactData} />
        <h2>Contacts</h2>
        <Filter handleFilterName={this.handleFilterName} />

        <ContactList
          contList={
            this.state.filter ? this.filterContacts() : this.state.contacts
          }
          removeContact={this.removeContact}
        />
      </div>
    );
  }
}
